type NotificationType = "SUCCESS" | "ERROR" | "WARNING";

interface INotification {
  title: string;
  content: string;
  type: NotificationType;
  id: number;
}
