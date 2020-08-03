<template>
    <el-container class="my-info">
        <el-aside>
            <el-card shadow="always">
                <div slot="header">
                    <span>个人信息</span>
                </div>
                <div style="height:500px">
                    <el-row>
                        <el-avatar size="large" :src="avatar_url"></el-avatar>
                    </el-row>
                    <el-row>
                        <div class="info">
                            <div class="nickname">{{ userinfo.user_name }}</div>
                            <el-link href="https://element.eleme.io" target="_blank"><i class="el-icon-edit"></i>修改信息</el-link>
                            <div class="main-info">
                                <div>学号: {{ userinfo.student_no }}</div>
                                <div>姓名: {{ userinfo.user_real_name }}</div>
                                <div>班级: {{ userinfo.natural_class_name }}</div>
                                <div>教学班：<router-link to="/choose_class" style="">点击加入</router-link></div>
                            </div>
                        </div>
                    </el-row>
                </div>
            </el-card>
        </el-aside>
        <el-main>
            <el-row :gutter="12">
                <el-col :span="16">
                    <el-card>
                        <div slot="header">
                            <span>通知公告</span>
                        </div>
                        <div style="height:300px">
                            <el-table
                            :data="tableData"
                            style="width: 100%">
                                <el-table-column
                                    prop="msg_time"
                                    label="日期"
                                    width="180">
                                </el-table-column>
                                <el-table-column
                                    prop="msg_content"
                                    label="通知">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="8">
                    <el-card>
                        <div slot="header">
                            <span>日程安排</span>
                        </div>
                        <div style="height:300px">
                            <el-calendar></el-calendar>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-card>
                    <div slot="header">
                        <span>我的实验</span>
                    </div>
                    <div>
                        <lab-panel :lab_name="exp.lab_name" :src="http_static + '/images/login.jpg'" :href="http_prefix + '/experiments/' + exp.lab_id" :lab_desc="exp.lab_desc" v-for="exp in exps" :key="exp.lab_id"></lab-panel>
                    </div>
                </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
          // 通知信息
          tableData: [],
          // 侧边栏数据
          userinfo: {},
          // 学生实验
          exps: [],
          // 头像url
          avatar_url: ''
        }
    },
    created() {
        let http_prefix = 'http://47.101.151.68'
        let http_static = 'http://106.14.44.67:8080'
        // 获取侧边栏数据
        this.$http.get(http_prefix + '/userinfo_less')
        .then(ret => {
            ret = ret.body
            if (ret.flag === false) {
                this.$message('获取用户信息失败')
                return
            }
            this.userinfo = ret.user_info
            return this.userinfo
        })
        .then(userinfo => {
            // 获取头像url
            this.$http.get(http_static + '/avatar/' + userinfo.user_id + '.png')
            .then(() => {
                this.avatar_url = http_static + '/avatar/' + userinfo.user_id + '.png'
            })
            .catch(() => {
                this.avatar_url = http_static + '/avatar/空头像.png'
            })
        })
        // 获取实验数据
        this.$http.get(http_prefix + '/get_user_exps')
        .then(ret => {
            ret = ret.body
            if (!ret.flag) {
                this.$message('获取实验数据失败')
                return
            }
            this.exps = ret.exps
        })
        // 获取通知信息
        this.$http.get(http_prefix + '/get_user_msgs')
        .then(ret => {
            ret = ret.body
            if (!ret.flag) {
                this.$message('获取通知信息失败')
                return
            }
            ret.msgs.forEach(e => {
                this.tableData.push({
                    msg_time: e.msg_time,
                    msg_content: e.msg_content
                })
            })
        })
    }
}
</script>

<style lang="css" scoped>
/* 调整页面主体的位置 */
.el-main .el-row {
	margin-top: 10px;
}

.el-aside {
    margin-top: 30px;
    margin-left: 15px;
}

/* 个人信息 */
.info {
    padding-top: 20px;
}

.info .main-info {
    font-size: 14px;
    text-align-last: left;
}

.main-info div {
    margin-top: 6px;
    padding-left: 50px;
}

.info .nickname {
    font-size: 18px;
    font-weight: 700;
}
</style>

<style lang="css" scoped>
/* 调整日历大小 */
.my-info >>> .el-calendar {
    height: 250px;
}

.my-info >>> .el-calendar-day {
    height: 30px!important;
}

.my-info >>> .el-calendar-table thead th {
    padding: 3px 0!important;
}

.my-info >>> .el-calendar__button-group button {
    padding: 3px 3px!important;
}

/* 调整card头部高度与颜色 */
.my-info >>> .el-card__header {
    height: 40px;
    padding: 10px 10px!important;
    background-color: #fefdfc;
}

/* 调整card body颜色 */
.my-info >>> .el-card__body {
    background-color: #fefdfc;
}

/* 设置头像大小与居中 */
.my-info >>> .el-aside .el-avatar {
    height: 150px!important;
    width: 150px!important;
    /* box-shadow: 0px 0px 16px rgba(0, 0, 0, .4); */
    /* border: 3px solid #fefdfc!important; */
}

.my-info >>> .el-aside .el-card__body .el-row {
    text-align: center;
}

.my-info >>> .el-aside .el-card__body .el-row img {
    width: 150px;
    height: 150px;
}

/* 设置通知字体颜色 */
.my-info >>> .el-table__row :nth-child(2) {
    color: blue
}
</style>