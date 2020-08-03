<template>
    <div class="all">
    <div class="my-panel my-panel-info">
        <div :class="activeStudent?'':'shrink-bottom-radius'" class="my-panel-heading ripple " @click="shrink()">
            <el-row :gutter="20">
                <el-col :span="23"><span class="my-panel-title">{{title}}</span></el-col>
                <el-col :span="1"><b-icon class="icon_class" v-if="!activeStudent" icon="arrow-right" key="1"></b-icon></el-col>
                <el-col :span="1"><b-icon class="icon_class" v-if="activeStudent" icon="arrow-down" key="2"></b-icon></el-col>
            </el-row>
        </div>
        <collapse-transition>
            <div class="collapse-wrap"
                 v-show="activeStudent">
                <!-- @slot default -->
                <slot>
                <table class="table">
                    <tr >
                        <th  v-for="(item,index) in thead" :key="index">{{item}}</th>
                    </tr>
                    <tr v-for="(studentItem,index) in studentData" :key="index" >
                        <td  v-for="(item,idx) in studentItem" :key="idx">
                            {{item}}
                        </td>
                        <td v-if="btn">
                            <el-button @click="goTo(studentItem)"> 详情 </el-button>
                        </td>
                    </tr>
                </table>
               </slot>
            </div>
        </collapse-transition>
    </div>
    </div>
</template>

<script>
    import {BIcon} from "bootstrap-vue";
    import collapseTransition from "./animation"
    import {mapState} from "vuex";

    export default {
        name: "shrink",
        props:{
            title:String,
            thead:Array,
            studentData:Array,
            btn:String,
        },
        components: {
            BIcon,
            collapseTransition
        },
        computed: mapState({
            classData: "classData",
        }),
        data(){
            return{
                // idx:this.$route.query.idx,
                //折叠面板的序号
                activeStudent:true,

            }
        },
        methods:{
            shrink(){
                this.activeStudent = !this.activeStudent;
                // console.log(this.activeStudent);
            },
            goTo(obj){
                // let routeUrl = this.$router.resolve({
                //     name: this.btn
                // });
                // window.open(roueUrl.href, '_blank');

                var class_id = this.classData[this.$route.query.idx].classID;
                this.$router.push({path:this.btn,query:
                    {
                        idx:this.$route.query.idx,
                        id:obj.lab_id,
                        class:class_id
                    }
                }).catch(error => {
                    if (error.name !== "NavigationDuplicated") {
                        throw error;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">

    /*.my-panel{*/
    /*    border-color: rgba(200, 200, 200, 0);*/
    /*}*/

    tr:last-child{
        border: white;
        padding-bottom: 300px;
        /*background-color: red;*/
    }

    .ripple {
        position: relative;
        //隐藏溢出的径向渐变背景
        overflow: hidden;
        text-align: center;
    }

    .my-panel-heading{
        text-align: center;
    }

    .ripple:after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        //设置径向渐变
        background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform .3s, opacity .5s;
    }

    .ripple:active:after {
        transform: scale(0, 0);
        opacity: .3;
        //设置初始状态
        transition: 0s;
    }

    .my-panel-title{
        font-size: 20px;
    }
    .table th{
        text-align: center;
        font-weight: 600;
        /*border-bottom: 1px solid rgb(217, 237, 247);*/
    }

    .table {
        margin-bottom: 15px;
        width: 90%;
        background-color: white;
        /*合并边框模型*/
        border-collapse: collapse;
        border-spacing: 0;
        /*在空单元格周围绘制边框*/
        empty-cells: show;
        /*border: 1px solid #e9e9e9;*/
        /*<!--box-shadow:rgba(0,0,0,.3) 0 -1px 15px;-->*/
        border-bottom-right-radius:20px;
        border-bottom-left-radius:20px;
        td, th {
            padding: 8px 16px;
            border-right: 1px solid rgb(217, 237, 247);
            border-bottom: 1px solid rgb(217, 237, 247);
        }
    }


    .my-panel-heading.ripple{
        width: 90%;
        /*color: #337ab7;*/
    }

    .my-panel{
        border-color:rgb(236, 245, 255);
        background-color: rgba(200,200,200,0);
    }

    .all{
        width: 90%;
        border-color: #337ab7;
        margin-bottom: 50px;
        margin-left: 80px;
        ::v-deep  .my-panel{
            /*border-color:rgb(236, 245, 255);*/
            background-color: rgba(200,200,200,0);
        }
        ::v-deep .my-panel-info{
            .my-panel-heading {
                /*background-color: #d9edf7;*/
                /*border-color: #bce8f1;*/
                height: 50px;
                background-color: white;
                box-shadow:rgba(0,0,0,.3) 0 1px 15px;
                /*background-color: rgba(200,200,200,0);*/
                /*border-color: rgba(200,200,200,0);*/
                border-top-left-radius:10px;
                border-top-right-radius:10px;
                .my-panel-title {
                    font-size: 20px;
                    position: absolute;
                    top: 15px;
                    bottom: 0;
                    margin: auto;
                }
            }
            .shrink-bottom-radius {
                border-bottom-right-radius:10px;
                border-bottom-left-radius:10px;
            }
        }
    }
    .icon_class{
        /*margin-left: 980px;*/
        position: absolute;
        margin-top: 20px;
        right:30px;
    }
    /*.my-panel-heading {*/

    /*}*/


</style>