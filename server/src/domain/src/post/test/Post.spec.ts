import { describe, expect, it } from "vitest";
import { objectFactory } from "@domain/helpers/objectFactory";
import { Post } from "../Post";

const factory = objectFactory();

describe("Post", () => {
  it("must be not able to access the attributes directly", async () => {
    const post = factory.getPost();
    const postInstance = new Post(post);
    // @ts-ignore
    expect(postInstance.title).toBeUndefined();
    // @ts-ignore
    expect(postInstance.slug).toBeUndefined();
    // @ts-ignore
    expect(postInstance.body).toBeUndefined();
    // @ts-ignore
    expect(postInstance.tags).toBeUndefined();
    // @ts-ignore
    expect(postInstance.coverImage).toBeUndefined();
    // @ts-ignore
    expect(postInstance.author).toBeUndefined();
    // @ts-ignore
    expect(postInstance.postedAt).toBeUndefined();
  });

  it("must be not able to modify the attributes directly", async () => {
    const post = factory.getPost();
    const postInstance = new Post(post);
    // @ts-ignore
    postInstance.title = "Pokemon FireRed & LeafGreen";
    expect(postInstance.reflect.title).toStrictEqual(post.title);
  });

  it("must be create a slug when creating a post", async () => {
    const post = factory.getPost({ title: "example" });
    const postInstance = new Post(post);
    expect(postInstance.reflect.slug).contains('example');
  });

  it("must be able to access the attributes via the <reflect> object", async () => {
    const post = factory.getPost();
    const postInstance = new Post(post);
    expect(postInstance.reflect.title).toStrictEqual(post.title);
    expect(postInstance.reflect.body).toStrictEqual(post.body);
    expect(postInstance.reflect.tags).toStrictEqual(post.tags);
  });
});
