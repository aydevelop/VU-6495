<template>
    <div>
        <div class="h2-login">
            <h2>Login</h2>
        </div>
        <div class="login-form">    
        <el-card :style="{width:'550px', margin:'auto 0'}">
            <el-form  :model="controls" :rules="rules" ref="form" label-width="120px" 
        class="demo-ruleForm" @submit.prevent="onSubmit">
            <el-form-item label="Email" prop="email">
                <el-input v-model="controls.email"></el-input>
            </el-form-item>

            <el-form-item label="Password" prop="pass">
                <el-input v-model="controls.pass"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button native-type="submit" :loading="load"
                type="primary" @click.native.prevent="onSubmit">
                
                    Login
                </el-button>
            </el-form-item>
            </el-form>
        </el-card>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'empty',
    data(){
        return{
            load: false,
            controls: {
                email: 'admin@mail.com',
                pass: '123456'
            },
            rules: {
                email: [
                    { required: true, message: 'Please input  email', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: 'Please input pass', trigger: 'blur' },
                    { min:6, message: 'Min length 6', trigger: 'blur'}
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
    },
    methods: {
        onSubmit(){

            this.$refs.form.validate(async (valid) => {
            if (valid) {
                this.load = true;

                const data = {
                    email: this.controls.email,
                    password: this.controls.pass
                }
                
                try {
                    await this.$store.dispatch('auth/login', data);
                } catch (error) {
                    console.log('auth/login error: ' + error);
                }
                
                this.$router.push('/admin');
                this.load = false;
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
   .login-form{
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: 5rem;
   }

   .h2-login{
       text-align: center;
   }

   form{
       margin-top: 2rem;
   }
</style>