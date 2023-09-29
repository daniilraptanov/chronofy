import { MILLISECONDS_IN_ONE_SECOND } from "../constants";
import { IChronoModel } from "../types/models/ChronoModel";
import { IChronoTimerService } from "../types/services/ChronoTimerService";
import { INotificationService } from "../types/services/NotificationService";
import notificationServiceFactory from "./NotificationServiceImpl";

class ChronoTimerServiceImpl implements IChronoTimerService {
  private _timer: NodeJS.Timeout;
  private notificationService: INotificationService;

  private static _instance: IChronoTimerService;
  private constructor() {
    this.notificationService = notificationServiceFactory();
  }

  static getInstance() {
    if (!ChronoTimerServiceImpl._instance) {
      ChronoTimerServiceImpl._instance = new ChronoTimerServiceImpl();
    }
    return ChronoTimerServiceImpl._instance;
  }

  private getCountdownCallback(
    chronoModel: IChronoModel,
    callback: () => void,
    restart?: boolean,
  ) {
    return () => {
      chronoModel.reduceChrono(() => {
        clearInterval(this._timer);
        this.notificationService.notifyUser("Time is up!");

        if (restart) {
          chronoModel.restoreChronoByInitial();
          this.startTimer(chronoModel, callback);
        }
      });
      callback();
    };
  }

  startTimer(chronoModel: IChronoModel, updateCallback: () => void, loop?: boolean): void {
    chronoModel.setInitialChronoByCurrent();
    this._timer = setInterval(
      this.getCountdownCallback(chronoModel, updateCallback, loop),
      MILLISECONDS_IN_ONE_SECOND
    );
    this.notificationService.notifyUser("Time started!");
  }

  stopTimer(): void {
    clearInterval(this._timer);
    this.notificationService.notifyUser("Time stopped!");
  }

  resetTimer(chronoModel: IChronoModel): void {
    clearInterval(this._timer);
    chronoModel.resetChrono();
    this.notificationService.notifyUser("Time reset!");
  }
}


/**
 * This function return Singleton!
 * @returns ChronoTimerServiceImpl
 */
export function chronoTimerServiceFactory(): IChronoTimerService {
  return ChronoTimerServiceImpl.getInstance();
}
