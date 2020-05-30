<template>
  <div>
    <h1 ref="haha">Home</h1>
    <van-button disabled type="primary">禁用状态</van-button>
  </div>
</template>

<script>
//    <van-button disabled type="primary">禁用状态</van-button>

export default {
  mounted() {
    console.dir(this.$refs.haha.clientWidth);
  }
};
</script>

<style lang="css" scoped>
h1 {
  color: red;
  height: 20px;
  width: 20px;
}
</style>