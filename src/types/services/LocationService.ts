export interface ILocationService {
    parseParam(param: string): string | number;
    pushParam(param: string, value: string | number): void;
}
