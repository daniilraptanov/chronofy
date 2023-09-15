import { Chrono } from "../types/enums/chrono-enum";
import { IChronoModel } from "../types/models/ChronoModel";

class ChronoModelImpl implements IChronoModel {
    private static DEFAULT_CHRONO_VIEW = "00";

    private _hours: number = 0;
    private _minutes: number = 0;
    private _seconds: number = 0;

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
