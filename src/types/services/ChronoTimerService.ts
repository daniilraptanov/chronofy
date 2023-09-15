import { IChronoModel } from "../models/ChronoModel";

export interface IChronoTimerService {
    startTimer(chronoModel: IChronoModel, updateCallback: () => void): void;
    stopTimer(): void;
    resetTimer(chronoModel: IChronoModel): void;
}
