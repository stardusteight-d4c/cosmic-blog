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
  tagsContainer: `mt-2 flex items-center gap-2 text-sm absolute cursor-default left-4 top-2`,
  favoriteWrapper: `absolute right-4 top-2 mt-1 p-[2px] rounded-sm border-[#F2F2F2]/20 bg-[#1a1a1a]`,
  favoriteContainer: `relative w-8 h-8 group`,
  starIcon: (isFavorited: boolean): string => {
    return `w-8 h-8 cursor-pointer ${
      isFavorited ? 'text-violet-500' : 'text-[#f2f2f295]'
    }`
  },
  dropDownContainer: `absolute shadow-md shadow-black/20 left-1/2 -translate-x-1/2  z-10 hidden group-hover:block text-[#F2F2F2]/90 font-medium mt-4 w-fit bg-black/80 backdrop-blur-md transform text-sm leading-5 p-1 rounded-sm`,
  triangle: `triangle absolute left-1/2 -translate-x-1/2 -top-[10px] bg-black/80`,
}

export const articleBodyStyles = {
  wrapper: (showFooter: boolean): string => {
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

export const articleFooterStyles = {
  wrapper: `border-t flex gap-x-2 items-center justify-center border-[#F2F2F2]/10 py-4 mt-8 text-[#F2F2F2]/60`,
  iconContainer: `flex items-center gap-x-1`,
  icon: `w-4 -mt-[1px]`,
  dividerSpan: `text-2xl mb-1 text-[#F2F2F2]/20`,
}

export const submitCommentStyles = {
  wrapper: `flex items-start w-full`,
  memoji: `w-24 h-24 -ml-6 -mt-4`,
  contentContainer: `relative z-0 w-full`,
  triangleSubmit: `triangle-submit-comment absolute top-[22px] -left-[19px] bg-[#252525] -rotate-90`,
  textarea: `textarea-submit-comment group border border-transparent rounded-sm focus:border-blue-500 transition-all text-[#F2F2F2]/80 w-full h-40 outline-none p-4 bg-[#252525] resize-none`,
  footerContainer: `flex items-center justify-between`,
  handleCountColor: (countCharacters: number) => {
    return {
      'text-[#f2f2f280]': countCharacters <= 300,
      'text-orange-500': countCharacters > 300 && countCharacters <= 500,
      'text-red-600': countCharacters > 500,
      'font-medium': true,
    }
  },
}

export const commentStyles = {
  wrapper: `mt-14 bg-[#252525] block rounded-sm p-4`,
  contentCotainer: `flex flex-col items-start w-full`,
  header: `flex items-center justify-between w-full`,
  authorInfosContainer: `flex items-center`,
  authorImage: `w-16 h-16 -ml-4 -mt-4`,
  authorName: `text-lg font-semibold -mt-3`,
  operationsContainer: `-mt-[10px] flex items-center gap-x-2 text-[#7c7c7c]`,
  handleEdit: (selectedEditComment: boolean) => {
    return {
      'text-blue-500': selectedEditComment,
      'p-[2px] cursor-pointer': true,
    }
  },
  handleDelete: (proceedToDelete: boolean) => {
    return {
      'text-red-500': proceedToDelete === true,
      'p-[2px] cursor-pointer': true,
    }
  },
  textareaEdit: `scrollHiddenCSO scrollHiddenIEF h-auto border-blue-500 border bg-[#1a1a1a] resize-none block p-2 w-full mt-1 rounded-sm outline-none`,
  btnSubmit: `w-fit ml-auto`,
  btnIcon: `mt-[1px]`,
  commentContainer: `block bg-[#1a1a1a] p-2 w-full mt-1 rounded-sm`,
}

export const paginationStyles = {
  wrapper: `flex items-center justify-end mt-4 text-[#7c7c7c]`,
  arrowLeft: `cursor-pointer hover:text-[#b8b8b8] p-1 rotate-180 antialiased`,
  pageCount: `text-2xl mx-1 font-semibold`,
  arrowRight: `cursor-pointer hover:text-[#b8b8b8] p-1`,
}
