import { Chrono } from "./types/enums/chrono-enum";
import { ChronoParams } from "./types/enums/chrono-params-enum";

export function getChronoParamByChronoType(chrono: Chrono): ChronoParams {
    switch (chrono) {
        case Chrono.HOURS:
            return ChronoParams.HOURS;
        case Chrono.MINUTES:
            return ChronoParams.MINUTES;
        case Chrono.SECONDS:
            return ChronoParams.SECONDS;
        default:
            return;
    }
}
