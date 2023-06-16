import { describe, expect, it } from "vitest";
import { objectFactory } from "@domain/helpers/objectFactory";
import { Comment } from "../Comment";

const factory = objectFactory();

describe("Comment", () => {
  it("must be not able to access the attributes directly", async () => {
    const comment = factory.getComment();
    const commentInstance = new Comment(comment);
    // @ts-ignore
    expect(commentInstance.post).toBeUndefined();
    // @ts-ignore
    expect(commentInstance.owner).toBeUndefined();
    // @ts-ignore
    expect(commentInstance.content).toBeUndefined();
    // @ts-ignore
    expect(commentInstance.postedAt).toBeUndefined();
  });

  it("must be not able to modify the attributes directly", async () => {
    const comment = factory.getComment();
    const commentInstance = new Comment(comment);
    // @ts-ignore
    commentInstance.content = "Post Malone";
    expect(commentInstance.reflect.content).toStrictEqual(comment.content);
  });

  it("must be able to access the attributes via the <reflect> object", async () => {
    const comment = factory.getComment();
    const commentInstance = new Comment(comment);
    expect(commentInstance.reflect.owner).toStrictEqual(comment.owner);
    expect(commentInstance.reflect.content).toStrictEqual(comment.content);
    expect(commentInstance.reflect.postedAt).toStrictEqual(comment.postedAt);
  });
});
