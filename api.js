/*
 * @Author: huangying
 * @Date: 2020-07-28 09:46:43
 * @Last Modified by: huangying
 * @Last Modified time: 2020-08-21 16:55:43
 */
import axios from "axios";
import qs from "qs";

const domain =
  process.env.NODE_ENV === "development"
    ? "/request"
    : "https://api.xinxike.net";

/**
 *
 *
 * @export
 * @param {any} url
 * @param {string} [method='post']
 * @param {any} params
 * @returns
 */
function fetch(url, method = "POST", params) {

  let _data = {
    token: token.token,
    uid: uid.uid,
    // token: "660a1fe302a3f963c03bd29bc31ecad9",
    // uid: "10011",    
    appversion: '1.0.4',
    appname: 'xinxike',
    systype: 'xcx',
    time: parseInt(new Date().getTime()/1000) + '',
    store: 'wechat-xcx',
    ...params,
  }

  let sign = createSign(_data, url)
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: {
        ..._data,
        sign: sign
      },
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 *
 *
 * @export
 * @param {any} url
 * @param {string} [method='post']
 * @param {any} params
 * @returns
 */
function fetch2(url, method = "POST", params) {
  var data = qs.stringify(params);
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },      
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 获取url参数
 */
export const GetRequest = function () {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};


export const createSign = function(params, url) {
  let time_step = parseInt(new Date().getTime()/1000) + ''
  time_step = time_step.substring(0, time_step.length - 2) + "00"
  let valStr = []
  Object.keys(params).forEach((e)=>{
    valStr.push(e)
  })

  let str = ""
  valStr.sort().forEach((e)=> {
    console.log(params[e])
    str += params[e]
  })
  const oristr = "KuXknOzM*FR4Mv30" + str + url.replace(domain, "").trim() + time_step
  return window.md5(oristr).split("").reverse().join("")
};

export const upload = function(formData) {
  return new Promise((resolve, reject) => {
      axios({
        url: "https://ali-res.xinxike.net",
        data: formData,
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        }      
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};



/**
 * 获取阿里云token
 */
 export const ossToken = (params) => fetch2(`https://service-api.xinxike.net/api/oss/token`,"POST", params);


/**
 * 提交咨询
 */
 export const submitConsult = (params) => fetch(`${domain}/api/consult/submitConsult`,"POST", params);


 /**
  * 答主咨询首页
  */
 export const respondersConsultInfo = (params) => fetch(`${domain}/api/consult/respondersConsultInfo`,"POST", params);
 
 
 
 /**
  * 我的咨询首页
  */
 export const consultInfo = (params) => fetch(`${domain}/api/consult/consultInfo`,"POST", params);
 
 
 
 /**
  * 咨询-各个状态的数量
  */
 export const consultCountPreview = (params) => fetch(`${domain}/api/consult/consultCountPreview`,"POST", params);
 
 
 /**
  * 收到的咨询接口
  */
 export const receiveconsult = (params) => fetch(`${domain}/api/consult/receiveconsult`,"POST", params);
 
 
 /**
  * 发起的咨询
  */
 export const myconsult = (params) => fetch(`${domain}/api/consult/myconsult`,"POST", params);
 
 
 
 
 /**
  * 获取咨询详情
  */
 export const consultDetail = (params) => fetch(`${domain}/api/consult/consultDetail`,"POST", params);
 
 
 
 
 /**
  * 拒绝
  */
 export const refuseAnswer = (params) => fetch(`${domain}/api/consult/refuseAnswer`,"POST", params);
 
 
 /**
  * 回答咨询
  */
 export const submitAnswer = (params) => fetch(`${domain}/api/consult/submitAnswer`,"POST", params);
 
 /**
  * 获取答案
  */
 export const consultAnswer = (params) => fetch(`${domain}/api/consult/consultAnswer`,"POST", params);
 
 
 /**
  * 获取回复记录
  */
 export const consultReply = (params) => fetch(`${domain}/api/consult/consultReply`,"POST", params);
 
 
 /**
  * 咨询-追加回复
  */
 export const addReply = (params) => fetch(`${domain}/api/consult/addReply`,"POST", params);
 
 
 
 /**
  * 评分和提交评论
  */
 export const giveStar = (params) => fetch(`${domain}/api/consult/giveStar`,"POST", params);
 
 
 
 /**
  * 历史咨询
  */
 export const myconsultHistory = (params) => fetch(`${domain}/api/consult/myconsultHistory`,"POST", params);
 
 
 
 /**
  * 完成咨询
  */
 export const finishConsult = (params) => fetch(`${domain}/api/consult/finishConsult`,"POST", params);
 
 
 
 /**
  * 保存设置
  */
 export const editConsultConfig = (params) => fetch(`${domain}/api/consult/editConsultConfig`,"POST", params);
 



  /**
  * 正在咨询
  */
   export const myconsultProcessing = (params) => fetch(`${domain}/api/consult/myconsultProcessing`,"POST", params);
 