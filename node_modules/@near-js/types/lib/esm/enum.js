// TODO determine why subclassing is still necessary even though `enum`
//  cannot be set in the base class or it will not be borsh-serializable
export class Enum {
    constructor(properties) {
        if (Object.keys(properties).length !== 1) {
            throw new Error('Enum can only take single value');
        }
        Object.keys(properties).map((key) => {
            this[key] = properties[key];
        });
    }
}
