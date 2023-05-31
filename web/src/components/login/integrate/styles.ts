export const chooseAvatarFormStyles = {
  title: `text-3xl md:text-4xl text-center font-bold mb-8`,
  avatarWrapper: `w-full flex items-center justify-center h-32 relative`,
  avatarContainer: `w-32 h-32 rounded-full relative cursor-pointer flex items-center justify-center`,
  placeholderAvatarImage: `inner-shadow w-32 bg-[#1A1A1A] transition-all duration-500 hover:scale-110 ease-in-out active:scale-95 absolute z-[100] rounded-full object-cover`,
  selectedAvatarContainer: `absolute inset-0 flex items-center justify-center`,
  avatarImage: `pendulum overflow-visible absolute pointer-events-none w-64 z-[100] mx-auto`,
  boxAnimate: `box-animate w-32 h-32 absolute z-10 bg-gradient-to-t from-blue-500 to-violet-500 rounded-full mx-auto"`,
  backgroundOverlay: `inner-shadow w-[120px] h-[120px] pointer-events-none absolute z-50 bg-[#1a1a1a] rounded-full mx-auto`,
  buttonsContainer: `mx-auto w-fit flex items-center justify-center gap-x-5`,
  backStepBtn: `flex mt-8 items-center justify-center gap-x-2 w-[115px] active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 bg-[#f2f2f2]/5`,
  createBtn: `flex disabled:brightness-75 disabled:cursor-not-allowed mt-8 items-center justify-center gap-x-2 w-[115px] active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 bg-blue-500`,
}
