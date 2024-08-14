import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
const comparePasswords = async (inputPassword, hashedPassword) => {
  return bcrypt.compare(inputPassword, hashedPassword);
};
export { generateAuthToken, hashPassword, comparePasswords };
export const isTokenExpired = () => {
  const token = sessionStorage.getItem('authToken');
  if (!token) return true;
  const payload = JSON.parse(atob(token.split('.')[1]));
  const expiry = payload.exp * 1000;
  return Date.now() > expiry;
};
