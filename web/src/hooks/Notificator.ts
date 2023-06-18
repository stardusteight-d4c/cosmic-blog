import { store } from "@/store";
import { notificationMethods } from "@/store/modules/notification";

type Notificator = {
  notify: (type: NotificationType, content: string, title?: string) => void;
};

export default (): Notificator => {
  const notify = (
    type: NotificationType,
    content: string,
    title?: string
  ): void => {
    store.commit(notificationMethods.mutations.notify, {
      title,
      content,
      type,
    });
  };
  return {
    notify,
  };
};
