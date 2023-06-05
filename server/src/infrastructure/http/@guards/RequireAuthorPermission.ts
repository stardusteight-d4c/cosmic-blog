import { SessionTokenAdapter } from "@/application/adapters/SessionTokenAdapter";
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import jwt from "jsonwebtoken";

@Injectable()
export class RequireAuthorPermission implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const authorization = context.switchToHttp().getRequest()
      .headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException("missing authorization header");
    }
    const sessionTokenAdapter = new SessionTokenAdapter(jwt);
    const decoded = sessionTokenAdapter.verifySessionToken(authorization);
    if (decoded && decoded.type === "reader") {
      throw new ForbiddenException(
        "type (reader) users are not authorized to publish posts",
      );
    }
    return true;
  }
}
