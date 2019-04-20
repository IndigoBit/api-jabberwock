const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const { getRequestUser } = require("./auth");
const schema = require("./gql-schema");
const config = require("./config").getConfig();

async function start() {
  const connectionUri = config.dbUri;
  const additionalParameters = { useNewUrlParser: true };
  await mongoose.connect(connectionUri, additionalParameters);

  // https://github.com/apollographql/apollo-server/issues/1633
  // Getting mongoose ObjectIds to work with apollo is a pain...
  const { ObjectId } = mongoose.Types;
  ObjectId.prototype.valueOf = function valueOf() {
    return this.toString();
  };

  const server = new ApolloServer({
    schema,
    context: getRequestUser(),
    tracing: true
  });
  const port = config.apiPort;

  return { server, port };
}

module.exports = { start };
