import { INotificationService } from "../types/services/NotificationService";

class NotificationServiceImpl implements INotificationService {
  private static _instance: INotificationService;
  private isGranted = false;
  private notificationTitle = "Chronofy";

  private constructor() {
    if (!("Notification" in window)) {
      throw this.getNotSupportError();
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          throw this.getNotGrantedError();
        } else {
          this.isGranted = true;
        }
      });
    }
  }

  static getInstance() {
    if (!NotificationServiceImpl._instance) {
      NotificationServiceImpl._instance = new NotificationServiceImpl();
    }
    return NotificationServiceImpl._instance;
  }

  private getNotGrantedError() {
    return new Error("Notification permission not granted.");
  }

  private getNotSupportError() {
    return new Error("This browser does not support desktop notification");
  }

  notifyUser(message) {
    if (!this.isGranted) {
      throw this.getNotGrantedError();
    }

    new Notification(this.notificationTitle, {
      body: message,
    });
  }
}

/**
 * This function return Singleton!
 * @returns NotificationServiceImpl
 */
export default function notificationServiceFactory(): INotificationService {
  return NotificationServiceImpl.getInstance();
}
