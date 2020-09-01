<template>
    <v-row>
        <v-col cols="6" offset="3">
            <v-form @submit.prevent="addPost">
                <v-textarea
                        v-model="content"
                        solo
                        hint="Your post ^"
                        id="post-form"
                        name="input-7-4"
                        prepend-inner-icon="mdi-message"
                        clearable
                        counter="300" dark no-resize outlined @click="formClick">
                </v-textarea>
                <v-btn type="submit" dark :disabled="content.length > 300">Login</v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "PostCreation",
        /*
        props: {
            tag: String || null
        },

         */
        watch: {
            $route(to) {
                if (to.name === 'Tag') {
                    this.content = '\n'
                    this.content += to.params.name
                }
                if (to.name === 'Home') {
                    this.content = ''
                }
            }
        },
        data: () => ({
            content: '',
            //tag: this.$route.params.name ||
        }),
        methods: {
            addPost() {
                this.$store.dispatch('addPostAPI', this.content)
                this.content = ''
            },
            formClick() {
                if (this.content === `\n${this.$route.params.name}`)
                setTimeout(() => {
                    document.getElementById('post-form').focus()
                    document.getElementById('post-form').setSelectionRange(0, 0)
                }, 10)

            }
        },
        created() {
            if (this.$route.name !== 'Home') {
                this.content = '\n'
                this.content += this.$route.params.name
            }
        }
    }
</script>

<style scoped>

</style>