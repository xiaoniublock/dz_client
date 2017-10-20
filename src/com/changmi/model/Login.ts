class Login {
    //账号
    private _account: string;
    //密码
    private _password: string;
    //验证码
    private _verificationCode: string;
    public get account(): string {
        return this._account;
    }

    public set account(account: string) {
        this._account = account;
    }
    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }
    public get verificationCode(): string {
        return this._verificationCode;
    }

    public set verificationCode(verificationCode: string) {
        this._verificationCode = verificationCode;
    }
}