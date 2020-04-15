<template>
  <el-menu
    class="common-tree"
    :router="isRouter"
    background-color="#104c44"
    text-color="#fff"
    :default-active="$route.path"
    active-text-color="#fb7d4b"
    :unique-opened="true"
    >
    <navItem :router="item" v-for="item in router" :key="item.id"></navItem>
  </el-menu>
</template>

<script>
import navItem from './navItem'
export default {
  name: 'leftNavTree',
  props: {
    router: {
      type: Array,
      default () {
        return [
          {
            label: '终端管理',
            path: '/asset/terminal',
            children: [
              {
                label: '终端基础信息管理',
                path: '/asset/terminal/basicInfo',
                children: [
                  {
                    label: '测试1',
                    path: '/1',
                    children: [
                      {
                        label: '测试1-1',
                        path: '/1-1',
                        children: [
                          {
                            label: '测试1-1-1',
                            path: '/asset/terminal/basicInfo'
                          },
                          {
                            label: '测试1-1-2',
                            path: '/asset/terminal/account'
                          }
                        ]
                      },
                      {
                        label: '测试1-2',
                        path: '/1-2'
                      }
                    ]
                  },
                  {
                    label: '测试2',
                    path: '/2',
                    children: [
                      {
                        label: '测试2-1',
                        path: '/2-1'
                      },
                      {
                        label: '测试2-2',
                        path: '/2-2'
                      }
                    ]
                  }
                ]
              },
              {
                label: '终端台账管理',
                path: '/asset/terminal/account'
              }
            ]
          },
          {
            label: '终端管理12',
            path: '/site'
          }
        ]
      }
    },
    isRouter: {
      type: Boolean,
      default:true
    }
  },
  data () {
    return {}
  },
  components: {
    'navItem': navItem
  },
  watch: {
  },
  created () {
    // console.log(this.router)
    // this.addIsExpand(this.router)
    // console.log(this.router)
  },
  update () {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
.common-tree
  width 100%
  height 100%
  border-right none
  &>.el-menu-item, &>.el-submenu > .el-submenu__title
    height 60px
    line-height 60px
    border-bottom 1px solid #104f47
    font-size 16px
    background #0f3b36 !important
    color rgba(255,255,255,.7) !important
  &>.el-submenu
    font-size 14px
    &>.el-menu>div>.el-menu-item
      background rgba(255,255,255,.08) !important
      color rgba(255,255,255,0.5) !important
      &.is-active
        color #fb7d4b !important
    .el-menu-item
      height 55px
      line-height 55px
  &>.el-submenu.is-opened
    &>.el-submenu__title
      // background #145b52 !important
      color rgba(255,255,255,1) !important
  .el-menu-item.is-active
    color #fb7d4b !important
</style>
