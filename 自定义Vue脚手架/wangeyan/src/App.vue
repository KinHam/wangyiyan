<template>
  <div>
    <h1>网易严选</h1>
    <Login />
  </div>
</template>

<script>
//import Home from "./views/Home";
import Login from "./views/Login";
export default {
  components: { Login },
  data() {
    return {
      msg: "hahah"
    };
  }
};
</script>

<style lang="stylus" scoped></style>