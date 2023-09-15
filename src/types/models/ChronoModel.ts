import { Chrono } from "../enums/chrono-enum";

export interface IChronoModel {
    readonly hoursValue: number;
    readonly minutesValue: number;
    readonly secondsValue: number;

    readonly hoursView: string;
    readonly minutesView: string;
    readonly secondsView: string;

    setChrono(chronoType: Chrono, value: number);
    resetChrono(): void;

    reduceChrono(timeUpCallback: () => void): void;
}
