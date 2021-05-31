import * as api from '../../api'
import '../../main.css'
import './communicate.css'


var app = new Vue({
  el: '#app',
  data() {
    return {
      consult_id: "",
      uid: uid.uid,
      show:false,
      content: "",
      consultDetail: {},
      hidden: true,
      answerHidden: true,   
      hasPic: 0, 
      isAsker: false, 
      answerDetail: {},
      replyList: []
    }
  },
  created() {
    this.consult_id = api.GetRequest().consult_id
    this.getConsultDetail()
    this.consultAnswer()
    this.consultReply()
  },

  methods: {
    getConsultDetail(){
      api.consultDetail({
        consult_id: this.consult_id
      }).then((res)=>{
        this.consultDetail = res.data
        this.isAsker = this.uid == res.data.answer_uid
        this.hasPic = res.data.pic_url.length
      })
    },  
  
  
    consultAnswer(){
      api.consultAnswer({
        consult_id: this.consult_id
      }).then((res)=>{
        this.answerDetail = res.data
      })
    },    
  
    
    consultReply(from){
      api.consultReply({
        consult_id: this.consult_id
      }).then((res)=>{
        this.replyList = res.data
  
        if(from == 'send') {

        }
      })
    },   
    
  
  
    sendReply(){
      if(this.content == "") {
        vant.Toast("请输入内容")
        return
      }
      api.addReply({
        consult_id: this.consult_id,
        answer_uid: this.consultDetail.answer_uid,
        content: this.content
      }).then((res)=>{
        if(res.status == 1) {
          let _replyList = this.replyList
          _replyList.push({
            content: this.content,
            is_me: 1,
          })
          this.replyList = _replyList
          this.content = ""

          setTimeout(() => {
            this.scrollToBottom()
          }, 100);
        } else {
          vant.Toast(res.info);
        }
        console.log(res)
      })
    },
  
    finsh(){
      const that = this
      api.finishConsult({
        consult_id: this.consult_id
      }).then((res)=>{
        if(res.status == 1) {
          window.location.href = "/mppage/web/star?consult_id=" + this.consult_id
        } else {
          vant.Toast(res.info);
        }
      })
    },
  
  
    openFinshPop(){
      this.show = true
    },
  
  
    onClose(){
      this.show = false
    },
  
  
    checkImage(index){
      const that = this
      vant.ImagePreview({
        images: that.answerDetail.answer_pic_url,
        startPosition: index,
        closeable: true,
      });
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
      this.hidden = !this.hidden
    },
  
  
    showAnswerContent(){
      this.answerHidden =  !this.answerHidden
    },


    scrollToBottom(){
      window.scrollTo({
        top: 1000,
        left: 0,
        behavior: 'smooth'
      });      
    }
  
  }
})