import rateLimit from 'express-rate-limit';

const contactRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: 'Too many messages from this IP, please try again later.',
    keyGenerator: (req) => req.ip
});

export default contactRateLimiter;
