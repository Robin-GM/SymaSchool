<template>
    <div class="container"
        @click="getFolderPath"
    >
        <div class="icone">
            <v-icon size="30" color="grey darken-2">{{ this.getIcon() }}</v-icon>
        </div>

        <div class="infos">
            <div class="name">
                {{this.file.name}}
            </div>
            <div class="size">
                <!-- {{this.getSize()}} -->
                {{ getSize }}
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { mdiFolder, mdiFilePdfBox, mdiFile, } from '@mdi/js';

import { TypeFileConstants } from "@/app/constants/Cloud/TypeFileConstants";
import { File } from "@/app/models/cloud/File"



@Component
export default class FileContainer extends Vue{

    @Prop({ type: Object, required: true })
    readonly file!: File;

    /* getSize(){
        if (this.file.type == TypeFileConstants.FOLDER){
            return this.file.size + " fichiers";
        }
        
        else {
            return this.file.size + " mo";
        }
    } */

    get getSize(){
        if (this.file.type == TypeFileConstants.FOLDER){
            return this.file.size + " fichiers";
        }
        else{
            if (this.file.size < 1000) {
                return this.file.size / 10**3 + " KB";
            }
            if (this.file.size > 9999999) {
                return this.file.size / 10**9 + " GB";
            }

            return this.file.size / 10**6 + " MB";
            
        }
    }

    //Obtenir l'icone correspondant au type de l'élément
    getIcon(){
        if (this.file.type == TypeFileConstants.FOLDER){
            return this.icons.mdiFolder;
        }
        else if (this.file.type == TypeFileConstants.PDF){
            return this.icons.mdiFilePdfBox;
        }
        else {
            return this.icons.mdiFile;
        }
    }

    @Emit("path")
    getFolderPath(): string{
        const fileName = this.file.name;
        return fileName;
    }

    icons = {
            mdiFolder,
            mdiFilePdfBox,
            mdiFile,
        };

    //TODO afficher le chemin dans la zone jaune
    //TODO au survol afficher el nom complet de l'élément-

}
</script>
<style scoped>
    .container{
        height: 50px;
        width: 260px;

        display: flex;
        flex-direction: row;

        padding: 0;

        border: 1px solid rgb(161, 161, 161);
        border-radius: 5px;
    }

    .container:hover{
        cursor: pointer;
    }

    .icone{
        width: 32%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .infos{
        height: 100%;
        width: 100%;

        overflow:hidden; 
        white-space:nowrap; 
    }

    .infos .name{
        overflow:hidden; 
        text-overflow: ellipsis;
    }
</style>