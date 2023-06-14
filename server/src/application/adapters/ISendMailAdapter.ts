export interface ISendMailAdapter {
  verifyEmail(request: {
    email: string;
    randomSixDigitCode: number;
  }): Promise<void>;
}
