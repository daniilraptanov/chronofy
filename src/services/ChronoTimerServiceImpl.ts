import { MILLISECONDS_IN_ONE_SECOND } from "../constants";
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

  startTimer(chronoModel: IChronoModel, updateCallback: () => void): void {
    this._timer = setInterval(
      this.getCountdownCallback(chronoModel, updateCallback),
      MILLISECONDS_IN_ONE_SECOND
    );
  }

  stopTimer(): void {
    clearInterval(this._timer);
  }

  resetTimer(chronoModel: IChronoModel): void {
    clearInterval(this._timer);
    chronoModel.resetChrono();
  }
}


/**
 * This function return Singleton!
 * @returns ChronoTimerServiceImpl
 */
export function chronoTimerServiceFactory(): IChronoTimerService {
  return ChronoTimerServiceImpl.getInstance();
}
