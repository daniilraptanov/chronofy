import { Chrono } from "../enums/chrono-enum";

export interface IChronoModel {
    readonly hoursView: string;
    readonly minutesView: string;
    readonly secondsView: string;

    setChrono(chronoType: Chrono, value: number);
}
