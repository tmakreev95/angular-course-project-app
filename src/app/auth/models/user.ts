export class User {
    public email: string;
    public id: string;
    private _token: string;
    private _tokenExpirationDate: Date;

    constructor(email, id, _token, _tokenExpirationDate) {
        this.email = email;
        this.id = id;
        this._token = _token;
        this._tokenExpirationDate = _tokenExpirationDate;
    }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
