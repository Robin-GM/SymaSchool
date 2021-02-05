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

    //modifyName(dirName | fileName, newName)
    //createDir(dirName, pathLocationName)
    //deleteDir
    //addNewFile(file: File, pathLocationName)
    //changeDirFile(fileName, newPath, oldPath)
    //deleteFile(fileName, pathName)
    //downloadFile(fileName, pathName)

}

export const cloudService = new CloudService();