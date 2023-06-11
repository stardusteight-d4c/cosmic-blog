## Post

The `Post` class follows some Domain-Driven Design (DDD) principles. Here are some aspects of the class that are in line with DDD principles:

1. **Encapsulation**: The `Post` class encapsulates the properties and behaviors related to a post. The properties are private and can only be accessed or modified through specific methods, thus ensuring more precise control over the state of the object.

2. **Aggregation**: The `Post` class contains information about the author of the post, such as the instance of the `User` class. This lets you group related objects into a coherent structure and express relationships between them.

3. **Immutability**: The properties of the `Post` class are defined only through the constructor and cannot be modified directly. This helps ensure that the object's state is consistent and prevents unwanted changes.

4. **Explicit interfaces**: The `Post` class defines a clear and explicit interface through its public methods and reading properties. This makes the class easier to use and promotes a clear separation between public and internal behavior.

5. **Value object**: The `Post` class encapsulates information about a post and provides an immutable representation of that data via the `reflect` property. This allows the object to be treated as a single, immutable value, making `Post` objects easier to use and compare.

These are just some aspects of DDD that are present in the `Post` class. However, it is important to remember that the application of DDD principles may vary depending on the context and requirements of the specific domain.


## PostBuilder

`PostBuilder` allows you to build instances of the `Post` class incrementally, setting their property values ​​step by step. Here are some notable features of the `PostBuilder` class:

1. **Method chaining**: Each `PostBuilder` configuration method returns its own instance of the builder (`PostBuilder`), allowing the chaining of method calls. This makes it easier to set multiple properties consecutively in a single expression, making the code more concise and readable.

2. **Validation of mandatory properties**: Before building a `Post` instance, `PostBuilder` performs some validations to ensure that mandatory properties such as `title`, `body`, `tags`, `coverImage `, `postedIn` and `author`, are defined. If any of them is not provided, an exception is thrown indicating the error.

3. **Use of default values**: `PostBuilder` uses default values ​​for some properties, like `id` (generated automatically using `randomUUID()`) and empty arrays for `favorites` and `comments` when they are not explicitly provided.

4. **Creation of the `Post` object**: The `build()` method of `PostBuilder` creates a new instance of `Post` based on the settings provided during builder construction. It uses the values ​​set in the builder properties to create a corresponding `Post` object, including converting the `Favorite` and `Comment` objects into their data representations (`reflect`).

Overall, the `PostBuilder` class is a proper implementation of the Builder pattern for creating `Post` objects, facilitating the step-by-step construction of a `Post` with mandatory property validation and use of default values.


## postBuilderFactory

The `postBuilderFactory` function is a factory function responsible for creating and returning instances of the `Post` class. It receives an object containing the data of the original post (`post`) and a possible update (`update`) that indicates which fields should be updated and which are the new data.

By using `PostBuilder` in conjunction with `postBuilderFactory`, it is possible to build a `Post` object with custom settings, including updating specific fields. Here is a summary of how `postBuilderFactory` works:

1. The function takes two parameters: `post` and `update`. The `post` parameter contains the original post data, while the `update` parameter is optional and indicates the fields that should be updated and their respective new data.

2. A new `PostBuilder` is created and its settings are defined based on the data provided in `post`. `PostBuilder` default settings are based on the original post data.

3. Next, the `favorites` and `comments` properties are checked against the update. If the field `field` in `update` equals "favorites", then `update.newData` is used as the new value for `favorites`. Otherwise, if the field `field` equals "comments", then `update.newData` is used as the new value for `comments`. If neither case applies, the original values ​​of `post.favorites` and `post.comments` are mapped to the corresponding instances of `Favorite` and `Comment`, respectively.

4. Finally, the `build()` method of `PostBuilder` is called to create the final instance of `Post` with the defined settings.

Thus, `postBuilderFactory` allows building `Post` objects based on an original `post` object and a possible update of specific fields, using `PostBuilder` to facilitate the step-by-step construction of the object. This gives you flexibility in creating instances of `Post` with different configurations and updates.


## PostService

The `PostService` class you introduced is responsible for handling post-related operations such as publishing, creating, updating and searching. I will explain each of the methods present in the class:

This `PostService` class encapsulates the business logic related to posts and makes use of other classes, such as `PostPublisher`, `FavoritePostCommand`, `Favorite`, `UserRepository` and `PostRepository`, to perform its operations. It provides convenient methods to perform post publish, create, update and search operations, ensuring that business rules are respected.

psql -U <usuário> -d <banco de dados>
psql -U root -d test
