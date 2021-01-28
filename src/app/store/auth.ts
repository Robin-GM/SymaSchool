import {
    Action,
    getModule,
    Module,
    Mutation,
    VuexModule
  } from "vuex-module-decorators";

import { AuthenticatedUser } from '@/app/models/auth/AuthenticatedUser'
import { authService } from '../services/AuthService';
import { store } from "./index";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants"
import { router } from '../router';


@Module({ dynamic: true, namespaced: true, name: "auth", store })
class AuthStoreModule extends VuexModule{
  logoutTimerRef: NodeJS.Timeout |null = null;
  user: AuthenticatedUser | null = null;
  userAvatar: string | null = null;
  showLogoutAlert = false;

  //pour afficher une page de chargement pendant l'autoLogin
/*   isAutoLogin = false;
 @Mutation
  setIsAutoLogin(isAutoLogin: boolean) {
    this.isAutoLogin = isAutoLogin;
  } */
  
      
  @Mutation
  setAuthenticatedUser(authenticatedUser: AuthenticatedUser) {
    this.user = authenticatedUser;
  }
  
  @Mutation
  setUserAvatar(avatar: string) {
    this.userAvatar = avatar;
  }

  @Mutation
  setLogoutTimerRef(timerRef: NodeJS.Timeout) {
    this.logoutTimerRef = timerRef;
  }

  @Mutation
  logoutAlertTimerDone() {
    this.showLogoutAlert = true;
  }

  @Mutation
  resetState(){
    this.user = null;
    this.logoutTimerRef = null;
    this.showLogoutAlert = false;
  }

  @Action
  loginSuccess(user: AuthenticatedUser) {
    setTimeout(() => {
      this.logoutAlertTimerDone();
    }, user.timeBeforeShowingLogoutAlert);

    const timerRef = setTimeout(() => {
      this.logout();
      this.redirectToLoginPage();
    }, user.timeUntilTokenExpiresInMillis)

    this.setLogoutTimerRef(timerRef);
    this.setAuthenticatedUser(user);
  }

  @Action
  logout() {
    if (this.logoutTimerRef) {
      clearTimeout(this.logoutTimerRef)
    }

    authService.removeToken();
    this.resetState();
  }

  @Action
  redirectToLoginPage() {
    router.replace({
      name : RouteNameConstants.LOGIN
    })
  }
}

  export const authStoreModule = getModule(AuthStoreModule);