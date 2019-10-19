// pages/search-prod-show/search-prod-show.js

var http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sts: '',
    showType: 2,
    searchProdList: [],
    prodName: "",
    prodPage: 1,
  },

  changeShowType: function () {
    var showType = this.data.showType;
    if (showType == 1) {
      showType = 2;
    } else {
      showType = 1;
    }
    this.setData({
      showType: showType
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      prodName: options.prodName
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  //输入商品获取数据
  getSearchContent: function (e) {
    this.setData({
      prodName: e.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.toLoadData();
  },

  //请求商品接口
  toLoadData: function () {
    wx.showLoading()
    var params = {
      url: "/api/commodity/list/",
      method: "GET",
      data: {
        page: this.data.prodPage,
        search:this.data.prodName,
        ordering:this.data.sts,
      },
      callBack: (res)=> {
        this.setData({
          searchProdList: res.data.results,
        });
        wx.hideLoading()
      },
    };
    http.request(params);
  },

  //当前搜索页二次搜索商品
  toSearchConfirm: function () {
    this.toLoadData();
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
 * 状态点击事件
 */
  onStsTap: function (e) {
    var sts = e.currentTarget.dataset.sts;
    var ordering;
    if (sts == 0){
      ordering = '';
    } else if (sts == 1) {
      if (this.data.sts == 'sold_num' || this.data.sts == '-sold_num'){
        ordering = 'sold_num' == this.data.sts ? '-sold_num' :'sold_num;' 
      } else {
        ordering = 'sold_num';
      }
    } else if (sts == 2) {
      if (this.data.sts == 'price' || this.data.sts == '-price'){
        ordering = 'price' == this.data.sts?'-price':'price';
      } else {
        ordering = 'price'
      }
    }
    this.setData({
      sts: ordering
    });
    this.toLoadData();
  },

  toProdPage: function (e) {
    var prodid = e.currentTarget.dataset.prodid;
    wx.navigateTo({
      url: '/pages/prod/prod?prodid=' + prodid,
    })
  },
})