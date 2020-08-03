<template>
    <div>

        <el-container>
            <el-container style="padding-top: 20px;">
<!--                侧边栏部分-->
                <el-aside style="width: 200px; font-size: 18px; padding-top: 20px;">
                    <el-row>
                        <el-col :span="24"><div class="aside_title">教学班级</div></el-col>
                    </el-row>
                    <el-row>
                        <ul class="classes">
                            <li  v-for="(item,index) in classData" :key="index">
                                <el-button type="text" class="aside_title" @click="choose_class(index)">{{item.className}}</el-button>
                            </li>
                        </ul>
                    </el-row>
                </el-aside>
                <!--                    结束侧边栏部分-->
                <el-container>
<!--                    显示班级部分-->
                    <el-main>
                        <router-view>111</router-view>
                    </el-main>
<!--                    页脚-->
                </el-container>
            </el-container>
        </el-container>


    </div>


</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: "teacher",
        data(){
            return{
                classes: []
            }
        },

        computed: mapState({
            classData:'classData', //商品详情信息
        }),

        mounted() {
            this.init_class();
        },

        methods:{
            ...mapActions([
                'init_class'
            ]),
            choose_class(index){
                this.$router.push({path:"/4/class",query: {idx:index}});
            },
        }
    }
</script>

<style scoped lang="scss">

    body {
        /*background-color: #ebf5ff;*/
    }

    .el-aside {
        // background-color: #D3DCE6;
        background-color: #FEFDFC;
        // border: 1px solid #e6e6e6;
        color: #333;
        text-align: center;
        line-height: 20px;
        padding:3px;
        margin: 0;
        width: 100px;
        transition: all ease 0.5s;
    }

    .el-aside, .el-main {
        box-shadow: 0 2px 6px rgba(0,21,64,0.14), 0 10px 20px rgba(0,21,64,0.05)
    }

    .el-main {
        margin-left: 10px;
        margin-right: 10px;
        transition: all ease 0.5s;
        background-color: rgb(236, 245, 255);
        color: #333;
        text-align: center;
        // box-shadow: 0 2px 6px rgba(0,21,64,0.14), 0 10px 20px rgba(0,21,64,0.05)
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    // 侧边栏班级列表
    .classes > li {
        border: 1px solid #ebf0f2;
        border-left: none;
        border-right: none;
        // margin-top: 10px;
    }

    .classes > li:hover {
        background-color: #ebf0f2;
    }

    .classes .el-button {
        font-size: 15px;
        color: #197093;
    }


</style>