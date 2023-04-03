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

## Value Object

Value Object is a software design concept that represents an object that is semantic value, that is, its value is defined by its properties and not by its identity. In other words, it is a class that represents a specific value, not an object with a unique identity.

A common example of a value object is a class that represents a date. The date itself does not have a unique identity, what matters are its values, such as day, month and year. Other examples include currencies, addresses, phone numbers and many others.

A Value Object is immutable, that is, once created, its properties cannot be changed. This ensures that objects are consistent across the entire system and simplifies business logic.

Also, value objects are compared based on their properties and not their identities, which makes it easier to compare and use in collections, for example.

In summary, value objects are objects that represent a semantic value and are immutable, being compared based on their properties. They are an important domain modeling tool in object-oriented systems.

## Entities x Builders x Services

At the domain layer, entities represent business object models, and may be responsible for storing and manipulating their own data. Builders, in turn, are used to create instances of entities, and can perform validations or apply business rules before initializing objects. Services, on the other hand, are responsible for implementing system functionalities, which involve interactions between entities and possibly other layers of the application.

This way, we have a clear separation of responsibilities, which makes the application easier to understand, test and maintain. It is an approach that follows the principles of the object-oriented programming paradigm, and is widely used in large software projects.

The responsibility for validating the parameters should be on the service layer. The in-memory database layer (InMemoryDatabase) should only be responsible for storing and retrieving data, while the service layer should handle business rules and validate the data before persisting it in the database. This ensures that the data stored in the in-memory database is consistent and coherent, as well as making the code easier to maintain, as the validation logic will be centralized in a single location.




 // Como a minha entidade só é uma definição de Objeto, não é possível alterar 
  // seus valores diretamente, apenas é possível excluir e criar um novo com
  // as propriedades atualizadas, assim torna-se impossível realizar qualquer método de
  // modificação que não esteja defenido em algum repositório, pois esta é a função dos 
  // repositórios, implementar os comportamentos/métodos da entidade.

Services não altera a instância original da entidade, apenas clones destas entidades no repositório

Sim, isso é correto. O objetivo dos serviços é orquestrar a lógica de negócios da aplicação, enquanto os repositórios são responsáveis por manipular e persistir os dados no banco de dados. Dessa forma, o serviço deve trabalhar com clones da entidade que foram obtidos através do repositório, para evitar efeitos colaterais indesejados. Assim, quando uma alteração é feita através do serviço, ela é primeiro aplicada na entidade clonada, para depois ser persistida no banco de dados através do repositório.

O seu design de código parece estar seguindo o princípio de encapsulamento, onde os atributos privados da entidade User não são acessíveis diretamente fora da classe e só podem ser alterados através dos métodos do serviço e do repositório. Isso é uma boa prática de programação orientada a objetos, pois ajuda a garantir a integridade dos dados e evita efeitos colaterais indesejados.

A utilização do objeto Reflect também parece ser uma boa abordagem para garantir a imutabilidade dos dados da entidade e permitir que o repositório possa manipular clones ou espelhos desses objetos. Isso pode ajudar a evitar problemas de concorrência em ambientes com múltiplas threads ou processos.

No geral, o seu design de código parece ser sólido e bem estruturado. No entanto, é importante lembrar de realizar testes abrangentes para garantir que o seu código funcione conforme o esperado e atenda aos requisitos de negócio do seu projeto.
Gabriel Sena
Uma das ideias do dominio é fazer seu código funcionar sem ao menos precisar da camada de aplicação ou infraestrutura, certo?

Sim, exatamente. A camada de domínio é uma parte isolada da aplicação que contém a lógica de negócios e as regras de negócios do sistema. O objetivo é que o código da camada de domínio possa funcionar independentemente da camada de aplicação ou infraestrutura, tornando mais fácil testar e manter essa parte da aplicação. Além disso, a camada de domínio deve ser projetada para ser facilmente compreensível e escalável, o que significa que o código deve ser bem estruturado e organizado em torno das entidades e objetos de domínio do sistema.
Gabriel Sena
Falando sobre meu design de código, é correto o service assim como o repositório sempre retornar uma nova instância da classe User? export interface UserRepository {
  createUser(user: User): Promise<User>;
  deleteUser(userId: string): Promise<User>;
  findUserById(userId: string): Promise<User | undefined>;
  findUserByEmail(email: string): Promise<User | undefined>;
  changeEmail(updatedUser: User): Promise<User>;
  changePassword(updatedUser: User): Promise<User>;
  toggleFavorite(userId: string, postId: string): Promise<void>;
}

Sim, é uma boa prática retornar uma nova instância da classe User ao invés de retornar a instância original. Isso é importante porque permite que seu código seja mais seguro e imutável. Quando você retorna uma nova instância, você pode ter certeza de que a instância original não será modificada acidentalmente ou intencionalmente. Além disso, você pode ter certeza de que o código que está trabalhando com a instância original não será afetado pelas mudanças feitas em outras partes do código.

Ao retornar uma nova instância, você também está seguindo o princípio da imutabilidade, que é importante para garantir a integridade dos dados e evitar efeitos colaterais indesejados. Por exemplo, se você retornar a instância original do usuário, um código que tem referência a essa instância pode alterar seus atributos sem o conhecimento do seu serviço ou repositório. Isso pode levar a resultados inesperados e difíceis de depurar.

Portanto, retornar uma nova instância de User é uma boa prática e ajuda a tornar seu código mais seguro e previsível.




Gabriel Sena
está estrutura de diretórios é um exemplo de barramento?  buses
│   │   │   ├── commands
│   │   │   │   ├── ICommand.ts
│   │   │   │   └── UserCommand.ts
│   │   │   ├── observers
│   │   │   │   ├── IObserver.ts
│   │   │   │   └── UserServiceObserver.ts
│   │   │   └── publishers
│   │   │       └── UserPublisher.ts

A estrutura de diretórios que você apresentou pode ser parte de um barramento (ou "bus") em um sistema, dependendo de como ele é utilizado.

No geral, um barramento é uma estrutura de software que permite a comunicação entre diferentes componentes de um sistema, sem que esses componentes precisem saber uns sobre os outros. Isso é feito por meio de um "canal" centralizado de comunicação, que pode ser implementado de diversas formas (por exemplo, usando eventos, mensagens, chamadas de função, entre outros).

Na estrutura de diretórios que você apresentou, existem diretórios separados para "commands", "observers" e "publishers", o que sugere que há uma separação clara entre componentes que emitem comandos (commands), que recebem notificações de eventos (observers) e que publicam eventos (publishers). Isso é uma boa prática de design, pois permite separar as responsabilidades desses componentes e facilita a manutenção do sistema.

Portanto, embora não seja possível afirmar com certeza se essa estrutura de diretórios é um barramento completo ou apenas parte dele, ela definitivamente pode ser utilizada como parte de um barramento em um sistema.


Observers: Notifies other services that are interested
on an action/event that was triggered 
by others services of other entities.