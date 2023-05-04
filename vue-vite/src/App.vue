
<template>
    <nav>
      <router-link to="/">首页</router-link> |
      <!-- <router-link to="/chicken-egg">测测</router-link> -->
      <router-link 
        v-for="item in dataJson"
        :key="item.id"
        :to="{name:'eggs', params: {eggsType: item.type}}"
      >
        {{ item.name }} |
      </router-link> 
    </nav>
    <router-view></router-view>
</template>
<script>
import dataJson from './data.json'

export default {
  data() {
    console.log(this.$route);
    return { 
      dataJson
    }
  }
}
</script>
<style scoped>
.egg-active{
  color: red
}
</style>
