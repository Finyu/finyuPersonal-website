<template>
<div class='indexBox-zz'>
  <div class='indexBox-z1'
  :class='{
    "flip-animation-start": showDetail, 
    "flip-animation-end": !showDetail
  }'>
    <img  class='logo' src='@/assets/images/logo.png'>
    <div class='indexBox showBrAni'>
      <p class='href-z'
        v-for='(item, index) in readMe'
        :key='index'
        :class='item.class'
        :style="{'animationDelay': index * 0.3 + 's'}"
        @click='item.click.call(that)'>
        <span
          v-for='(todo, index2) in item.text.split("")'
          :style="{'animationDelay': 1 + index * 0.3 + index2 * 0.05 + 's'}"
          :key='index2'>
          {{todo}}
        </span>
      </p>
      <ul class='iconList'>
          <img v-for='item in iconList' :key='item.name' :title='item.name' @click='item.click' :src="item.src" alt="">
      </ul>
    </div>
  </div>
  <div class='indexBox-z2' >
      <img  class='logo' @click='showDetail = false; showType = ""' src='@/assets/images/logo.png'>
    <div class='indexBox'>
      <p class='my-introduce' v-if='showType == "ds"'>
        <span
          v-for='(item, index) in introduce.split("")'
          :style="{'animationDelay': 0.5 + index * 0.1 + 's'}"
          :key='index'>
          {{item}}
        </span>
      </p>
      <p v-if='showType == "resume"' @click='$message.info("还没准备好呢")'>点击下载我的简历</p>
      <p v-if='showType == "tool"' @click='window.open("http://www3.love614.live")'>转调器</p>
      <p v-if='showType == "game"' @click='showGameCat'>抓住神经猫</p>
      <div v-show='showType == "Harmonica"' style='position: relative;top: 20px;'>
        <el-scrollbar style='height: 300px;'>
          <p v-for='item in Harmonica' :key='item.name' @click='chanceShowMscC(item)'>{{item.name}}</p>
        </el-scrollbar>
        <iframe  ref='Mplayer' v-if='chanceShowMsc' frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 :src="chanceShowMsc"></iframe>
      </div>
      <div v-show='showType == "MessageFrom"' >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="在这里输入弹幕"
          v-model="messageContext">
        </el-input>
        <p style='height: 20px'></p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveMessage([messageContext, ()=> {messageContext = ''}])">确 定</el-button>
        </span>
      </div>
    </div>
    <gridCat v-if='visible.game_gridCat' :visible='visible' @showMessage='showMessage'></gridCat>
  </div>
