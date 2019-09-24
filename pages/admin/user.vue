<template>
    <div>
        <div class="h2-login">
            <h2>Create user</h2>
        </div>
        <div class="user-form">    
            <el-form  :model="controls" :rules="rules" ref="form" label-width="120px" 
        class="demo-ruleForm" @submit.prevent="onSubmit">
            <el-form-item label="Login" prop="login">
                <el-input v-model="controls.login"></el-input>
            </el-form-item>
            
            <el-form-item label="Email" prop="email">
                <el-input v-model="controls.email"></el-input>
            </el-form-item>

            <el-form-item label="Password" prop="pass">
                <el-input v-model="controls.pass"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button native-type="submit" :loading="load"
                type="primary" @click.native.prevent="onSubmit">
                
                    Create
                </el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    data(){
        return{
            load: false,
            controls: {
                login: '1',
                pass: '111111',
                email: '1'
            },
            rules: {
                login: [
                    { required: true, message: 'Please input  login', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: 'Please input pass', trigger: 'blur' },
                    { min:6, message: 'Min length 6', trigger: 'blur'}
                ],
                email: [
                    { required: true, message: 'Please input email', trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
        const {msg} = this.$route.query;
        if(msg==='login'){
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
                    name: this.controls.login,
                    email: this.controls.email,
                    password: this.controls.pass
                }

                try {
                    await this.$store.dispatch('auth/createUser', data);
                    this.$message.success('new user added'); 
                    
                    this.controls.login = '';
                    this.controls.pass = '';
                    this.controls.email = '';
                }
                catch(error) {
                }

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