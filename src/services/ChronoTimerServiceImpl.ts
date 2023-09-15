import {
  MILLISECONDS_IN_ONE_SECOND,
  SECONDS_IN_ONE_HOUR,
  SECONDS_IN_ONE_MINUTE,
} from "../constants";
import { IChronoModel } from "../types/models/ChronoModel";
import { IChronoTimerService } from "../types/services/ChronoTimerService";

class ChronoTimerServiceImpl implements IChronoTimerService {
  private getCountdownCallback(chronoModel: IChronoModel, callback: () => void) {
    return () => {
        chronoModel.reduceChrono();
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
    const onSecondTimer = setInterval(this.getCountdownCallback(chronoModel, updateCallback), MILLISECONDS_IN_ONE_SECOND);
    const totalTimer = setTimeout(() => console.log("total"), this.getCountdownDelay(chronoModel));
  }

  stopTimer(): void {}

  resetTimer(): void {}
}

export function chronoTimerServiceFactory(): IChronoTimerService {
  return new ChronoTimerServiceImpl();
}
