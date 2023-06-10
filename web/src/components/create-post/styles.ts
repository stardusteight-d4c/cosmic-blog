export const baseLayoutSlotStyles = {
  wrapper: `bg-[#1a1a1a] min-h-screen w-screen`,
  container: `max-w-[725px] h-full w-full mx-auto mb-8`,
}

export const richTextEditorStyles = {
  wrapper: `text-[#F2F2F2] bg-[#252525] h-auto w-full overflow-hidden rounded-sm py-4 md:p-4`,
  button: `ml-auto mr-2 md:mr-0`
}

export const previewPostStyles = {
  wrapper: `w-full h-fit relative text-[#F2F2F2]`,
  backToEditorBtn: `flex mb-6 items-center gap-x-2 active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 px-3 bg-[#f2f2f2]/5`,
  title: `text-3xl font-semibold absolute left-1/2 -translate-x-1/2 top-1 text-[#F2F2F2]/80`,
}
