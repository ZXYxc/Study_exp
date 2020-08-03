// import ajax from '../config/ajax'

export default {
    //初始化班级概略信息
    init_class({ commit}) {
        commit('INIT_CLASS');
    },
    //获取班级的学生信息
    init_all({ commit},obj) {
        commit('STU_INFO',obj);
        commit('EXP_INFO',obj);
    },
    //单独获取全部实验信息
    get_expInfo({ commit},obj) {
        commit('INIT_CLASS');
        commit('STU_INFO',obj);
        commit('EXP_INFO',obj);
    },
    //获取某个实验的内容
    stu_sco({ commit},obj) {
        commit('STU_SCO',obj);
    },
    //添加一个实验
    add_exp({ commit},obj) {
        commit('ADD_EXP',obj);
    },

}