</div>
  
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import gridCat from './dialog/gridCat.vue'
export default {
  data () {
    return  {
      that: this,
      showDetail: false,
      showType: '',
      MessageFrom: false,
      window: window,
      chanceShowMsc: '',
      messageContext: '',
      visible: {  // 弹窗
        game_gridCat: false // 神经猫的弹窗
      },
      introduce: '一只萌新前端工程狮，重度直男，中度强迫症，轻度喜欢造轮子，喜欢吹口琴。欢迎来到本站',
      Harmonica: [
        {
          name: '泰罗奥特曼主题曲',
          src: 'https://music.163.com/outchain/player?type=2&id=481653754&auto=0&height=66'
        },
        {
          name: '萤火虫之舞',
          src: 'https://music.163.com/outchain/player?type=2&id=524945238&auto=0&height=66'
        },
        {
          name: 'i say yes',
          src: 'https://music.163.com/outchain/player?type=2&id=479993388&auto=0&height=66'
        },
        {
          name: '童话',
          src: 'https://music.163.com/outchain/player?type=2&id=479994291&auto=0&height=66'
        },
        {
          name: '天空之城四重奏',
          src: 'https://music.163.com/outchain/player?type=2&id=479962401&auto=0&height=66'
        },
        {
          name: '跨越无数的夜晚',
          src: 'https://music.163.com/outchain/player?type=2&id=1394594665&auto=0&height=66'
        },
        {
          name: '数码宝贝-butterfly',
          src: 'https://music.163.com/outchain/player?type=2&id=572488427&auto=0&height=66'
        },
        {
          name: '妖精的尾巴主题曲',
          src: 'https://music.163.com/outchain/player?type=2&id=509091665&auto=0&height=66'
        },
        {
          name: '樱花纷飞时',
          src: 'https://music.163.com/outchain/player?type=2&id=549402661&auto=0&height=66'
        },
        {
          name: '小幸运',
          src: 'https://music.163.com/outchain/player?type=2&id=479994300&auto=0&height=66'
        },
        {
          name: '清明樱花祭',
          src: 'https://music.163.com/outchain/player?type=2&id=479961453&auto=0&height=66'
        },
      ],
      iconList: [
        {
          name: 'github',
          src: require('@/assets/images/github.svg'),
          click: () => window.open('https://github.com/Finyu')
        },
        {
          name: '掘金',
          src: require('@/assets/images/juejin.svg'),
          click: ()=> window.open('https://juejin.im/user/5bc45fc2f265da0a8f35ed6b')
        },
        {
          name: 'QQ',
          src: require('@/assets/images/QQ.svg'),
          click: () => this.showMessage('主人的联系qq是：1253092242， 不要随便告诉别人哦', 4000, 9)
        },
      ],
      readMe: [
        {
          text: '笔记',
          click: function() { this.$message.info("笔记还在写呢") } 
        },
        {
          text: '小游戏',
          click: function() { this.show("game") } 
        },
        {
          text: '关于我',
          click: function()  { this.show("ds") } 
        },
        {
          text: '我的简历',
          click: function() { this.show("resume") } 
        },
        {
          text: '组件/方法库',
          click: function() { window.open("http://www2.love614.live/#/zh-CN/component/fetch") } 
        },
        {
          text: '写的一些工具',
          click: function() { this.show("tool") } 
        },
        {
          text: '口琴作品',
          click: function() { this.show("Harmonica") } 
        },
        {
          text: '踩一脚(留言)',
          // class: 'inline-Z inline-bock-left',
          click: function() { this.show("MessageFrom") } 
        },
        {
          text: '访问统计',
          // class: 'inline-Z',
          click: function() { this.lookShow() } 
        },
      ]
    }
  },
  computed: {
    ...mapGetters('permission', [
      'messageList',
      'lookNum'
    ]),
  },
  components: {
    gridCat
  },
  methods: {
    ...mapActions('permission', [
      'getData',
      'saveMessage',
      'getNum',
      'addNum'
    ]),
    show(val){
      let text = '点一下头像就可以返回主目录哦~'
      if (val == 'Harmonica') text = '主人吹口琴超好听的说'
      if (val == 'MessageFrom') text = '留言要文明用语哦，主人会定期清理的'
      this.showMessage(text, 4000, 10)
      this.showType = val
      this.showDetail = true
    },
    showMessage(text, timeout, priority) { // 暂时对话，参数分别为内容、延迟和显示优先级
      if (!text) return
      if (!sessionStorage.getItem("waifu-text") || sessionStorage.getItem("waifu-text") <= priority) {
        if (window.messageTimer) {
          clearTimeout(window.messageTimer)
          window.messageTimer = null
        }
        sessionStorage.setItem("waifu-text", priority)
        var tips = document.getElementById("waifu-tips")
        tips.innerHTML = text
        tips.classList.add("waifu-tips-active")
        window.messageTimer = setTimeout(() => {
          sessionStorage.removeItem("waifu-text")
          tips.classList.remove("waifu-tips-active")
        }, timeout)
      }
    },
    chanceShowMscC(item){
      this.chanceShowMsc = item.src
      if (item.name === '天空之城四重奏') {
        this.showMessage("这是汐老师和主人的合奏，汐老师的调校很棒呢", 10000, 9)
      }
      if (item.name === '泰罗奥特曼主题曲') {
        this.showMessage("主人的童年~", 10000, 9)
      }
      if (item.name === 'i say yes') {
        this.showMessage("到那一天，瑶瑶会对主人说yes嘛", 10000, 9)
      }
      if (item.name === '童话') {
        this.showMessage("大人的世界没有童话", 10000, 9)
      }
      if (item.name === '小幸运') {
        this.showMessage("主人经常说：瑶瑶是他用上半辈子的运气换来的，希望下半辈子他们还能好好的", 10000, 9)
      }
      console.log(this.$refs)
    },
    lookShow(){
      this.getNum(()=> {
        this.showMessage(`主人的网站目前一共被访问了 ${this.lookNum} 次,   还要加油哦！`, 6000, 10)
      })
    },
    showGameCat(){
      this.showMessage(`这只猫超级调皮！ 可以通过点击周围的区域来设置障碍，抓住它吧`, 8000, 10)
      this.visible.game_gridCat = true
    }
  },
  created(){
    this.getData()
    this.addNum()
    if (window.innerWidth < 1000) {
      this.$message.info('本站暂时还没有适配移动端，抱歉。')
    }
  }
}
</script>

