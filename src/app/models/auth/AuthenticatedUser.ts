import { AuthConstants } from '@/app/constants/AuthConstants'

export class AuthenticatedUser {
    constructor(
        public id: number,
        public nom: string,
        public prenom: string,
        public username: string,
        public email: string,
        public roles: string[],
        public timeUntilTokenExpiresInMillis: number
    ){}

    get timeBeforeShowingLogoutAlert(): number {
        return (
          this.timeUntilTokenExpiresInMillis -
          AuthConstants.LOGOUT_ALERT_DURATION_MILLIS
        );
    }

    get fullName(): string {
        return `${this.prenom} ${this.nom}`;
    }
    
    get initials(): string {
        return `${this.prenom.charAt(0)}${this.nom.charAt(0)}`.toUpperCase();
      }
}