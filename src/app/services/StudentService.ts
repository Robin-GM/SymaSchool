import { User } from "../models/user/User";

import { apiService } from "../services/ApiService";

class StudentService {
    private static readonly ENDPOINT_STUDENT = "/api/eleve";

    async getStudentUsers(): Promise<User[]> {
        return await apiService.get(`${StudentService.ENDPOINT_STUDENT}/utilisateurs`);
      }
  
}

export const studentService = new StudentService();
