import * as api from '../../api'
import'../../main.css'
import'./consulting.css'


var app = new Vue({
  el: '#app',
  data() {
    return {
      page: 1,
      answer_uid: "",
      list: [],
      empty: false,
      finished: false,
      loading: false,
    }
  },
  created() {
    this.answer_uid = api.GetRequest().answer_uid
  },
  methods: {
    onLoad(){
      console.log("adsd")
      this.myconsulting()
    },
    myconsulting(){
      this.loading = true
      api.myconsultProcessing({
        page: this.page,
        answer_uid: this.answer_uid,
      }).then((res)=>{
        this.loading = false;
        this.page = this.page + 1
        this.list = this.list.concat(res.data)
        if(res.data.length == 0) {
          this.finished = true
        }
        if(this.list.length == 0) {
          this.empty = true
        } else {
          this.empty = false
        }     
      })
    },
    
    
  
    consultDetail(item){
      if(item.status == 1) {
        window.location.href = "/mppage/web/communicate?consult_id=" + item.consult_id
      } else {
        window.location.href = "/mppage/web/detail?consult_id=" + item.consult_id
      }
    }    
  }
})