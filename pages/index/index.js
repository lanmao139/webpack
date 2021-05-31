import * as api from '../../api'
import'../../main.css'
import'./index.css'


var app = new Vue({
  el: '#app',
  data() {
    return {
      answer_uid: "10012",
      responder:{},
      consult_config:{}
    }
  },
  created(){
    this.answer_uid = api.GetRequest().answer_uid
    this.getRespondersConsultInfo()
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
      window.location.href = "/mppage/web/consult?answer_uid=" + id
    },
  
  
  
    history() {
      window.location.href = "/mppage/web/history?answer_uid=" + this.answer_uid
    }    
  }
})