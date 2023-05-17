import { beforeEach, describe, expect, it } from "vitest";
import { IPostReflectObject } from "../@interfaces";
import PostBuilder from "../PostBuilder";
import { IUserReflectObject, User, UserBuilder } from "@/domain/user";
import Post from "../Post";

describe("PostBuilder", () => {
  beforeEach(() => {});
  it("must return an instance of Post", () => {
    const myUser: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = new UserBuilder()
      .setEmail(myUser.email)
      .setUsername(myUser.username)
      .setPassword(myUser.password)
      .setAvatar(myUser.avatar ? myUser.avatar : "")
      .build();
    const post: IPostReflectObject = {
      title: "Título doaaa post!",
      body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
      tags: ["nodejs", "typescript", "ddd"],
      coverImage:
        "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
      postedIn: new Date(),
      author: userInstance.reflect,
    };
    expect(
      new PostBuilder()
        .setId(post.id!)
        .setTitle(post.title)
        .setBody(post.body)
        .setTags(post.tags)
        .setCoverImage(post.coverImage)
        .setPostedIn(post.postedIn)
        .setAuthor(userInstance)
        .build(),
    ).toBeInstanceOf(Post);
  });

  it("must start properly for non-mandatory values", () => {
    const user: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = new UserBuilder()
      .setEmail(user.email)
      .setUsername(user.username)
      .setPassword(user.password)
      .setAvatar(user.avatar ? user.avatar : "")
      .build();
    const post: IPostReflectObject = {
      title: "Título doaaa post!",
      body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
      tags: ["nodejs", "typescript", "ddd"],
      coverImage:
        "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
      postedIn: new Date(),
      author: userInstance.reflect,
    };
    const postIstance = new PostBuilder()
      .setId(post.id!)
      .setTitle(post.title)
      .setBody(post.body)
      .setTags(post.tags)
      .setCoverImage(post.coverImage)
      .setPostedIn(post.postedIn)
      .setAuthor(new User(post.author))
      .build();
    expect(postIstance.reflect.favorites).toStrictEqual([]);
    expect(postIstance.reflect.comments).toStrictEqual([]);
  });

  it("postIstance.reflect.author must be equal userInstance.reflect", () => {
    const user: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = new UserBuilder()
      .setEmail(user.email)
      .setUsername(user.username)
      .setPassword(user.password)
      .setAvatar(user.avatar ? user.avatar : "")
      .build();
    const post: IPostReflectObject = {
      title: "Título doaaa post!",
      body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
      tags: ["nodejs", "typescript", "ddd"],
      coverImage:
        "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
      postedIn: new Date(),
      author: userInstance.reflect,
    };
    const postIstance = new PostBuilder()
      .setId(post.id!)
      .setTitle(post.title)
      .setBody(post.body)
      .setTags(post.tags)
      .setCoverImage(post.coverImage)
      .setPostedIn(post.postedIn)
      .setAuthor(new User(post.author))
      .build();
    expect(postIstance.reflect.author).toStrictEqual(userInstance.reflect);
  });

  it("title, body, tags, coverImage, postedIn, author must be required", () => {
    const user: IUserReflectObject = {
      username: "johndoe8",
      email: "johndoe@example.com",
      password: "pa$$word1",
    };
    const userInstance = new UserBuilder()
      .setEmail(user.email)
      .setUsername(user.username)
      .setPassword(user.password)
      .setAvatar(user.avatar ? user.avatar : "")
      .build();
    const post: IPostReflectObject = {
      title: "Título doaaa post!",
      body: "Hoje vamos falar sobre lorem impsum akakss. Então foi isto que aprendi",
      tags: ["nodejs", "typescript", "ddd"],
      coverImage:
        "https://res.cloudinary.com/daily-now/image/upload/f_auto,q_auto/v1/posts/55eb7be5f5855bc87be018ec14239c5a",
      postedIn: new Date(),
      author: userInstance.reflect,
    };
    expect(() => {
      new PostBuilder()
        .setId(post.id!)
        .setBody(post.body)
        .setTags(post.tags)
        .setCoverImage(post.coverImage)
        .setPostedIn(post.postedIn)
        .setAuthor(new User(post.author))
        .build();
    }).toThrowError("title is required.");
    expect(() => {
      new PostBuilder()
        .setId(post.id!)
        .setTitle(post.title)
        .setTags(post.tags)
        .setCoverImage(post.coverImage)
        .setPostedIn(post.postedIn)
        .setAuthor(new User(post.author))
        .build();
    }).toThrowError("body is required.");
    expect(() => {
      new PostBuilder()
        .setId(post.id!)
        .setTitle(post.title)
        .setBody(post.body)
        .setCoverImage(post.coverImage)
        .setPostedIn(post.postedIn)
        .setAuthor(new User(post.author))
        .build();
    }).toThrowError("tags is required.");
    expect(() => {
      new PostBuilder()
        .setId(post.id!)
        .setTitle(post.title)
        .setBody(post.body)
        .setTags(post.tags)
        .setPostedIn(post.postedIn)
        .setAuthor(new User(post.author))
        .build();
    }).toThrowError("coverImage is required.");
    expect(() => {
      new PostBuilder()
        .setId(post.id!)
        .setTitle(post.title)
        .setBody(post.body)
        .setTags(post.tags)
        .setCoverImage(post.coverImage)
        .setAuthor(new User(post.author))
        .build();
    }).toThrowError("postedIn is required.");
    expect(() => {
      new PostBuilder()
        .setId(post.id!)
        .setTitle(post.title)
        .setBody(post.body)
        .setTags(post.tags)
        .setCoverImage(post.coverImage)
        .setPostedIn(post.postedIn)
        .build();
    }).toThrowError("author is required.");
  });
});
