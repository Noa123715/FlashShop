const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

exports.sendEmail = async (email, subject, payload, template) => {
  try {
    console.log("inside send email");
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    console.log(email)
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    console.log(source)
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.USER,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send mail 
    console.log("came to send mail")
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }

};

