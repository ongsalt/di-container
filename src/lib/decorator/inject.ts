import "reflect-metadata";
import { INJECT } from "../constant";

// mark as to be inject
export function Inject(name: string = "default") {
    return function decorator(target: any) {
        Reflect.defineMetadata(INJECT, true, target)
    }
}
