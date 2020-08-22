<template>
    <v-container fill-height>
        <v-row align="center">
            <v-col cols="6" md="4" sm="12" offset="3" offset-md="4" offset-sm="0" offset-lg="4">

                    <v-card

                            dark
                            outlined
                    >
                        <v-form @submit.prevent="login" v-model="valid" ref="form">
                            <v-row>
                                <v-col cols="10" offset="1">
                                    <v-text-field
                                            type="email"
                                            label="E-mail"
                                            :rules="emailRules"
                                            v-model="loginData.username"
                                            required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10" offset="1">
                                    <v-text-field
                                            type="password"
                                            label="Password"
                                            :rules="passwordRules"
                                            v-model="loginData.password"
                                            required>

                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="10">
                                    <p style="color: red">{{ errors }}</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn type="submit" @click="validate" :disabled="!valid">Login</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Login",
        data: () => ({
            loginData: {
                username: null,
                password: null
            },
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required'
            ],
            errors: null,
            valid: false
        }),
        methods: {
            login() {
                axios.post('http://127.0.0.1:8000/auth/', this.loginData)
                    .then(res => {
                        document.cookie = `my_cookie_name=${res.data.token}`
                    })
                    .catch(err => {
                        this.errors = err.response.data.detail
                    })
            },
            validate() {
                this.$refs.form.validate()
            }
        }
    }
</script>

<style scoped>

</style>