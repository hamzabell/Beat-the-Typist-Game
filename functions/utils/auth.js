const jwt = require("jsonwebtoken");
const jwks = require("jwks-rsa");
const { promisify } = require("util");

const jwksClient = jwks({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  audience: process.env.AUTHO_AUDIENCE,
});

const getAccessTokenFromHeaders = (headers) => {
  const rawAuthorization = headers.authorization;

  if (!rawAuthorization) {
    return null;
  }

  const authorizationPart = rawAuthorization.split(" ");
  if (authorizationPart[0] !== "Bearer" || authorizationPart.length !== 2) {
    return null;
  }

  console.log("auth token");

  const accessToken = authorizationPart[1];
  return accessToken;
};

const validateAccessToken = async (token) => {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    const kid = decodedToken.header.kid;
    const alg = decodedToken.header.alg;
    const getSigningkey = promisify(jwksClient.getSigningKey);
    const key = await getSigningkey(kid);

    const siginingKey = key.publicKey;

    const options = { algorithm: alg };
    jwt.verify(token, siginingKey, options);
    return decodedToken.payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
module.exports = {
  getAccessTokenFromHeaders,
  validateAccessToken,
};
