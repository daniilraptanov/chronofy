import { COUNTDOWN_COEFFICIENT, MAX_CHRONO_VALUE, MIN_CHRONO_VALUE } from "../constants";
import { Chrono } from "../types/enums/chrono-enum";
import { IChronoModel } from "../types/models/ChronoModel";

class ChronoModelImpl implements IChronoModel {
    private static DEFAULT_CHRONO_VIEW = "00";

    private _hours: number = MIN_CHRONO_VALUE;
    private _minutes: number = MIN_CHRONO_VALUE;
    private _seconds: number = MIN_CHRONO_VALUE;

    private _initialHours: number = MIN_CHRONO_VALUE;
    private _initialMinutes: number = MIN_CHRONO_VALUE;
    private _initialSeconds: number = MIN_CHRONO_VALUE;

    private static _instance: IChronoModel;
    private constructor() {}

    private getCorrectlyView(value: number): string {
        if (value <= 9) {
            return "0" + value;
        }
        return value.toString();
    }

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

    resetChrono(): void {
        this._hours = MIN_CHRONO_VALUE;
        this._minutes = MIN_CHRONO_VALUE;
        this._seconds = MIN_CHRONO_VALUE;
    }

    setInitialChronoByCurrent(): void {
        this._initialHours = this._hours;
        this._initialMinutes = this._minutes;
        this._initialSeconds = this._seconds;
    }

    restoreChronoByInitial(): void {
        this._hours = this._initialHours;
        this._minutes = this._initialMinutes;
        this._seconds = this._initialSeconds;
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
        return this._hours ? this.getCorrectlyView(this._hours) : ChronoModelImpl.DEFAULT_CHRONO_VIEW;
    }

    get minutesView(): string {
        return this._minutes ? this.getCorrectlyView(this._minutes) : ChronoModelImpl.DEFAULT_CHRONO_VIEW;
    }

    get secondsView(): string {
        return this._seconds ? this.getCorrectlyView(this._seconds) : ChronoModelImpl.DEFAULT_CHRONO_VIEW;
    }
}


/**
 * 
 * @param hours number
 * @param minutes number
 * @param seconds number
 * @returns This function return Singleton of ChronoModelImpl!
 */
export function chronoModelFactory(): IChronoModel {
    return ChronoModelImpl.getInstance();
}
