// pages/category/category.js
var http = require("../../utils/http.js");
var config = require("../../utils/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryList:[],
    selIndex: 0,
    productList: [
      {
        prodId: 0,
        pic: "",
        prodName: "",
        brief: "+",
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
    var ths = this;
    //加载分类列表
    var params = {
      url: "/api/commodity/category/",
      method: "GET",
      callBack: function (res) {
        if (res.code == "ok") {
          ths.setData({
            categoryImg: res.data[0].pic,
            categoryList: res.data,
          });
          ths.getProdList(res.data[0].id)
        }
      }
    };
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
   * 分类点击事件
   */
  onMenuTab: function (e) {
    console.log(e);
    // var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    // this.getProdList(id);
    // this.getProdList(this.data.categoryList[index].categoryId);
    this.setData({
      // categoryImg: this.data.categoryList[index].pic,  后期数据库
      selIndex: index
    });
  },

  // 跳转搜索页
  toSearchPage: function () {
    wx.navigateTo({
      url: '/pages/sousuo-page/sousuo-page',
    })
  },
  getProdList(categoryId) {
    //加载分类下的商品
    var params = {
      url: "/api/commodity/list/",
      method: "GET",
      data: {
        category: categoryId
      },
      callBack: (res) => {
        if (res.code == "ok") {
          console.log(res);
          this.setData({
            productList: res.data.results,
          });
        }
      }
    };
    http.request(params);
  },

  //跳转商品详情页
  toProdPage: function (e) {
    var prodid = e.currentTarget.dataset.prodid;
    wx.navigateTo({
      url: '/pages/prod/prod?prodid=' + prodid,
    })
  },
})