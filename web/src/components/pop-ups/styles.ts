import type { IAvatars } from '@/utils'

export const baseLayoutSlotStyles = {
  overlay: `inset-0 bg-black/40 z-[950] fixed`,
  wrapper: `bg-[#1a1a1a]/50 transform backdrop-blur-sm text-[#F2F2F2] w-full max-w-[360px] md:max-w-[450px] border border-[#F2F2F220] shadow-lg shadow-black/70 fixed left-1/2 z-[1000] p-8 rounded-md top-1/2 -translate-y-1/2 -translate-x-1/2`,
  container: `flex flex-col items-center justify-center`,
  operations: `flex items-center mx-auto mt-4 gap-x-2 w-fit`,
}

export const deletePopUpStyles = {
  XCircleIcon: `text-red-500`,
  title: `text-3xl font-semibold`,
  span: `text-center inline-block w-[250px] text-sm text-[#F2F2F2]/70 mt-2`,
  BtnDelete: `popup-button bg-red-500`,
  btnCancel: `popup-button bg-[#252525]`,
}

export const savePopUpStyles = {
  floppyDiskIcon: `text-blue-500`,
  title: `text-3xl font-semibold`,
  span: `text-center inline-block w-[250px] text-sm text-[#F2F2F2]/70 mt-2`,
  BtnSave: `popup-button bg-blue-500`,
  btnCancel: `popup-button bg-[#252525]`,
}

export const importSavePopUpStyles = {
  downloadIcon: `text-blue-500`,
  title: `text-3xl font-semibold`,
  span: `text-center inline-block w-[250px] text-sm text-[#F2F2F2]/70 mt-2`,
  BtnSave: `popup-button bg-blue-500`,
  btnCancel: `popup-button bg-[#252525]`,
}

export const editProfileSocialPopUpStyles = {
  smileyIcon: `text-blue-500`,
  title: `text-3xl font-semibold`,
  span: `text-center inline-block w-[250px] text-sm text-[#F2F2F2]/70 mt-2`,
  inputContainer: `flex items-center gap-x-2 mt-4`,
  networkListWrapper: `bg-[#1A1A1A] relative w-[34px] p-1 rounded-md cursor-pointer border border-[#F2F2F220]`,
  networkListDropDown: `absolute -right-[1.8px] mt-2 bg-[#1A1A1A] w-[34px] overflow-hidden rounded-md border border-[#F2F2F220] shadow-md shadow-black/70`,
  optionsContainer: `max-h-[100px] scrollbar-hide overflow-y-scroll`,
  optionItem: `flex items-center p-1 gap-x-1 transition-all hover:bg-black/50 cursor-pointer`,
  input: `py-1 px-2 outline-none rounded-md bg-[#1A1A1A] border border-[#F2F2F220]`,
  saveBtn: `popup-button bg-blue-500`,
  cancelBtn: `popup-button bg-[#252525]`,
}

export const chooseAvatarPopUpStyles = {
  userCirclePlusIcon: `text-blue-500`,
  title: `text-2xl md:text-3xl font-semibold`,
  span: `text-center inline-block w-full max-w-[250px] text-xs md:text-sm text-[#F2F2F2]/70 mt-2`,
  avatarSelectionContainer: `grid grid-cols-3 my-8 px-2 gap-x-4 relative w-fit h-fit`,
  arrowLeft: `absolute -left-5 md:-left-10 top-1/2 -translate-y-1/2 text-[#F2F2F2]/80 cursor-pointer -rotate-180`,
  arrowRight: `absolute -right-5 md:-right-10 top-1/2 -translate-y-1/2 text-[#F2F2F2]/80 cursor-pointer`,
  handleAvatarsImage: (
    slicedAvatars: IAvatars[],
    selectedAvatar: string | null,
    index: number
  ) => {
    return {
      'scale-110 !bg-[#F2F2F2]/20': selectedAvatar === slicedAvatars[index].id,
      'w-36 md:w-24 p-2 col-span-1 cursor-pointer transition-all ease-in-out duration-300 hover:bg-[#F2F2F2]/5 rounded-md':
        true,
    }
  },
  salectBtn: `popup-button bg-blue-500`,
  cancelBtn: `popup-button bg-[#252525]`,
}
