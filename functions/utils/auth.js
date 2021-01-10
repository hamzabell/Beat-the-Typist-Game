const getAccessTokenFromHeaders = (headers) => {
  const rawAuthorization = headers.authorization;

  if (!rawAuthorization) {
    return null;
  }

  const authorizationPart = rawAuthorization.split(" ");
  if (authorizationPart[0] !== "Bearer" || authorizationPart.length === 2) {
    return null;
  }

  const accessToken = authorizationPart[1];
  return accessToken;
};

module.exports = {
  getAccessTokenFromHeaders,
};
