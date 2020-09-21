/*
 * @Author: huangying 
 * @Date: 2020-07-28 09:46:43 
 * @Last Modified by: huangying
 * @Last Modified time: 2020-08-27 09:54:44
 */
import axios from 'axios'
import qs from 'qs';

function GetRequest() {
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
}

var useragent = navigator.userAgent;
console.log(useragent)
let userData = {}
useragent.split('&').forEach(function(e){
  let key = e.split('*')[0]
  let val = e.split('*')[1]
  userData[key] = val
})

if(userData.token){

} else {
  userData = GetRequest()
}

console.log(userData)


function _sign(params) {
  /*
      @params object: uri请求参数(包含除signature外的公共参数)
  */
  if( typeof(params)!="object" ) {
      console.error("params is not an object");
      return false;
  }
  // NO.1 参数排序
  var _my_sorted = Object.keys(params).sort();
  // NO.2 排序后拼接字符串
  var canonicalizedQueryString = '';
  for (var _i in _my_sorted) {
      canonicalizedQueryString += _my_sorted[_i] + '=' + params[_my_sorted[_i]] + '&';
  }
  canonicalizedQueryString += 'qiandaozhuan_secret';

  console.log(canonicalizedQueryString)

  return md5(canonicalizedQueryString).toUpperCase();
}


function make_sign(data) {

  let params = JSON.parse(JSON.stringify(data))

  /*
      @params object: uri请求参数(不包含公共参数)
  */
  if( typeof(params)!="object" ) {
      console.warn("params is not an object, set {}");
  }
  // 获取当前时间戳
  var timestamp = Math.round(new Date().getTime() / 1000 - 5).toString();
  console.log(timestamp);
  // 设置公共参数
  var publicParams = { time_stamp: timestamp};
  // 添加加公共参数
  for (var i in publicParams) {
      params[i] = publicParams[i];
  }
  params.signature = _sign(params).toString();
  return params
}


axios.defaults.withCredentials = true

const domain = process.env.NODE_ENV === 'development'? '/request' : 'https://api.qiandaozhuan.com'

/**
 * 
 * 
 * @export
 * @param {any} url 
 * @param {string} [method='POST'] 
 * @param {any} params 
 * @returns 
 */
export function fetch(url, method = 'POST',params) {
    var data = qs.stringify(params);   
    return new Promise((resolve, reject) => {
        axios({
                method: method,
                url: url,
                data:data,
                headers: {
                    'AUTHORIZATION': userData.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }                
            })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
    
}


/**
 * 
 * 
 * @export
 * @param {any} url 
 * @param {string} [method='POST'] 
 * @param {any} params 
 * @returns 
 */
export function fetch2(url, method = 'POST',params) {
    var data = qs.stringify(params);   
    return new Promise((resolve, reject) => {
        axios({
                method: method,
                url: url,
                data: JSON.stringify(params),          
            })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
    
}

export default {

  /**
   * 获取url参数
   */
  GetRequest() {
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
  },

    /**
     * 抽奖数据
     */
    getLuckyDraw(){
      return fetch(`${domain}/app/tasks/lucky_draw`,'post', make_sign(userData));
    }, 
    
    //抽奖数据
    luckyDraw(){
      return fetch(`${domain}/app/tasks/lucky_draw`,'put', make_sign(userData));
    },
}