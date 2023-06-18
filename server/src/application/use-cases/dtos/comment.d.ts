type IGetCommentWithPaginationRequest = {
  by: "userId" | "postId";
  value: string;
  skip: number;
  pageSize: number;
};

type IGetCommentAmountRequest = { of: "post" | "user"; id: string };

type ICommentPaginationByParams = {
  value: string;
  skip: number;
  pageSize: number;
};
