<template>
    <v-row>
        <v-col align-self="center" cols="6" offset="3">
            <v-card
                    class="mx-auto"
                    color="#26c6da"
                    dark
                    shaped>
                <!--
                <v-card-title>
                    {{ post.post_author.username }}
                </v-card-title>

                <v-card-subtitle>
                    {{ post.date_pub_timestamp }}
                </v-card-subtitle>
                -->
                <v-card-text class="headline font-weight-bold" style="font-size: 20px">
                    {{ post.content }}
                </v-card-text>
                <v-card-actions>
                    <v-list-item class="grow">
                        <v-list-item-avatar color="grey darken-3">
                            <v-img
                                    class="elevation-6"
                                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ post.author.username }}</v-list-item-title>
                            <v-list-item-title>{{ calculatePostTimestamp(post.date_pub_timestamp) }}</v-list-item-title>
                        </v-list-item-content>

                        <v-row
                                align="center"
                                justify="end"
                        >
                            <v-icon class="mr-1">mdi-heart</v-icon>
                            <span class="subheading mr-2">256</span>
                        </v-row>
                    </v-list-item>
                    <!--
                    <v-btn @click="deletePost(post.id)">
                        Delete
                    </v-btn>
                    -->
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
            },
            calculatePostTimestamp(timestamp) {
                let actualTimestampInSec = Date.now() / 1000
                let seconds = actualTimestampInSec - timestamp
                console.log(typeof timestamp)
                if (seconds > 30 * 24 * 3600) {
                    return Math.floor(seconds / (30 * 24 * 3600)) + " months ago";
                }
                if (seconds > 7 * 24 * 3600) {
                    return Math.floor(seconds / (7 * 24 * 3600)) + " weeks ago";
                }
                if (seconds > 24 * 3600) {
                    return Math.floor(seconds / (24 * 3600)) + " days ago";
                }
                if (seconds > 3600) {
                    return Math.floor(seconds / 3600) + " hours ago";
                }
                if (seconds > 60) {
                    return Math.floor(seconds / 60) + " minutes ago";
                }
                if (seconds < 60) {
                    return "Less than a minute";
                }
            }
        }
    }
</script>

<style scoped>

</style>