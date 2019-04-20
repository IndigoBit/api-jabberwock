const jwt = require("jsonwebtoken");
const { getConfig } = require("./config");

/**
 * Requires the request have come from an authenticated user.
 * Throw an error if the user is properly authenticated.
 *
 * @param {*} token
 */
function requireAuthentication(token) {
  if (!token) throw new Error("UNAUTHORIZED");
  if (token.tokenExpired) throw new Error("TOKEN_EXPIRED");
  if (token.badToken) throw new Error("BAD_TOKEN");
  if (!token.decodedToken) throw new Error("UNAUTHORIZED");

  ["sub", "jti"].forEach(field => {
    if (!token.decodedToken[field]) throw new Error("BAD_TOKEN");
  });
}

function getRequestUser() {
  const config = getConfig();

  return ({ req }) => {
    const auth = {};

    const BearerPrefix = "Bearer ";
    const header = req.headers.authorization;
    if (!header || header.indexOf(BearerPrefix) !== 0) {
      return auth;
    }

    auth.token = header.split(BearerPrefix)[1];

    // decode the token and verify it.
    // if there is an error set the appropriate flag and return it
    let decodedToken;
    try {
      decodedToken = jwt.verify(auth.token, config.jwtSecret);
    } catch (err) {
      switch (err && err.name) {
        case "TokenExpiredError":
          auth.tokenExpired = true;
          break;
        default:
          auth.badToken = true;
          break;
      }

      return auth;
    }

    // if we're here then token is verified and got decoded properly
    auth.decodedToken = decodedToken;

    return auth;
  };
}

module.exports = { requireAuthentication, getRequestUser };
