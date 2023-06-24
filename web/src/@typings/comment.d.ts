interface ICommentResponse {
  id: string;
  post: {
    id: string;
    title: string;
    slug: string;
  };
  owner: {
    id: string;
    email: string;
    username: string;
    avatar: string;
    userRole: TUserRole;
  };
  content: string;
  postedAt: Date;
}

interface IComment {
  id?: string;
  post: {
    id: string;
    title: string;
    slug: string;
  };
  owner: {
    id: string;
    username: string;
    avatar: any;
  };
  content: string;
  postedAt: Date;
}
