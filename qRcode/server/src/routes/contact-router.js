import express from 'express';
import contactRateLimiter from '../middlewares/rateLimiter.js';
import contactForm from "../controllers/contact-controller.js";
import {getAllContacts} from "../controllers/contact-controller.js"
const router = express.Router();

router.post('/contact', contactRateLimiter, contactForm);
// router.get('/contact', (req, res) => {
//     res.status(200).send("hey there from contact");
//   });
router.get('/contact', getAllContacts);

export default router;