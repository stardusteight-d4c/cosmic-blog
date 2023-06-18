interface IPublishPostRequest {
  title: string;
  body: string;
  tags: string[];
  coverImage: string;
  postedAt: Date;
  author: {
    id: string;
    email: string;
    username: string;
    avatar: string;
    userRole: TUserRole;
  };
}

interface IPostResponse {
  [x: string]: any;
  id?: string;
  title: string;
  slug?: string;
  body: string;
  tags: string[];
  coverImage: string;
  postedAt: Date;
  lastChange?: Date;
  author: IUserObject;
  isAuthor?: boolean;
  isGuest?: boolean;
  isFavorited?: boolean;
}
