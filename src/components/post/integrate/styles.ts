export const optionsStyles = {
  wrapper: `flex z-[1000] flex-col items-end justify-end gap-y-4 w-fit h-fit fixed bottom-4 right-4`,
}

export const opacityStyles = {
  wrapper: `flex items-center gap-x-2 group`,
  span: `options-animate-span font-medium bg-black/90 rounded-full px-4 py-2 hidden group-hover:block text-[#F2F2F2]/70`,
  lightbulbIconContainer: `bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center`,
}

export const alignStyles = {
  wrapper: `flex items-center gap-x-2 group`,
  span: `options-animate-span font-medium bg-black/90 rounded-full px-4 py-2 hidden group-hover:block text-[#F2F2F2]/70`,
  alignIconContainer: `bg-[#252525] text-[#F2F2F280] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center`,
}

export const scaleStyles = {
  wrapper: `flex items-center gap-x-2 group`,
  span: `options-animate-span font-medium bg-black/90 rounded-full px-4 py-2 hidden group-hover:block text-[#F2F2F2]/70`,
  scaleIconContainer: `bg-[#252525] text-[#F2F2F280] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center`,
}

export const progressBarStyles = {
  wrapper: `flex items-center gap-x-2 group`,
  span: `options-animate-span font-medium bg-black/90 rounded-full px-4 py-2 hidden group-hover:block text-[#F2F2F2]/70`,
  donutChartContainer: `bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] h-[50px] relative flex items-center justify-center`,
}

export const backToTopStyles = {
  wrapper: `flex items-center gap-x-2 group`,
  span: `options-animate-span font-medium bg-black/90 rounded-full px-4 py-2 hidden group-hover:block text-[#F2F2F2]/70`,
  topIconContainer: `bg-[#252525] cursor-pointer shadow-md shadow-black/20 z-50 rounded-sm w-[50px] text-[#F2F2F280] h-[50px] relative flex items-center justify-center`,
}

export const articleHeaderStyles = {
  wrapper: `relative`,
  cover: `w-full h-[325px] rounded-t-sm object-cover`,
  tagsContainer: `mt-2 text-sm absolute cursor-default left-4 top-2`,
  favoriteWrapper: `absolute right-4 top-2 mt-1 p-[2px] rounded-sm border-[#F2F2F2]/20 bg-[#1a1a1a]`,
  favoriteContainer: `relative w-8 h-8 group`,
  starIcon: `w-8 h-8 cursor-pointer text-[#f2f2f295]`,
  dropDownContainer: `absolute shadow-md shadow-black/20 left-1/2 -translate-x-1/2  z-10 hidden group-hover:block text-[#F2F2F2]/90 font-medium mt-4 w-fit bg-black/80 backdrop-blur-md transform text-sm leading-5 p-1 rounded-sm`,
  triangle: `triangle absolute left-1/2 -translate-x-1/2 -top-[10px] bg-black/80`,
}

export const articleBodyStyles = {
  wrapper: (showFooter: boolean) => {
    return `${
      !showFooter && 'pb-8'
    } bg-[#252525] relative rounded-b-sm overflow-hidden mb-28 pt-4 z-50 shadow-sm shadow-black/10 duration-300 cursor-default transition-all`
  },
  articleContentContainer: `px-4`,
  date: `my-2 font-medium text-base text-[#F2F2F2]/60 flex items-center justify-center gap-x-1`,
  title: `text-4xl bg-gradient-to-t from-blue-500 to-violet-500 bg-clip-text text-transparent font-bold text-center`,
  divider: `border-b border-[#F2F2F2]/20 w-[50%] mx-auto my-8 h-0`,
  articleContent: `articleBody text-[#F2F2F280] break-words text-lg font-medium`,
}
