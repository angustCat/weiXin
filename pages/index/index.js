//index.js
const APP_ID = "30381";
const APP_KEY = "3d57c7dab3f549e0a524ff8480badfa4";
const APP_URL = "http://route.showapi.com/255-1";
// type=10 图片 
// type=29 段子 
// type=31 声音 
// type=41 视频
var count =1;

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    now: 0,
    arr: [
      {
        'name':"图片",
        'type':10,
        'page':1,
      },
      {
        'name':'段子',
        'type':29,
        'page':1,
      },
      {
        'name':'视频',
        'type':41,
        'page':1,
      },
    ],
    imgList: [],
    duanZi:[],
    vidwoList: []
  
  },
  onReachBottom: function(){
    let id = this.data.arr[this.data.now].type;
    let page = ++this.data.arr[this.data.now].page;
    let dist ='';
    if(id==10){
       dist= 'imgList';
    }else if(id==29){
       dist= 'duanZi';
    }else{
       dist= 'vidwoList';
    }
     this.getData(id, page, dist);
  },
  
  onLoad: function () {
      //请求图片数据
      this.getData(10, 1, 'imgList');

      this.getData(29,1,'duanZi');
    
      this.getData(41,1,'vidwoList');

     

   


  },
  getData(typeId, page, dist ){
     var that = this;
    wx.request({
        url: APP_URL,
        data: {
          type: typeId,
          page: page,
          showapi_appid: APP_ID,
          showapi_sign: APP_KEY
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          console.log(dist);
          that.data[dist].push(...res.data.showapi_res_body.pagebean.contentlist);
          that.setData({
            [dist]:that.data[dist]
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
  },
  changeNav(e){
    this.setData({
      now: e.target.dataset.index
    })
  },
  //图片预览
  preview(e){
    wx.previewImage({
      urls: [e.target.dataset.img]
    })
  }
})
