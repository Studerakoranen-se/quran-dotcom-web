import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  try {
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "d238efcd339898",
        pass: "923eb470e90e82",
      },
    });

    const info = await transport.sendMail({
      from: "your_email@example.com",
      to,
      subject,
      text,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error(error);
  }
};
