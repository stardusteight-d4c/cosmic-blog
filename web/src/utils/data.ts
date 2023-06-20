import node from "@/assets/tech-icons/backend/node.svg";
import fastify from "@/assets/tech-icons/backend/fastify.svg";
import nest from "@/assets/tech-icons/backend/nest.svg";
import docker from "@/assets/tech-icons/backend/docker.svg";
import stripe from "@/assets/tech-icons/backend/stripe.svg";

import javascript from "@/assets/tech-icons/languages/javascript.svg";
import typescript from "@/assets/tech-icons/languages/typescript.svg";
import graphql from "@/assets/tech-icons/languages/graphql.svg";
import html from "@/assets/tech-icons/languages/html.svg";
import css from "@/assets/tech-icons/languages/css.svg";

import react from "@/assets/tech-icons/frontend/react.svg";
import vue from "@/assets/tech-icons/frontend/vue.svg";
import tailwindcss from "@/assets/tech-icons/frontend/tailwindcss.svg";
import stitches from "@/assets/tech-icons/frontend/stitches.svg";
import vite from "@/assets/tech-icons/frontend/vite.svg";
import hygraph from "@/assets/tech-icons/frontend/hygraph.svg";

import mongodb from "@/assets/tech-icons/databases/mongodb.svg";
import mysql from "@/assets/tech-icons/databases/mysql.svg";
import knex from "@/assets/tech-icons/databases/knex.svg";
import mongoose from "@/assets/tech-icons/databases/mongoose.svg";
import prisma from "@/assets/tech-icons/databases/prisma.svg";
import supabase from "@/assets/tech-icons/databases/supabase.svg";

import Mavatar0101 from "../../public/avatars/m-avatar-01-1.png";
import Mavatar0102 from "../../public/avatars/m-avatar-01-2.png";
import Mavatar0103 from "../../public/avatars/m-avatar-01-3.png";

import Favatar0101 from "../../public/avatars/f-avatar-01-1.png";
import Favatar0102 from "../../public/avatars/f-avatar-01-2.png";
import Favatar0103 from "../../public/avatars/f-avatar-01-3.png";

import Mavatar0201 from "../../public/avatars/m-avatar-02-1.png";
import Mavatar0202 from "../../public/avatars/m-avatar-02-2.png";
import Mavatar0203 from "../../public/avatars/m-avatar-02-3.png";

import Favatar0201 from "../../public/avatars/f-avatar-02-1.png";
import Favatar0202 from "../../public/avatars/f-avatar-02-2.png";
import Favatar0203 from "../../public/avatars/f-avatar-02-3.png";

import Mavatar0301 from "../../public/avatars/m-avatar-03-1.png";
import Mavatar0302 from "../../public/avatars/m-avatar-03-2.png";
import Mavatar0303 from "../../public/avatars/m-avatar-03-3.png";

import Favatar0301 from "../../public/avatars/f-avatar-03-1.png";
import Favatar0302 from "../../public/avatars/f-avatar-03-2.png";
import Favatar0303 from "../../public/avatars/f-avatar-03-3.png";

import github from "@/assets/social/github.svg";
import linkedin from "@/assets/social/linkedin.svg";
import instagram from "@/assets/social/instagram.svg";
import twitter from "@/assets/social/twitter.svg";
import facebook from "@/assets/social/facebook.svg";
import email from "@/assets/social/email.svg";

export interface IAvatars {
  url: string;
  id: string;
}

export interface Techs {
  backend: Array<string>;
  language: Array<string>;
  frontend: Array<string>;
  database: Array<string>;
}

export interface SocialNetwork {
  url: string;
  name: string;
}

export const socialNetworks: Array<SocialNetwork> = [
  { url: github, name: "Github" },
  { url: linkedin, name: "LinkedIn" },
  { url: instagram, name: "Instagram" },
  { url: twitter, name: "Twitter" },
  { url: facebook, name: "Facebook" },
  { url: email, name: "Email" },
];

export const chooseAvatars: Array<IAvatars> = [
  { url: Mavatar0101, id: "Mavatar01" },
  { url: Favatar0101, id: "Favatar01" },
  { url: Mavatar0201, id: "Mavatar02" },
  { url: Favatar0201, id: "Favatar02" },
  { url: Mavatar0301, id: "Mavatar03" },
  { url: Favatar0301, id: "Favatar03" },
];

