export const baseLayoutSlotStyles = {
  overlay: `inset-0 bg-black/40 z-[950] fixed`,
  wrapper: `bg-[#1a1a1a]/50 transform backdrop-blur-sm text-[#F2F2F2] w-[450px] border border-[#F2F2F220] shadow-lg shadow-black/70 fixed left-1/2 z-[1000] p-8 rounded-md top-1/2 -translate-y-1/2 -translate-x-1/2`,
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
