import axios from 'axios';
axios.defaults.timeout = 30000;
axios.defaults.baseURL = process.env.VUE_APP_API_URL


// 添加响应拦截器
axios.interceptors.response.use(function (response) {


    //获取配置项信息，可以做你的逻辑处理
    if (process.env.VUE_APP_MODE === 'development') {
        //开发环境下的执行操作
        console.log('开发');
    } else if (process.env.VUE_APP_MODE === 'test') {
        //测试环境下的执行操作
        console.log('测试');
    } else {
        //生产环境下的执行操作
        console.log('正式');
    }
    //可以写if判断，提前拦截错误信息
    if (response.status == 200) {
        return response;
    } else {
        alert("错误")
    }


}, function (err) {

    return Promise.reject(err);
});


export function apiGet(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}


export function apiPost(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            headers: {
                'strheader': '333',
            },
            data: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => { reject(err.data) })
    });
}