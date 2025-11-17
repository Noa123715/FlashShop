const { sendEmail } = require('../utils/sendEmail'); // יש קובץ sendEmail.js בפרויקט
const { config } = require('../config/secret'); // קונפיג/env

exports.receiveContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing fields' });
    }

    const adminEmail = process.env.CONTACT_EMAIL || config.EMAIL_USER || process.env.USER;
    const subject = `Contact form: ${name}`;
    const payload = { name, email, message }; // השתמש בתבנית או במספר שורות HTML

    await sendEmail(adminEmail, subject, payload, '../utils/template/contact.handlebars'); // החלף בתבנית משלך


    res.status(200).json({ ok: true, message: 'Sent' });
  } catch (err) {
    console.error('contact controller error', err);
    res.status(500).json({ ok: false, error: 'Server error' });
  }
};