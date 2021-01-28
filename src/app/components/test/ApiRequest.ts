import { apiService } from "@/app/services/ApiService"
import { User } from "../../models/user/User";
import { Pageable } from "../../models/pagination/Pageable";
import { Page } from "../../models/pagination/Page";
import { PageOptions } from "../../models/pagination/PageOptions";

class AdminTestService {
    private static readonly ENDPOINT_ADMIN = "/api/eleve/test";

    async getAllUsers(options: PageOptions): Promise<Page<User>> {

        const params = Pageable.of(options).toQueryParams();
        return await apiService.get(AdminTestService.ENDPOINT_ADMIN, params);
      }

}

export const adminTestService = new AdminTestService()