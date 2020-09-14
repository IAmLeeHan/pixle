<template>
  <div class="Pixel">
    <div class="setting">
      <div class="checkedBox">
        <div class="colorbg border" :style="{backgroundColor:bgColor}">
          <div class="color" :style="{backgroundColor:bgColor}"></div>
        </div>
      </div>
      <div class="nativeBox">
        <div 
          v-for="(t,i) in colorList"
          :key="i"
          class="colorbg" :style="{backgroundColor:t.color}"
          @click="bgColor = t.color"
        >
          <div class="color" :style="{backgroundColor:t.color}"></div>
        </div>
      </div>
    </div>
    <canvas  type="2d" id="myCanvas" @touchstart="handleStart($event)" @touchmove="handleMove($event)" :disable-scroll="true"></canvas>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'pixel',
      canvas: null,
      space: 50,
      bgColor: '#e54d42',
      colorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      }, {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      }, {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      }, {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      }, {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      }, {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      }, {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      }, {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      }, {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      }, {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      }, {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      }, {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      }, {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      }, {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      }, {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      }]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.cavansInit()
    })
  },
  methods: {
    handleStart (e) {
      this.canvasCrow(e)
    },
    handleMove (e) {
      this.canvasCrow(e)
    },
    cavansInit () {
      const query = wx.createSelectorQuery()
      query.select('#myCanvas')
        .fields({ node: true, size: true })
        .exec((res) => {
          const canvas = res[0].node
          const ctx = canvas.getContext('2d')

          const dpr = wx.getSystemInfoSync().pixelRatio
          canvas.width = res[0].width * dpr
          canvas.height = res[0].height * dpr
          // 设置间隔
          var space = this.space
          // 定义当前坐标
          var x = 0
          let y = 0
          // 设置虚线
          // ctx.setLineDash([5, 10])
          // 绘制水平方向的网格线
          for (y = space; y < canvas.height; y += space) {
            // 开启路径
            ctx.beginPath()

            ctx.moveTo(0, y)
            ctx.lineTo(canvas.width, y)
            ctx.stroke()
          }
          // 绘制垂直方向的网格线
          for (x = space; x < canvas.width; x += space) {
            // 开启路径
            ctx.beginPath()

            ctx.moveTo(x, 0)
            ctx.lineTo(x, canvas.height)
            ctx.stroke()
          }
        })
    },
    // 绘制canvas
    canvasCrow (e) {
      if (e.touches.length <= 1) {
        const dpr = wx.getSystemInfoSync().pixelRatio
        let x = parseInt(e.x / this.space * dpr)
        let y = parseInt(e.y / this.space * dpr)
        let data = wx.getStorageSync('pixelArr') || []
        if (data.length > 0) {
          let arr = data.filter(item => {
            return item.x === x && item.y === y
          })
          if (arr.length === 1) {
            let index = data.findIndex(item => arr[0] === item)
            console.log(index, 'index')
            data[index] = {x, y, color: this.bgColor}
          } else {
            data.push({x, y, color: this.bgColor})
          }
        } else {
          data.push({x, y, color: this.bgColor})
        }
        wx.setStorage({
          key: 'pixelArr',
          data: data
        })
        const query = wx.createSelectorQuery()
        query.select('#myCanvas')
          .fields({ node: true, size: true })
          .exec((res) => {
            const canvas = res[0].node
            const ctx = canvas.getContext('2d')
            ctx.fillStyle = this.bgColor
            ctx.fillRect(x * this.space + 1, y * this.space + 1, 48, 48)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.setting{
  width: 750px;
  height: 150px;
  display: flex;
  border-bottom: 1px solid #666;
  .checkedBox{
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .nativeBox{
    width: calc(750px - 150px);
    height: 150px;
    background: #f0f0f0;
    overflow-x: auto;
    display: flex;
    align-items: center;
  }
  .colorbg{
    width: 92px;
    height: 90px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin:0 30px;
    &.border{
      border: 2px solid #0081ff;
    }
    .color{
      width: 110px;
      height: 110px;
      border-radius: 50%;
      opacity: 0.5;
      flex-shrink: 0;
      margin:0 30px;
    }
  }
}
  #myCanvas{
    width:100vw;
    height: 100vh;
  }
</style>