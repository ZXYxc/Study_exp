import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex);

const state = {
    classData: [], //全部班级信息
    studentData: [],//班级学生信息
    exp:[],//全部实验信息
    expData:[],//未完成的实验信息
    expData_f: [],//完成的实验信息
    exp_sco:[],//班级学生该实验成绩
    info:[]
};

export default new Vuex.Store({
    state,
    actions,
    mutations
})