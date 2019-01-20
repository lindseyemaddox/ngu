/*!
 * Generated using the Bootstrap Customizer (https://getbootstrap.com/docs/3.4/customize/)
 */
/*!
 * Bootstrap v3.4.0 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(t){"use strict";var s=t.fn.jquery.split(" ")[0].split(".");if(s[0]<2&&s[1]<9||1==s[0]&&9==s[1]&&s[2]<1||3<s[0])throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),function(r){"use strict";
// SCROLLSPY CLASS DEFINITION
// ==========================
function o(t,s){this.$body=r(document.body),this.$scrollElement=r(t).is(document.body)?r(window):r(t),this.options=r.extend({},o.DEFAULTS,s),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",r.proxy(this.process,this)),this.refresh(),this.process()}
// SCROLLSPY PLUGIN DEFINITION
// ===========================
function s(i){return this.each(function(){var t=r(this),s=t.data("bs.scrollspy"),e="object"==typeof i&&i;s||t.data("bs.scrollspy",s=new o(this,e)),"string"==typeof i&&s[i]()})}o.VERSION="3.4.0",o.DEFAULTS={offset:10},o.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},o.prototype.refresh=function(){var t=this,i="offset",o=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),r.isWindow(this.$scrollElement[0])||(i="position",o=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var t=r(this),s=t.data("target")||t.attr("href"),e=/^#./.test(s)&&r(s);return e&&e.length&&e.is(":visible")&&[[e[i]().top+o,s]]||null}).sort(function(t,s){return t[0]-s[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},o.prototype.process=function(){var t=this.$scrollElement.scrollTop()+this.options.offset,s=this.getScrollHeight(),e=this.options.offset+s-this.$scrollElement.height(),i=this.offsets,o=this.targets,r=this.activeTarget,l;if(this.scrollHeight!=s&&this.refresh(),e<=t)return r!=(l=o[o.length-1])&&this.activate(l);if(r&&t<i[0])return this.activeTarget=null,this.clear();for(l=i.length;l--;)r!=o[l]&&t>=i[l]&&(void 0===i[l+1]||t<i[l+1])&&this.activate(o[l])},o.prototype.activate=function(t){this.activeTarget=t,this.clear();var s=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',e=r(s).parents("li").addClass("active");e.parent(".dropdown-menu").length&&(e=e.closest("li.dropdown").addClass("active")),e.trigger("activate.bs.scrollspy")},o.prototype.clear=function(){r(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var t=r.fn.scrollspy;r.fn.scrollspy=s,r.fn.scrollspy.Constructor=o,
// SCROLLSPY NO CONFLICT
// =====================
r.fn.scrollspy.noConflict=function(){return r.fn.scrollspy=t,this}
// SCROLLSPY DATA-API
// ==================
,r(window).on("load.bs.scrollspy.data-api",function(){r('[data-spy="scroll"]').each(function(){var t=r(this);s.call(t,t.data())})})}(jQuery);