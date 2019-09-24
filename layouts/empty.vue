<template>
    <div class="empty-layout">
        <nuxt />
    </div>
</template>

<script>
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
    }
}
</script>

<style lang="scss" scoped>
    .empty-layout{
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: 3rem;
    }
</style>