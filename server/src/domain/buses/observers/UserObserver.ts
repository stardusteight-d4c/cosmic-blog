import UserService from "../../services/UserService";
import ICommand from "../commands/ICommand";
import { FavoritePostCommand } from "../commands/UserCommand";
import IObserver from "./IObserver";

export default class UserObserver implements IObserver {
  operations: string[] = ["favorite_post_command"];
  constructor(readonly userService: UserService) {}

  async notifyService(command: ICommand): Promise<void> {
    if (command.operation === "favorite_post_command") {
      await this.userService.eventHandlerFavoritePostCommand(
        command as FavoritePostCommand,
      );
    }
  }
}

// aí no PostObserver nos favoritados apenas retirar ou colocar o id do úsuario
// const account = this.accountRepository.get(command.accountDocument);
// if (account) {
//   account[this.operation](command.amount);
// }
