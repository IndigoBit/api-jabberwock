function getConfig() {
  const config = {
    jwtSecret: process.env.JABBERWOCK_JWT_SECRET,
    dbUri: process.env.JABBERWOCK_DB_URI,
    redisHost: process.env.JABBERWOCK_REDIS_HOST,
    apiPort: process.env.JABBERWOCK_API_PORT
  };

  return config;
}

module.exports = { getConfig };
