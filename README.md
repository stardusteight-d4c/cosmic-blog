<div align="center">
  <img src="logo.png" width="222" height="78" />
</div>

<h1 align="center">
 Cosmic Blog, OOP (Domain-driven Design and Event-Driven Approaches)
</h1>

Plato, an ancient Greek philosopher, developed the theory of "Ideas" or "Forms" as part of his metaphysical philosophy. According to Plato, the material world that we perceive through the senses is just an imperfect and transitory copy of a perfect and eternal world, known as the `World of Ideas` or `World of Forms`.

In the "World of Ideas", there are the perfect and unchanging essences of all objects and concepts. For example, there is the perfect Idea/Form of a chair, which transcends all the individual chairs we find in the material world. This Idea/Form of chair is eternal, unchanging and contains the true nature or essence of the chair.

The distinction between the `Intelligible World` and the `Concrete World` is a philosophical conception associated with Plato's thought.

The "Intelligible World" refers to the realm of perfect, unchanging, and eternal Ideas or Forms. It is a transcendent (encapsulated) world, accessible only through reason and intellectual contemplation. In this world, Ideas or Forms represent the true and eternal essences of things. For example, there is the perfect Idea/Form of justice, beauty, goodness, among other concepts. These Ideas are considered the ultimate and unchanging reality.

On the other hand, the "Concrete World" is the physical world that we perceive through the senses. It is a world of change, imperfection and impermanence. In that world we find particular and individual objects which are but imperfect imitations or reflections of the Ideas or Forms of the Intelligible World.

Such Platonic thought of more than two thousand years ago, reflects a lot the idea of ​​`object-oriented programming`, where we have abstractions and implementations, abstract forms and concrete forms, for example entities in domain-driven design reflect ideas, or perfect shapes of objects in our system.

## :hammer_and_wrench: Tools

### Frontend

* Vue.js
* Vuex
* Vue Router
* TypeScript
* Axios
* Vite
* Firebase
* TailwindCSS
* Rich Text Editor
* Vercel (deployment)


### Backend

* TypeScript
* Node.js
* NestJS
* Fastify
* Knex
* Vitest
* PostgreSQL
* Neon Console (Neon Database)
* Json Web Token
* Nodemailer
* Docker/Docker Compose
* Design Patterns
* Solid
* Domain-driven Design
* Clean Architecture
* Event-driven (Observer Pattern)
* Hexagonal/Ports and Adapters Architecture
* Unitary Tests
* Render (deployment)

## :mailbox_with_mail: Utilities
 
### NestJS
 
NestJS is a framework for developing back-end applications in Node.js. It combines elements of TypeScript, JavaScript and the layered software architecture concept to create scalable and modularized APIs.

NestJS is designed to provide a robust and structured framework for developing applications in Node.js. It uses the MVC (Model-View-Controller) design pattern to separate application responsibilities into different layers. The MVC model promotes modularity, allowing developers to break their applications into self-contained modules that can be reused and tested easily.

One of the main features of NestJS is its native integration with TypeScript. TypeScript is a programming language that adds static typing capabilities to JavaScript, helping to avoid common mistakes during development. With NestJS, developers can leverage advanced TypeScript features such as type, interface, and class inference to build more secure and robust applications.

Another advantage of NestJS is its dependency injection system. It provides an elegant way to manage dependencies between different application components. The dependency injection system facilitates code reuse, testability and application maintenance.

Additionally, NestJS supports many popular features and libraries from the Node.js ecosystem, such as Express.js, Fastify, TypeORM, and GraphQL. This allows developers to choose the tools best suited to their needs and take advantage of existing resources.

In summary, NestJS is a powerful framework for developing back-end applications in Node.js. It combines the power of TypeScript with a well-structured architecture and advanced features, allowing developers to build high-quality, modular, and scalable APIs.

### Knex (Query Builder)

Knex is an SQL query builder for Node.js that lets you interact with relational databases easily and efficiently. It provides an intuitive and consistent interface to create, query, modify and delete data in databases such as MySQL, PostgreSQL, SQLite and others.

Knex simplifies interacting with databases by abstracting the complexity of SQL queries and providing fluent query construction methods. With Knex, developers can build complex queries using readable and expressive syntax, avoiding the need to manually write SQL queries.

One of the key features of Knex is database migration. It provides a set of tools for creating and applying migrations, which are files that describe database schema changes over time. Migrations allow developers to efficiently manage database schema evolution while ensuring consistency and data integrity.

Knex also supports transactions, which allows you to group multiple database operations into a single transaction, ensuring that all changes are successfully applied or rolled back if they fail. This is especially useful in situations where you need to maintain data consistency and ensure that operations occur atomically.

