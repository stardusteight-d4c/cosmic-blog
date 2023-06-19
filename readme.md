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

> This README aims to describe the design adopted in the server of this application.

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
* PostgreSQL
* Json Web Token
* Nodemailer
* Design Patterns
* Solid
* Event-driven
* Domain-driven design
* Clean Architecture


## :mailbox_with_mail: Utilities
 
### Model-View-Controller (MVC)
 
Is a widely used software architecture pattern for separating an application's concerns into three main components: the model, the view, and the controller. The goal is to separate the business logic from the user interface, allowing each component to be developed and tested independently.

The model is responsible for business logic and data manipulation. It represents the state of the system and the business rules that govern how data is stored, manipulated, and validated.

The view is responsible for displaying data and user interaction. It is the user interface of the system and displays the information contained in the model. It is responsible for presenting and manipulating the data in a form that the user can understand.

The controller is the intermediary between the model and the view. It acts as an entry point for user requests and coordinates interactions between the view and the model. It also controls the flow of the application, making the appropriate calls to the necessary components.

By separating business logic, user interface, and flow control into discrete components, the MVC pattern allows you to build more scalable, flexible, and maintainable applications. Furthermore, it allows developers to work more collaboratively and independently, as each component can be developed and tested separately.

### API RESTful (Representational State Transfer) 

Is an architectural style for hypertext-based distributed systems. It is a design approach that establishes a series of constraints and guidelines for creating web services that are scalable, reliable, interoperable, and easy to maintain.

RESTful services are based on the HTTP protocol, using GET, POST, PUT, DELETE methods for reading, creating, updating and deleting resources, respectively. Additionally, resources are identified using URIs (Uniform Resource Identifiers) and return data in formats such as JSON, XML, or other customer-defined formats.

The term RESTful was coined by Roy Fielding in his doctoral thesis in 2000 and is based on the principle that representational state transfer is performed between the client and the server. In other words, the API is designed to be stateless, which means that each request made by the client must contain all the information needed to perform the requested action.

The concept of REST is often associated with the MVC (Model-View-Controller) architectural model, as the RESTful API separates the representation of data from the server, which is the model, from the client, which is the view. The controller in this case is the API itself, which handles client requests and sends appropriate responses.

Overall, using a RESTful API allows developers to build highly scalable, interoperable, and maintainable applications by following a clear set of guidelines and constraints that make web service development more consistent and efficient.


<p align="center">Project made with :blue_heart: by <a href="https://github.com/stardusteight-d4c">Gabriel Sena</a></p>


