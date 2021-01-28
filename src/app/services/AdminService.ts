import { SigninDataUser } from "@/app/models/signin/SigninDataUser";
import { apiService } from "@/app/services/ApiService"
import { User } from "../models/user/User";
import { Pageable } from "../models/pagination/Pageable";
import { Page } from "../models/pagination/Page";
import { PageOptions } from "../models/pagination/PageOptions";

class AdminService {
    private static readonly ENDPOINT_ADMIN = "/api/admin/utilisateurs";

    async getAllUsers(options: PageOptions): Promise<Page<User>> {

      const params = Pageable.of(options).toQueryParams();
      return await apiService.get(AdminService.ENDPOINT_ADMIN, params);
    }
    
      async updateUser(idUser: string, data: object){
        const url = `${AdminService.ENDPOINT_ADMIN}/${idUser}`;
        return await apiService.put(url, data)
      }
    
      async deleteUser(idUser: string){
        const url = `${AdminService.ENDPOINT_ADMIN}/${idUser}`;
        return await apiService.delete(url)
      }

    async createUserAccount(data: SigninDataUser) {
        await apiService.post("/api/auth/inscription", data);
    }
}

export const adminService = new AdminService()
