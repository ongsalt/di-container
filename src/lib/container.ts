import { INJECT } from "./constant"

type Initializer<T = any> = (resolver: Resolver) => T
type Constructor<T> = new (...params: any[]) => T
type Instance = Object
// type Key<T> = Constructor<T> | string | symbol
type Key<T> = Constructor<T>

interface Resolver {
    make<T = any>(key: new () => T | any): T | undefined
}

export class Container implements Resolver {
    // Literally anything can be threre
    private instances = new Map<Constructor<unknown>, any>()
    private initializers = new Map<any, Initializer>()
    private aliases = new Map<any, any>()

    // todo: auto resolve Class constructor from instance
    register<T>(key: Constructor<T>, initializer: Initializer<T>) {
        this.instances.set(
            key,
            initializer(this)
        )
    }

    make<T>(key: Key<T>): T | undefined {
        // todo: lazily create class
        // todo: alias lookup
        return this.instances.get(key)
    }

    // for auto inject
    bind<T>(clazz: Constructor<T>) {
        if (!this.canBeInjected(clazz)) {
            throw new Error(`Class ${clazz.name} can not be auto injected`)
        }

        const dependencies = this.getDependencies(clazz)

        // console.log(dependencies)
        if (dependencies.length === 0) {
            this.instances.set(clazz, new clazz())
            return
        }

        // try to make each of dependencies if not exist
        // check if all of them is already exist or can be auto create
        const params = dependencies.map(it => {
            // todo: alias lookup
            if (this.instances.has(it)) {
                return this.instances.get(it)
            } else if (this.canBeInjected(it)) {
                this.bind(it)
                return this.make(it)
            } else {
                if (it.name === "Object") {
                    throw new Error("Please import entire dependency class instead of 'import type'")
                }
                throw new Error(`${clazz.name}'s Dependency of type ${it.name} can not be auto injected`)
            }
        })

        this.instances.set(clazz, new clazz(...params))
    }

    getDependencies(target: any): Constructor<unknown>[] {
        return Reflect.getMetadata("design:paramtypes", target) ?? []
    }


    private canBeInjected(target: any): boolean {
        return !!Reflect.getMetadata(INJECT, target)
    }
}