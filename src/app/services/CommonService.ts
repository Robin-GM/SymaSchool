import { User } from "../models/user/User";

import { apiService } from "../services/ApiService";

class CommonService {
    private static readonly ENDPOINT = "/api/common";

    /* async getUserAvatar(): Promise<string> {
        const url = `${CommonService.ENDPOINT}/avatar`;
        return await apiService.get(url);
    } */
        //En attendant que l'api soit implémentée
        getUserAvatar(){
            return "";
        }
    
      async updateUserAvatar(avatar: string) {
        const url = `${CommonService.ENDPOINT}/avatar`;
        await apiService.patch(url, { avatar });
    }
  
}

export const commonService = new CommonService();