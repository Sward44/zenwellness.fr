"server only";
import nodemailer from "nodemailer";

class Email {
  constructor() {
    this.prodTransporter = nodemailer.createTransport({
      host: "mail.zenwellness.fr",
      port: 465,
      auth: {
        user: "contact@zenwellness.fr",
        pass: "kzq_{T7QN(#&H8F;Z9gX5:",
      },
    });
    this.devTransporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f6473c6bce4408",
        pass: "f8cf1756e55fb5",
      },
    });
  }

  async getTemplate(templateName, options, prod = false) {
    try {
      const template = pug.renderFile(
        path.join(
          process.cwd(),
          `src/email/devis/template/${templateName}.pug`,
        ),
        options.metadata,
      );
      let data;
      if (prod) {
        data = await this.prodTransporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: options.to,
          subject: options.subject,
          html: template,
        });
      } else {
        data = await this.devTransporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: options.to,
          subject: options.subject,
          html: template,
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}

const newEmail = new Email();

export default newEmail;
