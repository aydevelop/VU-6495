<template>
    <el-card class="comment">
        <div class="comment-header">
            <span>{{ comment.author }}</span>
            <span>
                <i class="el-icon-time"></i>
                {{ new Date(comment.updated_at).toLocaleString() }}
            </span>
        </div>
        <div class="comment-text">
            {{ comment.text }}
        </div>
    </el-card>
</template>

<script>
export default {
     props: {
        comment: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped>
    .comment-header{
        display: flex;
        justify-content: space-between;
        margin-bottom:2rem;
    }
</style>