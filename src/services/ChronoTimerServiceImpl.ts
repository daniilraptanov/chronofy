import {
  MILLISECONDS_IN_ONE_SECOND,
  SECONDS_IN_ONE_HOUR,
  SECONDS_IN_ONE_MINUTE,
} from "../constants";
import { IChronoModel } from "../types/models/ChronoModel";
import { IChronoTimerService } from "../types/services/ChronoTimerService";

class ChronoTimerServiceImpl implements IChronoTimerService {
  private _timer: NodeJS.Timeout;

  private static _instance: IChronoTimerService;
  private constructor() {}

  static getInstance() {
    if (!ChronoTimerServiceImpl._instance) {
      ChronoTimerServiceImpl._instance = new ChronoTimerServiceImpl();
    }
    return ChronoTimerServiceImpl._instance;
  }

  private getCountdownCallback(
    chronoModel: IChronoModel,
    callback: () => void
  ) {
    return () => {
      chronoModel.reduceChrono(() => clearInterval(this._timer));
      callback();
    };
  }

  private getCountdownDelay(chronoModel: IChronoModel) {
    return (
      (chronoModel.hoursValue * SECONDS_IN_ONE_HOUR +
        chronoModel.minutesValue * SECONDS_IN_ONE_MINUTE +
        chronoModel.secondsValue) *
      MILLISECONDS_IN_ONE_SECOND
    );
  }

  startTimer(chronoModel: IChronoModel, updateCallback: () => void): void {
    this._timer = setInterval(
      this.getCountdownCallback(chronoModel, updateCallback),
      MILLISECONDS_IN_ONE_SECOND
    );
  }

  stopTimer(): void {}

  resetTimer(): void {}
}


/**
 * This function return Singleton!
 * @returns ChronoTimerServiceImpl
 */
export function chronoTimerServiceFactory(): IChronoTimerService {
  return ChronoTimerServiceImpl.getInstance();
}
