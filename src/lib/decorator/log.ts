export function LogMethod(
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) {
    const metadata = Reflect.getMetadata("design:paramtypes", target, propertyKey)
    console.log({ target, propertyKey, descriptor, metadata });
}
