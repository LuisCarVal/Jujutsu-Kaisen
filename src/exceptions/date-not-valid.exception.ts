export class DateNotValidException extends Error {
    constructor(message){
        super(message);
        this.message = `Date not valid`;
    }
}