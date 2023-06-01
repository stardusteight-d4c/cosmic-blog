import { IPluginSendMail } from "../adapters/@interfaces";

export class MyPluginSendMail implements IPluginSendMail {
  async sendMail(data: {
    subject: string;
    from: string;
    to: string;
    text: string;
    html: string;
  }): Promise<void> {
    console.log(`Email sent to: ${data.to}`);
  }
}
