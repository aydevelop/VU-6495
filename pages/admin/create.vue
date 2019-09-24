<template>
    <div>
        <h2>
            Create new post
        </h2>
        <div class="edit-form">    
            <el-form  :model="controls" :rules="rules" ref="form" label-width="120px" 
        class="demo-ruleForm" @submit.prevent="onSubmit">
            
            <el-form-item label="Post title" prop="title">
                <el-input :rows="10" type="input" v-model="controls.title"></el-input>
            </el-form-item>

            <el-form-item label="Post text (html)" prop="text">
                <el-input :rows="10" type="textarea" v-model="controls.text"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button native-type="submit" :loading="load"
                type="primary" @click.prevent="dialogVisible = true">
                 Preview text 
                </el-button>
            </el-form-item>

            <el-form-item>
                <el-button native-type="submit" :loading="load"
                type="primary" @click.native.prevent="onSubmit">
                    Create post
                </el-button>
            </el-form-item>

            </el-form>

            <el-dialog
                title="Preview post"
                :visible.sync="dialogVisible"
                width="30%">

                <div :key="controls.text">
                    <vue-markdown>{{ controls.text }} </vue-markdown>
                </div>

            </el-dialog>

            <div class="post-image">
                <h2>Post image</h2>
                <el-upload 
                    drag
                    ref = "upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleImageChange"
                    :auto-upload="false"
                    >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
                    <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 5mb</div>
                </el-upload>
            </div>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    data(){
        return{
            image: null,
            dialogVisible: false,
            load: false,
            controls: {
                text: '',
                title: ''
            },
            rules: {
                text: [
                    { required: true, message: 'Please input text', trigger: 'blur' }
                ],
                title: [
                    { required: true, message: 'Please input title', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleImageChange(file, fileList){
            this.image = file.raw;
        },
        onSubmit(){
            this.$refs.form.validate(async (valid) => {

                if(!this.image){
                    this.$message.error('Need load image');
                }

                if(valid && this.image){
                    this.load = true;

                    const data = {
                        title: this.controls.title,
                        text: this.controls.text,
                        image: this.image
                    }

                    try {
                        await this.$store.dispatch('post/create', data);
                        this.controls.text = '';
                        this.controls.title = '';
                        this.file = null;
                        this.$refs.upload.clearFiles();
                        this.$message.success('Post is created');
                    } finally{
                        this.load = false;
                    }
                    
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
h2{
    text-align: center;
    padding-bottom: 30px;
}

.post-image{
    text-align: center;
}

.post-image{
    margin-bottom: 50px;
}
</style>