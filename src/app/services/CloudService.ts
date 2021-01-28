import { apiService } from "../services/ApiService";
import { File } from "../models/cloud/File";
import { Content } from "../models/cloud/Content";

class CloudService {

    private static readonly ENDPOINT_CLOUD = "/api/cloud";

    async displayContent(url: string): Promise<Content<File>>{
        const params = new URLSearchParams();
        params.append("dirName", url)
        return await apiService.get(`${CloudService.ENDPOINT_CLOUD}/getContent`, params);
    }

}

export const cloudService = new CloudService();