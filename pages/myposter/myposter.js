import * as api from '../../api'
import'../../main.css'
import'./myposter.css'


var app = new Vue({
  el: '#app',
  data() {
    return {
      list:[],
      page: 1,
      empty: false,
      consultInfo:{},
      loading: true,
      finished: false,
    }
  },
  created(){
    this.getConsultInfo()
    this.myorders()
  },
  filters: {
    badage(val) {
      let badage = "查看"
      // if(val.is_ban == 1) {
      //   return badage = "违规"
      // }

      // if(val.is_withdraw == 1) {
      //   return badage = "下架"
      // }

      // switch (val.status) {
      //   case 0:
      //     badage = "关闭"
      //     break;
      //   case 1:
      //     badage = "在售"
      //     break;
      //   case 2:
      //     badage = "失效"
      //     break;
      //   default:
      //     break;
      // }  
      
      return badage
    },

    shareColor(data) {
      var colorStyle = ""

      // if(data.is_withdraw == 1) {
      //   colorStyle = "#EA8430"
      //   return "box-shadow:none;background-color: " + colorStyle
      // }

      // if(data.is_ban == 1) {
      //   colorStyle = "#EA5130"
      //   return "box-shadow:none;background-color: " + colorStyle
      // }  

      // switch (data.status) {
      //   case 0:
      //     colorStyle = "#A4A4A4;box-shadow:none;"
      //     break;
      //   case 1:
      //     colorStyle = "#3059EA;box-shadow: -3px 5px 10px 0px rgba(48, 89, 234, 0.15);"
      //     break;
      //   case 2:
      //     colorStyle = "#37393C;box-shadow:none;"
      //     break;
      //   default:
      //     colorStyle = "#3059EA;box-shadow: -3px 5px 10px 0px rgba(48, 89, 234, 0.15);"
      //     break;
      // }

      return "background-color: #3059EA;box-shadow: -3px 5px 10px 0px rgba(48, 89, 234, 0.15);"
    }    
  },  
  methods: {
    onLoad(){
      this.myorders()
    },

    getConsultInfo(){
      api.consultInfo().then((res)=>{
        this.consultInfo = res.data
        console.log(res)
      })
    },

    
    myorders(){
      this.loading = true
      api.myorders({
        page: this.page,
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
    
    
  
    posterDetail(id){
      window.location.href = "/mppage/web/posterpage?poster_id=" + id
    },
      
  }
})