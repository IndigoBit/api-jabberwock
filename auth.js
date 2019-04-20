const jwt = require("jsonwebtoken");
const { getConfig } = require("./config");

/**
 * Requires the request have come from an authenticated user.
 * Throw an error if the user is properly authenticated.
 *
 * @param {*} token
 */
function requireAuthentication(token) {
  if (!token) throw new Error("Unauthorized");
}

function getRequestUser() {
  const config = getConfig();

  return ({ req }) => {
    const auth = {};
    const token = req.headers.authorization;

    if (!token) return auth;

    // decode the token and verify it.
    // if there is an error set the appropriate flag and return it
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, config.jwtSecret);
    } catch (err) {
      switch (err) {
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

    auth.decoded = decodedToken;

    console.log(`auth, ${auth}`);

    return auth;
  };
}

module.exports = { requireAuthentication, getRequestUser };
