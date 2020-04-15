<template>
  <div class="layout-wrap">
    <header class="layout-nav">
      <div class="nav-title-wrap">
        <div class="time">
          <!-- <img src="@/assets/images/header/icon-time.png" alt="time"> -->
          {{currentdate}}</div>
      </div>
    </header>
    <section class="layout-content">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
      <div class='shadowBox'></div>
    </section>
    <div class='danmuBox' ref='danmuBox'>
      <p class='danmu'
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
        v-for='(item, index) in messageList'
        :key='index' :style='styleList[index]'
      >
        {{item}}
      </p>
    </div>
  </div>
</template>

<script>
import store from  '@/store'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Layout',
  data() {
    return {
      nav: [
        {
          label: '首页',
          router: '/home'
        }
      ],
      currentdate: null,
      index: 0, 
      store: store,
      styleList: {},
      width_danmu: '',
      danmuNum: 10, // 不同分辨率下弹幕滚动的速度
      danmuQueue: 0, // 弹幕版可同时容纳弹幕的最大数
      danmuList: [] // 当前正在展示的弹幕队列，当大于danmuQueue后会被重置为0
    } 
  },
  created() {
    this.width_danmu = window.innerWidth + 300
  },
  components: {
  },
  computed: {
    ...mapGetters('permission', [
      'messageList'
    ]),
  },
  watch: {
    messageList(){
      this.danmuSend()
    }
  },
  mounted () {
    this.handleTime()
    let _this = this
    this.timer = setInterval(() => {
      _this.handleTime()
    }, 1000)
    let danmuListL = parseInt(this.$refs.danmuBox.offsetHeight / 40)
    window.danmuQueue = []
    for (let i = 0; i < danmuListL; i ++) {
      window.danmuQueue.push(i + 1)
    }
    if (window.innerWidth > 1000 &&  window.innerWidth < 1300) this.danmuNum = 10
    if (window.innerWidth > 1300 &&  window.innerWidth < 1600) this.danmuNum = 20
    if (window.innerWidth > 1600 &&  window.innerWidth < 2000) this.danmuNum = 30
  },
  methods: {
    handleTime () {
      let date = new Date()
      let seperator1 = '-'
      let year = date.getFullYear()
      let month = this.isAddZero(date.getMonth() + 1)
      let strDate = this.isAddZero(date.getDate())
      let hours = this.isAddZero(date.getHours())
      let Minutes = this.isAddZero(date.getMinutes())
      let Seconds = this.isAddZero(date.getSeconds())
      let currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hours + ':' + Minutes + ':' + Seconds
      this.currentdate = currentdate
    },
    isAddZero (value) {
      if (value >= 0 && value <= 9) {
        value = '0' + value
      }
      return value
    },
    danmuSend(){ // 开始逐条推送弹幕
      if (this.index == this.messageList.length && this.messageList.length > 0) return false // 如果弹幕数量为0或者所有弹幕都播放过了 则停止执行
      let that = this
      window.timer_Z = setTimeout(() => {
        if (window.danmuQueue.length == that.danmuList.length) that.danmuList = [] // 如果弹幕版所有位置都播放过了，就重置状态，可以重新随机播放
        let noOneList = that.fn(window.danmuQueue, that.danmuList) // 计算一下弹幕版上哪些位置没有被播放过，主要是为了避免两条弹幕重合
        let x = noOneList[parseInt(Math.random() * noOneList.length)] // 从可以播放的位置中随机挑选一个
        that.danmuList.push(x)
        that.styleList[that.index] = {
          "transform": `translateX(-${this.width_danmu}px)`,
          "top": (x - 1) * 40 + 'px',
          "transition": "transform " + (this.danmuNum + Math.random() * 20) + 's'
        }
        that.index ++
        window.timer_Z = null 
        that.danmuSend()
      }, 2000)
    },
    fn(arr1, arr2){ // 去掉两个数组同样的部分
      return arr1.filter(item => arr2.indexOf(item) == -1)
    },
    mouseenter(v) {
      v.target.style.transition = "transform 100s"
      v.target.style.transform = `translateX(-${this.width_danmu}px)`
    },
    mouseleave(v) {
      v.target.style.transition = "transform " + (this.danmuNum + Math.random() * 20) + 's'
      v.target.style.transform = `translateX(-${this.width_danmu}px)`
    }
  }
}
</script>

<style lang="stylus" scoped>
.layout-wrap
  width 100%
  height 100%
  position relative
  .layout-nav
    height 100px
    width 100%
    text-align center
    .nav-title-wrap
      height 64px
      line-height 64px
      position relative
      .time
        position absolute
        left 10px
        top 6px
        text-align center
        font-size 16px
        color orange
  .layout-content
    height 600px
    width 600px
    position absolute
    left calc(50% - 300px)
    top calc(50% - 300px)
    border 3px white dotted
    border-radius 300px
#lookNum
  position relative
  right -50px
  color red

.danmuBox
  position absolute
  top 0
  height calc(50% - 300px)
  width 100%
  z-index 99
  .danmu
    position absolute
    left 100%
    color white
    white-space nowrap
</style>
