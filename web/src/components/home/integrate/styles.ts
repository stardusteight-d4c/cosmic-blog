export const techItemStyles = {
  wrapper: `relative group`,
  handleImage: (isEven: boolean): string => {
    const defaultStyle = `min-w-[70px] md:min-w-[100px] rounded-sm select-none cursor-pointer shadow-md shadow-black/20 transition-all ease-in-out duration-300 hover:scale-110`;
    const animate = isEven ? "animate-tech-from-up" : "animate-tech-from-down";
    return `${animate} ${defaultStyle}`;
  },
  dropDown: `absolute z-10 hidden  md:group-hover:block text-[#F2F2F2]/90 font-medium -left-[125px] mt-4 w-[350px] bg-black/80 backdrop-blur-md transform text-sm leading-5 p-2 rounded-sm`,
  triangle: `triangle absolute left-1/2 -translate-x-1/2 -top-[10px] bg-black/80`,
};

export const memojiStyles = {
  wrapper: `w-[155px] h-[155px] absolute -bottom-[77.5px] left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0`,
  image: `animated-bounce w-[155px] absolute top-[5px] md:top-0 md:-left-6 cursor-pointer select-none`,
};

export const postHeaderStyles = {
  wrapper: `w-full mt-8 flex justify-between border-b text-[#F2F2F2]/80 border-b-[#F2F2F2]/20`,
  squaresFourContainer: `hidden md:flex items-center justify-center rounded-sm cursor-pointer hover:bg-[#252525] gap-x-1 px-1 border-b-[2px] border-[#F2F2F2] w-fit`,
  gallerySpan: `mt-[1px]`,
};

export const searchBarStyles = {
  wrapper: `flex items-center h-fit w-full md:w-auto`,
  searchIconContainer: `animated-left bg-[#252525] flex items-center rounded-sm cursor-pointer p-[5px] w-fit`,
  searchContainer: `flex w-full md:w-auto items-center`,
  input: `search-bar-animated-left inner-shadow-input text-[#f2f2f2] bg-[#252525] outline-none w-full md:max-w-[250px] py-1 px-[10px] rounded-sm border border-transparent focus:border-blue-500 transition-all`,
  fadersContainer: `flex items-center bg-[#252525] transition-all justify-center rounded-sm cursor-pointer p-[5px] w-fit`,
};

export const paginationStyles = {
  wrapper: `flex items-center justify-end mt-4 text-[#7c7c7c]`,
  span: `block text-center md:font-medium md:text-xl mt-8 text-[#f2f2f2]/70`,
  arrowLeft: `cursor-pointer hover:text-[#b8b8b8] p-1 rotate-180 antialiased`,
  pageCount: `text-2xl mx-1 font-semibold`,
  arrowRight: `cursor-pointer hover:text-[#b8b8b8] p-1`,
};
