import * as api from '../../api'
import'../../main.css'
import'./detail.css'


var app = new Vue({
  el: '#app',
  data() {
    return {
      consult_id: "",
      uid: uid.uid,
      consultDetail: {},
      isAsker: false,
      answer:{}
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
        this.consultDetail = res.data
        this.answer = res.data.answer
        this.isAsker = (this.uid == res.data.answer_uid)
        console.log(res)
      })
    },    


    goAnswer() {
      window.location.href = "/mppage/web/answer?consult_id=" + this.consult_id
    },
    
    refuse(){
      window.location.href = "/mppage/web/refuse?consult_id=" + this.consult_id
    },    

    checkImage(index){
      const that = this
      vant.ImagePreview({
        images: that.consultDetail.pic_url,
        startPosition: index,
        closeable: true,
      });      
    },    

    checkAnserImage(index){
      const that = this
      vant.ImagePreview({
        images: that.answer.answer_pic_url,
        startPosition: index,
        closeable: true,
      });
    }, 
    
    goContinue(){
      window.location.href = "/mppage/web/communicate?consult_id=" + this.consult_id
    }, 

  }


})