export const commentErrors = {
  postRequired: "post is required",
  ownerRequired: "owner is required",
  contentRequired: "content is required",
  postedAtRequired: "postedAt is required",
  postSlugRequired: "slug in post metadata is required",
  postTitleRequired: "title in post metadata is required",
  postIdRequired: "id in post metadata is required",
  ownerIdRequired: "id in owner metadata is required",
  ownerUsernameRequired: "username in owner metadata is required",
  ownerAvatarRequired: "avatar in owner metadata is required",
  charactersLimitExceed: "the comment exceeds the 500 character limit",
  commentNotFoundWithId: (id: string) => `no comment found with id: ${id}`,
};
