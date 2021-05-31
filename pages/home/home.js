import * as api from '../../api'
import'../../main.css'
import'./home.css'


var app = new Vue({
  el: '#app',
  data() {
    return {
      type: 1,
      navData: {},
      navType: 0,
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
    this.consultCountPreview()
    if(this.type == 1){
      this.receiveconsult()
    } else {
      this.myconsult()
    }   
  },
  methods: {
    onLoad(){
      console.log("adsd")
      if(this.type == 1){
        this.receiveconsult()
      } else {
        this.myconsult()
      }          
    },
    getConsultInfo(){
      api.consultInfo().then((res)=>{
        this.consultInfo = res.data
        console.log(res)
      })
    },

    setType(type){
      this.type = type
      this.navType = 0
      this.list = []
      this.finished = false
      this.page = 1

      if(this.type == 1) {
        this.receiveconsult()
      } else {
        this.myconsult()
      }
      this.consultCountPreview()
    },
    
    consultCountPreview(){
      api.consultCountPreview({
        type: this.type
      }).then((res)=>{
        this.navData = res.data
      })
    }, 
    
    setNavType(navType){
      this.navType = navType
      this.list = []
      this.finished = false
      this.page = 1      
      if(this.type == 1) {
        this.receiveconsult()
      } else {
        this.myconsult()
      }    
    },
    
    
    receiveconsult(){
      this.loading = true
      api.receiveconsult({
        type: this.navType,
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
    
    
    myconsult(){
      this.loading = true
      api.myconsult({
        type: this.navType,
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
  
  
    consultDetail(id){
      if(this.navType == 0) {
        window.location.href = "/mppage/web/communicate?consult_id=" + id
      } else {
        window.location.href = "/mppage/web/detail?consult_id=" + id
      }
    },
  
  
    setting(){
      console.log("设置")
      window.location.href = "/mppage/web/setting"
    },
    
  }
})