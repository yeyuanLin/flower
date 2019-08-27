// pages/category/category.js
var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[
      { categoryId: 0, categoryName: "每日新品" },
      { categoryId: 1, categoryName: "HSPM" },
      { categoryId: 2, categoryName: "女装馆" },
      ],
    selIndex: 0,
    productList: [
      {
        prodId: 0,
        pic: "",
        prodName: "零食",
        brief: "好吃的零食",
        price: 1099.34
      },
    ],
    categoryImg: '',
    prodid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})