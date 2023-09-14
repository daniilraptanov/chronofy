import { Chrono } from "../enums/chrono-enum";

export interface IChronoModel {
    readonly hours: number;
    readonly minutes: number;
    readonly seconds: number;

    setChrono(chronoType: Chrono, value: number);
}
