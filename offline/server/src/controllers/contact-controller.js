import Contact from "../models/contact-model.js"

const contactForm = async (req, res) => {
    try{
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({message: "message send successfully"});
      }catch(error){
        return res.status(500).json({message: "message not delivered"});
      }
    };

    export const getAllContacts = async (req, res) => {
      try {
        const contacts = await Contact.find(); // Replace with your database query
        res.status(200).json(contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ message: 'Failed to fetch contacts.' });
      }
    };

export default contactForm;