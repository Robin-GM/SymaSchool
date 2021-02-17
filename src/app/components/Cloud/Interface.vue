<template>
    <div class="x">

        
        <div class="zoneBtn">
            <v-btn 
                @click="dialogNewDirectory = true" 
                class="btn text-capitalize px-2" 
                color="orange" 
                large
            >
                Créer un Dossier
            </v-btn>

            <v-btn 
                class="btn text-capitalize px-2" 
                color="orange" 
                large
            >
                Nouveau Fichier
            </v-btn>
        </div>

        <div class="zone" @contextmenu.stop="show($event, 'background')">
            <div class="mb-5">
                <p class="txt">Dossiers</p>

                <div class="filesContains" >
                    <FileContainer
                        class="elt"
                        @path="getNewPath"
                        v-for="file in foldersElements"
                        :key="file.name"
                        :file="file"
                        :externShowMenu="showMenu"
                        @contextmenu.stop.native="show($event, 'dossier', file)"
                    />
                </div>  
            </div>

            <div>
                <p class="txt">Fichiers</p> 

                <div class="filesContains" >
                    <FileContainer
                        class="elt"
                        v-for="file in filesElements"
                        :key="file.name"
                        :file="file"
                        :externShowMenu="showMenu"
                        @contextmenu.stop.native="show($event, 'fichier', file)"
                    />
                </div>
            </div>
        </div>
        

        <v-dialog v-model="dialogNewDirectory" width="390px">
            <v-card class="pa-5">
                <div class="d-flex justify-space-between">
                    <div class="font-weight-medium">
                        Nouveau dossier
                    </div>
                    <v-icon @click="dialogNewDirectory = false" size="17">mdi-window-close</v-icon>
                </div>
                <v-text-field 
                    v-model="directoryName" 
                    outlined 
                    dense 
                    color="orange"
                    class="mt-5"
                ></v-text-field>
                <div class="d-flex justify-end">
                    <v-btn 
                        @click="dialogNewDirectory = false"
                        class="py-4"
                        depressed
                        text
                        small
                    >
                        Annuler
                    </v-btn>
                    <v-btn 
                        @click="createNewDirectory"
                        :loading="loading"
                        color="orange"
                        class="white--text py-4 ml-3"
                        depressed
                        small
                    >
                        Créer
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>

        <v-menu
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            absolute
            offset-y
        >
            <v-list v-if="type == 'background'">
                <v-list-item>
                    <v-list-item-title>background</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>background</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>background</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else-if="type == 'dossier'">
                <v-list-item>
                    <v-list-item-title>dossier</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>dossier</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>dossier</v-list-item-title>
                </v-list-item>
            </v-list>
            <v-list v-else-if="type == 'fichier'">
                <v-list-item>
                    <v-list-item-title>fichier</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>fichier</v-list-item-title>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>fichier</v-list-item-title>
                </v-list-item>
            </v-list>

        </v-menu>

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


    //variable loading pour gérer les effets de chargement des composants
    loading = false;

    //liste des éléments récupéré par la requête API
    files: File[] = [];


    //chemin ou l'on se trouve actuellement
    currentPath = "";


    //Nombre d'éléments remontés par la requête API
    numberFiles = 0;


    //chemin vers lequel on veut aller (quand on clique sur un répertoire pour s'y rendre) : nouvelle destination
    newPath = "";


    //variable pour gérer l'affichage de la fenêtre de création d'un répertoire
    dialogNewDirectory = false;

    //Nom du dossier à ajouter : valeur par défaut
    directoryName = "Dossier sans titre";

    //valeur par défaut pour réinitialiser
    defaultDirName = "Dossier sans titre";


    //Context Menu 
    showMenu = false;
    type = "";
    x = 0;
    y = 0;

    show(e: any, type: string, file?: File) {
        this.type = type;
        console.log(file)
        e.preventDefault();
        this.showMenu = false;
        this.x = e.clientX;
        this.y = e.clientY;
        this.$nextTick(() => {
          this.showMenu = true;
        });
    }

    //Au chargement de la page, on appelle la fonction getFiles
    async mounted(){
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

            //on actualise la variable currentPath avec le nouveau path (qui devient le chemin actuel)
            this.currentPath = path;

            console.log("current path Child  :" + this.currentPath)

            //on appelle la fonction qui actualise le path de navigation dans le Parent
            this.navigationPath();

        }catch (error) {
            const errorMessage = errorService.getErrorMessage(error);
            rootStoreModule.setErrorMessage(errorMessage);
        }
    }

    async createNewDirectory(){
        this.loading = true
        
        //On constitue le chemin du nouveau dossier en ajoutant son nom au chemin actuel
        const newDirPath = `${this.currentPath}/${this.directoryName}`
        try{
            await cloudService.createDirectory(newDirPath)

            //on réinitialise la valeur de directoryName avec l'entrée par défaut
            this.directoryName = this.defaultDirName;
        }catch (error) {
            const errorMessage = errorService.getErrorMessage(error);
            rootStoreModule.setErrorMessage(errorMessage);
        }finally {
            this.loading = false;
            this.dialogNewDirectory = false;
            //on rafraichit la page pour que le dossier apparaisse
            await this.getContent();
        }
    }



    //récupère du composant enfant le chemin du répertoire ou l'on souhaite se rendre, et instancie la variable newPath avec ce chemin
    getNewPath(filePath: string){
        this.newPath = filePath;
    }



    //S'active si la valeur de newPath change : signifie que l'on souhaite se rendre dans un autre répertoire
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