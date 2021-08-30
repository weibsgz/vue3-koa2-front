<template>
  <div class="basic-layout">
    <div :class="['nav-side', isCollapse ? 'fold' : 'unfold']">
      <!-- 系统LOGO -->
      <div class="logo">
        <img src="./../assets/logo.png" />
        <span>Manager</span>
      </div>
      <!-- 导航菜单 -->
      <el-menu
        :default-active="activeMenu"
        background-color="#001529"
        text-color="#fff"
        router
        :collapse="isCollapse"
        class="nav-menu"
      >
        <TreeMenu :userMenu="userMenu"></TreeMenu>
      </el-menu>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="nav-top">
        <div class="nav-left">
          <div class="menu-fold" @click="toggle">
            <i class="el-icon-s-fold"></i>
          </div>
          <div class="bread">
            <bread-crumb></bread-crumb>
          </div>
        </div>
        <div class="user-info">
          <el-badge
            :is-dot="noticeCount > 0 ? true : false"
            class="notice"
            type="danger"
          >
            <i class="el-icon-bell"></i>
          </el-badge>
          <el-dropdown @command="handleLogout">
            <span class="user-link">
              {{ userInfo.userName }}
              <i class="el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >邮箱：{{ userInfo.userEmail }}</el-dropdown-item
                >
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TreeMenu from './treeMneu.vue'
import BreadCrumb from './BreadCrumb.vue'
export default {
  name: 'Home',
  components: {
    TreeMenu,
    BreadCrumb
  },
  data() {
    return {
      userInfo: this.$store.state.userInfo || {},
      isCollapse: false,
      noticeCount: 0,
      userMenu: [],
      activeMenu: window.location.hash.slice(1)
    }
  },
  mounted() {
    this.getNoticeCount()
    this.getMenuList()
  },
  methods: {
    handleLogout(key) {
      if (key === 'email') return
      this.$store.commit('saveUserInfo', '')
      this.userInfo = null
      this.$router.push('/login')
    },
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    async getNoticeCount() {
      try {
        const res = await this.$api.noticeCount()
        this.noticeCount = res
      } catch (err) {
        console.log(err)
      }
    },
    async getMenuList() {
      try {
        const res = await this.$api.getMenuList()
        this.userMenu = res

        //获取权限列表数组，同样通过接口获取 这里做假数据了
        const actionList = [
          'leave-qurey',
          'menu-query',
          'menu-edit',
          'user-query',
          'user-create'
        ]
        this.$store.commit('saveActionList', actionList)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss">
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    overflow-y: hidden;
    overflow-x: hidden;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;

      img {
        margin: 0 16px;
        width: 32px;
        height: 32px;
      }
    }
    .nav-menu {
      height: calc(100vh - 50px);
      border-right: none;
    }
    // 合并
    &.fold {
      width: 64px;
    }
    // 展开
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    // 合并
    &.fold {
      margin-left: 64px;
    }
    // 展开
    &.unfold {
      margin-left: 200px;
    }
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .nav-left {
        display: flex;
        align-items: center;
        .menu-fold {
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .user-info {
        .notice {
          line-height: 30px;
          margin-right: 15px;
        }
        .user-link {
          cursor: pointer;
          color: #409eff;
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background: #fff;
        height: 100%;
      }
    }
  }
}
</style>
