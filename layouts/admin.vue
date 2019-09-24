<template>
    <div class="admin-layout-wrap">
    <el-container :style="{height: '100%'}">
        <el-aside width="200px">
            <app-side />
        </el-aside>
        <el-main>
            <nuxt />
        </el-main>
    </el-container>
    </div>
</template>

<script>
import AppSide from '@/components/admin/Aside'
export default {
    computed: {
        error(){
            return this.$store.getters['error'];
        }
    },
    watch:{
        error(value){
            let msg = "Network Error";

            if(value && value.response){
                if(value.response.data && value.response.data.errors){
                    msg = JSON.stringify(value.response.data.errors);
                }
            }
            
            this.$message.error(msg);
        }
    },
    components: {AppSide}
}


</script>

<style lang="scss" scoped>
.admin-layout-wrap{
    width: 100%;
    height: 100vh;    
}
</style>