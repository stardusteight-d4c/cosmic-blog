export const techItemStyles = {
  wrapper: `relative group`,
  handleImage: (isEven: boolean): string => {
    const defaultStyle = `w-[100px] rounded-sm select-none cursor-pointer shadow-md shadow-black/20 transition-all ease-in-out duration-300 hover:scale-110`
    const animate = isEven ? 'animate-tech-from-up' : 'animate-tech-from-down'
    return `${animate} ${defaultStyle}`
  },
  dropDown: `absolute z-10 hidden group-hover:block text-[#F2F2F2]/90 font-medium -left-[125px] mt-4 w-[350px] bg-black/80 backdrop-blur-md transform text-sm leading-5 p-2 rounded-sm`,
  triangle: `triangle absolute left-1/2 -translate-x-1/2 -top-[10px] bg-black/80`,
}

export const memojiStyles = {
  wrapper: `w-[155px] h-[155px]`,
  image: `animated-bounce w-[155px] absolute -bottom-16 -left-6 cursor-pointer select-none`,
}
