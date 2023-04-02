import { User, UserObject, UserRepository } from "../entities/User";
import { UserBuilder } from "../builders/UserBuilder";
import Validators from "../../utils/validators";

export default class UserService {
  #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  public async createUser(user: UserObject): Promise<User> {
    const newUser = new UserBuilder()
      .setEmail(user.email)
      .setUsername(user.username)
      .setPassword(user.password)
      .build();
    await this.#userRepository.createUser(newUser);
    return newUser;
  }

  public async deleteUser(userId: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    const userExists = await this.#userRepository.findUserById(userId);
    if (userExists) {
      const deletedUser = await this.#userRepository.deleteUser(userId);
      return deletedUser;
    } else {
      throw new Error(`The user with ID: ${userId} was not found.`);
    }
  }

  public async findUserById(userId: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    return await this.#userRepository.findUserById(userId);
  }

  public async findUserByEmail(userEmail: string): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: userEmail, type: "string" });
    Validators.validateEmail(userEmail);
    return await this.#userRepository.findUserByEmail(userEmail);
  }

  public async changeEmail(data: {
    userId: string;
    confirmationPassword: string;
    newEmail: string;
  }): Promise<User | undefined> {
    Validators.checkPrimitiveType({ validating: data.userId, type: "string" });
    Validators.validateEmail(data.newEmail);
    const user = await this.#userRepository.findUserById(data.userId);
    if (user) {
      Validators.compareCurrentPassword({
        inputPassword: data.confirmationPassword,
        currentPassword: user.password,
      });
      
      const updatedUser = new UserBuilder()
        .setId(user.object.id!)
        .setEmail(data.newEmail)
        .setUsername(user.object.username)
        .setPassword(user.object.password)
        .build();
      const changedUser = await this.#userRepository.changeEmail(updatedUser);
      return changedUser;
    } else {
      throw new Error(`The user with ID: ${data.userId} was not found.`);
    }
  }
}
