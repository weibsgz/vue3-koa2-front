<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <!-- 只有一级（首页可以点击） -->
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
      <router-link to="/welcome" v-if="index == 0">{{
        item.meta.title
      }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'BreadCrumb',
  mounted() {
    console.log(this.$route)
  },
  computed: {
    breadList() {
      // [{path: "/", redirect: "/welcome", name: "home", meta: {…}, aliasOf: undefined, …},path: "/welcome", redirect: undefined, name: "welcome", meta: {…}, aliasOf: undefined, …]
      return this.$route.matched
    }
  }
}
</script>
