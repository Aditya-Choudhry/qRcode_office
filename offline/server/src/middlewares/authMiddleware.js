import jwt from 'jsonwebtoken';
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        req.userId = decodedToken.userId;
        next();
      }
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
export { requireAuth };
