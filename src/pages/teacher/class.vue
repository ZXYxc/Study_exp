<template>
    <div>

        <shrink :title="classTit"
                :thead="classHead"
                :student-data="classData">
        </shrink>

        <shrink :title="studentTit"
                :thead="studentHead"
                :student-data="studentData">
        </shrink>

        <shrink :title="expTit"
                :thead="expHead"
                :student-data="expData"
                :btn="expDetail">
        </shrink>

        <shrink :title="expTit_f"
                :thead="expHead"
                :student-data="expData_f"
                :btn="expDetail">
        </shrink>

        <el-row :gutter="20">
            <el-col :span="6" :offset="9" class="center">
                <el-button  type="primary" @click="centerDialogVisible = true">添加新实验</el-button>
            </el-col>
        </el-row>

        <el-dialog
            title="发布新任务"
        :visible.sync="centerDialogVisible"
        width="50%"
            class="el_dia"
        center>
            <el-row :gutter="20">
                <el-col :span="8" class="dialog_tit">
                    选择实验：
                </el-col>
                <el-col :span="16" >
                    <el-select v-model="value" placeholder="请选择" @change="sel_exp">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8" class="dialog_tit" >
                    开始时间：
                </el-col>
                <el-col :span="16" >
                    <div class="block">
                        <el-date-picker
                                @change="get_start_time"
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8" class="dialog_tit">
                    结束时间：
                </el-col>
                <el-col :span="16" >
                    <div class="block">
                        <el-date-picker
                                @change="get_end_time"
                                v-model="value2"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="post_exp">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
    import { mapState,mapActions} from 'vuex'
    import shrink from "../../components/shrink/shrink.vue";
    export default {

        name: "class",
        components: {
            shrink
        },
        data(){
            return{
                exp: [],
                options: [],
                value: '',
                value1: '',
                value2: '',

                start_time:'',
                end_time:'',

                centerDialogVisible: false,
                expDetail:"/expDetail",
                classTit:"我的教学班",
                classHead:["班级ID","班级名称","创建时间","班级人数"],
                // classData:[],

                studentTit:"学生信息",
                studentHead:["姓名","学号","班级"],
                // studentData: [],


                expTit:"正在进行的实验",
                expHead:["实验ID","实验名称","实验完成人数","实验开始","实验结束","选项"],
                expTit_f:"已经完成的实验",
            }
        },
        mounted() {
            if (this.exp.length===0){
                this.init_class()
                let t = parseInt(this.$route.query.idx)
                this.init_all(t);
                console.log(this.exp)
            }
            for (let i=0; i<this.exp.length;i++){
                if (this.exp[i].lab_id===this.id){
                    this.item.push(this.exp[i]);
                    break;
                }
            }
            this.init_all(this.$route.query.idx);
            // console.log(this.$route.query.idx);
        },
        computed: mapState({
            classData: 'classData', //商品详情信息
            studentData: 'studentData',
            expData: 'expData',
            expData_f: 'expData_f',
            idx: function(){
                return this.$route.query.idx;
            },
        }),

        methods:{
            ...mapActions([
                'init_all',
                'add_exp',
                'get_expInfo'
            ]),
            init_class(){
                this.$api.exp.getAllLabs()
                    .then(response => {
                        // 请求失败
                        if (response.status !== 200) {
                            this.$message(response.data.msg)
                            return
                        }
                        response.data.forEach(e => {
                            this.options.push({
                                value: e.lab_id,
                                label: e.lab_name
                            })
                        })
                    })
            },
            print_exp(){
                this.$api.exp.getScoresExcel();
            },

            post_exp(){
                // 关闭对话框
                this.centerDialogVisible = false;

                // 设置请求体
                let obj = {};
                obj.class_id = this.classData[this.$route.query.idx].classID;
                obj.lab_id = this.value;
                obj.start_time = this.start_time;
                obj.end_time = this.end_time;

                this.$api.exp.postexp(obj)
                    .then(response => {
                        let res = response.data;
                        if (res.flag) {
                            obj.lab_name = res.lab.lab_name;
                            this.add_exp(obj);
                        } else {
                            this.$message("错误: " + res.error)
                        }
                    })
            },
            sel_exp(){
                console.log(this.value);
            },
            tran_time(time){
                time = time.split(" ");
                let mon = time[1];
                let day = time[2];
                let year = time[3];
                switch(mon) {
                    case "Jan":
                        mon = "01";
                        break;
                    case "Feb":
                        mon = "02";
                        break;
                    case "Mar":
                        mon = "03";
                        break;
                    case "Apr":
                        mon = "04";
                        break;
                    case "May":
                        mon = "05";
                        break;
                    case "Jun":
                        mon = "06";
                        break;
                    case "Jul":
                        mon = "07";
                        break;
                    case "Aug":
                        mon = "08";
                        break;
                    case "Sep":
                        mon = "09";
                        break;
                    case "Oct":
                        mon = "10";
                        break;
                    case "Nov":
                        mon = "11";
                        break;
                    case "Dec":
                        mon = "12";
                        break;
                }
                let res = year+'-'+mon+'-'+day;
                return res;
            },
            //输出的是GMT时间 东八区转换成Thu Jun 18 2020
            get_start_time(){
                this.start_time = this.tran_time(this.value1.toDateString());
            },
            get_end_time(){
                this.end_time = this.tran_time(this.value2.toDateString());
            }
        }

    }
</script>

<style scoped lang="scss">

    .dialog_tit{
        text-align: center;
        font-weight: 800;
    }

    .el_dia {
        ::v-deep .el-dialog__header{
            background-color: rgb(217, 237, 247) !important;
                ::v-deep .el-dialog__title {
                    line-height: 24px;
                    font-size: 22px;
                    font-weight: 800;
                    color:rgb(134, 137, 141);
                }
        }
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }

    .ripple {
        position: relative;
        //隐藏溢出的径向渐变背景
        overflow: hidden;
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

    .panel-title{
        font-size: 20px;
    }
    .table th{
        text-align: center;
        font-weight: 600;
        border-bottom: 1px solid rgb(217, 237, 247);
    }

    .table {
        width: 100%;
        margin-bottom: 24px;
        /*合并边框模型*/
        border-collapse: collapse;
        border-spacing: 0;
        /*在空单元格周围绘制边框*/
        empty-cells: show;
        border: 1px solid #e9e9e9;
        td, th {
            padding: 8px 16px;
            border-right: 1px solid rgb(217, 237, 247);
            border-bottom: 1px solid rgb(217, 237, 247);
        }
    }

    .center{
        ::v-deep .el-button--primary{
            left: 0;
            right: 0;
            margin: auto;
            text-align: center;
            background-color: rgb(217, 237, 247);
            border-color:  rgb(217, 237, 247);
            color: rgb(49, 112, 143);

        }

    }


</style>