<template>
    <div>
        <v-form @submit.prevent="updatePost">
            <v-textarea
                    v-model="content"
                    solo
                    name="input-7-4"
                    prepend-inner-icon="mdi-message"
                    clearable
                    counter="300" dark no-resize >
            </v-textarea>
            <v-btn type="submit" dark :disabled="content.length > 300">Edit</v-btn>
        </v-form>
    </div>
</template>

<script>
    export default {
        name: "PostEdit",
        props: {
            post: Object
        },
        data: () => ({
            content: null
        }),
        methods: {
            updatePost() {
                this.$store.dispatch('updatePostAPI', {
                    postId: this.post.id,
                    content: this.content
                })
                this.$emit('editedDone')
            }
        },
        created() {
            this.content = this.post.content
        }
    }
</script>

<style scoped>

</style>