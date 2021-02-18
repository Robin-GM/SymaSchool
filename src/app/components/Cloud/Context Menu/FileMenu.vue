<template>
	<div id="container">
		<div class="elt mt-2" @click="move" ><v-icon size="22" class="mr-4">{{ icons.move }}</v-icon> Déplacer vers</div>
		<div class="elt" @click="addToFavorite" ><v-icon size="22" class="mr-4">{{ icons.favorite }}</v-icon> Ajouter aux favoris</div>
        <div class="elt mb-2" @click="rename" ><v-icon size="22" class="mr-4">{{ icons.edit }}</v-icon> Renommer</div>
		<v-divider></v-divider>
        <div class="elt mt-2" @click="details"> <v-icon size="22" class="mr-4">{{ icons.info }}</v-icon> Afficher les détails</div>
		<div class="elt mb-2" @click="download"> <v-icon size="22" class="mr-4">{{ icons.download }}</v-icon> Télécharger</div>
        <v-divider></v-divider>
		<div class="elt my-2" @click="deleteElement"> <v-icon size="22" class="mr-4">{{ icons.delete }}</v-icon> Supprimer</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mdiFolderMoveOutline, mdiStarOutline, mdiPencilOutline, mdiInformationOutline, mdiDownloadOutline, mdiTrashCanOutline} from '@mdi/js'; 

@Component
export default class FileMenu extends Vue {

	icons = {
        move : mdiFolderMoveOutline,
        favorite: mdiStarOutline,
        edit: mdiPencilOutline,
        info: mdiInformationOutline,
        download: mdiDownloadOutline,
        delete: mdiTrashCanOutline
    };

	//variable pour gérer l'affichage de la fenêtre de création d'un répertoire
    dialogNewDirectory = false;

    //Nom du dossier à ajouter : valeur par défaut
    directoryName = "Dossier sans titre";
}
</script>

<style scoped>
	#container{
		min-width: 280px;
		padding: 4px 0;
		background-color: white;
	}
	.elt{
		width: 100%;
		padding: 4px 0 4px 30px;
		cursor: pointer;
		color: rgb(43, 43, 43);
		font-size: 0.8em;
	}
	.elt:hover{
		background-color: rgb(236, 236, 236);
	}
</style>