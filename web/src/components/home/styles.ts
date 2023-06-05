export const baseLayoutSlotStyles = {
  wrapper: `bg-[#1a1a1a] text-[#F2F2F2] w-screen`,
  mainContent: `max-w-[725px] mx-auto mt-14 px-2 lg:py-4 lg:px-0`,
}

export const headerStyles = {
  wrapper: `relative overflow-visible`,
  backgroud: `h-[200px] object-cover md:h-auto w-full pointer-events-none select-none`,
  contentWrapper: `max-w-[725px] mx-auto absolute inset-0 px-2 lg:py-4 lg:px-0`,
  techsContainer: `absolute right-1/2 translate-x-1/2 md:-translate-x-0 md:right-0 top-[60px] md:top-1/2 md:-translate-y-1/2 flex items-center gap-x-3`,
}
// class='mt16'
export const bioStyles = {
  authorName: `font-bold text-center md:text-start mt-[70px] md:mt-0 text-[32px] md:text-[40px]`,
  wrapper: `flex items-center justify-center md:justify-start md:items-start gap-x-2 mt-4 w-full pb-[45px]`,
  bioWrapper: `bg-[#252525] shadow-md shadow-black/20 text-[#F2F2F2]/90 max-w-[550px] rounded-sm p-4`,
  bioContainer: `flex items-start gap-x-2`,
  starIcon: `hidden md:block w-5 mt-[2px]`,
  paragraph: `!leading-6`,
  QRcode: {
    wrapper: `hidden md:flex flex-col shadow-md shadow-black/20 justify-center items-center m-auto text-[#F2F2F2]/60`,
    container: `active:scale-95`,
    image: `w-[100px] cursor-pointer transition-all duration-500`,
  },
}

export const postGalleryStyles = {
  wrapper: `grid grid-cols-1 smm:grid-cols-2 gap-4 mt-4`,
}

export const footerStyles = {
  wrapper: `p-8 mt-28 border-t border-t-[#F2F2F2]/20 text-[#F2F2F2]/60 flex flex-col items-center text-center justify-center`,
  author: `flex justify-center hover:underline`,
  rights: `flex items-center text-xs justify-center gap-x-1 text-[#F2F2F2]/30`,
  brazilIcon: `w-6 mx-auto opacity-80 mt-1 cursor-pointer`
}
