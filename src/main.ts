import 'reflect-metadata'

import { Container } from './lib/container'
import './style.css'
import { Example } from './mock/example'


const container = new Container()

container.register(Example, () => new Example("gay"))