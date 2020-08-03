<template>
    <el-container class="exps">
        <el-main>
            <!-- 电学实验 -->
            <el-row>
                <el-col :span="22" :offset="1" style="margin-top: 30px;">
                    <el-card shadow="none">
                        <div slot="header">
                            <span>电学实验</span>
                        </div>
                        <div class="exps-collection">
                            <lab-panel :lab_name="exp.lab_name" :src="http_static + '/images/login.jpg'" :href="http_prefix + '/experiments/' + exp.lab_id" :lab_desc="exp.lab_desc" v-for="exp in electrics" :key="exp.lab_id"></lab-panel>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <!-- 光学实验 -->
            <el-row>
                <el-col :span="22" :offset="1" style="margin-top: 50px;">
                    <el-card shadow="none">
                        <div slot="header">
                            <span>光学实验</span>
                        </div>
                        <div class="exps-collection">
                            <lab-panel :lab_name="exp.lab_name" :src="http_static + '/images/login.jpg'" :href="http_prefix + '/experiments/' + exp.lab_id" :lab_desc="exp.lab_desc" v-for="exp in optics" :key="exp.lab_id"></lab-panel>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            electrics: [],
            optics: []
        }
    },
    created() {
        let http_prefix = 'http://106.14.44.67:8080'
        // let http_static = 'http://47.101.151.68'
        // 获取电学实验
        this.$http.get(http_prefix + '/show_exps')
        .then(ret => {
            ret = ret.body
            if (!ret.flag) {
                this.$message("获取实验信息失败，请稍后重试")
                return
            }
            this.electrics = ret.electrics
            this.optics = ret.optics
        })
    }
}
</script>

<style scoped>
/* 设置实验列表整体往右移 */
.exps-collection {
    margin-left: 18px;
}

/* 调整card头部高度与颜色 */
.exps >>> .el-card__header {
    height: 40px;
    padding: 10px 10px!important;
    background-color: #fefdfc;
}

/* 调整card body颜色 */
.exps >>> .el-card__body {
    background-color: #fefdfc;
}
</style>