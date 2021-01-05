module.exports = function(window, document) {var App = function(options) {window.appOptions = options};var self = window.self;var HTMLElement = window.HTMLElement;var Element = window.Element;var Node = window.Node;var localStorage = window.localStorage;var sessionStorage = window.sessionStorage;var navigator = window.navigator;var history = window.history;var location = window.location;var performance = window.performance;var Image = window.Image;var CustomEvent = window.CustomEvent;var Event = window.Event;var requestAnimationFrame = window.requestAnimationFrame;var cancelAnimationFrame = window.cancelAnimationFrame;var getComputedStyle = window.getComputedStyle;var XMLHttpRequest = window.XMLHttpRequest;var Worker = window.Worker;var SharedWorker = window.SharedWorker;window["createApp"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		5: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonpcreateApp"] = window["webpackJsonpcreateApp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([23,0]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_index_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_less_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_style_index_0_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ createApp; });

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/index/App.vue?vue&type=template&id=7c37e57f&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('div',{staticClass:"userinfo"},[_c('wx-button',{staticClass:"userinfo-avatar",style:({backgroundImage: ("url(" + _vm.avatarUrl + ")")}),attrs:{"open-type":"getUserInfo","size":"default"},on:{"getuserinfo":_vm.onGetUserInfo}}),_vm._v(" "),_c('div',{staticClass:"userinfo-nickname-wrapper"},[_c('wx-button',{staticClass:"userinfo-nickname",on:{"click":_vm.onGetOpenid}},[_vm._v("点击获取 openid")])],1)],1),_vm._v(" "),_c('div',{staticClass:"uploader"},[_c('div',{staticClass:"uploader-text",on:{"click":_vm.doUpload}},[_c('span',[_vm._v("上传图片")])]),_vm._v(" "),(_vm.imgUrl)?_c('div',{staticClass:"uploader-container"},[_c('img',{staticClass:"uploader-image",attrs:{"src":_vm.imgUrl,"mode":"aspectFit"}})]):_vm._e()]),_vm._v(" "),_vm._m(0)])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"uploader"},[_c('a',{staticClass:"uploader-text",attrs:{"href":"/databaseguide","target":"_blank"}},[_c('span',[_vm._v("前端操作数据库")])])])}]


// CONCATENATED MODULE: ./src/index/App.vue?vue&type=template&id=7c37e57f&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/index/App.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const app = getApp();

/* harmony default export */ var Appvue_type_script_lang_js_ = ({
  name: 'App',
  data() {
    return {
      avatarUrl: __webpack_require__(12),
      userInfo: {},
      logged: false,
      takeSession: false,
      requestResult: ''
    };
  },
  mounted() {
    if (!wx.cloud) {
      location.href = '/chooselib';
      return;
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.avatarUrl = res.userInfo.avatarUrl;
              this.userInfo = res.userInfo;
            }
          });
        }
      }
    });
  },
  methods: {
    onGetUserInfo(evt) {
      if (!this.logged && evt.detail.userInfo) {
        this.logged = true;
        this.avatarUrl = evt.detail.userInfo.avatarUrl;
        this.userInfo = evt.detail.userInfo;
      }
    },

    onGetOpenid() {
      // 调用云函数
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid);
          app.globalData.openid = res.result.openid;
          window.open('/userconsole');
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err);
          window.open('/deployfunctions');
        }
      });
    },

    /**
     * 上传图片
     */
    doUpload() {
      // 选择图片
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          wx.showLoading({
            title: '上传中'
          });

          const filePath = res.tempFilePaths[0];

          // 上传图片
          const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0];
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传文件] 成功：', res);

              app.globalData.fileID = res.fileID;
              app.globalData.cloudPath = cloudPath;
              app.globalData.imagePath = filePath;

              window.open('/storageconsole');
            },
            fail: err => {
              console.error('[上传文件] 失败：', err);
              wx.showToast({
                icon: 'none',
                title: '上传失败'
              });
            },
            complete: () => {
              wx.hideLoading();
            }
          });
        },
        fail: e => {
          console.error(e);
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/index/App.vue?vue&type=script&lang=js&
 /* harmony default export */ var index_Appvue_type_script_lang_js_ = (Appvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/index/App.vue?vue&type=style&index=0&lang=less&
var Appvue_type_style_index_0_lang_less_ = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(0);

// CONCATENATED MODULE: ./src/index/App.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  index_Appvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var App = (component.exports);
// CONCATENATED MODULE: ./src/index/main.mp.js



function createApp() {
  const container = document.createElement('div');
  container.id = 'app';
  document.body.appendChild(container);

  return new vue_runtime_esm["a" /* default */]({
    el: '#app',
    render: h => h(App)
  });
}

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ })["default"];}