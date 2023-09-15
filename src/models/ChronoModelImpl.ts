import { COUNTDOWN_COEFFICIENT, MAX_CHRONO_VALUE, MIN_CHRONO_VALUE } from "../constants";
import { Chrono } from "../types/enums/chrono-enum";
import { IChronoModel } from "../types/models/ChronoModel";

class ChronoModelImpl implements IChronoModel {
    private static DEFAULT_CHRONO_VIEW = "00";

    private _hours: number = MIN_CHRONO_VALUE;
    private _minutes: number = MIN_CHRONO_VALUE;
    private _seconds: number = MIN_CHRONO_VALUE;

    private static _instance: IChronoModel;
    private constructor() {}

    static getInstance() {
        if (!ChronoModelImpl._instance) {
            ChronoModelImpl._instance = new ChronoModelImpl();
        }
        return ChronoModelImpl._instance;
    }

    setChrono(chronoType: Chrono, value: number) {
        if (chronoType === Chrono.HOURS) this._hours = value;
        if (chronoType === Chrono.MINUTES) this._minutes = value;
        if (chronoType === Chrono.SECONDS) this._seconds = value;
    }

    reduceChrono(timeUpCallback: () => void): void {
        if (this._seconds > MIN_CHRONO_VALUE) {
            this._seconds -= COUNTDOWN_COEFFICIENT;
        } else if (this._minutes > MIN_CHRONO_VALUE) {
            this._minutes -= COUNTDOWN_COEFFICIENT;
            this._seconds = MAX_CHRONO_VALUE;
        } else if (this._hours > MIN_CHRONO_VALUE) {
            this._hours -= COUNTDOWN_COEFFICIENT;
            this._minutes = MAX_CHRONO_VALUE;
            this._seconds = MAX_CHRONO_VALUE;
        } else {
            timeUpCallback();
        }
    }

    get hoursValue(): number {
        return this._hours;
    }

    get minutesValue(): number {
        return this._minutes;
    }

    get secondsValue(): number {
        return this._seconds;
    }

    get hoursView(): string {
        return this._hours ? this._hours.toString() : ChronoModelImpl.DEFAULT_CHRONO_VIEW;
    }

    get minutesView(): string {
        return this._minutes ? this._minutes.toString() : ChronoModelImpl.DEFAULT_CHRONO_VIEW;
    }

    get secondsView(): string {
        return this._seconds ? this._seconds.toString() : ChronoModelImpl.DEFAULT_CHRONO_VIEW;
    }
}


/**
 * This function return Singleton!
 * @returns ChronoModelImpl
 */
export function chronoModelFactory(): IChronoModel {
    return ChronoModelImpl.getInstance();
}
