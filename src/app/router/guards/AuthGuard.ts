import { NavigationGuard } from "vue-router";

import { authStoreModule } from '@/app/store/auth';
import { authService } from '@/app/services/AuthService'
import { commonService } from '@/app/services/CommonService'
import { rootStoreModule } from "@/app/store/root";

async function tryAutoLogin() {
  /* authStoreModule.setIsAutoLogin(true); // Activation de la page de chargement */
  const user = await authService.autoLogin();
  if (user) {
    authStoreModule.loginSuccess(user);

    try {
      const avatar = await commonService.getUserAvatar();
      authStoreModule.setUserAvatar(avatar);
    } catch (error) {
      rootStoreModule.setErrorMessage(error);
    }
  }
  /* authStoreModule.setIsAutoLogin(false); //Désactivation de la page de chargement */
}


export const authGuard: NavigationGuard<any> = async function(to, from, next) {
    if (!authStoreModule.user) {
        await tryAutoLogin();
    }
    next()
};

