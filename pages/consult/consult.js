import * as api from '../../api'
import '../../main.css'
import './consult.css'
import CryptoJS from 'crypto-js';


var app = new Vue({
  el: '#app',
  data() {
    return {
      answer_uid: "",
      consult_price: "",    
      host: "https://ali-res.xinxike.net/",
      uid: uid.uid,
      token: {},
      imageForm:{},
      fileList: [],
      postFile:[],
      show: false,
      content: "",
      checked: 0,
    }
  },
  created() {
    this.answer_uid = api.GetRequest().answer_uid
    this.getPrice()
    this.getToken()
  },

  methods: {
    afterRead(files) {
      const file  = files;
  
      if(!file) { 
        vant.Toast('请选择图片');
        return
      }

      if (!file.length) {
        this.uploadFilePromise(file)
      } else {
        file.forEach((item)=>{
          this.uploadFilePromise(item)
        })
      }
    },
  
    uploadFilePromise(file){
      console.log(file)
      let that = this
      const fileName = new Date().getTime() + Math.random().toString(36).substr(2);
      const key = "xinxike/consult/" + fileName

      let formData = new FormData();
      formData.append('key', key);
      formData.append('name', fileName);
      formData.append('policy',this.imageForm.policy)
      formData.append('OSSAccessKeyId',this.imageForm.OSSAccessKeyId)
      formData.append('signature',this.imageForm.signature)
      formData.append('x-oss-security-token',this.imageForm["x-oss-security-token"])
      formData.append('file', file.file)
      api.upload(formData).then((res)=>{
        let postFile = that.postFile
        console.log(postFile)

        postFile.push({url: that.host + key, isImage: true, file_key: fileName})
        that.postFile = postFile
        console.log(postFile)
      })
    },
  

    
  
    getToken() {
      let sercrt = "!NMK2kaa~@"
      let data = {
        appversion: '1.2.0',
        appname: 'xinxike',
        systype: 'xcx',
        store: 'wechat-xcx',
        ts: parseInt(new Date().getTime() / 1000),
      }
      let sign = md5(data.appname + data.appversion + data.systype + data.store + data.ts + sercrt)
      api.ossToken({
        ...data,
        sign: sign,
      }).then((res)=>{
        this.token = res.data
        this.imageForm = this.getFormDataParams()

        console.log(this.imageForm)

      })
    },
  
  
    // 计算签名。
    computeSignature(accessKeySecret, canonicalString) {
      console.log(accessKeySecret)
      console.log(canonicalString)
      return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(canonicalString, accessKeySecret));
    },
  
    getFormDataParams() {
      const date = new Date();
      date.setHours(date.getHours() + 1);
      const policyText = {
        expiration: date.toISOString(), // 设置policy过期时间。
        conditions: [
          // 限制上传大小。
          ["content-length-range", 0, 1024 * 1024 * 1024],
        ],
      }
  
      console.log(this.token.AccessKeySecret)
      const akc = this.token.AccessKeySecret
  
      const policy = window.btoa((JSON.stringify(policyText)))
      const signature = this.computeSignature(akc, policy)

      const formData = {
        OSSAccessKeyId: this.token.AccessKeyId,
        signature,
        policy,
        'x-oss-security-token': this.token.SecurityToken 
      }

      console.log(formData)

      return formData
    },
    
    
  
    deleteImage(file, detail){
      console.log(detail)

      const postFile = this.postFile
      postFile.splice(detail.index, 1)
      this.postFile = postFile

      const fileList = this.fileList
      fileList.splice(detail.index, 1)
      this.fileList = fileList
    },
  
  
  
    publish(){
      let imgs = []
      let that = this
      this.postFile.forEach((e)=>{
        if(e.url) {
          imgs.push(e.url)
        }
      })
      if(this.content == ""){
        vant.Toast("请填写咨询内容")
        return
      }
      api.submitConsult({
        answer_uid: this.answer_uid,
        content: this.content,
        pics: imgs.toString(),
        is_anonymous: this.checked,
        pay_type: "wechatpay-mp",
        platform: "wechat-mp",
      }).then((res)=>{
        if(res.status == 1){
          wx.chooseWXPay({
            timestamp: res.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
            package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: res.data.paySign, // 支付签名
            success: function (res) {
              vant.Toast("支付成功")
              that.show = true
            },
            fail(err){
              vant.Toast(err)
            }
          });
        } else {
          vant.Toast(res.info)
        }
      })
    },
    
  
    getPrice(){
      api.respondersConsultInfo({
        answer_uid: this.answer_uid
      }).then((res)=>{
        this.consult_price = res.data.consult_config.consult_price
        console.log(res)
      })
    },
  
  
    onClose() {
      window.location.href = "/mppage/web/home"
    },
  
    myConsult(){
      window.location.href = "/mppage/web/home"
    },

  

  }
})