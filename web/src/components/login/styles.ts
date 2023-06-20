export const baseLayoutSlotStyles = {
  wrapper: `bg-[#1a1a1a] text-[#F2F2F2] h-full max-h-screen w-screen overflow-hidden`,
  container: `max-w-[725px] relative min-h-screen w-full mx-auto`,
};

export const signInStyles = {
  wrapper: `w-full absolute top-1/2 -translate-y-1/2 h-fit mx-auto px-4 sm:px-12 md:px-28 rounded-sm`,
  headerContainer: `text-center mb-8 mt-7 ssm:-mt-[2px] sm:mt-0`,
  title: `text-4xl font-bold`,
  dontHaveAccountSpan: `text-center inline-block text-base sm:text-lg text-[#F2F2F2]/70 mt-2`,
  signUpSpan: `text-blue-500 hover:underline cursor-pointer`,
  flexCenterGapX4: `flex flex-col sm:flex-row items-center gap-x-4`,
  formControl: `form-control`,
  submitBtn: `form-login-button disabled:brightness-75 disabled:cursor-not-allowed w-fit text-xl mx-auto mt-8 font-semibold`,
};

export const signUpStyles = {
  wrapper: `w-full absolute top-1/2 -translate-y-1/2 h-fit mx-auto px-4 sm:px-12 md:px-28 rounded-sm`,
  headerContainer: `text-center mb-8 mt-28 ssm:mt-20 sm:mt-0`,
  title: `text-4xl font-bold`,
  alreadyHaveAnAccountSpan: `text-center inline-block text-base sm:text-lg text-[#F2F2F2]/70 mt-2`,
  signInSpan: `text-blue-500 hover:underline cursor-pointer`,
  flexCenterGapX4: `flex flex-col sm:flex-row items-center gap-x-4`,
  formControl: `form-control`,
  nextBtn: `form-login-button disabled:brightness-75 disabled:cursor-not-allowed w-fit text-xl mx-auto mt-8 font-semibold`,
};

export const confirmEmailStyles = {
  title: `text-3xl md:text-4xl text-center font-bold mb-14`,
  inputsContainer: `flex flex-col items-center justify-center md:flex-row gap-8`,
  inputContainer: `flex items-center justify-center gap-8 w-full`,
  confirmBtn: `form-login-button w-fit text-xl mx-auto mt-8 font-semibold`,
};
