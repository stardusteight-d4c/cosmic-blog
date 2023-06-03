export const headerStyles = {
  wrapper: `w-full mt-8 flex items-center justify-center h-48 relative`,
  boxAnimate: `box-animate w-40 h-40 absolute z-10 bg-gradient-to-t from-blue-500 to-violet-500 rounded-full mx-auto`,
  backgroundOverlay: `inner-shadow w-[150px] h-[150px] pointer-events-none absolute z-50 bg-[#1a1a1a] rounded-full mx-auto`,
  avatarImageWrapper: `absolute w-40 h-40 md:w-48 md:h-48`,
  avatarImage: `animated-bounce absolute top-0 cursor-pointer w-40 md:w-48 z-[100] mx-auto`,
  editIcon: `inner-shadow hover:scale-105 transition-all cursor-pointer absolute bg-[#1a1a1a] text-[#f2f2f2] p-2 rounded-full top-0 md:top-5 right-2 md:right-4 z-[200]`,
  username: `capitalize font-semibold mx-auto w-fit text-3xl mt-2`,
}
// class='w4'
export const socialLinksStyles = {
  wrapper: `flex flex-col items-center justify-center`,
  linksWrapper: `flex items-center justify-center flex-wrap gap-x-4 w-[300px] mt-4`,
  link: `flex transition-all duration-300 ease-in-out items-center gap-x-1 text-[#F2F2F2]/70 w-fit font-medium border-b border-b-transparent hover:border-b-[#F2F2F2]/70`,
}

export const starredPostsStyles = {
  columnSpanWrapper: `col-span-1`,
  headerContainer: `flex cursor-default items-center justify-between border-b border-b-[#F2F2F2]/20`,
  title: `text-xl text-[#f2f2f2]/70 font-medium`,
  starredPostsWrapper: `flex flex-col items-center gap-y-4 mt-4`,
}

export const commentedPostsStyles = {
  columnSpanWrapper: `col-span-1`,
  headerContainer: `flex cursor-default items-center justify-between border-b border-b-[#F2F2F2]/20`,
  title: `text-xl text-[#f2f2f2]/70 font-medium`,
  commentedPostsWrapper: `flex flex-col items-center gap-y-4 mt-4`,
}

export const postCommentStyles = {
  wrapper: `bg-[#252525] p-2 w-full rounded-sm hover:scale-[1.02] transition-all duration-100 ease-linear hover:shadow-md hover:shadow-black/20 cursor-pointer`,
  dateSpan: `text-xs block text-[#F2F2F2]/60 -mt-[1px] mb-2`,
  postTitle: `leading-5 line-clamp-2 font-medium`,
  authorInfos: `text-base my-2 font-medium text-[#F2F2F2]/60 flex items-center gap-x-1 border-b border-b-[#F2F2F2]/20`,
  commentParagraph: `line-clamp-5 text-sm text-[#F2F2F2]/60`,
}
