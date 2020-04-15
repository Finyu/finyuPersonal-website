<template>
  <el-submenu v-if="router.children&&router.children.length>0" :index="router.path">
    <template slot="title">{{router.label}}</template>
    <div v-for="itemChild in router.children" :key="itemChild.id" class="nav-second-wrap">
      <el-submenu v-if="itemChild.children&&itemChild.children.length>0" :index="itemChild.path" class="nav-second-title">
        <template slot="title"><span>{{itemChild.label}}</span></template>
        <navSecond :router="itemChild.children" class="nav-second-ul"></navSecond>
      </el-submenu>
      <el-menu-item v-else :index="itemChild.path"><span>{{itemChild.label}}</span></el-menu-item>
    </div>
  </el-submenu>
  <el-menu-item v-else :index="router.path">{{router.label}}</el-menu-item>
</template>

<script>
import navSecond from './secondNavIndex'
export default {
  name: 'navItem',
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
    'navSecond': navSecond
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
<style lang="stylus">
.nav-second-wrap
  &>.el-menu-item>span
    display inline-block
    border-bottom 1px solid #3a6f68
    width 138%
    height 54px
.nav-second-ul
  // display none
  position fixed
  height 100%
  left 0px
  top 100px
  z-index 1111
  opacity 0
  transition all .35s ease-in-out
.nav-second-title
  &>.el-menu-item, &>.el-submenu__title
    font-size 14px !important
    background rgba(255,255,255,.08) !important
    color rgba(255,255,255,.5) !important
    span
      display inline-block
      border-bottom 1px solid #3a6f68
      width 113%
      height 54px
  &>.el-menu 
    position relative
    height 0 !important
  &>.el-submenu__title .el-submenu__icon-arrow
      transform rotateZ(270deg)
  &.is-opened
    &>.el-submenu__title
      background #145b52 !important
      color rgba(255,255,255,1) !important
    &>.el-menu 
      height 0 !important
      &>.nav-second-ul
        left 200px
        opacity 1
    &>.el-submenu__title .el-submenu__icon-arrow
      transform rotateZ(90deg)
</style>
