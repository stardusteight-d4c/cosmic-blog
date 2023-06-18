type IGetPostResponse = {
  id?: string;
  title: string;
  body: string;
  tags: string[];
  coverImage: string;
  postedAt: Date;
  lastChange?: Date;
  author: {
    id?: string;
    email?: string;
    username?: string;
    avatar?: string;
    userRole?: "reader" | "author";
  };
  isAuthor?: boolean;
  isGuest?: boolean;
  isFavorited?: boolean;
  favoriteAmount: number;
  commentAmount: number;
};
