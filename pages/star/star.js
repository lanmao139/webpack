import * as api from '../../api'
import'../../main.css'
import'./star.css'


var app = new Vue({
  el: '#app',
  data() {
    return {
      consultDetail: {},
      content: "",
      startText:'极好',
      stars: 5,
      starTextList:[
        '差评',
        '一般',
        '还行',
        '好',
        '极好'        
      ],
    }
  },
  created() {
    this.consult_id = api.GetRequest().consult_id
    this.getConsultDetail()
  },
  methods: {  
    onChange(e){
      this.startText = this.starTextList[e  - 1]
    },
  
    getConsultDetail(){
      api.consultDetail({
        consult_id: this.consult_id
      }).then((res)=>{
        this.consultDetail = res.data
        if(res.data.is_give_star == 1) {
          vant.Toast("你已完成评价")
          setTimeout(() => {
            window.location.href = "/mppage/web/detail?consult_id=" + this.consultDetail.consult_id
          }, 2000);
        }
      })
    }, 
  
    giveStar(){
      const that = this
      api.giveStar({
        star: this.stars,
        consult_id: this.consultDetail.consult_id,
        answer_uid: this.consultDetail.answer_uid,
        comment: this.content,
      }).then((res)=>{
        if(res.status == 1) {
          vant.Toast("评价成功")
          window.location.href = "/mppage/web/detail?consult_id=" + this.consultDetail.consult_id
        } else {
          vant.Toast(res.info)
        }
      })
    }    
  }
})