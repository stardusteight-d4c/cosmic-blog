import { decodedToken } from "@/@interfaces/auth";
import { getSessionCookie } from "./getSessionCookie";
import jwt_decode from "jwt-decode";
import { IAuthState } from "@/store/modules/auth";

export function handleSection(state: IAuthState) {
  const sessionCookie = getSessionCookie();
  if (!sessionCookie) {
    state.session = {
      activeSession: false,
      token: undefined,
      decodedToken: undefined,
    };
  } else {
    try {
      const decodedToken: decodedToken = jwt_decode(sessionCookie);
      if (decodedToken?.user_id) {
        state.session = {
          activeSession: true,
          token: sessionCookie,
          decodedToken: decodedToken,
        };
      }
    } catch (error) {
      state.session = {
        activeSession: false,
        token: undefined,
        decodedToken: undefined,
      };
    }
  }
}
