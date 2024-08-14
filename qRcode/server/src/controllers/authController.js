import User from '../models/User.js';
import { hashPassword } from '../utils/authUtils.js';
const signup = async (req, res) => {
  const { first_name, last_name, email, phone_number, address, ipAddress, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ 
      first_name, 
      last_name, 
      email, 
      address, 
      ipAddress, 
      phone_number, 
      password: hashedPassword 
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 24 * 60 * 60 * 1000;
const formatTimeRemaining = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const displayHours = hours % 24;
  const displayMinutes = minutes % 60;
  const displaySeconds = seconds % 60;
  return `${displayHours}h ${displayMinutes}m ${displaySeconds}s`;
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid login credentials" });
    }
    if (user.loginLockout && user.lastLoginAttempt) {
      const timeSinceLastAttempt = Date.now() - user.lastLoginAttempt;
      if (timeSinceLastAttempt < 24 * 60 * 60 * 1000) {
        const lockTimeRemaining = 24 * 60 * 60 * 1000 - timeSinceLastAttempt; 
        return res.status(403).json({
          message: `Account is locked out. You can try again after ${formatTimeRemaining(lockTimeRemaining)}`
        });
      }
    }
    if (user.loginLockout && user.lastLoginAttempt && Date.now() - user.lastLoginAttempt >= 24 * 60 * 60 * 1000) {
      user.loginLockout = false;
      user.loginAttempts = 0;
    }
    user.lastLoginAttempt = Date.now();
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.loginLockout = true; 
        await user.save();
        return res.status(403).json({
          message: 'Account locked due to multiple failed login attempts. You can try again after 24 hours.'
        });
      }
      await user.save();
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    user.loginAttempts = 0;
    user.loginLockout = false; 
    user.lockUntil = undefined;
    await user.save();
    const token = await user.generateToken();
    res.status(200).json({
      msg: "Login successful",
      token,
      userId: user._id.toString(),
      isSubscribed: user.subscribe,
      isAdmin: user.isAdmin
    });
  } catch (error) {
    res.status(50).json({ message: "Internal server error" });
  }
};
export { signup, login };
