<template>
    <div>
        <v-list nav dense>
            <v-list-item-group
                v-model="group"
                class="orange--text"
                active-class="orange--text text--accent-4"
            >
                
                <v-list-item
                    v-for="item in navigationLinks"
                    :key="item.title"
                    @click="item.redirectTo"
                >
                    <v-list-item-icon>
                        <v-icon v-text="item.icon" size="20" class="ml-3"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title v-text="item.title" class="ml-2"></v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
  
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import { mdiWeatherCloudy, mdiTrashCanOutline, mdiStarOutline } from '@mdi/js';

@Component
export default  class NavigationMenuSide extends Vue {

    navigationLinks = [
                { title: "Mon Drive", redirectTo: this.redirectToDrive, icon: mdiWeatherCloudy},
                { title: "Favoris", redirectTo: this.redirectToFavorite, icon: mdiStarOutline},
                { title: "Corbeille", redirectTo: this.redirectToTrash, icon: mdiTrashCanOutline},
    ];

    redirectToDrive(){
        return;
    }

    redirectToFavorite(){
        return;
    }

    redirectToTrash(){
        return;
    }

    
}
</script>

<style>

</style>