import 'reflect-metadata'

import { Container } from './lib/container'
import { Example } from './mock/example'
import { NoDependency } from './mock/NoDependency'

const container = new Container()
container.register(NoDependency, resolver => new NoDependency())
container.bind(Example)
const i = container.make(Example)
i?.sayHi("s")


