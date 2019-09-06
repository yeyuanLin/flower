// pages/prod/prod.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexImgs: ["../../images/index-img/carousel-1.jpg", "../../images/index-img/carousel-2.jpg", "../../images/index-img/carousel-3.jpg"],
    prodName:"",
    isCollection: true,
    couponList:[1,2],
    littleCommPage:[1,2,3,4,5],
    skuShow:false,

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
  }
})