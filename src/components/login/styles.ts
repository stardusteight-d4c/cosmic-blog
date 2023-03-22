export const baseLayoutSlotStyles = {
  wrapper: `bg-[#1a1a1a] text-[#F2F2F2] h-full max-h-screen w-screen overflow-hidden`,
  container: `max-w-[725px] relative min-h-screen w-full mx-auto`,
}

export const signInStyles = {
  wrapper: `w-full absolute top-1/2 -translate-y-1/2 h-fit mx-auto px-28 rounded-sm`,
  headerContainer: `text-center mb-8`,
  title: `text-4xl font-bold`,
  dontHaveAccountSpan: `text-center inline-block text-lg text-[#F2F2F2]/70 mt-2`,
  signUpSpan: `text-blue-500 hover:underline cursor-pointer`,
  flexCenterGapX4: `flex items-center gap-x-4`,
  formControl: `form-control`,
  submitBtn: `form-login-button w-fit text-xl mx-auto mt-8 font-semibold`,
}

export const signUpStyles = {
  wrapper: `w-full absolute top-1/2 -translate-y-1/2 h-fit mx-auto px-28 rounded-sm`,
  headerContainer: `text-center mb-8`,
  title: `text-4xl font-bold`,
  alreadyHaveAnAccountSpan: `text-center inline-block text-lg text-[#F2F2F2]/70 mt-2`,
  signInSpan: `text-blue-500 hover:underline cursor-pointer`,
  flexCenterGapX4: `flex items-center gap-x-4`,
  formControl: `form-control`,
  nextBtn: `form-login-button w-fit text-xl mx-auto mt-8 font-semibold`,
}
