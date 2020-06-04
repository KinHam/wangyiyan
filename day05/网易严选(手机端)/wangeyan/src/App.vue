<template>
  <div>
    <!--
    <Swiper />
    <Home />
        <Ceshi />

    -->

    <router-view></router-view>

    <FlooterNav />
  </div>
</template>
<script>
//import Home from "./views/Home";
//import Login from "./views/Login";
//import Swiper from "./views/Swiper";
//import Ceshi from "./views/ceshi";
import FlooterNav from "./components/FlooterNav";
export default {
  components: { FlooterNav },
  //components: { Ceshi },

  data() {
    return {
      msg: "hahah"
    };
  }
};
</script>

<style lang="stylus" scoped></style>