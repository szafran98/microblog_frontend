<template>
    <v-row>
        <v-col align-self="center" cols="6" offset="3">
            <v-card :shaped=true>
                <v-card-title>
                    {{ post.post_author.username }}
                </v-card-title>
                <v-card-subtitle>
                    {{ post.date_pub_timestamp }}
                </v-card-subtitle>
                <v-card-text>
                    {{ post.content }}
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="deletePost(post.id)">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import axios from 'axios';
    //import { mapState } from 'vuex'
    export default {
        name: "Post",
        props: {
            post: Object
        },
        methods: {
            deletePost(postId) {
                axios.delete(`http://127.0.0.1:8000/api/posts/${postId}/`)
                    .then(() => {
                        this.$store.commit('deletePost', postId)
                    })
            }
        }
    }
</script>

<style scoped>

</style>