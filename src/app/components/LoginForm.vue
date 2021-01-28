<template>
    <ValidationObserver v-slot="{handleSubmit}">
        <v-form @submit.prevent="handleSubmit(onSubmit)">
            <ValidationProvider
                name="Username"
                rules="required"
                mode="lazy"
                v-slot="{ errors }"
            >
                <v-text-field
                    :label="usernameLabel"
                    v-model="username"
                    solo
                    required
                    color="grey"
                    :error-messages="errors"
                ></v-text-field>
            </ValidationProvider>
            <ValidationProvider
                name="Password"
                rules="required"
                mode="lazy"
                v-slot="{ errors }"
            >
                <v-text-field
                    :label="passwordLabel"
                    v-model="password"
                    solo
                    required
                    color="grey"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    :error-messages="errors"
                ></v-text-field>
            </ValidationProvider>

            <div class="text-right mt-n6 mb-12 orange--text text--darken-2">
                {{ $t(`${I18N_PREFIX}.forgotPasswordLink`) }}
            </div>

            <v-btn
                class=""
                type="submit"
                block
                large
                color="orange"
                elevation="2"
                :loading="loading"
                >{{ $t(`${I18N_PREFIX}.loginBtn`) }}</v-btn>
        </v-form>
    </ValidationObserver>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue} from "vue-property-decorator";
import { LoginCredentials } from "@/app/models/auth/LoginCredentials"

@Component
export default class LoginForm extends Vue{
    readonly I18N_PREFIX = "loginPage.form";

    @Prop({ type: Boolean, required: true })
    readonly loading!: boolean;

    username = "";
    password = "";
    showPassword = false;

    @Emit("submit")
    onSubmit(): LoginCredentials {
        return new LoginCredentials( this.username, this.password);
    }

    get usernameLabel(){
        return this.$t("loginPage.form.username");
    }

    get passwordLabel(){
        return this.$t("loginPage.form.password");
    }

}
</script>


