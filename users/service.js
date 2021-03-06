const ArticleService = require("../articles/service");
const { Model } = require("./model");

// limit/skip/sort?
async function getUserList() {
  return Model.find({});
}

async function getUser({ _id }) {
  return Model.findById(_id);
}

async function createUser({ name, email, username, active }) {
  const user = new Model({
    name,
    email,
    username,
    active
  });
  user.requirePasswordReset = true;

  return user.save();
}

async function updateUser({ _id, name, email, username, active }) {
  const update = {
    name,
    email,
    username,
    active
  };

  Object.keys(update).forEach(field => {
    if (typeof update[field] === "undefined") {
      delete update[field];
    }
  });

  return Model.findOneAndUpdate(
    { _id },
    { $set: update },
    { new: true, runValidators: true }
  );
}

async function destroyUser({ _id }) {
  return Model.findOneAndRemove({ _id });
}

async function enableUser({ _id }) {
  return Model.findOneAndUpdate(
    { _id },
    { $set: { active: true } },
    { new: true, runValidators: true }
  );
}

async function disableUser({ _id }) {
  return Model.findOneAndUpdate(
    { _id },
    { $set: { active: false } },
    { new: true, runValidators: true }
  );
}

async function resetUserPassword({ _id }) {
  return Model.findOneAndUpdate(
    { _id },
    { $set: { requirePasswordReset: true } },
    { new: true, runValidators: true }
  );
}

async function getUsersArticles({ userId }) {
  const articleList = await ArticleService.getArticleListByUserId({ userId });
  return articleList.map(article =>
    Object.assign(article.toObject(), { creator: getUser({ _id: userId }) })
  );
}

module.exports = {
  getUserList,
  getUser,
  createUser,
  updateUser,
  destroyUser,
  enableUser,
  disableUser,
  resetUserPassword,
  getUsersArticles
};
