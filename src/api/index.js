/**
 * api接口统一管理
 */
import axios from './http'
import qs from 'qs';
// import json from "vue-resource/src/http/interceptor/json"; // 用来处理参数，可不使用，若要使用，npm安装： npm install qs
const base = 'http://106.14.44.67:8080';

const myclass = {
//获取班级信息
    getClass () {
        return axios.get(`${base}/get_classes_info`)
    },
    //学生信息
    getStudentItem (id){
        return axios.get(`${base}/get_students_info`,{
            params:{'class_id':id}}
        );
    },
};


const exp = {
    //实验头
    getExp (id){
        return axios.get(`${base}/get_class_exp_header_info`,{
            params:{'class_id':id}}
        );
    },

    //请求学生某个实验的信息
    getExpItem (lab_id,class_id){
        return axios.get(`${base}/get_students_exp_info`,{
            params:{lab_id:lab_id, class_id: class_id}}
        );
    },

    //提交增加某个实验
    postexp(obj){
        let url = base + '/new-task?class_id=' + obj.class_id;
        let data = {
            lab_id: obj.lab_id,
            start_time: obj.start_time,
            end_time:obj.end_time
        };
        console.log(data);
        // 请求体使用x-www-form-urlencoded形式
        return axios.post(url,qs.stringify(data));
        // return axios.post(url,data);
    },

    //请求下载任务 getScoresExcel
    getScoresExcel(fn,infos){
        console.log(qs.stringify(infos));
        let url = base + '/getScoresExcel/';
        return axios.post(url,
            {
                "fn":fn,
                "infos":qs.stringify(infos)
            });
    },

    // 获取所有实验名称与id
    getAllLabs() {
        return axios.get(base + '/get_labs')
    }
};

export default  {myclass,exp};

// let items = goods.getList();
// console.log(items);

// export const getGoods = () =>
//     axios.get("/goods/ListItem");
// export const apiAddress = p =>
//     post('api/v1/users/my_address/address_edit_before', p);
