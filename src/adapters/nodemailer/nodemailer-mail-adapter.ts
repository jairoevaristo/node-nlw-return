import { MailAdapter, SendMailData } from "../mail-adapter";
import { transport } from "../../libs/nodemailer";

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Jairo Gomes <jairoevaristodev@gmail.com>",
      subject,
      html: body
    })
  }
}