<style lang="stylus">
.indexBox-zz
  width 100%
  height 100%
  position absolute
  top 0
  left 0
  overflow hidden
  .indexBox-z1
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index 999
    background #8cc
    border-radius 300px
    -webkit-transform-origin 100% 0 0
    transform-origin 100% 0 0
    transition  z-index 1s
    .logo
      width 80px
      height 80px
      overflow hidden
      border-radius 50%
      position absolute
      cursor pointer
      top 20px
      left 260px
    .indexBox
      text-align center
      width 50%
      margin 50% 50%
      transform translate(-50%, -50%)
      font-family '微软雅黑'
      p
        line-height 40px
        cursor pointer
      .title-z
        font-size 24px
        margin 20px 0
      .href-z
        font-size 16px
      .inline-Z
        width 50%
        display inline-block
      .inline-bock-left
        border-right 1px solid white
  .indexBox-z2
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    z-index 99
    background white
    border-radius 300px
    color #5f6471
    font-size 12px
    .indexBox
      text-align center
      width 50%
      margin 50% 50%
      transform translate(-50%, -50%)
      font-family '微软雅黑'
      color black
      p
        line-height 40px
        cursor pointer
      .title-z
        font-size 24px
        margin 20px 0
      .href-z
        font-size 16px
    .logo
      width 80px
      height 80px
      border-radius 50%
      overflow hidden
      position absolute
      cursor pointer
      top 20px
      left 260px
	/*I'm the home page动画*/
	.flip-animation-start
		animation flipBook1 1s forwards
		-moz-animation flipBook1 1s forwards /* Firefox */
		-webkit-animation flipBook1 1s forwards /* Safari and Chrome */
		-o-animation flipBook1 1s forwards /* Opera */
	.flip-animation-end
		animation flipBook2 1s forwards
		-moz-animation flipBook2 1s forwards /* Firefox */
		-webkit-animation flipBook2 1s forwards /* Safari and Chrome */
		-o-animation flipBook2 1s forwards /* Opera */
	@keyframes flipBook1 {
		0% {
			-webkit-transform: rotateY(0deg);
			-ms-transform: rotateY(0deg);
			-o-transform: rotateY(0deg);
			transform: rotateY(0deg);
      opacity: 1;
		}
		100% {
			-webkit-transform: rotateY(260deg);
			-ms-transform: rotateY(260deg);
			-o-transform: rotateY(260deg);
			transform: rotateY(260deg);
      opacity: 0;
		}
	}
  @keyframes flipBook2 {
		0% {
			-webkit-transform: rotateY(260deg);
			-ms-transform: rotateY(260deg);
			-o-transform: rotateY(260deg);
			transform: rotateY(260deg);
      opacity: 0;
		}
		100% {
			-webkit-transform: rotateY(0deg);
			-ms-transform: rotateY(0deg);
			-o-transform: rotateY(0deg);
			transform: rotateY(0deg);
      opacity: 1;
		}
	}
.el-scrollbar__wrap
  overflow-x hidden
.iconList
  margin 20px 0 0
  img 
    width 24px
    height 24px
    margin 0 20px
    cursor pointer

</style>