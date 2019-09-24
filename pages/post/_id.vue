<template>
    <article class="post">
        <div>
        <header class="post-header">
            <div class="post-title">
                <h1>
                     <nuxt-link to="/">
                        <i class="el-icon-back"></i>
                    </nuxt-link>
                    {{ post.title }}
                </h1>
            </div>
            <div class="post-info">
                <small>
                    <i class="el-icon-time"></i>
                    {{ new Date(post.updated_at).toLocaleString() }}
                </small>
                <small>
                    <i class="el-icon-view"></i>
                    {{ this.post.views }}
                </small>
            </div>
            <div class="post-image">
                 <img 
                 :src="post.image_path" 
                 alt="post image" class="post-img" >
            </div>
        </header>

        <main class="post-text">
           {{ post.text }}
        </main>

        <footer>
            <div class="comments-block" v>
                <comment-form @createdNewComment="createdNewComment" :postId="post.id" />
                <div>
                    <div class="comments" v-if="post.all_comments.length > 0" >
                        <app-comment
                            v-for="comment in post.all_comments"
                            :key="comment.id"
                            :comment = comment
                         />
                    </div>
                    <div v-else>
                        Коментариев нету
                    </div>
                </div>
            </div>
        </footer>
        </div>
    </article>
</template>

<script>

import AppComment from '@/components/main/Comment'
import CommentForm from '@/components/main/CommentForm'
export default {
    validate({params}){
        return !!params.id;
    },
    head(){
        return {
            title: this.post.title
        }
    },
    async asyncData({store, params}){
        const post = await store.dispatch('post/fetchById', params.id);
        return {post};
    },
    methods: {
        createdNewComment(comment){
            this.post.all_comments.unshift(comment);
        }
    },
    components: { AppComment, CommentForm }
}
</script>

<style lang="scss" scoped>
.post{
    max-width: 600px;
    margin:0 auto;
}


.post-title > *{
    margin: 10px 0;
    
}

.post-text{
    margin:50px 0px 80px 0px;
}

.post-image{
    margin:10px 0;
    max-width: 600px;
    max-height: 600px;
}

.post-image img{
    width: 100%;
}

.post-info{
    display: flex;
    justify-content: space-between;
}

.comments-block{
    border: 1px solid lightgray;
    margin:2rem 0rem;
    padding: 2rem;
}
</style>