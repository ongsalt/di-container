export class Container {
    // Literally anything can be threre
    private instances = new Map<any, any>()
    private initializers = new Map<any, () => any>()
    // private aliases = new Map<any, any>()

    get<T = any>(key: new () => T | any): T | undefined {
        const initializer = this.initializers.get(key)
        if (initializer) {
            const instance = initializer()
            this.instances.set(key, instance)
            this.initializers.delete(key)
            return instance
        }
        return this.instances.get(key)
    }

    register(key: any, initializer: () => any) {
        this.initializers.set(key, initializer)
    }

    // autoRegister<T>(key: any, clazz: new (...params: any) => T) {

    // }
}