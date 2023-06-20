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


### Backend

* TypeScript
* Node.js
* NestJS
* Fastify
* Knex
* Vitest
* PostgreSQL
* Json Web Token
* Nodemailer
* Docker/Docker Compose
* Design Patterns
* Solid
* Domain-driven Design
* Clean Architecture
* Event-driven Architecture
* Hexagonal/Ports and Adapters Architecture
* Unitary Tests


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

## Abstraction

Both concepts are related to the idea of ​​simplification and focus on the essential and fundamental aspects of things. In both OOP abstraction and Plato's Forms, we seek to extract and represent only the essential elements, ignoring irrelevant or transitory details. While abstraction in OOP aims to create a simplified representation of real world objects, Plato's Forms represent the abstract and perfect essence behind the concrete manifestations.

## Encapsulation

Both encapsulation in OOP and encapsulation in Plato's ideas involve the idea of ​​hiding internal details and providing a controlled interface. In OOP, encapsulation seeks to protect the implementation details of an object, while in Plato's ideas, encapsulation refers to the fact that the Forms are beyond the reach of the senses and ordinary perception. In both cases, encapsulation promotes protection, security, and control over access to the underlying entities.

## Heritage

In the context of Plato's ideas, inheritance can be related to the view that higher Forms engender and influence lower Forms. Plato argued that the things of the sensible world are mere imperfect copies of ideal Forms. The higher Forms are considered the source or cause of the lower Forms and have a direct influence on them. This hierarchical inheritance of the Forms establishes an order and a relationship between them.

Ambos os conceitos envolvem a ideia de uma relação hierárquica e de influência entre entidades. Na POO, a herança estabelece uma relação hierárquica entre classes, permitindo que as classes filhas herdem características das classes pai. Isso promove a reutilização de código e a organização hierárquica do sistema. Nas ideias de Platão, a herança se refere à influência e à relação de causa e efeito entre as Formas superiores e as Formas inferiores. As Formas superiores exercem uma influência direta sobre as Formas inferiores, estabelecendo uma ordem e uma hierarquia entre elas.

## Polymorphism

In the context of Plato's ideas, polymorphism can be related to the notion that a higher Form can be manifested or reflected in different lower forms. The higher Forms are the true essence and represent a model or pattern, which can be reflected in multiple manifestations in the sensible world. This ability of Shapes to manifest in various ways is a form of polymorphism.

Parallel between polymorphism in OOP and the concept of polymorphism in Plato's ideas:
Both concepts involve the idea of ​​multiple forms or manifestations. In OOP, polymorphism allows different objects to be treated in a polyvalent way, as objects of the same parent class, through the use of inheritance and polymorphic methods. This promotes code flexibility and extensibility. In Plato's ideas, polymorphism is related to the ability of superior Forms to manifest themselves in various inferior forms, reflected in different manifestations in the sensible world.

### Metaphysics vs. Object Oriented Programming

- <strong>Modeling</strong>: In both metaphysics and OOP, the idea of ​​modeling is central. In metaphysics, modeling is an attempt to understand and describe the fundamental structure of reality. In OOP, modeling involves creating models of real-world objects to solve software problems, representing relevant characteristics, relationships and behaviors.

- <strong>Essence and existence</strong>: In metaphysics, the distinction between the essence and existence of a being is discussed. Essence refers to the nature and fundamental characteristics that define something, while existence is the act of being or existing. In OOP, we can find a similar connection when designing classes and objects. Classes represent the essence or fundamental structure of an object, while objects are concrete instances that exist and have specific attributes.

> reality originated from the intelligible;

<p align="center">Project made with :blue_heart: by <a href="https://github.com/stardusteight-d4c">Gabriel Sena</a></p>


