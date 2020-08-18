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
                    <v-btn>
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "Post",
        props: {
            post: Object
        }
    }
</script>

<style scoped>

</style>