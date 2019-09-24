<template>
  <el-container>
    <el-header>
      <navigation />
    </el-header>
    <el-main>
      <nuxt />
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>

<script>
import Navigation from '@/components/main/Navigation'
export default {
  computed: {
    error(){
        return this.$store.getters['error'];
      }
    },
    watch:{
        error(value){
            let msg = "< Network Error >";

            if(value && value.response){
                if(value.response.data && value.response.data.errors){
                    msg = JSON.stringify(value.response.data.errors);
                }
            }
            
            this.$message.error(msg);
        }
    },
  components:{
    Navigation
  }
}
</script>

<style>
</style>
