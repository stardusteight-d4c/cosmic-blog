import { AppState } from "@/store";
import { Store } from "vuex";
import { getSinglePropertyValue } from "./getSinglePropertyValue";
import { removeObjEmptyValues } from "./removeObjEmptyValues";

export function updateSocialLinks(request: {
  store: Store<AppState>;
  payload: ISocialLinks;
}) {
  const { store, payload } = request;
  let updatedUserData: IUser;
  const userData = store.state.profile.user;
  const payloadValue = getSinglePropertyValue(payload);
  updatedUserData = {
    ...userData,
    socialLinks: {
      ...userData.socialLinks,
      ...payload,
    },
  };
  if (payloadValue === "") {
    removeObjEmptyValues(updatedUserData.socialLinks);
  }
  return updatedUserData;
}
