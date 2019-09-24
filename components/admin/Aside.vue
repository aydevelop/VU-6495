<template>
    <div>
        <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo">

      <el-menu-item index="/">
        <nuxt-link to="/"><i class="el-icon-postcard"></i>Site</nuxt-link>
      </el-menu-item>
      <el-menu-item index="/admin">
        <nuxt-link to="/admin"><i class="el-icon-menu"></i>Status</nuxt-link>
      </el-menu-item>
      <el-menu-item index="/admin/create">
        <nuxt-link to="/admin/create"><i class="el-icon-full-screen"></i>Create</nuxt-link>
      </el-menu-item>
      <el-menu-item index="/admin/list">
         <nuxt-link to="/admin/list"><i class="el-icon-tickets"></i>Posts</nuxt-link>
      </el-menu-item>
      <el-menu-item index="/admin/user">
        <nuxt-link to="/admin/user"><i class="el-icon-user"></i>Users</nuxt-link>
      </el-menu-item>
      <el-menu-item index="/admin/logout">
        <nuxt-link to="/admin/logout"><i class="el-icon-circle-close"></i>Exit</nuxt-link>
      </el-menu-item>
      


    </el-menu>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
a{
  color:black;
  text-decoration: none;
}
</style>