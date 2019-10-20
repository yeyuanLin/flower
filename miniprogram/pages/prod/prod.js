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
    totalCartNum: 0,
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
    wx.showLoading();

    var params = {
      url: "/api/commodity/collect/",
      method: "POST",
      data: {id: this.data.prodId},
      callBack: (res) => {
        if (res.code == "ok"){
          const commodityInfo = this.data.commodityInfo;
          commodityInfo.is_collect = res.data;
          this.setData({
            commodityInfo: commodityInfo
          })
          wx.hideLoading();
        }
      }
    };
    http.request(params);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      prodId: options.prodid,
    });
    this.getData();
  },
  getData(){
    wx.showLoading();
    var params = {
      url: '/api/commodity/commodity/',
      method: "GET",
      data: {
        id: this.data.prodId
      },
      callBack:(res)=>{
        if(res.code == "ok"){
          this.setData({
            commodityInfo:res.data
          })
          wx.hideLoading();
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
    console.log(app.globalData.totalCartCount)
    this.setData({
      totalCartNum: app.globalData.totalCartCount
    });
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
    if (item.stocks) {
      this.data.commodityInfo.specification.forEach((value, index) => {
        if (item.id == value.id) {
          const commodityInfo = this.data.commodityInfo;
          commodityInfo.pic = item.pic;
          commodityInfo.price = item.price;
          this.setData({
            selectedSkuId: value.id,
            selectedProp: value.name,
            commodityInfo: commodityInfo,
          });
        }
      });
    } else {
      wx.showToast({
        title: '库存不足',
        icon: 'none',
      })
    }
    
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
  },
  /**
   * 立即购买
   */
  buyNow: function () {
    if (this.data.commodityInfo.specification && !this.data.selectedSkuId) {
      wx.showToast({
        title: '请选择商品规格类型',
        icon: 'none'
      })
      this.setData({
        skuShow: true
      });
    } else {
      wx.setStorageSync("orderItem", JSON.stringify({
        prodId: this.data.prodId,
        skuId: this.data.selectedSkuId,
        prodCount: this.data.prodNum,
      }));
      wx.navigateTo({
        url: '/pages/submit-order/submit-order?orderEntry=1',
      });
    }
  },
  /**
   * 加入购物车
   */
  addToCart: function (event) {
    if (this.data.commodityInfo.specification && !this.data.selectedSkuId) {
      wx.showToast({
        title: '请选择商品规格类型',
        icon: 'none'
      })
      this.setData({
        skuShow: true
      });
    } else {
      var ths = this;
      wx.showLoading({
        mask: true
      });
      
      var params = {
        url: "/api/mine/cart/",
        method: "PUT",
        data: {
          count: this.data.prodNum,
          prodId: this.data.prodId,
          skuId: this.data.selectedSkuId
        },
        callBack: function (res) {
          if (res.code == "ok") {
            ths.setData({
              totalCartNum: ths.data.totalCartNum + ths.data.prodNum
            });
            wx.hideLoading();
            wx.showToast({
              title: "加入购物车成功",
              icon: "none"
            })
          }
        }
      };
      http.request(params);
    }
  },
})