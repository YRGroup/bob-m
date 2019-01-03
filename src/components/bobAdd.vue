<template>
  <p class="bob-add">
    本活动由 &nbsp;&nbsp;勹卜文化传媒 &nbsp;&nbsp;提供技术支持
  </p>
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
  XImg
} from "vux";

export default {
  name: "giveZan",
  data() {
    return {};
  },

  computed: {},
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../style/theme.less";

.bob-add{
  background: #fff;
  color: #999;
  line-height: 25px;
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  padding: 5px 0;
  box-shadow: inset 0 0 20px #ddd;
}
</style>