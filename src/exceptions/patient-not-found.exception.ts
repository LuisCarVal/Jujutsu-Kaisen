export class CharacterNotFoundException extends Error {
    constructor(message){
        super(message);
        this.message = `Character Not Found Exception`;
    }
}