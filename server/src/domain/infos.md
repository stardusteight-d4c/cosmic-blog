# Domain Layer

The domain directory is responsible for representing the core of the application, where the business rules and entities of the system's domain are found. It contains the classes that model the system's entities, as well as the interfaces that define the services that will be implemented in the application layer. In other words, it's where the main business rules are defined.

As for the domain, it should not be responsible for implementing the data access logic, as this would be an application layer concern. The domain should only define system entities and business rules, without worrying about how this data is stored or accessed. The purpose of the domain is to define the business logic independently of the technology and concrete implementations used.

The layer that should be concerned with the implementation of the system's use cases and with the interaction between the domain and the user interface is the application layer, it contains the classes that implement the interfaces defined in the domain, as well as the services needed to run system functionality.

Communication between layers must occur from the outermost layer to the innermost layers, the innermost layers must not depend on and not even communicate with the outermost layers:

[DOMAIN] <-- [APPLICATION] <-- [INFRA] <----> [VIEW]

## Unitary Tests

At the domain layer, unit tests usually focus on testing system entities and business rules. This means that the tests must verify that the entities are created correctly and that the business rules are being applied according to the specifications.

For example, suppose the system has an entity called Order and a business rule that says that all orders must have a minimum value. A unit test at the domain layer could check if the Order entity is being created correctly and if the business rule is being applied correctly, that is, if an order with a value below the minimum is rejected.

In addition, unit tests at the domain layer can also verify that relationships between entities are being created correctly and that business operations are being performed correctly. For example, if the system has a Customer entity that relates to the Order entity, a unit test could verify that a customer can have multiple orders and that the orders are being correctly assigned to the customer.

In short, unit tests at the domain layer should focus on the entities and business rules of the system, ensuring that they are working correctly and according to specifications.

## Builders

The builder will be responsible for building and initializing the User class instance with the necessary properties, using the necessary validations and business rules. The modifier and accessor methods must belong to the User class and can be called after the instance is constructed. Thus, the User class is responsible for managing the business logic and behavior of objects, while the builder is responsible for building and initializing these objects.

## Namespaces

In TypeScript, a namespace is a way of encapsulating a set of declarations for types, interfaces, functions, classes, and other namespaces in a common scope. This helps to avoid name conflicts and organizes the code in a more modular way.

To create a namespace, simply use the namespace keyword followed by the namespace name and the declarations within the namespace code block. For example:

```ts
namespace MyNamespace {
  export interface MyInterface {
    // ...
  }

  export class MyClass {
    // ...
  }

  export function myFunction() {
    // ...
  }
}

export default MyNamespace
```

In the example above, we create a namespace called MyNamespace and inside it we declare an interface, a class and a function, all of them with the export modifier, which allows them to be accessible outside the namespace.

To access the namespace elements, simply use the dot notation, as in the example below:

```ts
const myInstance = new MyNamespace.MyClass()
const myInterface: MyNamespace.MyInterface = {
  /* ... */
}
MyNamespace.myFunction()
```

Note that namespace elements need to be exported to be accessible outside the namespace.

One advantage of namespaces is that they can be split across multiple files, allowing code to be organized in a more modular way. To do this, simply declare the same namespace in each file and add the specific declarations for that file within the namespace code block. When compiling TypeScript files, the compiler will merge all files that are part of the same namespace into a single JavaScript file.

However, it is important to remember that excessive use of namespaces can lead to confusing and difficult to maintain code, especially when the namespace starts to get very large. In these cases, it is recommended to use other design patterns, such as modules or classes with static methods, to organize the code more efficiently.
