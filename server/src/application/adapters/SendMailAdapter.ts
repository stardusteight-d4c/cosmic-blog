import { IPluginSendMail, ISendMailAdapter } from "./@interfaces";

export class SendMailAdapter implements ISendMailAdapter {
  #pluginSendEmail: IPluginSendMail;

  constructor(pluginSendEmail: IPluginSendMail) {
    this.#pluginSendEmail = pluginSendEmail;
  }

  async verifyEmail(request: {
    email: string;
    randomSixDigitCode: number;
  }): Promise<void> {
    const { email, randomSixDigitCode } = request;
    await this.#pluginSendEmail.sendMail({
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
