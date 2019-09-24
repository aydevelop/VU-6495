<template>
    <div>
        <el-table
    :data="posts"
    style="width: 100%">

    <el-table-column prop="title" label="Title"></el-table-column>
    <el-table-column
      label="Date"
      width="180">
      <template slot-scope="{row: {updated_at}}">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ new Date(updated_at).toLocaleDateString() }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="views" label="Views"></el-table-column>
    <el-table-column
      label="Comments"
      width="180">
      <template slot-scope="{row: {comments}}">
        <i class="el-icon-notebook-2"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="Actions">
      <template slot-scope="{row}">
        <el-tooltip class="item" effect="dark" content="Open post" placement="top">
          <el-button
            icon="el-icon-edit-outline"
            size="mini"
            @click="open(row.id)">Edit</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="Delete post" placement="top">
          <el-button
            icon="el-icon-delete-solid"
            size="mini"
            type="danger"
            @click="remove(row.id)">Delete</el-button>
         </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
    </div>
</template>

<script>
export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    async asyncData({store}){
        const posts = await store.dispatch('post/fetchAdmin')
        return {posts};
    },
    methods:{
        open(id){
            console.log('open', id);
            this.$router.push('/admin/post/'+id);
        },
        async remove(id){

            try {
              await this.$confirm('This will permanently delete the post. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
              });

              await this.$store.dispatch('post/remove', id);
              this.posts = this.posts.filter(p=>p.id !== id);

              this.$message({
                type: 'success',
                message: 'Delete completed'
              });
             } catch (error) {
              
            }
        }
    }
}
</script>