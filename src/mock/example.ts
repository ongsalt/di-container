import { LogMethod } from "../lib/decorator";

export class Example {
    constructor(private name: string) {}

    @LogMethod
    sayHi(a: string) {
        console.log(`Hi ${this.name} ${a}!`)
    }
}
