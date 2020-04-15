<template>
  <el-menu
    class="nav-second-ul"
    :router=true
    background-color="#145b52"
    text-color="#fff"
    active-text-color="#fb7d4b"
    :default-active="$route.path"
    >
    <navItem :router="item" v-for="item in router" :key="item.id"></navItem>
  </el-menu>
</template>

<script>
import navItem from './secondNavItem'
export default {
  name: 'secondNavIndex',
  props: {
    router: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  components: {
    'navItem': navItem
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
