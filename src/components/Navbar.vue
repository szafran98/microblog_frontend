<template>
    <div>
                <v-app-bar dense dark app>
                    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

                    <v-toolbar-title>Mikroblog</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <div v-if="$store.state.loggedUserData">
                        <v-btn icon>
                            <v-icon>mdi-bell</v-icon>
                        </v-btn>

                        <v-btn icon>
                            <v-icon>mdi-email</v-icon>
                        </v-btn>

                        <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>
                    </div>


                    <div v-if="searchField">
                    <v-row>
                    <v-col cols="12">
                    <v-text-field
                            hide-details
                            single-line
                    ></v-text-field>
                    </v-col>
                    </v-row>
                    </div>

                    <v-btn icon @click="searchField = !searchField">
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </v-app-bar>
            <v-navigation-drawer
                    v-model="drawer"
                    app
                    temporary
                    expand-on-hover
                    hide-overlay
            >
                <v-list
                        nav
                        dense
                >
                    <v-list-item-group
                            active-class="deep-purple--text text--accent-4"
                    >
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Na czasie</v-list-item-title>
                        </v-list-item>

                        <v-list-item router-link :to="{ name: 'Home' }">
                            <v-list-item-icon>
                                <v-icon>mdi-newspaper-variant-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Najnowsze</v-list-item-title>
                        </v-list-item>

                        <v-list-item v-if="$store.state.loggedUserData">
                            <v-list-item-icon>
                                <v-icon>mdi-account</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Konto</v-list-item-title>
                        </v-list-item>

                        <div>
                            <v-list-item v-if="!$store.state.loggedUserData" router-link :to="{ name: 'Login' }">
                                <v-list-item-icon>
                                    <v-icon>mdi-login</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>Login</v-list-item-title>
                            </v-list-item>

                            <v-list-item v-if="$store.state.loggedUserData" @click="$store.dispatch('logoutUser')">
                                <v-list-item-icon>
                                    <v-icon>mdi-login</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item>
                        </div>


                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
    </div>
</template>

<script>
    export default {
        name: "Navbar",
        data: () => ({
            drawer: false,
            searchField: false,
        })
    }
</script>

<style scoped>

</style>