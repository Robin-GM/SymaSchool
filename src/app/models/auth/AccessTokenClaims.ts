export class AccessTokenClaims {
    constructor(
        public sub: string,
        public exp: number,
    ){}
}