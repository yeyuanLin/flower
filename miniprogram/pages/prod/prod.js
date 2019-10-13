// pages/prod/prod.js
const app = getApp()
var http = require('../../utils/http.js');
var config = require('../../utils/config.js');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prodId: 0,
    isCollection: true,
    couponList:[1,2],
    littleCommPage: [1,2,3,4,5],
    skuShow:false,
    commodityInfo: {},
    prodNum: 1,
    popupShow: false,
    selectedSkuId: null,
    selectedProp: [],

  },
  /**
   * 添加或者取消收藏商品 
   */
  addOrCannelCollection() {
    // wx.showLoading();

    // var params = {
      // url: "/p/user/collection/addOrCancel",
      // method: "POST",
      // data: this.data.prodId,
      // callBack: (res) => {
        // this.setData({
          // isCollection: !this.data.isCollection
        // })
        // wx.hideLoading();
      // }
    // };
    // http.request(params);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      prodId: options.prodid,
    });
    this.getData();
  },
  getData(){
    // wx.showLoading();
    var params = {
      url: '/api/commodity/commodity/',
      method: "GET",
      data: {
        id: this.data.prodId
      },
      callBack:(res)=>{
        console.log(res);
        if(res.code == "ok"){
          this.setData({
            commodityInfo:res.data
          })
        }
      }
    }
    http.request(params);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
 * 跳转到首页
 */
  toHomePage: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 跳转到购物车
   */
  toCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  //打开规格窗口
  showSku() {
    this.setData({
      skuShow: true
    });
  },
  // 关闭弹窗
  closePopup: function () {
    this.setData({
      popupShow: false,
      skuShow: false,
      commentShow: false
    });
  },
  // 
  toChooseItem(e) {
    var item = e.currentTarget.dataset.val;
    this.data.commodityInfo.specification.forEach((value, index) => {
      if (item.id==value.id) {
        this.setData({
          selectedSkuId: value.id,
          selectedProp: value.name
        });
      }
    });
  },
  // 数量减
  onCountMinus() {
    var prodNum = this.data.prodNum;
    if (prodNum > 1) {
      this.setData({
        prodNum: prodNum - 1
      });
    }
  },
  // 数量加
  onCountPlus() {
    var prodNum = this.data.prodNum;
    if (prodNum < 1000) {
      this.setData({
        prodNum: prodNum + 1
      });
    }
  }
})