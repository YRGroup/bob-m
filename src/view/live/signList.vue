<template>
  <div class="box">
    <div class="wrapper">
      <scroll-view ref="scroll" class="userList left-item">
        <ul class="ul">
          <transition-group name="fade">
            <li v-for="(item, index) in signInList" :key="item.ID" class="user-wrapper">
              <p class="user-avater">
                <img :src="item.imageUrl" alt :title="item.name">
              </p>
              <p class="user-name">
                <span>{{item.name}}</span>
              </p>
            </li>
          </transition-group>
        </ul>
      </scroll-view>
      <div class="right-item">
        <p @click="$router.push('/lottery/'+lid)" style="cursor:pointer;">
          <img src="./ma.jpg" alt>
        </p>
        <p>使用微信扫码签到，即可参与现场抽奖</p>
        <p>
          已有
          <span>{{signInList.length}}</span>人参加
        </p>
        <p>
          <!-- <router-link :to="'/lottery/'+lid">去抽奖</router-link> -->
        </p>
      </div>
    </div>
    <div class="session session-bg">
      <i class="fw" :class="{test: piao}"></i>
    </div>
    <div class="bg" :style="{backgroundImage:`url(${bgImg})`}"></div>
  </div>
</template>

<script>
import scrollView from "@/components/scroll-view";
export default {
  name: "signList",

  data() {
    return {
      logo: require("@/assets/xsdlogo.jpg"),
      control: true,
      lid: 0,
      signInList: [], //所有签到用户
      lotteryList: [], //待抽奖用户
      luckList: [], //已中奖用户
      activeIndex: null,
      timer: null,
      luckyMan: {},
      piao: false,
      bgImg: require("@/assets/2018cover.jpg"),
      bgImgUrl: "",
      showUserList: true
    };
  },
  components: {
    scrollView
  },
  created() {
    this.lid = this.$route.params.id;
    let para = {
      id: this.lid
    };
    this.getSignInList();
    this.timer = setInterval(() => {
      this.getSignInList();
    }, 3000);
    this.getOneLiveRoom();
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    next();
  },
  methods: {
    getOneLiveRoom() {
      let para = {
        id: this.lid
      };
      this.$API.getOneLiveRoom(para).then(res => {
        console.log(res);
        this.bgImgUrl = res.Content.CoverImg;
      });
    },
    getSignInList() {
      let para = {
        lid: this.lid,
        curid: this.curid,
        count: 2
      };
      this.$API.getSignInList(para).then(res => {
        this.curid = res.Content[res.Content.length - 1].ID;
        res.Content.forEach(element => {
          this.signInList.unshift(element);
        });
        this.$nextTick(() => {
          this.$refs.scroll.refresh();
        });
      });
    }
  }
};
</script>

<style lang="less" scoped>

.user-wrapper {
  display: inline-block;
  margin: 10px;
  text-align: center;
  width: 100px;
  .user-avater {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    img {
      border: 3px solid #940911;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 50%;
    }
  }
  .user-name {
    // font-weight: bold;
    width: 100%;
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
  }
}
.userList {
  width: 600px;
  // height: 400px;
  height: 2.8rem;
  overflow: hidden;
}
.box {
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bg {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -100;
}
.wrapper {
  height: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

  .left-item {
    margin-right: 100px;
    background: rgba(0, 0, 0, 0.5);
    padding: 0 20px;
    border-radius: 5px;
  }
  .right-item {
    margin-left: 100px;
    text-align: center;
    font-size: 20px;
    img {
      width: 200px;
      height: 200px;
    }
    span {
      font-size: 30px;
      color: #ffcc1d;
    }
  }
}

.session-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  z-index: -10;
}

.session-bg .fw {
  position: absolute;
  left: 50%;
  margin-left: -915px;
  top: 0;
  width: 1830px;
  height: 2688px;
  z-index: -10;
}
.test {
  background: url(../../assets/fw.png);
  transform-origin: center top;
  animation: b 2.4s 0s ease both;
}
@-webkit-keyframes b {
  from {
    transform: translate3d(0, -2600px, 0);
    opacity: 0;
  }
  to {
    transform: translateZ(1000px);
  }
}

.session-bg canvas {
  position: absolute;
  width: 1920px;
  left: 50%;
  margin-left: -960px;
  top: 0;
  z-index: -10;
}
.bottomList {
  position: absolute;
  bottom: 10%;
  font-size: 24px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  padding: 0 50px;
  margin-top: 50px;
  margin-bottom: 20px;
  box-sizing: border-box;
  width: 100%;
  .text {
    color: #ffcc1d;
    flex: 0 0 150px;
  }
  .luckyList {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    // position: fixed;
    // left: 50px;
    // top: 200px;
    li {
      margin-right: 20px;
    }
  }
}
.fade-enter-active {
  transition: all 0.5s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: scale(0.5) translateY(-200px);
  transform-origin: center;
}
</style>
