<template>
  <el-upload
  :action="importAction"
  :on-success="importSuccess"
  style="display:inline-block"
  :headers="{'token':token}"
  :show-file-list="false">
    <el-button  icon="el-icon-upload2" class="common-button" size="mini" type="primary">导入</el-button>
  </el-upload>
</template>

<script>
export default {
  props: ['importAction'],
  data(){
    return {
      token: window.localStorage.token
    }
  },
  methods: {
    importSuccess(response, file, fileList) {
      if (response.code == 200) {
        this.$message.success(response.message)
        return false
      }
        this.$message.error(response.message)
    }
  }
}
</script>

<style>

</style>