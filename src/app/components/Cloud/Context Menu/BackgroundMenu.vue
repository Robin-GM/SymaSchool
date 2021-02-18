<template>
	<div>
		<div id="container">
			<div class="elt my-2" @click="dialogNewDirectory" > <v-icon size="22" class="mr-4">{{ icons.newFolder }}</v-icon> Nouveau Dossier</div>
			<v-divider></v-divider>
			<div>
				<div class="elt mt-2" > <v-icon size="22" class="mr-4">{{ icons.importFile }}</v-icon> Importer des fichiers</div>
				<div class="elt mb-2" > <v-icon size="22" class="mr-4">{{ icons.importFolder }}</v-icon> Importer un dossier</div>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mdiFolderPlusOutline, mdiFolderUploadOutline, mdiFileUploadOutline} from '@mdi/js'; 

@Component
export default class BackgroundMenu extends Vue {

	icons = {
        newFolder : mdiFolderPlusOutline,
        importFolder: mdiFolderUploadOutline,
        importFile: mdiFileUploadOutline,
    };

	dialogNewDirectory(){
		this.$emit("openDialogNewDirectory");
	}

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