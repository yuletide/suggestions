!function(){function t(e,i,n){function s(o,a){if(!i[o]){if(!e[o]){var h="function"==typeof require&&require;if(!a&&h)return h(o,!0);if(r)return r(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[o]={exports:{}};e[o][0].call(c.exports,function(t){var i=e[o][1][t];return s(i||t)},c,c.exports,t,e,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}return t}()({1:[function(t,e,i){"use strict";var n=t("./src/suggestions");window.Suggestions=e.exports=n},{"./src/suggestions":5}],2:[function(t,e,i){!function(){var t=this,n={};void 0!==i?e.exports=n:t.fuzzy=n,n.simpleFilter=function(t,e){return e.filter(function(e){return n.test(t,e)})},n.test=function(t,e){return null!==n.match(t,e)},n.match=function(t,e,i){i=i||{};var n,s=0,r=[],o=e.length,a=0,h=0,l=i.pre||"",c=i.post||"",u=i.caseSensitive&&e||e.toLowerCase();t=i.caseSensitive&&t||t.toLowerCase();for(var d=0;d<o;d++)n=e[d],u[d]===t[s]?(n=l+n+c,s+=1,h+=1+h):h=0,a+=h,r[r.length]=n;return s===t.length?(a=u===t?1/0:a,{rendered:r.join(""),score:a}):null},n.filter=function(t,e,i){return e&&0!==e.length?"string"!=typeof t?e:(i=i||{},e.reduce(function(e,s,r,o){var a=s;i.extract&&(a=i.extract(s));var h=n.match(t,a,i);return null!=h&&(e[e.length]={string:h.rendered,score:h.score,index:r,original:s}),e},[]).sort(function(t,e){var i=e.score-t.score;return i||t.index-e.index})):[]}}()},{}],3:[function(t,e,i){function n(){for(var t={},e=0;e<arguments.length;e++){var i=arguments[e];for(var n in i)s.call(i,n)&&(t[n]=i[n])}return t}e.exports=n;var s=Object.prototype.hasOwnProperty},{}],4:[function(t,e,i){"Use strict";var n=function(t){return this.component=t,this.items=[],this.active=0,this.element=document.createElement("ul"),this.element.className="suggestions",this.selectingListItem=!1,t.el.parentNode.insertBefore(this.element,t.el.nextSibling),this};n.prototype.show=function(){this.element.style.display="block"},n.prototype.hide=function(){this.element.style.display="none"},n.prototype.add=function(t){this.items.push(t)},n.prototype.clear=function(){this.items=[],this.active=0},n.prototype.isEmpty=function(){return!this.items.length},n.prototype.draw=function(){if(this.element.innerHTML="",0===this.items.length)return void this.hide();for(var t=0;t<this.items.length;t++)this.drawItem(this.items[t],this.active===t);this.show()},n.prototype.drawItem=function(t,e){var i=document.createElement("li"),n=document.createElement("a");e&&(i.className+=" active"),t.original.properties.classes&&(i.className+=" "+t.original.properties.classes.join(" "));var s=document.createElement("img");t.original.icon?(t.original.icon.category&&(i.className+=" category"),s.src=t.original.icon.path):t.original.context&&(s.src='data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 21 21" height="21" width="21"><title>marker-stroked-15.svg</title><rect fill="none" x="0" y="0" width="21" height="21"></rect><path fill="#2751DF" transform="translate(3 3)" d="M7.5,14.941l-.4-.495c-.973-1.189-4.9-6.556-4.9-9.16A5.066,5.066,0,0,1,7.036,0q.222-.01.445,0a5.066,5.066,0,0,1,5.286,4.836q.01.225,0,.45c0,2.213-2.669,6.111-4.678,8.851ZM7.481.986a4.077,4.077,0,0,0-4.3,4.3c0,1.832,2.759,6.038,4.286,8.034,1.25-1.71,4.315-5.989,4.315-8.034a4.077,4.077,0,0,0-4.3-4.3Z" stroke="#315ee3" stroke-width="2" style="stroke-linejoin: round; stroke-miterlimit: 4;"></path><path fill="#2751DF" transform="translate(3 3)" d="M7.5,14.941l-.4-.495c-.973-1.189-4.9-6.556-4.9-9.16A5.066,5.066,0,0,1,7.036,0q.222-.01.445,0a5.066,5.066,0,0,1,5.286,4.836q.01.225,0,.45c0,2.213-2.669,6.111-4.678,8.851ZM7.481.986a4.077,4.077,0,0,0-4.3,4.3c0,1.832,2.759,6.038,4.286,8.034,1.25-1.71,4.315-5.989,4.315-8.034a4.077,4.077,0,0,0-4.3-4.3Z"></path></svg>'),n.appendChild(s),n.innerHTML+=t.string,i.appendChild(n),this.element.appendChild(i),i.addEventListener("mousedown",function(){this.selectingListItem=!0}.bind(this)),i.addEventListener("mouseup",function(){this.handleMouseUp.call(this,t)}.bind(this))},n.prototype.handleMouseUp=function(t){this.selectingListItem=!1,this.component.value(t.original),this.clear(),this.draw()},n.prototype.move=function(t){this.active=t,this.draw()},n.prototype.previous=function(){this.move(0===this.active?this.items.length-1:this.active-1)},n.prototype.next=function(){this.move(this.active===this.items.length-1?0:this.active+1)},e.exports=n},{}],5:[function(t,e,i){"use strict";var n=t("xtend"),s=t("fuzzy"),r=t("./list"),o=function(t,e,i){return i=i||{},this.options=n({minLength:2,limit:5,filter:!0},i),this.el=t,this.data=e||[],this.list=new r(this),this.query="",this.selected=null,this.list.draw(),this.el.addEventListener("keyup",function(t){this.handleKeyUp(t.keyCode)}.bind(this),!1),this.el.addEventListener("keydown",function(t){this.handleKeyDown(t)}.bind(this)),this.el.addEventListener("focus",function(){this.handleFocus()}.bind(this)),this.el.addEventListener("blur",function(){this.handleBlur()}.bind(this)),this.el.addEventListener("paste",function(t){this.handlePaste(t)}.bind(this)),this};o.prototype.handleKeyUp=function(t){40!==t&&38!==t&&27!==t&&13!==t&&9!==t&&this.handleInputChange(this.el.value)},o.prototype.handleKeyDown=function(t){switch(t.keyCode){case 13:t.preventDefault(),this.list.isEmpty()||(this.value(this.list.items[this.list.active].original),this.list.hide());case 9:this.list.isEmpty()||(this.value(this.list.items[this.list.active].original),this.list.hide());break;case 27:this.list.isEmpty()||this.list.hide();break;case 38:this.list.previous();break;case 40:this.list.next()}},o.prototype.handleBlur=function(){this.list.selectingListItem||this.list.hide()},o.prototype.handlePaste=function(t){if(t.clipboardData)this.handleInputChange(t.clipboardData.getData("Text"));else{var e=this;setTimeout(function(){e.handleInputChange(t.target.value)},100)}},o.prototype.handleInputChange=function(t){if(this.query=this.normalize(t),this.list.clear(),this.query.length<this.options.minLength)return void this.list.draw();this.getCandidates(function(t){for(var e=0;e<t.length&&(this.list.add(t[e]),e!==this.options.limit-1);e++);this.list.draw()}.bind(this))},o.prototype.handleFocus=function(){this.list.isEmpty()||this.list.show(),this.list.selectingListItem=!1},o.prototype.update=function(t){this.data=t,this.handleKeyUp()},o.prototype.clear=function(){this.data=[],this.list.clear()},o.prototype.normalize=function(t){return t=t.toLowerCase()},o.prototype.match=function(t,e){return t.indexOf(e)>-1},o.prototype.value=function(t){if(this.selected=t,this.el.value=this.getItemValue(t),document.createEvent){var e=document.createEvent("HTMLEvents");e.initEvent("change",!0,!1),this.el.dispatchEvent(e)}else this.el.fireEvent("onchange")},o.prototype.getCandidates=function(t){var e={pre:"<strong>",post:"</strong>",extract:function(t){return this.getItemValue(t)}.bind(this)};t(this.options.filter?s.filter(this.query,this.data,e):this.data.map(function(t){for(var e=this.getItemValue(t),i=this.normalize(e),n=i.lastIndexOf(this.query);n>-1;){var s=n+this.query.length;e=e.slice(0,n)+"<strong>"+e.slice(n,s)+"</strong>"+e.slice(s),n=i.slice(0,n).lastIndexOf(this.query)}return{original:t,string:e}}.bind(this)))},o.prototype.getItemValue=function(t){return t},e.exports=o},{"./list":4,fuzzy:2,xtend:3}]},{},[1]);