export const techs: Techs = {
  backend: [node, fastify, nest, docker, stripe],
  language: [javascript, typescript, graphql, html, css],
  frontend: [react, vue, tailwindcss, stitches, vite, hygraph],
  database: [mongodb, mysql, knex, mongoose, prisma, supabase],
};

export const descriptions: Techs = {
  backend: [
    '<strong style="font-weight: 700;">Node.js:</strong> Widely used to build scalable network applications such as web servers, instant messaging applications, real-time games, video streaming applications, and more. Allows developers to write applications in a server-side runtime environment that runs as a separate process within the operating system.',
    '<strong style="font-weight: 700;">Fastify:</strong> High-performance, low-overhead backend framework for Node.js designed to handle HTTP requests extremely efficiently. Fastify is built with plugins, which means it is highly modular and customizable.',
    '<strong style="font-weight: 700;">NestJS:</strong> Framework for building applications on Node.js, which focuses on community-recommended architecture and patterns such as MVC (Model-View-Controller) architecture, Dependency Injection, and Aspect Oriented Programming (AOP). It supports the creation of applications with support for microservices, making it an excellent choice for scalable and complex applications.',
    '<strong style="font-weight: 700;">Docker:</strong> Allows you to create, run, and manage containerized applications. A container is a unit of software that contains everything needed for an application to run. Allows developers to package applications in portable containers and deploy them to any hosting environment, such as a local server or in the cloud.',
    '<strong style="font-weight: 700;">Stripe:</strong> Online payments platform that allows companies and individuals to receive payments over the internet. With Stripe, you can process payments with credit cards, debit cards and digital wallets securely and efficiently, without having to deal directly with the technical and security details involved in the transaction. In addition, the platform offers several payment management tools, such as reporting, subscription management and dispute management. Stripe is widely used by technology companies, marketplaces, e-commerce and other companies that transact online.',
  ],
  language: [
    '<strong style="font-weight: 700;">JavaScript:</strong> High-level, interpreted, object-oriented programming language. Widely used for web development, mainly in conjunction with HTML and CSS, to make web pages more interactive and dynamic. It is also used in server-side applications with Node.js.',
    '<strong style="font-weight: 700;">TypeScript:</strong> JavaScript superset that adds optional static typing, interfaces, enums, and other features that help make JavaScript application development more scalable and easier to maintain. Created by Microsoft and is widely used in building front-end and back-end applications in JavaScript. TypeScript is compiled to JavaScript, which means it can run in any environment where JavaScript runs. Using TypeScript can help catch typos before code runs and make code easier to understand and maintain.',
    '<strong style="font-weight: 700;">GraphQL:</strong> Data query language created by Facebook. Allows developers to define the structure of the data they want to get and then retrieve that data from a server that provides a GraphQL API. Unlike other data query languages, GraphQL provides a single interface for retrieving and updating data, allowing clients to request only the information they need instead of overwhelming the server with unnecessary requests.',
    '<strong style="font-weight: 700;">HTML5:</strong> (Hypertext Markup Language) is a markup language used to create and structure content on the web. HTML5 expanded the capabilities of the web, offering a variety of new and useful features for developers and users alike, making the web more interactive, accessible and rich in multimedia content. It brought native support for audio, video, vector graphics and new semantic tags, such as header, footer, nav, article, section, among others, allow developers to better organize and describe the content in an HTML document, improving the accessibility and usability of the websites.',
    '<strong style="font-weight: 700;">CSS3:</strong> The latest version of Cascading Style Sheets, the style language used to describe the presentation of HTML and XML documents. CSS3 added new features such as advanced selectors, support for web fonts, gradients, transitions, animations, shadows and rounded edges. With these features, developers can create richer and more interactive layouts for their websites and web applications.',
  ],
  frontend: [
    '<strong style="font-weight: 700;">React:</strong> Open source JavaScript library that lets you build interactive and scalable user interfaces (UI). Developed by Facebook and is widely used in building web applications. It uses the concept of reusable components to build user interfaces, allowing developers to build complex applications in a modular and maintainable way.',
    '<strong style="font-weight: 700;">Vue.js:</strong> Open source JavaScript framework for building user interfaces. Built to be flexible, easy to learn and develop, and is widely used to build modern, dynamic web and mobile apps. Vue.js is component-based, which makes code creation and reuse very efficient. It also has powerful features like reactivity, directives, state management, and integration with other libraries and frameworks.',
    '<strong style="font-weight: 700;">Tailwindcss:</strong> CSS framework that provides a set of predefined classes to style HTML elements quickly and easily. Unlike other frameworks like Bootstrap or Foundation that take a more opinionated approach, Tailwind CSS is highly customizable, allowing you to build your own design from the available classes. It`s also easy to learn and use, as the classes have intuitive names that clearly describe what they do, such as "bg-blue-500" to set the blue background color and "px-4 to set the horizontal padding.',
    '<strong style="font-weight: 700;">Stitches:</strong> CSS-in-JS style library, which allows developers to write CSS in JavaScript format in a simpler and more intuitive way. It offers an easy-to-learn and easy-to-use syntax, allowing you to create dynamic, reusable styles within a project. With Stitches, it is possible to create custom themes and optimize the application`s performance, ensuring a leaner and easier to maintain code. In addition, the library is compatible with several frameworks, such as React, Vue.js, Svelte, among others.',
    '<strong style="font-weight: 700;">Vite:</strong> Released in 2020, vite is a build tool and development server for JavaScript web projects. Especially suitable for Vue.js and React projects, but can also be used in other libraries and frameworks. Vite is known for its fast startup and its module system with native support for importing ESM files (ECMAScript Modules). It also offers features such as hot module replacement (HMR), which allows code changes to be instantly updated on the page, and a smooth and efficient development experience.',
    '<strong style="font-weight: 700;">Hygraph:</strong> Free and open source content management system (CMS), developed in Node.js and based on the Next.js framework. Provides an easy-to-use interface for creating, managing, and publishing content for websites and web applications. Highly customizable, allowing developers to create custom templates to meet a project`s specific needs. It includes advanced features such as optimized SEO, asset management, localization and support for multiple languages. It uses the MongoDB database by default, but also supports other databases like Postgres and SQLite. It is a great choice for development teams that want a fast, modern and flexible CMS for their web projects.',
  ],
  database: [
    '<strong style="font-weight: 700;">MongoDB:</strong> NoSQL, document-oriented database management system (DBMS), designed to handle large volumes of unstructured or semi-structured data. Unlike relational databases, which use fixed tables and schemas to structure data, MongoDB stores data in flexible, nested documents in JSON format, allowing for more dynamic data modeling and easier horizontal scalability.',
    '<strong style="font-weight: 700;">MySQL:</strong> Open source relational database management system (RDBMS) widely used in web applications, providing a platform to store, organize and manage data. It uses SQL (Structured Query Language) language to manage databases, which is a standard language for relational database management.',
    '<strong style="font-weight: 700;">Knex.js:</strong> It`s a SQL query builder in Node.js that lets you write SQL queries in a fluent style using JavaScript. It supports several popular databases such as MySQL, PostgreSQL, SQLite3, Oracle and MSSQL and helps to simplify communication with these databases. Allows developers to write SQL queries using a programming language instead of writing SQL directly. This makes it easier and more intuitive to write and modify complex queries, avoiding common SQL syntax errors.',
    '<strong style="font-weight: 700;">Mongoose:</strong> Node.js library that provides a templating layer for applications that use MongoDB as their database. It simplifies interaction with MongoDB and lets you define data schemas, create models, and perform database operations more easily and securely. With Mongoose, you can define your data schemas using JavaScript objects that describe the structure of the documents you want to store in MongoDB. Mongoose also offers features such as data validation, pre- and post-save hooks, and support for cross-document references.',
    '<strong style="font-weight: 700;">Prisma:</strong> Modern ORM (Object-Relational Mapping) tool for SQL databases. It allows developers to write database queries in TypeScript/JavaScript code with a simple and secure API. Prisma supports multiple SQL databases, including PostgreSQL, MySQL and SQLite, and offers advanced features such as database migrations, robust data types, advanced relational queries and GraphQL schema generation. With the help of Prisma, developers can create scalable, secure and easy to maintain applications that integrate seamlessly with their SQL databases.',
    '<strong style="font-weight: 700;">Supabase:</strong> Open source platform that offers an alternative to Firebase, providing an API for authentication, data storage, email sending, serverless functions, webhooks and more. It is built on top of open source database technologies like Postgres and allows developers to build scalable and secure applications with ease. In addition, Supabase also offers a user-friendly interface and features for team collaboration such as role-based access control.',
  ],
};
