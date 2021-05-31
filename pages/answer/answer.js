import * as api from '../../api'
import '../../main.css'
import './answer.css'
import CryptoJS from 'crypto-js';


var app = new Vue({
  el: '#app',
  data() {
    return {
      host: "https://ali-res.xinxike.net/",
      consult_id:"",
      uid: uid.uid,
      token: {},
      imageForm:{},
      fileList: [],
      postFile:[],
      show: false,
      content: "",
      hidden: true,
      consultDetail:{},
      hasPic: 0,
    }
  },
  created() {
    this.consult_id = api.GetRequest().consult_id
    this.getConsultDetail()
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
        postFile.push({url: this.host + key, isImage: true, file_key: fileName})
        that.postFile = postFile
        console.log(res)
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
      this.postFile.forEach((e)=>{
        if(e.url) {
          imgs.push(e.url)
        }
      })
      if(this.content == ""){
        vant.Toast("请输入内容")
        return
      }
      api.submitAnswer({
        consult_id: this.consult_id,
        content: this.content,
        pics: imgs.toString(),
      }).then((res)=>{
        if(res.status == 1){
          this.show = true
        } else {
          vant.Toast(res.info)
        }
      })
    },
  
  
  
    getConsultDetail(){
      api.consultDetail({
        consult_id: this.consult_id
      }).then((res)=>{
        this.consultDetail = res.data,
        this.hasPic = res.data.pic_url.length      
        this.isAsker = this.uid == res.data.answer_uid
      })
    },
    
    
    back(){
      window.location.href = "/mppage/web/detail?consult_id=" + this.consult_id
    },
  
    onClose(){
      this.back()
    },
  
  
    checkConsultImage(index){
      const that = this
      vant.ImagePreview({
        images: that.consultDetail.pic_url,
        startPosition: index,
        closeable: true,
      });
    },  
  
    showContent(){
      const that = this
      this.hidden = !this.hidden
    },  
  
  }
})