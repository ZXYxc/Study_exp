<template>
    <el-container class="teacher">
        <el-aside width="300px">
            <el-card style="width: 98%; height: 500px">
                <div slot="header">
                    <span>教学班级</span>
                </div>
                <el-row>
                    <el-col>
                        <div style="height:200px">
                            <el-table
                            :data="classes">
                                <el-table-column
                                    prop="class"
                                    label="班级名称"
                                    width="250">
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
        </el-aside>
        <el-main>
            <el-row>
                <el-card>
                    <div slot="header">
                        <span></span>
                    </div>
                </el-card>
            </el-row>
            <el-row>
                <div>test</div>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            classes: [
                {class: "ceshi"},
                {class: "test"},
                {class: "+"}
            ]
        }
    }
}
</script>

<style lang="css">
/* 设置侧边栏参数 */
.el-aside {
    margin-left: 30px;
    margin-top: 40px;
}

/* 设置侧边栏文字居中 */
.teacher >>> .cell {
    background-color: yellow;
    text-align: center!important;
}
</style>