Additionally, Knex has a modular and extensible architecture, allowing integration with other popular libraries and frameworks in the Node.js ecosystem. It can be combined with web frameworks such as Express.js or NestJS to create powerful and scalable APIs.

### Unitary Tests

Unit testing is a software development practice that aims to test small isolated pieces of code, known as units, to ensure that they work correctly according to specifications. Units usually correspond to individually testable functions, methods, or blocks of code.

The goal of unit testing is to identify bugs or flaws in units of code as early as possible, allowing developers to fix them before they propagate to other parts of the system. This helps improve code quality, making it more reliable, robust, and maintainable.

Unit tests are written using specific test frameworks or libraries, which provide a framework for defining test cases, executing code units, and verifying expected results. These test cases are usually designed to cover different scenarios and execution flows, including success cases and failure cases, to ensure that all possible branches of the code are tested.

A common practice in unit testing is to use assertions to verify that the result of executing a unit of code equals the expected result. Assertions help determine whether the drive is behaving correctly and meeting expectations.

Unit tests must be independent and isolated, which means that each test must be able to run independently, without relying on the state of other tests or external resources such as databases or web services. This allows tests to be run quickly and repeatedly, making it easier to spot problems.

Additionally, unit tests should be automated, integrated into the development workflow, and run regularly. They are typically run during the continuous integration process or before new code is merged into the main repository. That way, developers can be confident that the changes they've made haven't introduced regressions or issues into existing code.

## :speech_balloon: Explanations

![architecture](/architecture.jpg)

### Philosophy vs. Object Oriented Programming

There are conceptual parallels between Platonic ideas and the principles of object-oriented programming. Both seek to model and understand the world through abstractions, hierarchies, relationships and shared characteristics. Object-oriented programming offers a practical framework for developing software, while Platonic ideas explore the nature of reality and existence.

#### Abstraction

Both concepts are related to the idea of ​​simplification and focus on the essential and fundamental aspects of things. In both OOP abstraction and Plato's Forms, we seek to extract and represent only the essential elements, ignoring irrelevant or transitory details. While abstraction in OOP aims to create a simplified representation of real world objects, Plato's Forms represent the abstract and perfect essence behind the concrete manifestations.

#### Encapsulation

Both encapsulation in OOP and encapsulation in Plato's ideas involve the idea of ​​hiding internal details and providing a controlled interface. In OOP, encapsulation seeks to protect the implementation details of an object, while in Plato's ideas, encapsulation refers to the fact that the Forms are beyond the reach of the senses and ordinary perception. In both cases, encapsulation promotes protection, security, and control over access to the underlying entities.

#### Heritage

In the context of Plato's ideas, inheritance can be related to the view that higher Forms engender and influence lower Forms. Plato argued that the things of the sensible world are mere imperfect copies of ideal Forms. The higher Forms are considered the source or cause of the lower Forms and have a direct influence on them. This hierarchical inheritance of the Forms establishes an order and a relationship between them.

Both concepts involve the idea of ​​a hierarchical and influential relationship between entities. In OOP, inheritance establishes a hierarchical relationship between classes, allowing child classes to inherit characteristics from parent classes. This promotes code reuse and the hierarchical organization of the system. In Plato's ideas, inheritance refers to the influence and cause-and-effect relationship between higher and lower Forms. The higher Forms exert a direct influence on the lower Forms, establishing an order and a hierarchy among them.

#### Polymorphism

In the context of Plato's ideas, polymorphism can be related to the notion that a higher Form can be manifested or reflected in different lower forms. The higher Forms are the true essence and represent a model or pattern, which can be reflected in multiple manifestations in the sensible world. This ability of Shapes to manifest in various ways is a form of polymorphism.

Parallel between polymorphism in OOP and the concept of polymorphism in Plato's ideas:
Both concepts involve the idea of ​​multiple forms or manifestations. In OOP, polymorphism allows different objects to be treated in a polyvalent way, as objects of the same parent class, through the use of inheritance and polymorphic methods. This promotes code flexibility and extensibility. In Plato's ideas, polymorphism is related to the ability of superior Forms to manifest themselves in various inferior forms, reflected in different manifestations in the sensible world.

### Anaximander of Miletus Metaphysics, apeiron vs. Object Oriented Programming

- <strong>Modeling</strong>: In both metaphysics and OOP, the idea of ​​modeling is central. In metaphysics, modeling is an attempt to understand and describe the fundamental structure of reality. In OOP, modeling involves creating models of real-world objects to solve software problems, representing relevant characteristics, relationships and behaviors.

- <strong>Essence and existence</strong>: In metaphysics, the distinction between the essence and existence of a being is discussed. Essence refers to the nature and fundamental characteristics that define something, while existence is the act of being or existing. In OOP, we can find a similar connection when designing classes and objects. Classes represent the essence or fundamental structure of an object, while objects are concrete instances that exist and have specific attributes.

