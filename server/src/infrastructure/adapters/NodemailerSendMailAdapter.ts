import { ISendMailAdapter } from "@app/adapters/ISendMailAdapter";
import { transporter } from "@infra/lib/nodemailer";

export class NodemailerSendMailAdapter implements ISendMailAdapter {
  constructor() {}

  async verifyEmail(request: {
    email: string;
    randomSixDigitCode: number;
  }): Promise<void> {
    const { email, randomSixDigitCode } = request;
    await transporter.sendMail({
      subject: "Confirmation Code",
      from: '"Cosmic Blog" <stardusteight.d4cc@gmail.com>',
      to: email,
      text: `Confirmation Code - Here is your confirmation code`,
      html: `
      <div>
      <h2>Confirmation Code</h2>
      <p>Here is your confirmation code:</p>
      <span>${randomSixDigitCode}</span>
      </div>`,
    });
  }
}
