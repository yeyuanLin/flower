// pages/basket/basket.js
var http = require("../../utils/http.js");
// var config = require("../../utils/config.js");
const Big = require("../../utils/big.min.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopCart: [],
    totalMoney: 0,
    allChecked: true
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
    wx.showLoading();
    //加载购物车
    var params = {
      url: "/api/mine/cart/",
      method: "GET",
      data: {},
      callBack: res => {
        if (res.code =="ok") {
          if (res.data.length > 0) {
            // 默认全选
            var shopCart = res.data;
            shopCart.forEach((item, index) => {
              shopCart[index].checked = true;
            })

            this.setData({
              shopCart: shopCart,
              allChecked: true
            });

          } else {
            this.setData({
              shopCart: [],
            });
          }
          this.calTotalPrice();//计算总价
          wx.hideLoading();
        }
      }
    };
    http.request(params);

    http.getCartCount();//重新计算购物车总数量

  },

  /**
   * 去结算
   */
  toFirmOrder: function () {
    var shopCart = this.data.shopCart;
    var basketIds = [];
    shopCart.forEach(item => {
      if (item.checked) {
        basketIds.push({
          prodId: item.commodity.id,
          skuId: item.specification ? item.specification.id : null,
          prodCount: item.count,
        })
      }
    })
    if (!basketIds.length) {
      wx.showToast({
        title: '请选择商品',
        icon: "none"
      })
      return
    }
    wx.setStorageSync("basketIds", JSON.stringify(basketIds));
    wx.navigateTo({
      url: '/pages/submit-order/submit-order?orderEntry=0',
    })
  },

  /**
   * 全选
   */
  onSelAll: function () {
    var allChecked = this.data.allChecked;
    allChecked = !allChecked; //改变状态
    var shopCart = this.data.shopCart;

    shopCart.forEach((item, index) => {
      shopCart[index].checked = allChecked;
    })

    this.setData({
      allChecked: allChecked,
      shopCart: shopCart
    });
    this.calTotalPrice();//计算总价
  },

  /**
   * 每一项的选择事件
   */
  onSelectedItem: function (e) {
    var index = e.currentTarget.dataset.index;// 获取data- 传进来的index

    var shopCart = this.data.shopCart;// 获取购物车列表
    var checked = shopCart[index].checked; // 获取当前商品的选中状态
    shopCart[index].checked = !checked; // 改变状态
    this.setData({
      shopCart: shopCart
    });
    this.checkAllSelected();//检查全选状态
    this.calTotalPrice();//计算总价
  },

  /**
   * 检查全选状态
   */
  checkAllSelected: function () {
    var allChecked = true;
    var shopCart = this.data.shopCart;
    shopCart.forEach((item) => {
      if (!item.checked) {
        allChecked = false;
        return;
      }
    })
    this.setData({
      allChecked: allChecked
    });
  },

  /**
   * 计算购物车总额
   */
  calTotalPrice: function () {
    var shopCart = this.data.shopCart;
    var totalMoney = 0;
    shopCart.forEach(item => {
      if (item.checked) {
        totalMoney += item.count * item.price;
      }
    })
    this.setData({
      totalMoney: totalMoney.toFixed(2),
    });

  },

  /**
   * 减少数量
   */
  onCountMinus: function (e) {
    var index = e.currentTarget.dataset.index;
    var shopCart = this.data.shopCart;
    var prodCount = shopCart[index].count;
    if (prodCount > 1) {
      this.updateCount(index, -1);
    }
  },

  /**
   * 增加数量
   */
  onCountPlus: function (e) {
    var index = e.currentTarget.dataset.index;
    this.updateCount(index, 1);
  },


  /**
   * 改变购物车数量接口
   */
  updateCount: function (index, prodCount) {
    var ths = this;
    var shopCart = this.data.shopCart;
    wx.showLoading({
      mask: true
    });
    var params = {
      url: "/api/mine/cart/",
      method: "POST",
      data: {
        count: shopCart[index].count + prodCount,
        prodId: shopCart[index].commodity.id,
        skuId: shopCart[index].specification ? shopCart[index].specification.id : undefined,
      },
      callBack: function (res) {
        shopCart[index].count += prodCount;
        ths.setData({
          shopCart: shopCart
        });
        ths.calTotalPrice();//计算总价
        wx.hideLoading();

        http.getCartCount();//重新计算购物车总数量
      }
    };
    http.request(params);
  },

  /**
   * 删除购物车商品
   */
  onDelBasket: function () {
    var ths = this;

    var shopCart = this.data.shopCart;
    var deleteItems = [];
    shopCart.forEach(item => {
      if (item.checked) {
        deleteItems.push({
          prodId: item.commodity.id,
          skuId: item.specification ? item.specification.id : null
        });
      }
    })
    console.log(deleteItems)

    if (deleteItems.length == 0) {
      wx.showToast({
        title: '请选择商品',
        icon: "none"
      })
    } else {
      wx.showModal({
        title: '',
        content: '确认要删除选中的商品吗？',
        confirmColor: "#eb2444",
        success(res) {
          if (res.confirm) {

            wx.showLoading({
              mask: true
            });
            var params = {
              url: "/api/mine/cart/",
              method: "DELETE",
              data: {
                items: deleteItems
              },
              callBack: function (res) {
                if (res.code == "ok") {
                  wx.hideLoading();
                  ths.onShow();
                }
              }
            };
            http.request(params);
          }
        }
      })
    }


  }


})