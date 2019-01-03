<template>
  <div class="wrapper">
    <div class="content">
      <div v-if="hasSign&&isWeiXin">
        <img :src="bg" alt>
        <p class="title">签到成功</p>
        <x-button :gradients="['#FF5E3A', '#FF9500']" class="btn" :link="'/live/'+id">进入直播间</x-button>
        <p class="tips">不要忘了给喜欢的节目投票~</p>
      </div>
      <div v-else-if="!hasSign&&isWeiXin">
        <h3>登录中.....</h3>
      </div>
      <div v-else>
        <h3>请用微信扫码登录</h3>
      </div>
    </div>
  </div>
</template>
<script>
import {
  XInput,
  Tab,
  Group,
  TabItem,
  Sticky,
  Divider,
  XButton,
  Swiper,
  SwiperItem,
  XDialog,
  XImg,
  XTable
} from "vux";

export default {
  data() {
    return {
      bg: require("@/assets/siginIn.gif"),
      id: "",
      hasSign: false
    };
  },
  computed: {
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    Tab,
    TabItem,
    Sticky,
    Divider,
    XButton,
    Swiper,
    SwiperItem,
    XInput,
    Group,
    XDialog,
    XImg,
    XTable
  },
  methods: {
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    }
  },
  created() {
    this.id = this.$route.params.id;
    if (!this.id) {
      this.$vux.alert.show({
        title: "提示",
        content:"活动不存在"
      });
      return;
    }
    if (!this.getCookie("openid")) {
      this.$vux.alert.show({
        title: "提示",
        content:"微信未授权或授权失败,请刷新重试"
      });
      return;
    }
    if (this.getCookie("openid")) {
      let para = {
        lid: this.id
      };
      this.$API
        .userSignin(para)
        .then(res => {
          console.log(res);
          this.hasSign = true;
        })
        .catch(err => {
          console.log(err);
          this.$vux.alert.show({
            title: "提示",
            content: err.msg
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  background: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    text-align: center;
    height: 100%;
    .btn {
      width: 80%;
      margin-top: 20px;
    }
    .title {
      font-size: 20px;
      line-height: 60px;
    }
    .tips {
      line-height: 50px;
      color: #aaa;
    }
  }
}
</style>
