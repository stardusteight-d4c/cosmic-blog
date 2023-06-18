export const headerStyles = {
  searchWrapper: `px-2 md:px-0`,
  searchInput: `inner-shadow-input mb-4 text-[#f2f2f2] bg-[#252525] outline-none w-full md:max-w-[250px] py-1 px-[10px] rounded-sm border border-transparent focus:border-blue-500 transition-all`,
  handleDropdown: (posts: IPostResponse[]) => {
    return `${
      posts.length > 0 ? "block" : "hidden"
    } absolute -mt-4 bg-[#161616] shadow-black/50 shadow-md text-white w-full md:max-w-[250px]`;
  },
  dropdownItem: `p-1 hover:bg-white/10 cursor-pointer`,
  wrapper: `flex items-center gap-x-2 px-2 md:px-0`,
  handleUploadBtn: (fileUploaded: FileList | null): string => {
    return `${
      fileUploaded
        ? "bg-gradient-to-t from-blue-500 to-violet-500"
        : "bg-[#f2f2f2]/5"
    } active:scale-90 rounded-full text-sm md:text-base transition-all duration-300 font-medium py-2 px-3`;
  },
  uploadedSpan: `whitespace-nowrap flex items-center gap-x-2`,
  fileName: `truncate text-[#F2F2F2]/50 w-full md:max-w-[500px]`,
  titleContainer: `mx-2 md:mx-0`,
  titleInput: `block bg-[#1a1a1a] shadow-inner shadow-black/50 p-2 outline-none placeholder:text-[#F2F2F2]/30 text-xl md:text-2xl mt-4 w-full`,
  tagsContainer: `mx-2 md:mx-0 flex items-center mt-4`,
  tag: `shadow-black/50 whitespace-nowrap shadow-md inline-block rounded-sm border-[#F2F2F2]/20 lowercase bg-[#1a1a1a] p-1 text-xs mr-2`,
  tagInput: `px-2 md:px-0 w-full bg-transparent text-base outline-none placeholder:text-[#F2F2F2]/30`,
};

export const controlsStyles = {
  flexCenter: `flex flex-col md:flex-row items-center`,
  iconStyle: `p-2 text-[#F2F2F2] fill-[#F2F2F2] text-[35px] md:text-[42px] font-bold hover:bg-[#F2F2F2]/10 transition-all duration-300 ease-in-out rounded-sm cursor-pointer`,
};

export const editorStyles = {
  wrapper: `flex md:flex-col w-full h-full rounded-lg mt-4`,
  controlsContainer: `flex flex-col md:flex-row items-center bg-[#F2F2F2]/5 justify-between gap-2 p-2 rounded-sm`,
  textareaContainer: `flex gap-2 w-full h-auto mx-auto rounded-b-lg`,
  textarea: `min-h-[230px] bg-[#1a1a1a] shadow-inner shadow-black/50 p-4 h-full py-4 border-b border-b-[#F2F2F2]/20 outline-none w-full`,
};

export const editModeButtonsStyles = {
  wrapper: `flex items-center justify-end w-fit gap-x-1 ml-auto`,
  cancelBtn: `bg-gray-500/50 rounded-full py-1 px-4 mt-1`,
  deleteBtn: `bg-red-500 rounded-full py-1 px-4 mt-1`,
  updateBtn: `ml-auto mr-2 md:mr-0`,
};
