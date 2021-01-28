import { User } from "../models/user/User";

import { apiService } from "../services/ApiService";

class TeacherService {
    private static readonly ENDPOINT_TEACHER = "/api/prof";

    async getTeacherUsers(): Promise<User[]> {
        return await apiService.get(`${TeacherService.ENDPOINT_TEACHER}/utilisateurs`);
      }
  
}

export const teacherService = new TeacherService();