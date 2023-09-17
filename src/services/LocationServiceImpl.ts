import { ILocationService } from "../types/services/LocationService";

class LocationServiceImpl implements ILocationService {
    private getURLParams() {
        return new URLSearchParams(window.location.search);
    }

    private getNewURL() {
        return new URL(window.location.href);
    }

    parseParam(param: string): string | number {
        return this.getURLParams().get(param);
    }

    pushParam(param: string, value: string | number): void {
        const url = this.getNewURL()
        url.searchParams.set(
            param, typeof value === "number" ? value.toString() : value
        );
        window.history.replaceState({}, "", url.toString());
    }
}

export default function locationServiceFactory(): ILocationService {
    return new LocationServiceImpl();
}
