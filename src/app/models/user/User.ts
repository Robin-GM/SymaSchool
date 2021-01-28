export class User {
  constructor(
    public id: string,
    public nom: string,
    public prenom: string,
    public email: string,
    public username: string,
    public password: string,
    public roles: string[]
  ) {}
}