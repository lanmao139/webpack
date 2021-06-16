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
      isMyself: false,
      hasTags: false,
      step: "1",
      module_status: 0,
      steplist: [],
      stepArray: [
        [
          "·咨询内容可添加链接、图片（最多4张）",
          "·咨询内容必须合法合规，内容阐述尽量清晰明了",
          "·可向答主匿名咨询"
        ],
        [
          "·编辑咨询内容后，点击确认咨询按钮即可",
          "·付费成功后我们将会第一时间通知答主回答",
          "·答主未及时回答或拒绝回答，我们将全额退款"
        ],
        [
          "·答主回答后，咨询者可以进行答后交流（有次数限制）",
          "·答后交流次数由答主设置的追答次数决定",
          "·答后交流结束后，点击完成咨询，可对答主进行评价"
        ]
      ]
    }
  },
  created(){
    this.answer_uid = api.GetRequest().answer_uid
    this.getRespondersConsultInfo()
    this.steplist = this.stepArray[0]
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
        this.module_status = res.data.module_status
        if(res.data.tags.length > 0) {
          this.hasTags = true
        }
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


    stepText(n){
      this.step = n
      this.steplist = this.stepArray[n-1]
    },
  
  
  
    history() {
      window.location.href = "/mppage/web/history?answer_uid=" + this.answer_uid
    },


    asking(){
      window.location.href = "/mppage/web/consulting?answer_uid=" + this.answer_uid
    }
  }
})