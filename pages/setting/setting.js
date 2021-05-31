import * as api from '../../api'
import'../../main.css'
import'./setting.css'


var app = new Vue({
  el: '#app',
  data() {
    return {
      consult_price: "",
      consult_brief: "",
      consult_status: "",
      consult_conversation_limit: "",
    }
  },
  created() {
    this.getConsultInfo()
  },
  methods: {    
    getConsultInfo(){
      api.consultInfo().then((res)=>{
        this.config = res.data.consult_config
        this.consult_price = this.config.consult_price
        this.consult_brief = this.config.consult_brief
        this.consult_status = this.config.consult_status
        this.consult_conversation_limit = this.config.consult_conversation_limit
      })
    },

    save(){
      api.editConsultConfig({
        consult_price: this.consult_price,
        consult_brief: this.consult_brief,
        consult_status: this.consult_status,
        consult_conversation_limit: this.consult_conversation_limit,      
      }).then((res)=>{
        if(res.status == 1) {
          window.location.href = "/mppage/web/home"
          vant.Toast("修改成功")
        } else {
          vant.Toast(res.info)       
        }
      })
    }
  }
})