const controller = require("./controller");

const resolvers = {
  Query: {
    userList: async (_, __, context) => controller.getUserList(context),
    user: async (_, args, context) => controller.getUser(args, context),
    currentUser: async (_, __, context) => controller.getCurrentUser(context)
  },
  Mutation: {
    createUser: async (_, args) => controller.createUser(args),
    updateUser: async (_, args) => controller.updateUser(args),
    destroyUser: async (_, args) => controller.destroyUser(args),
    enableUser: async (_, args) => controller.enableUser(args),
    disableUser: async (_, args) => controller.disableUser(args),
    resetUserPassword: async (_, args) => controller.resetUserPassword(args),

    // move this to an auth resolver?
    login: () => {
      throw new Error("Unimplemented");
    },
    logout: () => {
      throw new Error("Unimplemented");
    }
  },
  User: {
    articles: async parent =>
      controller.getUsersArticles({ userId: parent._id })
  }
};

module.exports = { resolvers };
