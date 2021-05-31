import * as api from '../../api'
import'../../main.css'
import'./refuse.css'


var app = new Vue({
  el: '#app',
  data() {
    return {
      consult_id: "",
      refuse_reason: "",
      refuseSelect: [
        "不是我的专业领域",
        "咨询内容太宽泛，无法准确回答",
        "表述不清，无法理解问题的含义",
        "问题无意义",
      ],
      selectList:[],
      content: "",
      current: 0,
    }
  },
  created() {
    this.consult_id = api.GetRequest().consult_id
    this.getConsultDetail()
  },
  methods: {    
    getConsultDetail(){
      api.consultDetail({
        consult_id: this.consult_id
      }).then((res)=>{
        this.refuseSelect = res.data.refuse_options
        this.refuse = res.data.refuse_options[0]
      })
    }, 

    selectIndex(index){
      let refuseStr = this.refuseSelect[index]
      this.current = index
      this.refuse = refuseStr
    },
  
    submitRefuse(){
      if(this.content == "") {
        vant.Toast("请输入具体拒绝原因")
        return
      }
      let reason = this.refuse + "-" + this.content
      api.refuseAnswer({
        consult_id: this.consult_id,
        refuse_reason: reason,
      }).then((res)=>{
        if(res.status == 1) {
          window.location.href = "/mppage/web/detail?consult_id=" + this.consult_id
        } else {
          vant.Toast(res.info)
        }
      })
    }    
  }
})