import * as api from '../../api'
import'../../main.css'
import'./history.css'


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
      this.myconsultHistory()
    },
    myconsultHistory(){
      this.loading = true
      api.myconsultHistory({
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
    
    
  
    consultDetail(e){
      window.location.href = "/mppage/web/detail?consult_id=" + id
    }    
  }
})