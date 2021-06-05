import * as api from '../../api'
import'../../main.css'
import'./index.css'


var app = new Vue({
  el: '#app',
  data() {
    return {
      answer_uid: "10012",
      responder:{},
      consult_config:{},
      isMyself: false
    }
  },
  created(){
    this.answer_uid = api.GetRequest().answer_uid
    this.getRespondersConsultInfo()

    if(this.answer_uid == uid.uid) {
      this.isMyself = true
    }
  },
  methods: {
    getRespondersConsultInfo(){
      api.respondersConsultInfo({
        answer_uid: this.answer_uid
      }).then((res)=>{
        this.responder =  res.data
        this.consult_config = res.data.consult_config
      })
    },
    
    
  
    createConsult(){
      const id = this.answer_uid
      if(this.consult_config.consult_status == 1) {
        window.location.href = "/mppage/web/consult?answer_uid=" + id
      } else {
        vant.Toast("当前用户已关闭咨询")
      }
    },
  
  
  
    history() {
      window.location.href = "/mppage/web/history?answer_uid=" + this.answer_uid
    },


    asking(){
      window.location.href = "/mppage/web/consulting?answer_uid=" + this.answer_uid
    }
  }
})