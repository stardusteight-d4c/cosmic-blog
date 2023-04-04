
export interface IAuthReflectObject {
  id?: string;
}

export interface IAuthRepository {}

export interface IAuthService {}

export class Auth {
  #id: string;

  constructor(properties: IAuthReflectObject) {
    this.#id = properties.id!;
  }

  public get reflect(): IAuthReflectObject {
    return {
      id: this.#id,
    };
  }
}
