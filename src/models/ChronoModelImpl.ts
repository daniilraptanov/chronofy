import { Chrono } from "../types/enums/chrono-enum";
import { IChronoModel } from "../types/models/ChronoModel";

export class ChronoModelImpl implements IChronoModel {
    hours: number;
    minutes: number;
    seconds: number;

    setChrono(chronoType: Chrono, value: number) {
        if (chronoType === Chrono.HOURS) this.hours = value;
        if (chronoType === Chrono.MINUTES) this.minutes = value;
        if (chronoType === Chrono.SECONDS) this.seconds = value;
    }
}
