export class SigninDataUser {
    constructor(
        public nom: string,
        public prenom: string,
        public email: string,
        public username: string, 
        public password: string,
        public role: string[]) {}
}
