<template>
  <el-submenu v-if="router.children&&router.children.length>0" :index="router.path">
    <template slot="title">{{router.label}}</template>
    <div v-for="item in router.children" :key="item.id">
      <el-submenu v-if="item.children&&item.children.length>0" :index="item.path">
        <template slot="title">{{item.label}}</template>
        <secondNavItem v-for="child in item.children" :key="child.id" :router="child"></secondNavItem>
      </el-submenu>
      <el-menu-item v-else :index="item.path">{{item.label}}</el-menu-item>
    </div>
  </el-submenu>
  <el-menu-item v-else :index="router.path">{{router.label}}</el-menu-item>
</template>

<script>
export default {
  name: 'secondNavItem',
  props: {
    router: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  components: {

  },
  watch: {
  },
  created () {
  },
  update () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>
