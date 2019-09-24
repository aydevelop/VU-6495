<template>
    <div>
        <center>Add comment</center>

       <el-form  :model="controls" :rules="rules" ref="form" label-width="120px" 
       class="demo-ruleForm" @submit.prevent="onSubmit">
        <el-form-item label="Your name" prop="name">
            <el-input v-model="controls.name"></el-input>
        </el-form-item>

        <el-form-item label="Text of comment" prop="text">
            <el-input v-model="controls.text"></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-button native-type="submit" :loading="load"
             type="primary" @click.native.prevent="onSubmit">
             
                Add comment
            </el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            load: false,
            controls: {
                name: '1',
                text: '2'
            },
            rules: {
                name: [
                    { required: true, message: 'Please input  name', trigger: 'blur' }
                ],
                text: [
                    { required: true, message: 'Please input comment', trigger: 'blur' }
                ]
            }
        }
    },
     props: {
        postId: {
            type: Number,
            required: true
        }
    },
    methods: {
        onSubmit(){
            this.$refs.form.validate(async (valid) => {
            if (valid) {
                this.load = true;

                const data = {
                    author: this.controls.name,
                    text: this.controls.text,
                    post_id: this.postId
                }

                try {
                    const newComment = await this.$store.dispatch('comment/create', data);
                    this.$message.success('Comment is added');
                    this.$emit('createdNewComment', newComment);
                    this.load = false;
                }catch(e){
                    console.log("comment/create error: " + e.message);
                    this.load = false;
                } 

            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    }
}
</script>
 

<style scopde>
center{
    padding-bottom: 1rem;
}
</style>