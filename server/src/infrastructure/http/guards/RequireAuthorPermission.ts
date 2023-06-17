import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { JWTSessionTokenAdapter } from "@infra/adapters";

@Injectable()
export class RequireAuthorPermission implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext): boolean {
    const authorization = context.switchToHttp().getRequest()
      .headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException("missing authorization header");
    }
    const sessionTokenAdapter = new JWTSessionTokenAdapter();
    const decoded = sessionTokenAdapter.verifySessionToken(authorization);
    if (decoded && decoded.type === "reader") {
      throw new ForbiddenException(
        "type (reader) users are not authorized to publish posts"
      );
    }
    return true;
  }
}