- <strong>Knowledge and representation</strong>: In metaphysics, knowledge is a quest for understanding the fundamental truths of reality. In OOP, knowledge representation is achieved through the creation of object models and structures. OOP allows knowledge about the real world to be captured and represented in an organized way, facilitating the construction of software systems.

- <strong>Abstraction</strong>: Just as "apeiron" is a primordial and undefined substance, OOP is based on the abstraction of real-world entities and concepts to create models and software structures. Abstraction makes it possible to represent objects, their essential characteristics and behaviors, regardless of their individual manifestations.

- <strong>Extensibility</strong>: The concept of "apeiron" as an unlimited source source can be related to extensibility in OOP. Extensibility lets you add new functionality and behavior to an existing software system without changing its core structure. This ability to extend the software reflects the notion of "apeiron" as a source of infinite possibilities.

- <strong>Flexibility</strong>: In the same way that "apeiron" is indeterminate and undefined, OOP seeks to offer flexibility in software development. Flexibility allows systems to adapt to different scenarios and changing requirements. OOP principles such as polymorphism and encapsulation provide the ability to dynamically handle different objects and behaviors.

- <strong>Reuse</strong>: The concept of "apeiron" as a prime substance and source of origin can be related to code reuse in OOP. Reuse allows code snippets to be reused in different parts of the system, avoiding duplication and promoting a more efficient implementation. This ability to reuse code reflects the idea of ​​a primordial source from which various manifestations originate.

### About Domain-driven Design

When we adopt a domain-oriented design, we aim to concentrate all the complexity of the software in a single layer, it must be a layer where all the business rules are well defined, modeled and tested, it must not depend on any other layer or external system. So the domain is a self-sufficient layer containing the software specifications and behaviors, but totally in an abstracted way, without concrete implementations of how the application should work, but it defines the behaviors and properties of the software entities and how they should relate. The domain, being a self-sufficient layer, should describe how our system should behave, it describes all the system's functionalities, so it should be possible to run with scripts that will send inputs and mocked implementations.

#### Entities

<strong>Entities describe a context</strong>, entities are units of an aggregate, a problem being approached, the root entities of a domain is the simplest representation of a problem, where it only defines the properties, the characteristics of a problem. Root entity behaviors must be described in your services.

#### Services

<strong>Services describe behaviors</strong> such as how the domain handles a root entity, they are also considered as entities as everything in the domain is an extension of the root entity. Services should contain all the logic for how an entity should be created, updated, how to acquire specific data from an entity, and so on. But for that the services depend on a storage.

#### Repositories

<strong>Repositories describes existence</strong>, describe the storage of a root entity, it is where we store multiple instances of root entities in a persistent layer, as if they were collections of root entities. It should only be responsible for the interaction logic with this persistent medium, it should not validate whether an input is valid or not, the service should guarantee the integrity of this data and thus only request data from these persistent layers or the same validator to insert data into these collections.

#### Publisher

Publisher is a high-level entity responsible for <strong>communication between aggregates</strong>, so we can make entities react to events from other entities, or even services from entities can request services from other entities. That is, every entity must depend only on itself, but it can communicate with other entities, and many times for a behavior to be successfully executed, it is influenced by the response of other entities.

> When I refer to dependency, it's about an entity not knowing about other entities, a Publisher or an event-driven architecture is exactly for that, a service publishes/imit a command and is not interested in the implementations of other entities, just for a response or even warn about an action that was performed and not be interested in how other entities react to it.

### Server Deployment in Render

```ts
await app.listen(3000); // by default the address is localhost '127.0.0.1'
```
 If you bind to localhost, then Render can’t find the service. 0.0.0.0 is the host your application should use.

```ts
await app.listen(3000, '0.0.0.0');
```

#### Build & Deploy Configs

```
Root Directory: server
Build Command: npm install && npm run build && npm run migrate
Start Command: npm run start:prod
```
*<i>Before deploying, you must have already uploaded a database and configured the environment variables to access it, in this case, the Neon Database service was used.</i>

#### Node.js version specification

Add a file called `.node-version` at the root of your repo containing a single line specifying the version.

```
20.0.0
```

#### CORS (Cross-Origin Resource Sharing)

CORS allows servers to specify which origins are allowed to access their resources. When a browser makes a request for a resource in an origin other than the page being displayed, the server can send special headers (such as Access-Control-Allow-Origin) to indicate whether the request should be allowed or blocked.

```ts
export const corsOptions: CorsOptions = {
  origin: domain,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
```

![screen](/screens/screen-home-desktop.png)

<p align="center">Project made with :blue_heart: by <a href="https://github.com/stardusteight-d4c">Gabriel Sena</a></p>


