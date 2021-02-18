<template>
    <div>
        <div class="container"
            @click="getFolderPath"
            draggable="true"
        >
            <!-- @click="prevualiziseDocument" (if type != FOLDER) -->

            <div class="icone">
                <v-icon size="25" color="grey">{{ icons[file.type] }}</v-icon>
            </div>

            <div class="infos">
                <div class="name">
                    {{file.name}}
                </div>
                <div class="size">
                    {{ getSize }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

import { TypeFileConstants } from "@/app/constants/Cloud/TypeFileConstants";
import { File } from "@/app/models/cloud/File"



@Component
export default class FileContainer extends Vue{

    @Prop({ type: Object, required: true })
    readonly file!: File;

    icons = {
        Folder: 'mdi-folder',
        pdf: 'mdi-file-pdf',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
        ppt: 'mdi-file-powerpoint',
        png: 'mdi-file-image',
        jpg: 'mdi-file-image',
        jpeg: 'mdi-file-image',
        mp4: 'mdi-file-video'
    };

    get getSize(){
        if (this.file.type == TypeFileConstants.FOLDER){
            if (this.file.size == 0){
                return "Vide";
            }else{
                return this.file.size + " fichier(s)";
            }
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

    //emet le chemin du dossier ou l'on souhaite se rendre
    @Emit("path")
    getFolderPath(): string{
        return this.file.path;
    }


    //TODO afficher le chemin dans la zone jaune                : DONE
    //TODO au survol afficher le nom complet de l'élément-

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
        background-color: rgba(245, 245, 245, 0.678);
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
        margin-right: 5px;

        overflow:hidden; 
        white-space:nowrap; 
    }

    .infos .name{
        overflow:hidden; 
        text-overflow: ellipsis;
        font-size: 1em;
        font-weight: 400;
        color: rgb(37, 37, 37);
    }
    .infos .size{
        font-size: 0.85em;
        color: rgb(97, 97, 97);
    }
</style>