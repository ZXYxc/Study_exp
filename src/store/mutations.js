//定义对全局数据的操作
// dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)
// commit：同步操作，写法：this.$store.commit('mutations方法名',值)
import axios from '../api'
const INIT_CLASS = 'INIT_CLASS';
const STU_INFO = 'STU_INFO';
const EXP_INFO = 'EXP_INFO';
const STU_SCO = 'STU_SCO';
const ADD_EXP = 'ADD_EXP';

export default {
    //增加某个班级需要的实验
    [ADD_EXP](state,obj){
        console.log(obj);
        let temp= {};
        temp.lab_id = obj.lab_id;
        temp.lab_name= obj.lab_name;
        temp.lab_finished_count = 0; //已经完成实验的人数
        // temp.finish = false;  //是否完成实验
        temp.cl_start_time = "2020-05-05";
        temp.cl_end_time = "2020-06-05";
        state.exp.push(temp);
        state.expData.push(temp);
        console.log(temp);
    },
    //初始化全部班级信息
    [INIT_CLASS](state) {
        axios.myclass.getClass()
            .then(response => {
                console.log(response)
                state.classData = [];
                for (let i=0;i<response.data.length;i++){
                    let temp =response.data[i];
                    state.classData.push({});
                    state.classData[i].classID = temp.class_id;
                    state.classData[i].className = temp.class_name;
                    state.classData[i].classTime = temp.class_create_time;
                    state.classData[i].classNum = temp.class_student_count;
                }
                // console.log("state.classData")
                // console.log(state.classData)
            });
    },

    [STU_INFO](state,id){
        if (state.classData)
            {
                let class_id = state.classData[id].classID;
                axios.myclass.getStudentItem(class_id)
                    .then(response => {
                        state.studentData = response.data;
                    });
            }
        else
            console.log("还没获得数据");
    },

    //初始请求全部实验消息
    [EXP_INFO](state,id){
        if (state.classData.length)
        {
            state.expData_f = [];
            state.expData = [];
            let class_id = state.classData[id].classID;
            axios.exp.getExp(class_id)
                .then(response => {
                    state.exp = response.data;
                    for (let i=0;i<state.exp.length;i++){
                        if (state.exp[i].finish){
                            delete state.exp[i]["finish"];
                            state.expData_f.push(state.exp[i]);
                        }
                        else
                        {
                            delete state.exp[i]["finish"];
                            state.expData.push(state.exp[i]);
                        }
                    }
                    // console.log(state.exp);
                });
        }
        else
            console.log("还没获得数据");

    },

    [STU_SCO](state,obj) {
        console.log(obj);
        axios.exp.getExpItem(obj.lab_id,obj.class_id)
            .then(response => {
                let infos = []
                state.exp_sco = response.data;
                state.exp_sco.forEach(ele => {
                    infos.push([])
                    for (let i in ele){
                        infos[infos.length-1].push(ele[i])
                    }
                });
                state.info = JSON.stringify(infos);
            });

    },



}