// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    indexImgs: ["../../images/index-img/carousel-1.jpg", "../../images/index-img/carousel-2.jpg", "../../images/index-img/carousel-3.jpg"],
    taglist:[],
    news: ["足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。","hahahaaaaaaaaaaaaaaaaaaaaaaa"],
    num:[1,2,3]
  },
  onChange(event) {
    wx.showToast({
      // title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //跳转公告列表页面
  onNewsPage: function () {
    wx.navigateTo({
      url: '',
    })
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
  // 跳转搜索页
  toSearchPage: function () {
    wx.navigateTo({
      url: '/pages/sousuo-page/sousuo-page',
    })
  },

  //跳转商品活动页面
  toClassifyPage: function (e) {
    // var url = '/pages/prod-classify/prod-classify?
    // sts=' + e.currentTarget.dataset.sts;
    // var id = e.currentTarget.dataset.id;
    // var title = e.currentTarget.dataset.title;
    // if (id) {
      // url += "&tagid=" + id + "&title=" + title;
    // }
    wx.navigateTo({
      // url: url
      url:'/pages/classify/classify'
    })
  },

  toProdPage(){
    wx.navigateTo({
      url: '/pages/prod/prod',
    })
  },

  //跳转公告列表页面
  onNewsPage: function () {
    wx.navigateTo({
      url: '/pages/recent-news/recent-news',
    })
  },

})