(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"66e8":function(e,i,t){"use strict";t.r(i);var a=t("d104"),s=t("da82");for(var m in s)"default"!==m&&function(e){t.d(i,e,function(){return s[e]})}(m);var n=t("2877"),u=Object(n["a"])(s["default"],a["a"],a["b"],!1,null,null,null);i["default"]=u.exports},"6df5":function(e,i,t){"use strict";(function(e){t("792e"),t("921b");a(t("66fd"));var i=a(t("66e8"));function a(e){return e&&e.__esModule?e:{default:e}}e(i.default)}).call(this,t("6e42")["createPage"])},d104:function(e,i,t){"use strict";var a=function(){var e=this,i=e.$createElement;e._self._c},s=[];t.d(i,"a",function(){return a}),t.d(i,"b",function(){return s})},da82:function(e,i,t){"use strict";t.r(i);var a=t("e241"),s=t.n(a);for(var m in a)"default"!==m&&function(e){t.d(i,e,function(){return a[e]})}(m);i["default"]=s.a},e241:function(e,i,t){"use strict";(function(e){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a=function(){return Promise.all([t.e("common/vendor"),t.e("components/index/index-list")]).then(t.bind(null,"2736"))},s=function(){return t.e("components/index/tab-bar").then(t.bind(null,"11e4"))},m=function(){return t.e("components/common/load-more").then(t.bind(null,"e951"))},n=function(){return t.e("components/common/nothing").then(t.bind(null,"8bf7"))},u={components:{indexList:a,tabBar:s,loadMore:m,nothing:n},data:function(){return{swiperheight:500,tabIndex:0,i:1,loadText:"",tabBars:[{name:"关注",id:"guanzhu"},{name:"推荐",id:"tuijian"},{name:"体育",id:"tiyu"},{name:"热点",id:"redian"},{name:"财经",id:"caijing"},{name:"娱乐",id:"yule"}],newslist:[{loadState:1,list:[{userHead:"../../static/demo/userpic/12.jpg",userName:"昵称",isFocus:!1,comment:"我是标题",mediaType:!0,media:"../../static/demo/datapic/11.jpg",like:{islike:1,likeNum:199,dislikeNum:11},commentnum:10,sharenum:10},{userHead:"../../static/demo/userpic/13.jpg",userName:"昵dd称",isFocus:!1,comment:"我fdsfds",mediaType:"true",media:"../../static/demo/datapic/5.jpg",like:{islike:2,likeNum:11,dislikeNum:11},commentnum:102,sharenum:10},{userHead:"../../static/demo/userpic/12.jpg",userName:"昵称",isFocus:!1,comment:"我是标题",mediaType:"true",media:"../../static/demo/datapic/11.jpg",like:{islike:0,likeNum:11,dislikeNum:11},commentnum:10,sharenum:10},{userHead:"../../static/demo/userpic/12.jpg",userName:"昵称",isFocus:!1,comment:"我是标题",mediaType:"true",media:"../../static/demo/datapic/11.jpg",like:{islike:1,likeNum:11,dislikeNum:11},commentnum:10,sharenum:10}]},{loadState:0,list:[{userHead:"../../static/demo/userpic/12.jpg",userName:"昵称",isFocus:!1,comment:"我是标题",mediaType:"true",media:"../../static/demo/datapic/11.jpg",like:{islike:0,likeNum:11,dislikeNum:11},commentnum:10,sharenum:10},{userHead:"../../static/demo/userpic/13.jpg",userName:"昵dd称",isFocus:!1,comment:"我fdsfds",mediaType:"true",media:"../../static/demo/datapic/5.jpg",like:{islike:2,likeNum:11,dislikeNum:11},commentnum:102,sharenum:10},{userHead:"../../static/demo/userpic/12.jpg",userName:"昵称",isFocus:!1,comment:"我是标题",mediaType:"true",media:"../../static/demo/datapic/11.jpg",like:{islike:0,likeNum:11,dislikeNum:11},commentnum:10,sharenum:10},{userHead:"../../static/demo/userpic/12.jpg",userName:"昵称",isFocus:!1,comment:"我是标题",mediaType:"true",media:"../../static/demo/datapic/11.jpg",like:{islike:1,likeNum:11,dislikeNum:11},commentnum:10,sharenum:10}]},{loadState:0,list:[{userHead:"../../static/demo/userpic/12.jpg",userName:"昵称",isFocus:!1,comment:"我是标题",mediaType:"true",media:"../../static/demo/datapic/11.jpg",like:{islike:0,likeNum:11,dislikeNum:11},commentnum:10,sharenum:10},{userHead:"../../static/demo/userpic/13.jpg",userName:"昵dd称",isFocus:!1,comment:"我fdsfds",mediaType:"true",media:"../../static/demo/datapic/5.jpg",like:{islike:2,likeNum:11,dislikeNum:11},commentnum:102,sharenum:10},{userHead:"../../static/demo/userpic/14.jpg",userName:"昵称",isFocus:!1,comment:"我是标题",mediaType:"true",media:"../../static/demo/datapic/14.jpg",like:{islike:0,likeNum:11,dislikeNum:11},commentnum:10,sharenum:10},{userHead:"../../static/demo/userpic/15.jpg",userName:"昵称",isFocus:!1,comment:"我是标题",mediaType:"true",media:"../../static/demo/datapic/15.jpg",like:{islike:1,likeNum:11,dislikeNum:11},commentnum:10,sharenum:10}]},{loadState:1,list:[]},{loadState:1,list:[]},{loadState:1,list:[]}]}},onLoad:function(){var i=this;e.getSystemInfo({success:function(t){var a=t.windowHeight-e.upx2px(100);i.swiperheight=a}})},onNavigationBarSearchInputClicked:function(){e.navigateTo({url:"../search/search",success:function(e){},fail:function(){},complete:function(){}})},methods:{loadMore:function(e){var i=this;0==this.newslist[e].loadState&&(this.newslist[e].loadState=2,setTimeout(function(){var t="../../static/demo/userpic/"+i.i+".jpg",a="../../static/demo/datapic/"+i.i+++".jpg",s={userHead:"",userName:"昵称",isFocus:!0,comment:"我是标题",mediaType:"true",media:"",like:{islike:0,likeNum:11,dislikeNum:11},commentnum:10,sharenum:10};s.userHead=t,s.media=a,i.newslist[e].list.push(s),i.newslist[e].loadState=0},300))},tabtap:function(e){this.tabIndex=e},tabChange:function(e){this.tabIndex=e.detail.current}}};i.default=u}).call(this,t("6e42")["default"])}},[["6df5","common/runtime","common/vendor"]]]);