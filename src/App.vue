<template>
  <div>
    <el-container>
      <el-header>
        <el-menu mode="horizontal" default-active="3" :router="true" background-color="#fefdfc">
          <el-menu-item index="1">主页</el-menu-item>
          <el-menu-item index="2">实验中心</el-menu-item>
          <el-menu-item index="3">学生中心</el-menu-item>
          <el-menu-item index="4">老师中心</el-menu-item>
          <el-menu-item index="5">我的实验</el-menu-item>
          <el-menu-item index="6">管理实验</el-menu-item>
          <el-menu-item index="7">我的班级</el-menu-item>
        </el-menu>
        <div class="avatar">
          <el-menu mode="horizontal" default-active="5" :router="true" background-color="#fefdfc">
            <el-submenu index="2">
              <template slot="title">
                <el-avatar></el-avatar>
              </template>
              <el-menu-item index="2-1">个人信息</el-menu-item>
              <el-menu-item style="color:red"><i class="el-icon-switch-button" style="color:red;transform:translateY(-2px);"></i>注销</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <router-view></router-view>
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  // import myinfo from './components/myinfo.vue'
  export default {
    data: function() {
      return {
      }
    },
    components: {
      // myinfo
    },
    methods: {
      handleCurrentChange(c) {
        this.current_row = c
      },
      handleDelete(c) {
        this.exams.splice(c, 1)
      },
      dialogue_sure() {
        // alert(this.dialogue_link).bind(this)
        this.dialogVisible = false
      }
    }
  }
</script>

<style scoped>
  /* 设置header头部大小 */
  .el-menu-item {
    font-size: 16px!important;
  }

  /* 设置导航栏头像 */
  .avatar {
    position: absolute;
    right: 0;
    top: 0;
  }

  .avatar >>> .el-avatar {
    width: 50px!important;
    height: 50px!important;
  }

  .avatar >>> .is-active {
    border-bottom: none!important;
  }

  .avatar >>> .el-submenu__title:hover {
    border-bottom: none!important;
    background-color: #fff!important;
  }

  .avatar >>> .el-submenu__title {
    border-bottom: none!important;
    text-align: center;
  }
</style>