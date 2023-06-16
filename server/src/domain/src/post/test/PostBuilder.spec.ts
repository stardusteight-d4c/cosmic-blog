import { describe, expect, it } from "vitest";
import { Post, postBuilderFactory } from "..";
import { objectFactory } from "@domain/helpers/objectFactory";
import { err } from "../helpers/errors";

const factory = objectFactory();

describe("PostBuilder", () => {
  it("must be able create an instance of Post", () => {
    const post = factory.getPost();
    expect(postBuilderFactory({ post })).toBeInstanceOf(Post);
  });

  it("must be not able to create a post without a title", () => {
    const post = factory.getPost();
    delete post.title;
    expect(() => postBuilderFactory({ post })).toThrowError(err.titleRequired);
  });

  it("must be not able to create a post without a body", () => {
    const post = factory.getPost();
    delete post.body;
    expect(() => postBuilderFactory({ post })).toThrowError(err.bodyRequired);
  });

  it("must be not able to create a post without a tags", () => {
    const post = factory.getPost();
    delete post.tags;
    expect(() => postBuilderFactory({ post })).toThrowError(err.tagsRequired);
  });

  it("must be not able to create a post without a coverImage", () => {
    const post = factory.getPost();
    delete post.coverImage;
    expect(() => postBuilderFactory({ post })).toThrowError(
      err.coverImageRequired
    );
  });

  it("must be not able to create a post without a author", () => {
    const post = factory.getPost();
    delete post.author;
    expect(() => postBuilderFactory({ post })).toThrowError(err.authorRequired);
  });

  it("must be not able to create a post with a author without id", () => {
    const user = factory.getUser({ userRole: "author" });
    const post = factory.getPost({ author: user });
    expect(() => postBuilderFactory({ post })).toThrowError(
      err.authorIdRequired
    );
  });

  it("must be not able to create a post with a author without username", () => {
    const user = factory.getUser({ userRole: "author" });
    delete user.username;
    const post = factory.getPost({
      author: { ...user, id: "57efe66a-ec3a-4043-9db9-bc40ce5a6a01" },
    });
    expect(() => postBuilderFactory({ post })).toThrowError(
      err.authorUsernameRequired
    );
  });

  it("must be not able to create a post with a author without email", () => {
    const user = factory.getUser({ userRole: "author" });
    delete user.email;
    const post = factory.getPost({
      author: { ...user, id: "57efe66a-ec3a-4043-9db9-bc40ce5a6a01" },
    });
    expect(() => postBuilderFactory({ post })).toThrowError(
      err.authorEmailRequired
    );
  });

  it("must be not able to create a post with a author without avatar", () => {
    const user = factory.getUser({ userRole: "author" });
    delete user.avatar;
    const post = factory.getPost({
      author: { ...user, id: "57efe66a-ec3a-4043-9db9-bc40ce5a6a01" },
    });
    expect(() => postBuilderFactory({ post })).toThrowError(
      err.authorAvatarRequired
    );
  });

  it("must be not able to create a post with a author without author role", () => {
    const user = factory.getUser({ userRole: "reader" });
    const post = factory.getPost({
      author: { ...user, id: "57efe66a-ec3a-4043-9db9-bc40ce5a6a01" },
    });
    expect(() => postBuilderFactory({ post })).toThrowError(
      err.authorRoleRequired
    );
  });
});
