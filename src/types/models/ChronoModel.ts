import { Chrono } from "../enums/chrono-enum";

export interface IChronoModel {
    readonly hours: string;
    readonly minutes: string;
    readonly seconds: string;

    setChrono(chronoType: Chrono, value: number);
}
