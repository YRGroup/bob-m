<template>
  <div class="wrapper">
    <div class="content">
      <div v-if="isWeiXin">
        <h3>微信授权中.....</h3>
      </div>
      <div v-else>
        <h3>请用微信扫码登录</h3>
      </div>
    </div>
  </div>
</template>
<script>
// import getCookie from "@/assets/js/util";
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
  components: {},
  methods: {
    
  },
  created() {
    let href = this.$route.query.redict;
    console.log(window.location.origin + window.location.pathname + "#" + href);
    let url = encodeURIComponent(
      window.location.origin + window.location.pathname + "#" + href
    );
    window.location.href = "/api/LiveVideoWeiXinOAuth/index?refUrl=" + url;
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
