<template>
    <v-row style="padding-top: 0; padding-bottom: 0">
        <v-col align-self="center" cols="6" offset="3" style="padding-top: 0; padding-bottom: 0">
            <v-card
                    class="mx-auto"
                    color="#5c5c5c"
                    dark
                    style="border-top-left-radius: 0; border-top-right-radius: 0;
                            border-bottom-left-radius: 0; border-bottom-right-radius: 0"
            >
                <!--
                <v-card-title>
                    {{ post.post_author.username }}
                </v-card-title>

                <v-card-subtitle>
                    {{ post.date_pub_timestamp }}
                </v-card-subtitle>
                -->
                <v-card-text class=" font-weight-bold" style="font-size: 20px">
                    {{ comment.content }}
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
                            <v-list-item-title>{{ comment.author.username }}</v-list-item-title>
                            <v-list-item-title>{{ calculatePostTimestamp(comment.date_pub_timestamp) }}</v-list-item-title>
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
    export default {
        name: "Comment",
        props: {
            comment: Object
        },
        methods: {
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