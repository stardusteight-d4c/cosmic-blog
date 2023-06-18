interface IArticleData {
  postId?: string;
  tags: Array<string>;
  coverImage: string;
  title: string;
  date: Date;
  body: string;
}

interface IHeadArticleData {
  tags: Array<string>;
  coverImage: string;
  title: string;
  date: Date;
}
