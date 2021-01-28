import jwtDecode from "jwt-decode";

import { LoginCredentials } from "@/app/models/auth/LoginCredentials";
import { AuthenticatedUser } from "@/app/models/auth/AuthenticatedUser";
import { apiService } from "@/app/services/ApiService";
import { AccessTokenClaims } from "@/app/models/auth/AccessTokenClaims";
import { AccessTokenDataUser } from "@/app/models/auth/AccessTokenDataUser";
import { AuthConstants } from '../constants/AuthConstants';

interface LoginResponse {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    username: string;
    roles: string[];
    accessToken: string;
}
interface AutoLoginResponse {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    username: string;
    roles: string[];
}


class AuthService{
    private static TOKEN_KEY = "accessToken";

    async login(credentials: LoginCredentials): Promise<AuthenticatedUser> {
        const response = await apiService.post<LoginResponse>("api/auth/connexion", credentials);

        const accessToken = response.accessToken;
        this.storeToken(accessToken);
        apiService.setRequestAuthorizationHeader(accessToken);
        
        //Obtenir les claims pour avoir la date d'expiration du token
        const claims = this.getClaims(accessToken);

        const dataUser = this.getDataUserFromResponse(response)

        const user = this.getUserFromData(claims, dataUser)

        return user;
    }

    async autoLogin(): Promise<AuthenticatedUser | null> {
        const accessToken = this.getToken();

        if (!accessToken) {
            return null;
        }

        const claims = this.getClaims(accessToken);
        
        const timeUntilTokenExpires = this.getTimeUntilTokenExpiresInMillis(
            claims.exp
        );
        if (timeUntilTokenExpires < AuthConstants.MIN_TOKEN_DURATION_MILLIS) {
            this.removeToken();
            return null;
        }
        
        const usernameCurrentUser = claims.sub;
        const getDataUserByUsername = await apiService.get<AutoLoginResponse>(
            `api/auth/autologin/${usernameCurrentUser}`);
            //TODO problème de sécurité car toute personne connectée peut récupérer les infos de n'importe quel user.

        apiService.setRequestAuthorizationHeader(accessToken);

        return this.getUserFromData(claims, getDataUserByUsername);
    }

    private getUserFromData(claim: AccessTokenClaims, data: AccessTokenDataUser): AuthenticatedUser {
        const timeUntilTokenExpires = this.getTimeUntilTokenExpiresInMillis(
        claim.exp
        );
    
        return new AuthenticatedUser(
            data.id,
            data.nom,
            data.prenom,
            data.username,
            data.email,
            data.roles,
            timeUntilTokenExpires
        );
    }

    private getClaims(accessToken: string): AccessTokenClaims {
        return jwtDecode<AccessTokenClaims>(accessToken);
    }

    private getDataUserFromResponse(response: any): AccessTokenDataUser {
        return new AccessTokenDataUser(
            response.id,
            response.nom,
            response.prenom,
            response.email,
            response.username,
            response.roles
        );
    }

    private getTimeUntilTokenExpiresInMillis(tokenExporationTime: number): number {
        const expirationDate = new Date(tokenExporationTime * 1000);
        const now = new Date();
        if (now >= expirationDate) {
            return 0;
        }

        return expirationDate.getTime() - now.getTime();
    }
    
    private storeToken(accessToken: string) {
        localStorage.setItem(AuthService.TOKEN_KEY, accessToken);
    }

    private getToken(): string | null {
        return localStorage.getItem(AuthService.TOKEN_KEY);
    }
    
    removeToken() {
        localStorage.removeItem(AuthService.TOKEN_KEY);
    }
}

export const authService = new AuthService();
