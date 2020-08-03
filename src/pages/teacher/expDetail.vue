<template>
    <div>
        <shrink :title="expTit_f"
                :thead="expHead"
                :student-data="item">
        </shrink>

        <shrink :title="stu"
                :thead="stuHead"
                :student-data="exp_sco">
        </shrink>


        <form action="http://106.14.44.67:8080/getScoresExcel" method="POST">
            <input type="hidden" v-model="fn" name="fn" id="fn">
            <input type="hidden" v-model="info" name="infos" id="infos">
            <el-row :gutter="20">
                <el-col :span="2" :offset="11" class="center">
<!--                    <el-button type="primary" >获取实验成绩</el-button>-->
                    <input type="submit" value="获取实验成绩" class="exp_btn">
                </el-col>
            </el-row>
        </form>


    </div>
</template>

<script>
    import shrink from "../../components/shrink/shrink.vue";
    import {mapActions, mapState} from 'vuex'
    export default {
        name: "expDetail",
        components:{
            shrink
        },
        computed: mapState({
            exp: 'exp',
            exp_sco:'exp_sco',
            info:'info'
        }),
        mounted() {
            this.init_expDetail();
            let obj = {};
            obj.lab_id=this.id;
            obj.class_id=this.class_id;
            this.stu_sco(obj)
            this.getExcel();
        },
        data(){
            return{
                fn:"",
                infos:"",
                id:this.$route.query.id,
                class_id:this.$route.query.class,
                expTit:"实验概览",
                expHead:["实验ID","实验名称","实验完成人数","实验开始时间","实验结束时间"],
                expTit_f:"已经完成的实验",
                item:[],

                stu:"学生成绩",
                stuHead:["学号","姓名","选择题成绩","线上实验成绩"],

            }
        },
        methods:{
            ...mapActions([
                'init_class',
                'stu_sco',
                'get_expInfo'
            ]),
            //老师点击按钮下载
    // {fn:"lab_name", infos:[
    //     ["学号","姓名","选择题成绩","实验成绩"],
    //     ["学号","姓名","选择题成绩","实验成绩"]
    // ]}
            getExcel(){
                this.exp.forEach(ele => {
                    if (ele["lab_id"]===this.id)
                        this.fn = ele["lab_name"]
                });
                console.log(this.info);
                console.log("实验名字", this.fn);
            },
            init_expDetail(){
                if (this.exp.length===0){
                    this.init_class()
                    let t = parseInt(this.$route.query.idx)
                    this.get_expInfo(t)
                    console.log(this.exp)
                }
                for (let i=0; i<this.exp.length;i++){
                    if (this.exp[i].lab_id===this.id){
                        this.item.push(this.exp[i]);
                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    shrink{
        text-align: center;
        width: 80%;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .center>>>.el-button--primary{
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        background-color: rgb(217, 237, 247);
        /*border-color:  rgb(217, 237, 247);*/
        color: rgb(49, 112, 143);

    }

    .exp_btn{
        background-color: rgb(217, 237, 247);
        border-color: rgb(217, 237, 247);
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        margin: 0;
        -webkit-transition: .1s;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }


</style>