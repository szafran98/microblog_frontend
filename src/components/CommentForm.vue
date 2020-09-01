<template>
    <div>
        <v-row>
            <v-col cols="6" offset="3">
                <v-form @submit.prevent="addComment">
                    <v-textarea
                            v-model="content"
                            solo
                            name="input-7-4"
                            prepend-inner-icon="mdi-message"
                            clearable
                            counter="300" dark no-resize >
                    </v-textarea>
                    <v-btn type="submit" dark :disabled="content.length > 300">Send</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: "CommentForm",
        props: {
            post: Object
        },
        data: () => ({
            content: '',
            postId: null
        }),
        methods: {
            addComment() {
                this.$store.dispatch('addCommentAPI', {
                    postId: this.postId,
                    content: this.content
                })
                this.content = ''
            }
        },
        created() {
            this.postId = this.post.id
        }
    }
</script>

<style scoped>

</style>