<template>
    <div class="x">

        <div class="zone">
            <div class="zoneBtn">
                <v-btn class="btn text-capitalize px-2" color="orange" large>
                    Créer un Dossier
                </v-btn>

                <v-btn class="btn text-capitalize px-2" color="orange" large>Nouveau Fichier</v-btn>
            </div>
            <p class="txt">Dossiers</p>

            <div class="filesContains">
                <FileContainer
                    class="elt"
                    :file="file"
                    @path="getNewPath"
                    v-for="file in foldersElements"
                    :key="file.name"
                />
            </div>
            
        </div>

        <div class="zone">
            <p class="txt">Fichiers</p> 

            <div class="filesContains">
                <FileContainer
                    class="elt"
                    :file="file"
                    v-for="file in filesElements"
                    :key="file.name"
                />
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { Component, Watch, Emit, Prop, Vue} from "vue-property-decorator";


import { errorService } from "@/app/services/ErrorService";
import { rootStoreModule } from "@/app/store/root";

import { File } from "@/app/models/cloud/File";
import { cloudService} from "@/app/services/CloudService";
import FileContainer from "@/app/components/Cloud/FileContainer.vue"
import { TypeFileConstants } from "@/app/constants/Cloud/TypeFileConstants";

@Component({
    components: {
        FileContainer,
  }
})
export default class Interface extends Vue{

    //Prop qui prend en charge le retour arrière dans le path, reçoit sa valeur du composant parent 
    @Prop({ type: String, required: false })
    goBackDirectory!: string;


    //liste des éléments récupéré par la requête API
    files: File[] = [];

    //chemin ou l'on se trouve actuellement
    currentPath = "";

    //Nombre d'éléments remontés par la requête API
    numberFiles = 0;

    //historique de tous les chemins pour pouvoir revenir en arrière
    historicPath: string[] = [];

    //chemin vers lequel on veut aller : nouvelle destination
    newPath = "";


    //Au chargement de la page, on appelle la fonction getFiles
    async created(){
        try{
            await this.getContent();
        }catch (error) {
            const errorMessage = errorService.getErrorMessage(error);
            rootStoreModule.setErrorMessage(errorMessage);
        }
    }

    //Méthode qui requête au back et fait remonter les éléments
    async getContent(){
        try{
            const { content, numberFiles, path } = await cloudService.displayContent(this.newPath);

            this.files = content;
            this.numberFiles = numberFiles;

            //on actualise la propriété currentPath avec le nouveau path
            this.currentPath = path;
            this.historicPath.push(path)

            console.log("current path Child  :" + this.currentPath)


            //on appelle la fonction qui actualise le path de navigation dans le Parent
            this.navigationPath();

        }catch (error) {
            const errorMessage = errorService.getErrorMessage(error);
            rootStoreModule.setErrorMessage(errorMessage);
        }
    }

    //création du nouveau path quand on clique sur le dossier ou l'on souhaite entrer
    getNewPath(fileName: string){
        this.newPath = `${this.currentPath}/${fileName}`;
    }

    //Surveille newPath : si sa valeur change alors la méthode est appelée
    @Watch("newPath")
    async isThePathChanged(){
        //si le path actuel est différent du path souhaité alors on fait une requête
        if (this.currentPath !== this.newPath){
            await this.getContent();
        }
    }

    //émet le nouveau path pour actualiser le path de navigation dans le composant parent
    @Emit("newPathForNavigation")
    navigationPath(): string{
        return this.currentPath;
    }

    //Surveille le prop goBackDirectory : si sa valeur change (cela signifie qu'on veut retourner en arrière dans le path) alors on change newPath
    //Cela activera isThePathChanged() ce qui fera une nouvelle requête avec le nouveau path
    @Watch("goBackDirectory")
    async goBack(){
        console.log('goBackDirectory Watcher activate   :' + this.goBackDirectory)
        if (this.goBackDirectory !== ""){
            this.newPath = this.goBackDirectory; 
            console.log('goBackDirectory activé')
        }
    }

    //Ne retourne que les dossiers
    get foldersElements(){
        return this.files.filter(f => f.type == TypeFileConstants.FOLDER)
    }

    //Ne retourne que les fichiers
    get filesElements(){
        return this.files.filter(f => f.type !== TypeFileConstants.FOLDER)
    }

}
</script>
<style scoped>
    .x{
        margin: 0 0 0 0;
        height: 100%;
    }

    .zoneBtn{
        margin: 25px 0 30px 7px;
        width: 320px;

        display: flex;
        justify-content: space-between;
    }

    .btn{
        font-weight: 400;
        font-size: 15px;
    }

    .txt{
        margin-left: 20px;
    }

    .zone{
        margin-top: 20px;
    }

    .filesContains{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        color: #3c4043;
    }

    .elt{
        margin: 7px 7px;
    }
</style>