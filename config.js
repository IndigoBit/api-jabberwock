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

// sample jwt - expires july 15 2019
// eslint-disable-next-line max-len
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1YzI4ZjVlNDlmNjMxMzEyNGNlNGQ0MTEiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTU2MzIzOTAyMiwianRpIjoiMzc1YjYxOWUtOTZlMy00MzYwLTgzMTMtYzZkOGMzMWU2NzBjIn0.bjQstelvlBRRNNhR0SAZjI2cAh1jO8LwR63jLfCk_ng
