import { describe, expect, it } from "vitest";
import { objectFactory } from "@domain/helpers/objectFactory";
import { commentBuilderFactory, commentErrors } from "../helpers";
import { Comment } from "../Comment";

const factory = objectFactory();

describe("CommentBuilder", () => {
  it("must be able create an instance of Comment", () => {
    const comment = factory.getComment();
    expect(commentBuilderFactory(comment)).toBeInstanceOf(Comment);
  });

  it("must be not able to create a Comment without PostMetadata id", () => {
    const comment = factory.getComment();
    delete comment.post.id;
    expect(() => commentBuilderFactory(comment)).toThrowError(
      commentErrors.postIdRequired
    );
  });

  it("must be not able to create a Comment without PostMetadata title", () => {
    const comment = factory.getComment();
    delete comment.post.title;
    expect(() => commentBuilderFactory(comment)).toThrowError(
      commentErrors.postTitleRequired
    );
  });

  it("must be not able to create a Comment without PostMetadata slug", () => {
    const comment = factory.getComment();
    delete comment.post.slug;
    expect(() => commentBuilderFactory(comment)).toThrowError(
      commentErrors.postSlugRequired
    );
  });

  it("must be not able to create a Comment without OwnerMetadata id", () => {
    const comment = factory.getComment();
    delete comment.owner.id;
    expect(() => commentBuilderFactory(comment)).toThrowError(
      commentErrors.ownerIdRequired
    );
  });

  it("must be not able to create a Comment without OwnerMetadata username", () => {
    const comment = factory.getComment();
    delete comment.owner.username;
    expect(() => commentBuilderFactory(comment)).toThrowError(
      commentErrors.ownerUsernameRequired
    );
  });

  it("must be not able to create a Comment without OwnerMetadata avatar", () => {
    const comment = factory.getComment();
    delete comment.owner.avatar;
    expect(() => commentBuilderFactory(comment)).toThrowError(
      commentErrors.ownerAvatarRequired
    );
  });

  it("must be not able to create a Comment without content", () => {
    const comment = factory.getComment();
    delete comment.content;
    expect(() => commentBuilderFactory(comment)).toThrowError(
      commentErrors.contentRequired
    );
  });

  it("must be not able content exceed 500 characters", () => {
    let longString = "";
    const characterLimit = 500;
    while (longString.length < characterLimit) {
      longString += "Lorem ipsum dolor sit amet, ";
    }
    const comment = factory.getComment({ content: longString });
    expect(() => commentBuilderFactory(comment)).toThrowError(
      commentErrors.charactersLimitExceed
    );
  });
});
