<template>
    <div class="parent">

        <div class="navigation">
            <NavigationMenuSide/>
        </div>

        <div class="main">

            <div class="nav_path">

                <!-- <v-icon @click="goBackward" size="30" class="ml-2">mdi-arrow-left-bold-circle-outline</v-icon> -->
                
                <ul class="navList pl-0">
                    <li v-for="(directory, index) in navigation" :key="index" class="mr-1 ml-0">
                        <v-btn @click="getPathToBackward(directory)" text class="btn text-capitalize px-2 mr-2 ml-0">
                            {{directory}}
                        </v-btn> 
                        <v-icon size="25" color="grey darken-2">{{ icons.mdiChevronRight }}</v-icon>
                    </li>
                </ul>
                
            </div>

            <div class="contenu">
                <Interface
                    class="interface"
                    @newPathForNavigation="getNavigationPath"
                    :goBackDirectory="newPathToBackward"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue} from "vue-property-decorator";


import { authStoreModule } from "@/app/store/auth";
import { RouteNameConstants } from "@/app/constants/RouteNameConstants";
import { mdiChevronRight } from '@mdi/js'; 

import Interface from '@/app/components/Cloud/Interface.vue'
import NavigationMenuSide from '@/app/components/Cloud/NavigationMenuSide.vue'

@Component({
  components: {
    Interface,
    NavigationMenuSide
  }
})
export default class CloudPage extends Vue{

    //TODO :::: AFFICHER LA BAR DE NAVIGATION DÈS LE DÉBUT

    //contient la liste des répertoire contenu dans le currentPath
    navigation: string[] = [];

    //contient le path actuel qui est actualisé par getNavigationPath() à chaque nouveau changement dans le composant enfant
    currentPath = "";

    //propriété qui stockera le path de retour quand cela sera nécessaire. 
    //La donnée sera alors lu par le Prop "goBackDirectory" de l'interface
    newPathToBackward = "";

    //se charge de convertir le path, transmis par @navigationPath par le composant enfant, en une liste de mots composée des différents répertoires contenus dans le path
    //pour pouvoir obtenir la bar de navigation
    getNavigationPath(path: string) {
        //on actualise "currentPath" pour pouvoir le réactualiser en cas de back (getPathToBack)
        this.currentPath = path;
        this.navigation = path.split("/");
        //on supprime le premier item qui est vide
        this.navigation.shift();

        //on réinitialise la valeur du path de retour pour le bon fonctionne de la méthode : 
        //pour pouvoir ALLER UNE FOIS EN ARRIERE, UNE FOIS EN AVANT ET ENCORE UNE FOIS EN ARRIERE
        if (this.newPathToBackward !== ""){
            this.newPathToBackward= "";
            console.log("Path réinitialisé")
        }
    }

    //méthode appelée quand on clique sur un répertoire pour revenir en arrière
    //prend en paramètre le nom du repertoire vers lequel on souhaite revenir et change la valeur de "newPathToBackward" avec son path
    getPathToBackward(directoryName: string){
        //en partant du path actuel, on split le path à l'endroit ou apparait le nom du répertoire 
        //et on garde la première partie à laquelle on ajoute le nom du repertoire car il aura été exclu
        this.newPathToBackward = this.currentPath.split(directoryName)[0]+directoryName;
        console.log("getPathToBack  :" + this.newPathToBackward)
    }

/*     //méthode appelée quand on clique sur le bouton retour arrière
    //prends le currentPath, et enlève le dernier repertoire pour obtenir le path du repertoire précédent
    //passe ce nouveau repertoire à la variable newPathToBackward qui est passée en Prop de l'interface
    goBackward(){
        //on scinde le currentPath à partir du dernier repertoire de la bar de navigation
        const path = this.currentPath.split(this.navigation[this.navigation.length-1])[0];
        //on supprime le dernier charactère du nouveau path qui est un "/"
        path.slice(0, -1);
        this.newPathToBackward = path;
    } */

    //sécurité pour s'assurer que l'utilisateur soit bien connecté (peut-être inutil)
    mounted() {
        if (!authStoreModule.user) {
            this.$router.push(RouteNameConstants.LOGIN)
        }
    }

    icons = {
            mdiChevronRight
        };
}
</script>
<style scoped>
    .parent{
        height: 90%;
        display: flex;
    }
    .navigation{
        height: 110%;
        width: 255px;
        background-color: bisque;
    }
    .main{
        height: 100%;
        width: 100%;
        margin-left: 7px;
    }
    .nav_path{
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgb(194, 194, 194);
    }
    .navList{
        list-style: none;
        display: inline-flex;
    }
    .navList li{
        /* TODO agrandir le texte + espacer + rendre cliquable */
    }

    .navList .btn{
        font-weight: 400;
        font-size: large;
        color: #3c4043;
    }

    .contenu{
        height: 100%;
    }

    .interface{
        width: 100%;
    }
</style>