const service = require("./service");
const { requireAuthentication } = require("../auth");

// todo: for all, validate the input
// todo: get the fields from graphql,
// feed to service to use in projection;
// might be an issue with caching?

async function getUserList(context) {
  requireAuthentication(context);
  return service.getUserList();
}

async function getUser(args, context) {
  requireAuthentication(context);
  return service.getUser({ _id: args._id });
}

async function getCurrentUser(context) {
  requireAuthentication(context);
  console.log(context.decodedToken.sub);
  const user = await service.getUser({ _id: context.decodedToken.sub });
  return Object.assign(user.toObject(), { token: context.token });
}

async function createUser(args) {
  return service.createUser(args);
}

async function updateUser(args) {
  return service.updateUser(args);
}

async function destroyUser(args) {
  return service.destroyUser(args._id);
}

async function enableUser(args) {
  return service.enableUser(args._id);
}

async function disableUser(args) {
  return service.disableUser(args._id);
}

async function resetUserPassword(args) {
  return service.resetUserPassword(args._id);
}

async function getUsersArticles({ userId }) {
  return service.getUsersArticles({ userId });
}

module.exports = {
  getUserList,
  getUser,
  getCurrentUser,
  createUser,
  updateUser,
  destroyUser,
  enableUser,
  disableUser,
  resetUserPassword,
  getUsersArticles
};
