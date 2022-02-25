const jsonwebtoken = require("express-jwt");

const authJwt = () => {
  const secret = process.env.SECRET_KEY;
  return jsonwebtoken({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: "/api/product/get/count", methods: ["GET"] },
      "/api/user/login",
      "/api/user/register",
    ],
  });
};

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}

module.exports = authJwt;
