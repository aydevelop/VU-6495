<template>
    <div>
        
        <div class="edit-form">    
            <el-form  :model="controls" :rules="rules" ref="form" label-width="120px" 
        class="demo-ruleForm" @submit.prevent="onSubmit">
            
            <el-form-item label="Post text" prop="text">
                <el-input :rows="10" type="textarea" v-model="controls.text"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button native-type="submit" :loading="load"
                type="primary" @click.native.prevent="onSubmit">
                    Update
                </el-button>
                <small class="l-edit">
                    Last edit:
                    <i class="el-icon-time"></i>
                    <span>
                        {{ new Date(post.updated_at).toLocaleString() }}
                    </span>
                </small>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    head(){
        return{
            title: 'Post | ' + this.post.title
        }
    },
    validate({params}){
        return params.id;
    },
    async asyncData({store, params}){
        const post = await store.dispatch('post/fetchAdminById', params.id);
        return {post}
    },
    data(){
        return{
            load: false,
            controls: {
                text: ''
            },
            rules: {
                text: [
                    { required: true, message: 'Please input text', trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
        const {msg} = this.$route.query;
        if(msg==='login'||msg=="session"){
            this.$message.info('You need to log in first');    
        }else if(msg=='logout'){
            this.$message.success('Successfully logged out');
        }

        this.controls.text = this.post.text;
    },
    methods: {
        onSubmit(){

            this.$refs.form.validate(async (valid) => {
                if(valid){
                    this.load = true;

                    const data = {
                        id: this.post.id,
                        text: this.controls.text
                    }

                    try {
                        this.$store.dispatch('post/update', data);
                        this.$message.info('Post is updated');
                        this.$router.push('/admin/list');
                    } finally {
                        this.load = false;
                    }
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.edit-form{
    margin-top: 50px;
    margin-right: 10px;
}
.l-edit{
    margin-left: 20px;
}
</style>