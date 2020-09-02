<template>
    <div style="margin-top: 20px">
    <v-row style="border-radius: 4px">
        <v-col align-self="center" cols="6" offset="3" style="padding-bottom: 0">
            <v-card
                    class="mx-auto"

                    dark
                    style="border-bottom-left-radius: 0; border-bottom-right-radius: 0"
                    >
                <!--
                <v-card-title>
                    {{ post.post_author.username }}
                </v-card-title>

                <v-card-subtitle>
                    {{ post.date_pub_timestamp }}
                </v-card-subtitle>
                -->
                <v-card-text v-if="!showEditForm" class="headline font-weight-bold" style="font-size: 20px;">

                    <label v-for="(word, index) in post.content.split(' ')" :key="index">
                        <template v-if="post.tags.includes(word)">
                            <router-link :to="{ name: 'Tag', params: { name: word } }" style="text-decoration: none">{{ word }} </router-link>
                        </template>
                        <template v-else>{{ word }} </template>
                    </label>

                </v-card-text>
                <post-edit v-on:editedDone="editedDone" :post="post" v-if="showEditForm"></post-edit>
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
                            <v-btn class="mr-2" icon v-if="$store.state.loggedUserData" @click="likePost(post.id)" style="align-content: center">
                                <v-icon :class="{ 'post-liked': post.is_liked_by_user }">mdi-heart</v-icon>
                            </v-btn>
                                <span class="subheading mr-2">{{ post.likes_count }}</span>
                            <v-menu bottom right v-if="$store.state.loggedUserData !== null">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            dark
                                            icon
                                            v-bind="attrs"
                                            v-on="on"
                                    >
                                        <v-icon>
                                                dark
                                            mdi-dots-vertical
                                        </v-icon>
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item
                                            v-for="(item, i) in postActions"
                                            :key="i"
                                            @click="item.action()"
                                    >
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>

                        </v-row>
                    </v-list-item>

                </v-card-actions>
                <v-btn v-if="$store.state.loggedUserData !== null" @click="showCommentForm = !showCommentForm">Add comment</v-btn>
                <!--
                <v-btn v-if="!showAllComments" @click="showAllComments = true">Show all comments</v-btn>
                -->
                <div class="mx-auto" style="text-align: center; border-radius: 0" v-if="post.post_comments.length > 2 && !showAllComments">
                    <v-tooltip bottom color="info">
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon @click="showAllComments = true" v-bind="attrs" v-on="on">
                                mdi-dots-vertical
                            </v-icon>
                        </template>
                        <span>Load all comments</span>
                    </v-tooltip>
                </div>
            </v-card>
            <!--
            <v-card class="mx-auto" dark style="text-align: center; border-radius: 0" v-if="post.post_comments.length > 2 && !showAllComments">
                <v-tooltip bottom color="info">
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon @click="showAllComments = true" v-bind="attrs" v-on="on">
                            mdi-dots-vertical
                        </v-icon>
                    </template>
                    <span>Load all comments</span>
                </v-tooltip>
            </v-card>
            -->
        </v-col>
    </v-row>
        <div v-if="!showAllComments">
            <comment v-for="comment in twoNewestComments" :key="comment.id" :comment="comment"></comment>
        </div>
        <div v-if="showAllComments">
            <comment v-for="comment in post.post_comments" :key="comment.id" :comment="comment"></comment>
        </div>
        <comment-form v-if="showCommentForm" :post="post"></comment-form>
    </div>
</template>

<script>
    //import axios from 'axios';
    import Comment from "./Comment";
    import PostEdit from "./PostEdit"
    import CommentForm from './CommentForm'
    //import { mapState } from 'vuex'
    export default {
        name: "Post",
        components: {
            Comment,
            PostEdit,
            CommentForm
        },
        props: {
            post: Object
        },
        computed: {
            twoNewestComments() {
                return this.post.post_comments.slice(-2)
            }
        },
        data: () => ({
            postActions: [],
            showEditForm: false,
            showCommentForm: false,
            showAllComments: false,
            isPostLiked: 'white'
        }),
        methods: {
            likePost(postId) {
                this.$store.dispatch('likePostAPI', postId)
                this.isPostLiked = 'red'
            },
            editedDone() {
                this.showEditForm = false
            },
            setPostActions() {
                this.postActions = [
                    { title: 'Edit', action: () => {
                        this.showEditForm = true
                        } },
                    { title: 'Delete', action: () => {
                        this.$store.dispatch('deletePostAPI', this.post) }},
                ]
            },
            calculatePostTimestamp(timestamp) {
                let actualTimestampInSec = Date.now() / 1000
                let seconds = actualTimestampInSec - timestamp
                //console.log(typeof timestamp)
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

        },
        created() {
            this.setPostActions(this.post)
        }
    }
</script>

<style lang="scss">
   .padding {
       margin-bottom: 0;
   }
    .post-liked {
        color: red !important;
    }
    .post-not-liked {
        color: white;
    }


</style>