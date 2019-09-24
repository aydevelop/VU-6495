<template>
    <el-card shadow="always" class="post">
        <header slot="header" class="post-header">
            <h3>{{ this.post.title }} </h3>
            <small>
                <i class="el-icon-time"></i>
                {{ this.post.updated_at | date }}
            </small>
        </header>
        <div class="post-content">
            <div class="post-body">
                <img 
                :src="post.image_path" 
                alt="post image" class="post-img" >
            </div>
        </div> 
        <footer class="post-footer">
            <div>
            <el-button class="open-btn"
            @click="openPost"
            round>
                Открить
            </el-button>
            <span>
                <i class="el-icon-view"></i> 
                {{ this.post.views }}
            </span>
            <span>
                <i class="el-icon-document"></i> 
               {{ this.post.all_comments.length }}
            </span>
            </div>
        </footer>
    </el-card>
</template>

<script>
export default {
    props: {
        post: {
        type: Object,
            required: true
        }
    },
    computed: {
        imgPath(){
            return process.env.imgPath;
        }
    },
    methods:{
        openPost(){
            const id = this.post.id;
            this.$router.push(`/post/${id}`);
        }
    }
}
</script>

<style lang="scss" scoped >
    .post{
        border: 1px solid black;
        margin-bottom: 2rem;
    }
    .post-content{
        display: flex;
        justify-content: center;
        min-height: 200px;
    }
    .post-body{
        max-width: 400px;
        max-height: 400px;
    }
    .post-img{
        width: 100%;
        height: auto;
    }

    .open-btn{
        margin:10px;
    }

    .post-footer{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

  
</style>