<template>
<div class="relative">
    <div @tap="selectType" :class="'current-color-setting ' + (type==='bg'?'current-color-setting-active':'')" :data-cur="type==='pixel'?'bg':'pixel'" :style="'background: ' + bgColor">
        <div :class="'cu-item ' + (type==='pixel'?'current-color-setting-active':'')" :style="'background: ' + pixelColor">
            <div class="cu-item-inner" :style="'background: ' + pixelColor"></div>
        </div>
    </div>
    <div scroll-x class="bg-white nav text-center color-setting">
        <div class="color-setting-box" style="margin-left: 140rpx">
            <div v-for="(item, index) in colorList" :key="index" @tap="selectColor" class="cu-item shadow" :data-cur="item.color||item" :style="'background: ' + item.color||item">
                <div class="cu-item-inner" :style="'background: ' + item.color||item"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
var t = require('./color')
getApp()

export default {
  data () {
    return {
      colorList: t.ColorList,
      type: 'pixel',
      rgba: {
        r: 240,
        g: 113,
        b: 43,
        a: 1
      },
      pixelColor: 'rgba(240,113, 43, 1)',
      bgColor: 'rgba(255, 255, 255, 1)',
      fontColor: 'rgba(50, 50, 50, 1)'
    }
  },

  components: {},
  props: {
    setting: {
      type: 'String',
      default: ''
    },
    pixelColor: {
      type: 'String',
      default: ''
    },
    bgColor: {
      type: 'String',
      default: ''
    },
    fontColor: {
      type: 'String',
      default: ''
    }
  },
  watch: {
    setting: {
      handler (t, e, o) {
        console.log('properties: ', t, e, o)
      },
      immediate: true
    }
  },
  options: {
    addGlobalClass: !0
  },
  beforeMount () {
    console.log('colorsetting', this)
  },
  methods: {
    updateProps () {
      var t = {
        pixelColor: this.pixelColor,
        bgColor: this.bgColor,
        fontColor: this.fontColor,
        setting: 'color'
      }
      let e = {}
      this.$emit('colorsettingevent', {
        detail: t
      }, e)
    },
    selectType (t) {
      console.log('e.currentTarget.dataset.cur', t.currentTarget.dataset.cur)
      this.type = t.currentTarget.dataset.cur
    },
    selectColor (t) {
      switch (this.type) {
        case 'pixel':
          this.pixelColor = t.currentTarget.dataset.cur
          break

        case 'bg':
          this.bgColor = t.currentTarget.dataset.cur
          break

        case 'font':
          this.fontColor = t.currentTarget.dataset.cur
      }

      this.updateProps()
    }
  }
}
</script>
<style>
.cu-card-font {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.cu-card-font .cu-item {
    border-radius: 0;
    margin: 0;
    padding: 30rpx 6rpx;
    flex: 1;
    text-align: center;
}

.cu-card-font .cu-item-active {
    background: #4e7dc2;
    color: #ffffff;
}

.cu-card-font .cu-item .color-item {
    display: inline-block;
    margin-left: 3rpx;
    border-radius: 50rpx;
    background: #000;
    width: 40rpx;
    height: 40rpx;
}

.cu-card-color {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.cu-card-color .cu-item {
    cursor: pointer;
    float: left;
    padding: 24rpx 12rpx;
    flex: 8;
}

.cu-card-color .cu-tabbar-height {
    clear: both;
}

.cu-list.menu>.cu-item.arrow:before {
    content: ''!important;
}

.DrawerPage {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0vw;
    background-color: #f1f1f1;
    transition: all 0.4s;
}

.DrawerPage.show {
    transform: scale(0.9,0.9);
    left: 85vw;
    box-shadow: 0 0 60rpx rgba(0,0,0,0.2);
    transform-origin: 0;
}

.DrawerWindow {
    position: absolute;
    width: 85vw;
    height: 100vh;
    left: 0;
    top: 0;
    transform: scale(0.9,0.9) translateX(-100%);
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s;
}

.DrawerWindow.show {
    transform: scale(1,1) translateX(0%);
    opacity: 1;
    pointer-events: all;
}

.DrawerClose {
    position: absolute;
    width: 40vw;
    height: 100vh;
    right: 0;
    top: 0;
    color: transparent;
    padding-bottom: 30rpx;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background-image: linear-gradient(90deg,rgba(0,0,0,0.01),rgba(0,0,0,0.6));
    letter-spacing: 5px;
    font-size: 50rpx;
    opacity: 0;
    pointer-events: none;
    transition: all 0.4s;
}

.DrawerClose.show {
    opacity: 1;
    pointer-events: all;
    width: 15vw;
    color: #fff;
}

.DrawerPage .cu-bar.tabbar .action button.icon {
    width: 64rpx;
    height: 64rpx;
    line-height: 64rpx;
    margin: 0;
    display: inline-block;
}

.DrawerPage .cu-bar.tabbar .action .cu-avatar {
    margin: 0;
}

.DrawerPage .nav {
    flex: 1;
}

.DrawerPage .nav .cu-item.cur {
    border-bottom: 0;
    position: relative;
}

.DrawerPage .nav .cu-item.cur::after {
    content: "";
    width: 10rpx;
    height: 10rpx;
    background-color: currentColor;
    position: absolute;
    bottom: 10rpx;
    border-radius: 10rpx;
    left: 0;
    right: 0;
    margin: auto;
}

.DrawerPage .cu-bar.tabbar .action {
    flex: initial;
}

.color-setting {
    background: #f2f2f2;
    height: 140rpx;
}

.color-setting .cu-item,.current-color-setting .cu-item {
    margin: 15px;
    width: 90rpx;
    height: 90rpx;
    background: #000;
    border-radius: 50%;
    position: relative;
}

.current-color-setting .cu-item .cu-item-inner,.color-setting .cu-item .cu-item-inner {
    position: absolute;
    top: -10rpx;
    left: -10rpx;
    width: 110rpx;
    height: 110rpx;
    background: #000;
    border-radius: 50%;
    opacity: 0.5;
}

.current-color-setting {
    position: absolute;
    top: 0;
    left: 0;
    width: 140rpx;
    height: 140rpx;
    z-index: 99;
    border: 4rpx solid #fff;
}

.current-color-setting .cu-item {
    margin: 0 auto;
    margin-top: 25rpx;
}

.current-color-setting-active,.current-color-setting .current-color-setting-active {
    border: 4rpx solid #0081ff;
}

.current-color-setting .current-color-setting-active .cu-item-inner {
    top: -14rpx;
    left: -14rpx;
}
</style>