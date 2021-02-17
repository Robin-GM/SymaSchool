import { apiService } from "../services/ApiService";
import { File } from "../models/cloud/File";
import { Content } from "../models/cloud/Content";

class CloudService {

    private static readonly ENDPOINT_CLOUD = "/api/cloud";

    //pour afficher le contenu d'un répertoire
    async displayContent(path: string): Promise<Content<File>>{
        const params = new URLSearchParams();
        params.append("dirName", path)
        return await apiService.get(`${CloudService.ENDPOINT_CLOUD}/getContent`, params);
    }

    async createDirectory(newDirectoryPath: string) {
        const url = `${CloudService.ENDPOINT_CLOUD}/create-dir`;
        const params = new URLSearchParams();
        params.append("path", newDirectoryPath);
        return await apiService.post(url, params)
    }

    async uploadNewFile( file: object, path: string) {
        const url = `${CloudService.ENDPOINT_CLOUD}/upload-file`;
        const data = { file: file, path: path };
        return await apiService.post(url, data)
    }

    

    //modifyName(dirName | fileName, newName)
    //deleteDir
    //changeDirFile(fileName, newPath, oldPath)
    //deleteFile(fileName, pathName)
    //downloadFile(fileName, pathName)

}

export const cloudService = new CloudService();