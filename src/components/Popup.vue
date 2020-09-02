<template>
    <div class="text-center">
        <v-dialog
                v-model="$store.state.showPopup"
                width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="red lighten-2"
                        dark
                        v-bind="attrs"
                        v-on="on"
                >
                    Click Me
                </v-btn>
            </template>

            <v-card>
                <v-card-title class="headline grey lighten-2">
                    Information
                </v-card-title>

                <v-card-text >
                    You can't like your own post.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            text
                            @click="$store.commit('changePopupState', false)"
                    >
                        I accept
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "Popup",
        data: () => ({
        }),
        computed: {
        },
        created() {

        }
    }
</script>

<style scoped>

</style>