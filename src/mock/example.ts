import { Inject } from "../lib/decorator/inject";
import { NoDependency } from "./NoDependency";

@Inject()
export class Example {
    constructor(private name: NoDependency) {}

    sayHi(a: string) {
        console.log(`Hi ${this.name.makeString()} ${a}!`)
    }
}
