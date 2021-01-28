export class AccessTokenDataUser {
    constructor(
        public id: number,
        public nom: string,
        public prenom: string,
        public username: string,
        public email: string,
        public roles: string[],
    ){}
}