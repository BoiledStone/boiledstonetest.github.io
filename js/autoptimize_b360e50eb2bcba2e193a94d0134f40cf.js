;(function(window,document){var version='3.7.2';var options=window.html5||{};var reSkip=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var saveClones=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;var supportsHtml5Styles;var expando='_html5shiv';var expanID=0;var expandoData={};var supportsUnknownElements;(function(){try{var a=document.createElement('a');a.innerHTML='<xyz></xyz>';supportsHtml5Styles=('hidden'in a);supportsUnknownElements=a.childNodes.length==1||(function(){(document.createElement)('a');var frag=document.createDocumentFragment();return(typeof frag.cloneNode=='undefined'||typeof frag.createDocumentFragment=='undefined'||typeof frag.createElement=='undefined');}());}catch(e){supportsHtml5Styles=true;supportsUnknownElements=true;}}());function addStyleSheet(ownerDocument,cssText){var p=ownerDocument.createElement('p'),parent=ownerDocument.getElementsByTagName('head')[0]||ownerDocument.documentElement;p.innerHTML='x<style>'+cssText+'</style>';return parent.insertBefore(p.lastChild,parent.firstChild);}
function getElements(){var elements=html5.elements;return typeof elements=='string'?elements.split(' '):elements;}
function addElements(newElements,ownerDocument){var elements=html5.elements;if(typeof elements!='string'){elements=elements.join(' ');}
if(typeof newElements!='string'){newElements=newElements.join(' ');}
html5.elements=elements+' '+newElements;shivDocument(ownerDocument);}
function getExpandoData(ownerDocument){var data=expandoData[ownerDocument[expando]];if(!data){data={};expanID++;ownerDocument[expando]=expanID;expandoData[expanID]=data;}
return data;}
function createElement(nodeName,ownerDocument,data){if(!ownerDocument){ownerDocument=document;}
if(supportsUnknownElements){return ownerDocument.createElement(nodeName);}
if(!data){data=getExpandoData(ownerDocument);}
var node;if(data.cache[nodeName]){node=data.cache[nodeName].cloneNode();}else if(saveClones.test(nodeName)){node=(data.cache[nodeName]=data.createElem(nodeName)).cloneNode();}else{node=data.createElem(nodeName);}
return node.canHaveChildren&&!reSkip.test(nodeName)&&!node.tagUrn?data.frag.appendChild(node):node;}
function createDocumentFragment(ownerDocument,data){if(!ownerDocument){ownerDocument=document;}
if(supportsUnknownElements){return ownerDocument.createDocumentFragment();}
data=data||getExpandoData(ownerDocument);var clone=data.frag.cloneNode(),i=0,elems=getElements(),l=elems.length;for(;i<l;i++){clone.createElement(elems[i]);}
return clone;}
function shivMethods(ownerDocument,data){if(!data.cache){data.cache={};data.createElem=ownerDocument.createElement;data.createFrag=ownerDocument.createDocumentFragment;data.frag=data.createFrag();}
ownerDocument.createElement=function(nodeName){if(!html5.shivMethods){return data.createElem(nodeName);}
return createElement(nodeName,ownerDocument,data);};ownerDocument.createDocumentFragment=Function('h,f','return function(){'+'var n=f.cloneNode(),c=n.createElement;'+'h.shivMethods&&('+
getElements().join().replace(/[\w\-:]+/g,function(nodeName){data.createElem(nodeName);data.frag.createElement(nodeName);return'c("'+nodeName+'")';})+');return n}')(html5,data.frag);}
function shivDocument(ownerDocument){if(!ownerDocument){ownerDocument=document;}
var data=getExpandoData(ownerDocument);if(html5.shivCSS&&!supportsHtml5Styles&&!data.hasCSS){data.hasCSS=!!addStyleSheet(ownerDocument,'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}'+'mark{background:#FF0;color:#000}'+'template{display:none}');}
if(!supportsUnknownElements){shivMethods(ownerDocument,data);}
return ownerDocument;}
var html5={'elements':options.elements||'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video','version':version,'shivCSS':(options.shivCSS!==false),'supportsUnknownElements':supportsUnknownElements,'shivMethods':(options.shivMethods!==false),'type':'default','shivDocument':shivDocument,createElement:createElement,createDocumentFragment:createDocumentFragment,addElements:addElements};window.html5=html5;shivDocument(document);}(this,document));
(function(w){"use strict";var respond={};w.respond=respond;respond.update=function(){};var requestQueue=[],xmlHttp=(function(){var xmlhttpmethod=false;try{xmlhttpmethod=new w.XMLHttpRequest();}
catch(e){xmlhttpmethod=new w.ActiveXObject("Microsoft.XMLHTTP");}
return function(){return xmlhttpmethod;};})(),ajax=function(url,callback){var req=xmlHttp();if(!req){return;}
req.open("GET",url,true);req.onreadystatechange=function(){if(req.readyState!==4||req.status!==200&&req.status!==304){return;}
callback(req.responseText);};if(req.readyState===4){return;}
req.send(null);},isUnsupportedMediaQuery=function(query){return query.replace(respond.regex.minmaxwh,'').match(respond.regex.other);};respond.ajax=ajax;respond.queue=requestQueue;respond.unsupportedmq=isUnsupportedMediaQuery;respond.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,comments:/\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,maxw:/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,minmaxwh:/\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,other:/\([^\)]*\)/g};respond.mediaQueriesSupported=w.matchMedia&&w.matchMedia("only all")!==null&&w.matchMedia("only all").matches;if(respond.mediaQueriesSupported){return;}
var doc=w.document,docElem=doc.documentElement,mediastyles=[],rules=[],appendedEls=[],parsedSheets={},resizeThrottle=30,head=doc.getElementsByTagName("head")[0]||docElem,base=doc.getElementsByTagName("base")[0],links=head.getElementsByTagName("link"),lastCall,resizeDefer,eminpx,getEmValue=function(){var ret,div=doc.createElement('div'),body=doc.body,originalHTMLFontSize=docElem.style.fontSize,originalBodyFontSize=body&&body.style.fontSize,fakeUsed=false;div.style.cssText="position:absolute;font-size:1em;width:1em";if(!body){body=fakeUsed=doc.createElement("body");body.style.background="none";}
docElem.style.fontSize="100%";body.style.fontSize="100%";body.appendChild(div);if(fakeUsed){docElem.insertBefore(body,docElem.firstChild);}
ret=div.offsetWidth;if(fakeUsed){docElem.removeChild(body);}
else{body.removeChild(div);}
docElem.style.fontSize=originalHTMLFontSize;if(originalBodyFontSize){body.style.fontSize=originalBodyFontSize;}
ret=eminpx=parseFloat(ret);return ret;},applyMedia=function(fromResize){var name="clientWidth",docElemProp=docElem[name],currWidth=doc.compatMode==="CSS1Compat"&&docElemProp||doc.body[name]||docElemProp,styleBlocks={},lastLink=links[links.length-1],now=(new Date()).getTime();if(fromResize&&lastCall&&now-lastCall<resizeThrottle){w.clearTimeout(resizeDefer);resizeDefer=w.setTimeout(applyMedia,resizeThrottle);return;}
else{lastCall=now;}
for(var i in mediastyles){if(mediastyles.hasOwnProperty(i)){var thisstyle=mediastyles[i],min=thisstyle.minw,max=thisstyle.maxw,minnull=min===null,maxnull=max===null,em="em";if(!!min){min=parseFloat(min)*(min.indexOf(em)>-1?(eminpx||getEmValue()):1);}
if(!!max){max=parseFloat(max)*(max.indexOf(em)>-1?(eminpx||getEmValue()):1);}
if(!thisstyle.hasquery||(!minnull||!maxnull)&&(minnull||currWidth>=min)&&(maxnull||currWidth<=max)){if(!styleBlocks[thisstyle.media]){styleBlocks[thisstyle.media]=[];}
styleBlocks[thisstyle.media].push(rules[thisstyle.rules]);}}}
for(var j in appendedEls){if(appendedEls.hasOwnProperty(j)){if(appendedEls[j]&&appendedEls[j].parentNode===head){head.removeChild(appendedEls[j]);}}}
appendedEls.length=0;for(var k in styleBlocks){if(styleBlocks.hasOwnProperty(k)){var ss=doc.createElement("style"),css=styleBlocks[k].join("\n");ss.type="text/css";ss.media=k;head.insertBefore(ss,lastLink.nextSibling);if(ss.styleSheet){ss.styleSheet.cssText=css;}
else{ss.appendChild(doc.createTextNode(css));}
appendedEls.push(ss);}}},translate=function(styles,href,media){var qs=styles.replace(respond.regex.comments,'').replace(respond.regex.keyframes,'').match(respond.regex.media),ql=qs&&qs.length||0;href=href.substring(0,href.lastIndexOf("/"));var repUrls=function(css){return css.replace(respond.regex.urls,"$1"+href+"$2$3");},useMedia=!ql&&media;if(href.length){href+="/";}
if(useMedia){ql=1;}
for(var i=0;i<ql;i++){var fullq,thisq,eachq,eql;if(useMedia){fullq=media;rules.push(repUrls(styles));}
else{fullq=qs[i].match(respond.regex.findStyles)&&RegExp.$1;rules.push(RegExp.$2&&repUrls(RegExp.$2));}
eachq=fullq.split(",");eql=eachq.length;for(var j=0;j<eql;j++){thisq=eachq[j];if(isUnsupportedMediaQuery(thisq)){continue;}
mediastyles.push({media:thisq.split("(")[0].match(respond.regex.only)&&RegExp.$2||"all",rules:rules.length-1,hasquery:thisq.indexOf("(")>-1,minw:thisq.match(respond.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:thisq.match(respond.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||"")});}}
applyMedia();},makeRequests=function(){if(requestQueue.length){var thisRequest=requestQueue.shift();ajax(thisRequest.href,function(styles){translate(styles,thisRequest.href,thisRequest.media);parsedSheets[thisRequest.href]=true;w.setTimeout(function(){makeRequests();},0);});}},ripCSS=function(){for(var i=0;i<links.length;i++){var sheet=links[i],href=sheet.href,media=sheet.media,isCSS=sheet.rel&&sheet.rel.toLowerCase()==="stylesheet";if(!!href&&isCSS&&!parsedSheets[href]){if(sheet.styleSheet&&sheet.styleSheet.rawCssText){translate(sheet.styleSheet.rawCssText,href,media);parsedSheets[href]=true;}else{if((!/^([a-zA-Z:]*\/\/)/.test(href)&&!base)||href.replace(RegExp.$1,"").split("/")[0]===w.location.host){if(href.substring(0,2)==="//"){href=w.location.protocol+href;}
requestQueue.push({href:href,media:media});}}}}
makeRequests();};ripCSS();respond.update=ripCSS;respond.getEmValue=getEmValue;function callMedia(){applyMedia(true);}
if(w.addEventListener){w.addEventListener("resize",callMedia,false);}
else if(w.attachEvent){w.attachEvent("onresize",callMedia);}})(this);
/*! This file is auto-generated */
window.addComment=function(v){var I,C,h,E=v.document,b={commentReplyClass:"comment-reply-link",commentReplyTitleId:"reply-title",cancelReplyId:"cancel-comment-reply-link",commentFormId:"commentform",temporaryFormId:"wp-temp-form-div",parentIdFieldId:"comment_parent",postIdFieldId:"comment_post_ID"},e=v.MutationObserver||v.WebKitMutationObserver||v.MozMutationObserver,r="querySelector"in E&&"addEventListener"in v,n=!!E.documentElement.dataset;function t(){d(),e&&new e(o).observe(E.body,{childList:!0,subtree:!0})}function d(e){if(r&&(I=g(b.cancelReplyId),C=g(b.commentFormId),I)){I.addEventListener("touchstart",l),I.addEventListener("click",l);function t(e){if((e.metaKey||e.ctrlKey)&&13===e.keyCode&&"a"!==E.activeElement.tagName.toLowerCase())return C.removeEventListener("keydown",t),e.preventDefault(),C.submit.click(),!1}C&&C.addEventListener("keydown",t);for(var n,d=function(e){var t=b.commentReplyClass;e&&e.childNodes||(e=E);e=E.getElementsByClassName?e.getElementsByClassName(t):e.querySelectorAll("."+t);return e}(e),o=0,i=d.length;o<i;o++)(n=d[o]).addEventListener("touchstart",a),n.addEventListener("click",a)}}function l(e){var t,n,d=g(b.temporaryFormId);d&&h&&(g(b.parentIdFieldId).value="0",t=d.textContent,d.parentNode.replaceChild(h,d),this.style.display="none",n=(d=(d=g(b.commentReplyTitleId))&&d.firstChild)&&d.nextSibling,d&&d.nodeType===Node.TEXT_NODE&&t&&(n&&"A"===n.nodeName&&n.id!==b.cancelReplyId&&(n.style.display=""),d.textContent=t),e.preventDefault())}function a(e){var t=g(b.commentReplyTitleId),t=t&&t.firstChild.textContent,n=this,d=m(n,"belowelement"),o=m(n,"commentid"),i=m(n,"respondelement"),r=m(n,"postid"),n=m(n,"replyto")||t;d&&o&&i&&r&&!1===v.addComment.moveForm(d,o,i,r,n)&&e.preventDefault()}function o(e){for(var t=e.length;t--;)if(e[t].addedNodes.length)return void d()}function m(e,t){return n?e.dataset[t]:e.getAttribute("data-"+t)}function g(e){return E.getElementById(e)}return r&&"loading"!==E.readyState?t():r&&v.addEventListener("DOMContentLoaded",t,!1),{init:d,moveForm:function(e,t,n,d,o){var i,r,l,a,m,c,s,e=g(e),n=(h=g(n),g(b.parentIdFieldId)),y=g(b.postIdFieldId),p=g(b.commentReplyTitleId),u=(p=p&&p.firstChild)&&p.nextSibling;if(e&&h&&n){void 0===o&&(o=p&&p.textContent),a=h,m=b.temporaryFormId,c=g(m),s=(s=g(b.commentReplyTitleId))?s.firstChild.textContent:"",c||((c=E.createElement("div")).id=m,c.style.display="none",c.textContent=s,a.parentNode.insertBefore(c,a)),d&&y&&(y.value=d),n.value=t,I.style.display="",e.parentNode.insertBefore(h,e.nextSibling),p&&p.nodeType===Node.TEXT_NODE&&(u&&"A"===u.nodeName&&u.id!==b.cancelReplyId&&(u.style.display="none"),p.textContent=o),I.onclick=function(){return!1};try{for(var f=0;f<C.elements.length;f++)if(i=C.elements[f],r=!1,"getComputedStyle"in v?l=v.getComputedStyle(i):E.documentElement.currentStyle&&(l=i.currentStyle),(i.offsetWidth<=0&&i.offsetHeight<=0||"hidden"===l.visibility)&&(r=!0),"hidden"!==i.type&&!i.disabled&&!r){i.focus();break}}catch(e){}return!1}}}}(window);
(()=>{"use strict";var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};function i(t){if(this.formData={},this.tree={},!(t instanceof FormData))return this;this.formData=t;const e=()=>{const t=new Map;return t.largestIndex=0,t.set=function(e,i){""===e?e=t.largestIndex++:/^[0-9]+$/.test(e)&&(e=parseInt(e),t.largestIndex<=e&&(t.largestIndex=e+1)),Map.prototype.set.call(t,e,i)},t};this.tree=e();const i=/^(?<name>[a-z][-a-z0-9_:]*)(?<array>(?:\[(?:[a-z][-a-z0-9_:]*|[0-9]*)\])*)/i;for(const[t,s]of this.formData){const o=t.match(i);if(o)if(""===o.groups.array)this.tree.set(o.groups.name,s);else{const t=[...o.groups.array.matchAll(/\[([a-z][-a-z0-9_:]*|[0-9]*)\]/gi)].map((([t,e])=>e));t.unshift(o.groups.name);const i=t.pop();t.reduce(((t,i)=>{if(/^[0-9]+$/.test(i)&&(i=parseInt(i)),t.get(i)instanceof Map)return t.get(i);const s=e();return t.set(i,s),s}),this.tree).set(i,s)}}}t.r(e),t.d(e,{all:()=>D,any:()=>M,date:()=>m,dayofweek:()=>u,email:()=>r,enum:()=>h,file:()=>d,maxdate:()=>z,maxfilesize:()=>j,maxitems:()=>v,maxlength:()=>x,maxnumber:()=>y,mindate:()=>A,minfilesize:()=>$,minitems:()=>w,minlength:()=>g,minnumber:()=>b,number:()=>c,required:()=>n,requiredfile:()=>a,stepnumber:()=>I,tel:()=>l,time:()=>f,url:()=>p}),i.prototype.entries=function(){return this.tree.entries()},i.prototype.get=function(t){return this.tree.get(t)},i.prototype.getAll=function(t){if(!this.has(t))return[];const e=t=>{const i=[];if(t instanceof Map)for(const[s,o]of t)i.push(...e(o));else""!==t&&i.push(t);return i};return e(this.get(t))},i.prototype.has=function(t){return this.tree.has(t)},i.prototype.keys=function(){return this.tree.keys()},i.prototype.values=function(){return this.tree.values()};const s=i;function o({rule:t,field:e,error:i,...s}){this.rule=t,this.field=e,this.error=i,this.properties=s}const n=function(t){if(0===t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).length)throw new o(this)},a=function(t){if(0===t.getAll(this.field).length)throw new o(this)},r=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>{if(t.length<6)return!1;if(-1===t.indexOf("@",1))return!1;if(t.indexOf("@")!==t.lastIndexOf("@"))return!1;const[e,i]=t.split("@",2);if(!/^[a-zA-Z0-9!#$%&\'*+\/=?^_`{|}~\.-]+$/.test(e))return!1;if(/\.{2,}/.test(i))return!1;if(/(?:^[ \t\n\r\0\x0B.]|[ \t\n\r\0\x0B.]$)/.test(i))return!1;const s=i.split(".");if(s.length<2)return!1;for(const t of s){if(/(?:^[ \t\n\r\0\x0B-]|[ \t\n\r\0\x0B-]$)/.test(t))return!1;if(!/^[a-z0-9-]+$/i.test(t))return!1}return!0})))throw new o(this)},p=function(t){const e=t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t));if(!e.every((t=>{try{return(t=>-1!==["http","https","ftp","ftps","mailto","news","irc","irc6","ircs","gopher","nntp","feed","telnet","mms","rtsp","sms","svn","tel","fax","xmpp","webcal","urn"].indexOf(t))(new URL(t).protocol.replace(/:$/,""))}catch{return!1}})))throw new o(this)},l=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>(((t=(t=t.replace(/[#*].*$/,"")).replaceAll(/[()/.*#\s-]+/g,"")).startsWith("+")||t.startsWith("00"))&&(t=`+${t.replace(/^[+0]+/,"")}`),!!/^[+]?[0-9]+$/.test(t)&&5<t.length&&t.length<16))))throw new o(this)},c=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>!!/^[-]?[0-9]+(?:[eE][+-]?[0-9]+)?$/.test(t)||!!/^[-]?(?:[0-9]+)?[.][0-9]+(?:[eE][+-]?[0-9]+)?$/.test(t))))throw new o(this)},m=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>{if(!/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t))return!1;const e=new Date(t);return!Number.isNaN(e.valueOf())})))throw new o(this)},f=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>{const e=t.match(/^([0-9]{2})\:([0-9]{2})(?:\:([0-9]{2}))?$/);if(!e)return!1;const i=parseInt(e[1]),s=parseInt(e[2]),o=e[3]?parseInt(e[3]):0;return 0<=i&&i<=23&&0<=s&&s<=59&&0<=o&&o<=59})))throw new o(this)},d=function(t){if(!t.getAll(this.field).every((t=>t instanceof File&&this.accept?.some((e=>/^\.[a-z0-9]+$/i.test(e)?t.name.toLowerCase().endsWith(e.toLowerCase()):(t=>{const e=[],i=t.match(/^(?<toplevel>[a-z]+)\/(?<sub>[*]|[a-z0-9.+-]+)$/i);if(i){const t=i.groups.toplevel.toLowerCase(),s=i.groups.sub.toLowerCase();for(const[o,n]of(()=>{const t=new Map;return t.set("jpg|jpeg|jpe","image/jpeg"),t.set("gif","image/gif"),t.set("png","image/png"),t.set("bmp","image/bmp"),t.set("tiff|tif","image/tiff"),t.set("webp","image/webp"),t.set("ico","image/x-icon"),t.set("heic","image/heic"),t.set("asf|asx","video/x-ms-asf"),t.set("wmv","video/x-ms-wmv"),t.set("wmx","video/x-ms-wmx"),t.set("wm","video/x-ms-wm"),t.set("avi","video/avi"),t.set("divx","video/divx"),t.set("flv","video/x-flv"),t.set("mov|qt","video/quicktime"),t.set("mpeg|mpg|mpe","video/mpeg"),t.set("mp4|m4v","video/mp4"),t.set("ogv","video/ogg"),t.set("webm","video/webm"),t.set("mkv","video/x-matroska"),t.set("3gp|3gpp","video/3gpp"),t.set("3g2|3gp2","video/3gpp2"),t.set("txt|asc|c|cc|h|srt","text/plain"),t.set("csv","text/csv"),t.set("tsv","text/tab-separated-values"),t.set("ics","text/calendar"),t.set("rtx","text/richtext"),t.set("css","text/css"),t.set("htm|html","text/html"),t.set("vtt","text/vtt"),t.set("dfxp","application/ttaf+xml"),t.set("mp3|m4a|m4b","audio/mpeg"),t.set("aac","audio/aac"),t.set("ra|ram","audio/x-realaudio"),t.set("wav","audio/wav"),t.set("ogg|oga","audio/ogg"),t.set("flac","audio/flac"),t.set("mid|midi","audio/midi"),t.set("wma","audio/x-ms-wma"),t.set("wax","audio/x-ms-wax"),t.set("mka","audio/x-matroska"),t.set("rtf","application/rtf"),t.set("js","application/javascript"),t.set("pdf","application/pdf"),t.set("swf","application/x-shockwave-flash"),t.set("class","application/java"),t.set("tar","application/x-tar"),t.set("zip","application/zip"),t.set("gz|gzip","application/x-gzip"),t.set("rar","application/rar"),t.set("7z","application/x-7z-compressed"),t.set("exe","application/x-msdownload"),t.set("psd","application/octet-stream"),t.set("xcf","application/octet-stream"),t.set("doc","application/msword"),t.set("pot|pps|ppt","application/vnd.ms-powerpoint"),t.set("wri","application/vnd.ms-write"),t.set("xla|xls|xlt|xlw","application/vnd.ms-excel"),t.set("mdb","application/vnd.ms-access"),t.set("mpp","application/vnd.ms-project"),t.set("docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"),t.set("docm","application/vnd.ms-word.document.macroEnabled.12"),t.set("dotx","application/vnd.openxmlformats-officedocument.wordprocessingml.template"),t.set("dotm","application/vnd.ms-word.template.macroEnabled.12"),t.set("xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),t.set("xlsm","application/vnd.ms-excel.sheet.macroEnabled.12"),t.set("xlsb","application/vnd.ms-excel.sheet.binary.macroEnabled.12"),t.set("xltx","application/vnd.openxmlformats-officedocument.spreadsheetml.template"),t.set("xltm","application/vnd.ms-excel.template.macroEnabled.12"),t.set("xlam","application/vnd.ms-excel.addin.macroEnabled.12"),t.set("pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"),t.set("pptm","application/vnd.ms-powerpoint.presentation.macroEnabled.12"),t.set("ppsx","application/vnd.openxmlformats-officedocument.presentationml.slideshow"),t.set("ppsm","application/vnd.ms-powerpoint.slideshow.macroEnabled.12"),t.set("potx","application/vnd.openxmlformats-officedocument.presentationml.template"),t.set("potm","application/vnd.ms-powerpoint.template.macroEnabled.12"),t.set("ppam","application/vnd.ms-powerpoint.addin.macroEnabled.12"),t.set("sldx","application/vnd.openxmlformats-officedocument.presentationml.slide"),t.set("sldm","application/vnd.ms-powerpoint.slide.macroEnabled.12"),t.set("onetoc|onetoc2|onetmp|onepkg","application/onenote"),t.set("oxps","application/oxps"),t.set("xps","application/vnd.ms-xpsdocument"),t.set("odt","application/vnd.oasis.opendocument.text"),t.set("odp","application/vnd.oasis.opendocument.presentation"),t.set("ods","application/vnd.oasis.opendocument.spreadsheet"),t.set("odg","application/vnd.oasis.opendocument.graphics"),t.set("odc","application/vnd.oasis.opendocument.chart"),t.set("odb","application/vnd.oasis.opendocument.database"),t.set("odf","application/vnd.oasis.opendocument.formula"),t.set("wp|wpd","application/wordperfect"),t.set("key","application/vnd.apple.keynote"),t.set("numbers","application/vnd.apple.numbers"),t.set("pages","application/vnd.apple.pages"),t})())("*"===s&&n.startsWith(t+"/")||n===i[0])&&e.push(...o.split("|"))}return e})(e).some((e=>(e="."+e.trim(),t.name.toLowerCase().endsWith(e.toLowerCase())))))))))throw new o(this)},h=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>this.accept?.some((e=>t===String(e))))))throw new o(this)},u=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>{const e=0===(i=new Date(t).getDay())?7:i;var i;return this.accept?.some((t=>e===parseInt(t)))})))throw new o(this)},w=function(t){if(t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).length<parseInt(this.threshold))throw new o(this)},v=function(t){const e=t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t));if(parseInt(this.threshold)<e.length)throw new o(this)},g=function(t){const e=t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t));let i=0;if(e.forEach((t=>{"string"==typeof t&&(i+=t.length)})),0!==i&&i<parseInt(this.threshold))throw new o(this)},x=function(t){const e=t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t));let i=0;if(e.forEach((t=>{"string"==typeof t&&(i+=t.length)})),parseInt(this.threshold)<i)throw new o(this)},b=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>!(parseFloat(t)<parseFloat(this.threshold)))))throw new o(this)},y=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>!(parseFloat(this.threshold)<parseFloat(t)))))throw new o(this)},A=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>!(/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t)&&/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(this.threshold)&&t<this.threshold))))throw new o(this)},z=function(t){if(!t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)).every((t=>!(/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(t)&&/^[0-9]{4,}-[0-9]{2}-[0-9]{2}$/.test(this.threshold)&&this.threshold<t))))throw new o(this)},$=function(t){const e=t.getAll(this.field);let i=0;if(e.forEach((t=>{t instanceof File&&(i+=t.size)})),i<parseInt(this.threshold))throw new o(this)},j=function(t){const e=t.getAll(this.field);let i=0;if(e.forEach((t=>{t instanceof File&&(i+=t.size)})),parseInt(this.threshold)<i)throw new o(this)},I=function(t){const e=t.getAll(this.field).map((t=>t.trim())).filter((t=>""!==t)),i=parseFloat(this.base),s=parseFloat(this.interval);if(!(0<s))return!0;if(!e.every((t=>{const e=(parseFloat(t)-i)%s;return"0.000000"===Math.abs(e).toFixed(6)||"0.000000"===Math.abs(e-s).toFixed(6)})))throw new o(this)},O=({ruleObj:t,options:i})=>{const{rule:s,...o}=t;return"function"==typeof e[s]&&("function"!=typeof e[s].matches||e[s].matches(o,i))},E=({ruleObj:t,formDataTree:i,options:s})=>{const{rule:o}=t;e[o].call(t,i,s)},k=[],F=t=>[...k].reduce(((t,e)=>i=>e(i,t)),t),D=function(t,e={}){const i=(this.rules??[]).filter((t=>O({ruleObj:t,options:e}))),s=F(E);if(!i.every((i=>{try{s({ruleObj:i,formDataTree:t,options:e})}catch(t){if(!(t instanceof o))throw t;if(void 0!==t.error)throw t;return!1}return!0})))throw new o(this)},M=function(t,e={}){const i=(this.rules??[]).filter((t=>O({ruleObj:t,options:e}))),s=F(E);if(!i.some((i=>{try{s({ruleObj:i,formDataTree:t,options:e})}catch(t){if(!(t instanceof o))throw t;return!1}return!0})))throw new o(this)};var L;window.swv={validators:e,validate:(t,e,i={})=>{const n=(t.rules??[]).filter((t=>O({ruleObj:t,options:i})));if(!n.length)return new Map;const a=F(E),r=new s(e),p=n.reduce(((t,e)=>{try{a({ruleObj:e,formDataTree:r,options:i})}catch(e){if(!(e instanceof o))throw e;if(void 0!==e.field&&!t.has(e.field)&&void 0!==e.error)return t.set(e.field,e)}return t}),new Map);for(const t of r.keys())p.has(t)||p.set(t,{validInputs:r.getAll(t)});return p},use:t=>{k.push(t)},...null!==(L=window.swv)&&void 0!==L?L:{}}})();
(()=>{"use strict";const e=window.wp.i18n,t=e=>Math.abs(parseInt(e,10)),a=(e,t,a)=>{const n=new CustomEvent(`wpcf7${t}`,{bubbles:!0,detail:a});"string"==typeof e&&(e=document.querySelector(e)),e.dispatchEvent(n)},n=(e,t)=>{const n=new Map([["init","init"],["validation_failed","invalid"],["acceptance_missing","unaccepted"],["spam","spam"],["aborted","aborted"],["mail_sent","sent"],["mail_failed","failed"],["submitting","submitting"],["resetting","resetting"],["validating","validating"],["payment_required","payment-required"]]);n.has(t)&&(t=n.get(t)),Array.from(n.values()).includes(t)||(t=`custom-${t=(t=t.replace(/[^0-9a-z]+/i," ").trim()).replace(/\s+/,"-")}`);const r=e.getAttribute("data-status");if(e.wpcf7.status=t,e.setAttribute("data-status",t),e.classList.add(t),r&&r!==t){e.classList.remove(r);const t={contactFormId:e.wpcf7.id,pluginVersion:e.wpcf7.pluginVersion,contactFormLocale:e.wpcf7.locale,unitTag:e.wpcf7.unitTag,containerPostId:e.wpcf7.containerPost,status:e.wpcf7.status,prevStatus:r};a(e,"statuschanged",t)}return t},r=e=>{const{root:t,namespace:a="contact-form-7/v1"}=wpcf7.api;return c.reduceRight(((e,t)=>a=>t(a,e)),(e=>{let n,r,{url:c,path:o,endpoint:s,headers:i,body:l,data:p,...d}=e;"string"==typeof s&&(n=a.replace(/^\/|\/$/g,""),r=s.replace(/^\//,""),o=r?n+"/"+r:n),"string"==typeof o&&(-1!==t.indexOf("?")&&(o=o.replace("?","&")),o=o.replace(/^\//,""),c=t+o),i={Accept:"application/json, */*;q=0.1",...i},delete i["X-WP-Nonce"],p&&(l=JSON.stringify(p),i["Content-Type"]="application/json");const f={code:"fetch_error",message:"You are probably offline."},u={code:"invalid_json",message:"The response is not a valid JSON response."};return window.fetch(c||o||window.location.href,{...d,headers:i,body:l}).then((e=>Promise.resolve(e).then((e=>{if(e.status>=200&&e.status<300)return e;throw e})).then((e=>{if(204===e.status)return null;if(e&&e.json)return e.json().catch((()=>{throw u}));throw u}))),(()=>{throw f}))}))(e)},c=[];function o(e,t={}){const{target:a,scope:r=e,...c}=t;if(void 0===e.wpcf7?.schema)return;const o={...e.wpcf7.schema};if(void 0!==a){if(!e.contains(a))return;if(!a.closest(".wpcf7-form-control-wrap[data-name]"))return;if(a.closest(".novalidate"))return}const p=r.querySelectorAll(".wpcf7-form-control-wrap"),d=Array.from(p).reduce(((e,t)=>(t.closest(".novalidate")||t.querySelectorAll(":where( input, textarea, select ):enabled").forEach((t=>{if(t.name)switch(t.type){case"button":case"image":case"reset":case"submit":break;case"checkbox":case"radio":t.checked&&e.append(t.name,t.value);break;case"select-multiple":for(const a of t.selectedOptions)e.append(t.name,a.value);break;case"file":for(const a of t.files)e.append(t.name,a);break;default:e.append(t.name,t.value)}})),e)),new FormData),f=e.getAttribute("data-status");Promise.resolve(n(e,"validating")).then((n=>{if(void 0!==swv){const n=swv.validate(o,d,t);for(const t of p){if(void 0===t.dataset.name)continue;const c=t.dataset.name;if(n.has(c)){const{error:t,validInputs:a}=n.get(c);i(e,c),void 0!==t&&s(e,c,t,{scope:r}),l(e,c,null!=a?a:[])}if(t.contains(a))break}}})).finally((()=>{n(e,f)}))}r.use=e=>{c.unshift(e)};const s=(e,t,a,n)=>{const{scope:r=e,...c}=null!=n?n:{},o=`${e.wpcf7?.unitTag}-ve-${t}`.replaceAll(/[^0-9a-z_-]+/gi,""),s=e.querySelector(`.wpcf7-form-control-wrap[data-name="${t}"] .wpcf7-form-control`);(()=>{const t=document.createElement("li");t.setAttribute("id",o),s&&s.id?t.insertAdjacentHTML("beforeend",`<a href="#${s.id}">${a}</a>`):t.insertAdjacentText("beforeend",a),e.wpcf7.parent.querySelector(".screen-reader-response ul").appendChild(t)})(),r.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${t}"]`).forEach((e=>{const t=document.createElement("span");t.classList.add("wpcf7-not-valid-tip"),t.setAttribute("aria-hidden","true"),t.insertAdjacentText("beforeend",a),e.appendChild(t),e.querySelectorAll("[aria-invalid]").forEach((e=>{e.setAttribute("aria-invalid","true")})),e.querySelectorAll(".wpcf7-form-control").forEach((e=>{e.classList.add("wpcf7-not-valid"),e.setAttribute("aria-describedby",o),"function"==typeof e.setCustomValidity&&e.setCustomValidity(a),e.closest(".use-floating-validation-tip")&&(e.addEventListener("focus",(e=>{t.setAttribute("style","display: none")})),t.addEventListener("click",(e=>{t.setAttribute("style","display: none")})))}))}))},i=(e,t)=>{const a=`${e.wpcf7?.unitTag}-ve-${t}`.replaceAll(/[^0-9a-z_-]+/gi,"");e.wpcf7.parent.querySelector(`.screen-reader-response ul li#${a}`)?.remove(),e.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${t}"]`).forEach((e=>{e.querySelector(".wpcf7-not-valid-tip")?.remove(),e.querySelectorAll("[aria-invalid]").forEach((e=>{e.setAttribute("aria-invalid","false")})),e.querySelectorAll(".wpcf7-form-control").forEach((e=>{e.removeAttribute("aria-describedby"),e.classList.remove("wpcf7-not-valid"),"function"==typeof e.setCustomValidity&&e.setCustomValidity("")}))}))},l=(e,t,a)=>{e.querySelectorAll(`[data-reflection-of="${t}"]`).forEach((e=>{if("output"===e.tagName.toLowerCase()){const t=e;0===a.length&&a.push(t.dataset.default),a.slice(0,1).forEach((e=>{e instanceof File&&(e=e.name),t.textContent=e}))}else e.querySelectorAll("output").forEach((e=>{e.hasAttribute("data-default")?0===a.length?e.removeAttribute("hidden"):e.setAttribute("hidden","hidden"):e.remove()})),a.forEach((a=>{a instanceof File&&(a=a.name);const n=document.createElement("output");n.setAttribute("name",t),n.textContent=a,e.appendChild(n)}))}))};function p(e,t={}){if(wpcf7.blocked)return d(e),void n(e,"submitting");const c=new FormData(e);t.submitter&&t.submitter.name&&c.append(t.submitter.name,t.submitter.value);const o={contactFormId:e.wpcf7.id,pluginVersion:e.wpcf7.pluginVersion,contactFormLocale:e.wpcf7.locale,unitTag:e.wpcf7.unitTag,containerPostId:e.wpcf7.containerPost,status:e.wpcf7.status,inputs:Array.from(c,(e=>{const t=e[0],a=e[1];return!t.match(/^_/)&&{name:t,value:a}})).filter((e=>!1!==e)),formData:c};r({endpoint:`contact-forms/${e.wpcf7.id}/feedback`,method:"POST",body:c,wpcf7:{endpoint:"feedback",form:e,detail:o}}).then((t=>{const r=n(e,t.status);return o.status=t.status,o.apiResponse=t,["invalid","unaccepted","spam","aborted"].includes(r)?a(e,r,o):["sent","failed"].includes(r)&&a(e,`mail${r}`,o),a(e,"submit",o),t})).then((t=>{t.posted_data_hash&&(e.querySelector('input[name="_wpcf7_posted_data_hash"]').value=t.posted_data_hash),"mail_sent"===t.status&&(e.reset(),e.wpcf7.resetOnMailSent=!0),t.invalid_fields&&t.invalid_fields.forEach((t=>{s(e,t.field,t.message)})),e.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').insertAdjacentText("beforeend",t.message),e.querySelectorAll(".wpcf7-response-output").forEach((e=>{e.innerText=t.message}))})).catch((e=>console.error(e)))}r.use(((e,t)=>{if(e.wpcf7&&"feedback"===e.wpcf7.endpoint){const{form:t,detail:r}=e.wpcf7;d(t),a(t,"beforesubmit",r),n(t,"submitting")}return t(e)}));const d=e=>{e.querySelectorAll(".wpcf7-form-control-wrap").forEach((t=>{t.dataset.name&&i(e,t.dataset.name)})),e.wpcf7.parent.querySelector('.screen-reader-response [role="status"]').innerText="",e.querySelectorAll(".wpcf7-response-output").forEach((e=>{e.innerText=""}))};function f(e){const t=new FormData(e),c={contactFormId:e.wpcf7.id,pluginVersion:e.wpcf7.pluginVersion,contactFormLocale:e.wpcf7.locale,unitTag:e.wpcf7.unitTag,containerPostId:e.wpcf7.containerPost,status:e.wpcf7.status,inputs:Array.from(t,(e=>{const t=e[0],a=e[1];return!t.match(/^_/)&&{name:t,value:a}})).filter((e=>!1!==e)),formData:t};r({endpoint:`contact-forms/${e.wpcf7.id}/refill`,method:"GET",wpcf7:{endpoint:"refill",form:e,detail:c}}).then((t=>{e.wpcf7.resetOnMailSent?(delete e.wpcf7.resetOnMailSent,n(e,"mail_sent")):n(e,"init"),c.apiResponse=t,a(e,"reset",c)})).catch((e=>console.error(e)))}r.use(((e,t)=>{if(e.wpcf7&&"refill"===e.wpcf7.endpoint){const{form:t,detail:a}=e.wpcf7;d(t),n(t,"resetting")}return t(e)}));const u=(e,t)=>{for(const a in t){const n=t[a];e.querySelectorAll(`input[name="${a}"]`).forEach((e=>{e.value=""})),e.querySelectorAll(`img.wpcf7-captcha-${a.replaceAll(":","")}`).forEach((e=>{e.setAttribute("src",n)}));const r=/([0-9]+)\.(png|gif|jpeg)$/.exec(n);r&&e.querySelectorAll(`input[name="_wpcf7_captcha_challenge_${a}"]`).forEach((e=>{e.value=r[1]}))}},m=(e,t)=>{for(const a in t){const n=t[a][0],r=t[a][1];e.querySelectorAll(`.wpcf7-form-control-wrap[data-name="${a}"]`).forEach((e=>{e.querySelector(`input[name="${a}"]`).value="",e.querySelector(".wpcf7-quiz-label").textContent=n,e.querySelector(`input[name="_wpcf7_quiz_answer_${a}"]`).value=r}))}};function w(e){const a=new FormData(e);e.wpcf7={id:t(a.get("_wpcf7")),status:e.getAttribute("data-status"),pluginVersion:a.get("_wpcf7_version"),locale:a.get("_wpcf7_locale"),unitTag:a.get("_wpcf7_unit_tag"),containerPost:t(a.get("_wpcf7_container_post")),parent:e.closest(".wpcf7"),get schema(){return wpcf7.schemas.get(this.id)}},wpcf7.schemas.set(e.wpcf7.id,void 0),e.querySelectorAll(".has-spinner").forEach((e=>{e.insertAdjacentHTML("afterend",'<span class="wpcf7-spinner"></span>')})),(e=>{e.querySelectorAll(".wpcf7-exclusive-checkbox").forEach((t=>{t.addEventListener("change",(t=>{const a=t.target.getAttribute("name");e.querySelectorAll(`input[type="checkbox"][name="${a}"]`).forEach((e=>{e!==t.target&&(e.checked=!1)}))}))}))})(e),(e=>{e.querySelectorAll(".has-free-text").forEach((t=>{const a=t.querySelector("input.wpcf7-free-text"),n=t.querySelector('input[type="checkbox"], input[type="radio"]');a.disabled=!n.checked,e.addEventListener("change",(e=>{a.disabled=!n.checked,e.target===n&&n.checked&&a.focus()}))}))})(e),(e=>{e.querySelectorAll(".wpcf7-validates-as-url").forEach((e=>{e.addEventListener("change",(t=>{let a=e.value.trim();a&&!a.match(/^[a-z][a-z0-9.+-]*:/i)&&-1!==a.indexOf(".")&&(a=a.replace(/^\/+/,""),a="http://"+a),e.value=a}))}))})(e),(e=>{if(!e.querySelector(".wpcf7-acceptance")||e.classList.contains("wpcf7-acceptance-as-validation"))return;const t=()=>{let t=!0;e.querySelectorAll(".wpcf7-acceptance").forEach((e=>{if(!t||e.classList.contains("optional"))return;const a=e.querySelector('input[type="checkbox"]');(e.classList.contains("invert")&&a.checked||!e.classList.contains("invert")&&!a.checked)&&(t=!1)})),e.querySelectorAll(".wpcf7-submit").forEach((e=>{e.disabled=!t}))};t(),e.addEventListener("change",(e=>{t()})),e.addEventListener("wpcf7reset",(e=>{t()}))})(e),(e=>{const a=(e,a)=>{const n=t(e.getAttribute("data-starting-value")),r=t(e.getAttribute("data-maximum-value")),c=t(e.getAttribute("data-minimum-value")),o=e.classList.contains("down")?n-a.value.trim().length:a.value.trim().length;e.setAttribute("data-current-value",o),e.innerText=o,r&&r<a.value.length?e.classList.add("too-long"):e.classList.remove("too-long"),c&&a.value.length<c?e.classList.add("too-short"):e.classList.remove("too-short")},n=t=>{t={init:!1,...t},e.querySelectorAll(".wpcf7-character-count").forEach((n=>{const r=n.getAttribute("data-target-name"),c=e.querySelector(`[name="${r}"]`);c&&(c.value=c.defaultValue,a(n,c),t.init&&c.addEventListener("keyup",(e=>{a(n,c)})))}))};n({init:!0}),e.addEventListener("wpcf7reset",(e=>{n()}))})(e),window.addEventListener("load",(t=>{wpcf7.cached&&e.reset()})),e.addEventListener("reset",(t=>{wpcf7.reset(e)})),e.addEventListener("submit",(t=>{wpcf7.submit(e,{submitter:t.submitter}),t.preventDefault()})),e.addEventListener("wpcf7submit",(t=>{t.detail.apiResponse.captcha&&u(e,t.detail.apiResponse.captcha),t.detail.apiResponse.quiz&&m(e,t.detail.apiResponse.quiz)})),e.addEventListener("wpcf7reset",(t=>{t.detail.apiResponse.captcha&&u(e,t.detail.apiResponse.captcha),t.detail.apiResponse.quiz&&m(e,t.detail.apiResponse.quiz)})),e.addEventListener("change",(t=>{t.target.closest(".wpcf7-form-control")&&wpcf7.validate(e,{target:t.target})})),e.addEventListener("wpcf7statuschanged",(t=>{const a=t.detail.status;e.querySelectorAll(".active-on-any").forEach((e=>{e.removeAttribute("inert"),e.classList.remove("active-on-any")})),e.querySelectorAll(`.inert-on-${a}`).forEach((e=>{e.setAttribute("inert","inert"),e.classList.add("active-on-any")}))}))}document.addEventListener("DOMContentLoaded",(t=>{var a;if("undefined"!=typeof wpcf7)if(void 0!==wpcf7.api)if("function"==typeof window.fetch)if("function"==typeof window.FormData)if("function"==typeof NodeList.prototype.forEach)if("function"==typeof String.prototype.replaceAll){wpcf7={init:w,submit:p,reset:f,validate:o,schemas:new Map,...null!==(a=wpcf7)&&void 0!==a?a:{}},document.querySelectorAll("form .wpcf7[data-wpcf7-id]").forEach((t=>{const a=document.createElement("p");a.setAttribute("class","wpcf7-form-in-wrong-place");const n=document.createElement("strong");n.append((0,e.__)("Error:","contact-form-7"));const r=(0,e.__)("This contact form is placed in the wrong place.","contact-form-7");a.append(n," ",r),t.replaceWith(a)})),document.querySelectorAll(".wpcf7 > form").forEach((e=>{wpcf7.init(e),e.closest(".wpcf7").classList.replace("no-js","js")}));for(const e of wpcf7.schemas.keys())r({endpoint:`contact-forms/${e}/feedback/schema`,method:"GET"}).then((t=>{wpcf7.schemas.set(e,t)}))}else console.error("Your browser does not support String.replaceAll().");else console.error("Your browser does not support NodeList.forEach().");else console.error("Your browser does not support window.FormData().");else console.error("Your browser does not support window.fetch().");else console.error("wpcf7.api is not defined.");else console.error("wpcf7 is not defined.")}))})();
var wpa_field_name,wpa_unique_id,wpa_add_test,wpa_hidden_field;jQuery(document).ready(function(){wpa_field_name=wpa_field_info.wpa_field_name;wpa_unique_id=wpa_field_info.wpa_field_value;wpa_add_test=wpa_field_info.wpa_add_test;wpa_hidden_field="<div id='altEmail_container' class='altEmail_container'><label for='alt_s'>Alternative:</label><input type='text' id='alt_s' name='alt_s' ></div><span class='wpa_hidden_field' style='display:none;height:0;width:0;'><label>WPA <input type='text' name='"+wpa_field_name+"' value='"+wpa_unique_id+"' /></label></span>";wpa_add_honeypot_field();if(typeof wpae_add_honeypot_field=='function'){wpae_add_honeypot_field();}
if(wpa_add_test=='yes'){wpa_add_test_block();}});function wpa_act_as_spam(){actiontype=jQuery('span.wpa-button').data('actiontype');if(actiontype=='remove'){wpa_remove_honeypot_field();jQuery('span.wpa-button').data('actiontype','add');jQuery('span.wpa-button').html('Acting as Spam Bot');}else{wpa_add_honeypot_field();jQuery('span.wpa-button').data('actiontype','remove');jQuery('span.wpa-button').html('Act as Spam Bot');}}
function wpa_add_honeypot_field(){var allFormSelectors=['form.wpcf7-form, .wpcf7 form','form.wpforms-form','.gform_wrapper form','.frm_forms form','.caldera-grid form','.wp-block-toolset-cred-form form','form.cred-user-form','form.cred-form','form.et_pb_contact_form','form.fb_form','form.elementor-form','form.form-contribution','form.cart','form#learn-press-checkout-form','form.wpa_form','.wpa_form form','form.spectra-pro-login-form','form#loginform','form#edd_login_form','form.uwp-login-form','.et_pb_login_form form','form.eael-login-form','form#lostpasswordform','form#commentform','form.ast-commentform','form#fl-comment-form','form.comment-form','.review-form form','form#edd-reviews-form','.bbp-topic-form form','.bbp-reply-form form'];jQuery(allFormSelectors.join(', ')).append(wpa_hidden_field);jQuery('form.frm-fluent-form').append(wpa_hidden_field);jQuery('.ff_conv_app').append(wpa_hidden_field);if(typeof fluent_forms_global_var_1!=='undefined'){fluent_forms_global_var_1.extra_inputs[wpa_field_name]=wpa_unique_id;fluent_forms_global_var_1.extra_inputs['alt_s']='';}
jQuery('input.wpa_initiator').each(function(){var $form=jQuery(this).closest('form');if($form.find('.wpa_hidden_field').length===0){jQuery(wpa_hidden_field).insertAfter(this);}});}
function wpa_add_test_block(){checkingTest='<div class="wpa-test-msg"><strong>WP Armour ( Only visible to site administrators. Not visible to other users. )</strong><br />This form has a honeypot trap enabled. If you want to act as spam bot for testing purposes, please click the button below.<br/><span class="wpa-button" onclick="wpa_act_as_spam()" data-actiontype="remove">Act as Spam Bot</span></div>';jQuery('.wpa-test-msg').remove();jQuery('span.wpa_hidden_field').after(checkingTest);}
function wpa_remove_honeypot_field(){jQuery('.wpa_hidden_field').remove();jQuery('#altEmail_container, .altEmail_container').remove();if(typeof fluent_forms_global_var_1!=='undefined'){delete fluent_forms_global_var_1.extra_inputs[wpa_field_name];delete fluent_forms_global_var_1.extra_inputs['alt_s'];}};
/*!
 * Bootstrap v3.3.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if(typeof jQuery==='undefined'){throw new Error('Bootstrap\'s JavaScript requires jQuery')}
+function($){var version=$.fn.jquery.split(' ')[0].split('.')
if((version[0]<2&&version[1]<9)||(version[0]==1&&version[1]==9&&version[2]<1)){throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher')}}(jQuery);+function($){'use strict';function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={WebkitTransition:'webkitTransitionEnd',MozTransition:'transitionend',OTransition:'oTransitionEnd otransitionend',transition:'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}
return false}
$.fn.emulateTransitionEnd=function(duration){var called=false
var $el=this
$(this).one('bsTransitionEnd',function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()
if(!$.support.transition)return
$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);+function($){'use strict';var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.VERSION='3.3.0'
Alert.TRANSITION_DURATION=150
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.closest('.alert')}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.detach().trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one('bsTransitionEnd',removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.alert
$.fn.alert=Plugin
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQuery);+function($){'use strict';var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)
this.isLoading=false}
Button.VERSION='3.3.0'
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state=state+'Text'
if(data.resetText==null)$el.data('resetText',$el[val]())
setTimeout($.proxy(function(){$el[val](data[state]==null?this.options[state]:data[state])
if(state=='loadingText'){this.isLoading=true
$el.addClass(d).attr(d,d)}else if(this.isLoading){this.isLoading=false
$el.removeClass(d).removeAttr(d)}},this),0)}
Button.prototype.toggle=function(){var changed=true
var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input')
if($input.prop('type')=='radio'){if($input.prop('checked')&&this.$element.hasClass('active'))changed=false
else $parent.find('.active').removeClass('active')}
if(changed)$input.prop('checked',!this.$element.hasClass('active')).trigger('change')}else{this.$element.attr('aria-pressed',!this.$element.hasClass('active'))}
if(changed)this.$element.toggleClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
var old=$.fn.button
$.fn.button=Plugin
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^="button"]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
Plugin.call($btn,'toggle')
e.preventDefault()}).on('focus.bs.button.data-api blur.bs.button.data-api','[data-toggle^="button"]',function(e){$(e.target).closest('.btn').toggleClass('focus',e.type=='focus')})}(jQuery);+function($){'use strict';var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=this.sliding=this.interval=this.$active=this.$items=null
this.options.keyboard&&this.$element.on('keydown.bs.carousel',$.proxy(this.keydown,this))
this.options.pause=='hover'&&!('ontouchstart'in document.documentElement)&&this.$element.on('mouseenter.bs.carousel',$.proxy(this.pause,this)).on('mouseleave.bs.carousel',$.proxy(this.cycle,this))}
Carousel.VERSION='3.3.0'
Carousel.TRANSITION_DURATION=600
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:true,keyboard:true}
Carousel.prototype.keydown=function(e){switch(e.which){case 37:this.prev();break
case 39:this.next();break
default:return}
e.preventDefault()}
Carousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children('.item')
return this.$items.index(item||this.$active)}
Carousel.prototype.getItemForDirection=function(direction,active){var delta=direction=='prev'?-1:1
var activeIndex=this.getItemIndex(active)
var itemIndex=(activeIndex+delta)%this.$items.length
return this.$items.eq(itemIndex)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getItemIndex(this.$active=this.$element.find('.item.active'))
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid.bs.carousel',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',this.$items.eq(pos))}
Carousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||this.getItemForDirection(type,$active)
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var fallback=type=='next'?'first':'last'
var that=this
if(!$next.length){if(!this.options.wrap)return
$next=this.$element.find('.item')[fallback]()}
if($next.hasClass('active'))return(this.sliding=false)
var relatedTarget=$next[0]
var slideEvent=$.Event('slide.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
this.$element.trigger(slideEvent)
if(slideEvent.isDefaultPrevented())return
this.sliding=true
isCycling&&this.pause()
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)])
$nextIndicator&&$nextIndicator.addClass('active')}
var slidEvent=$.Event('slid.bs.carousel',{relatedTarget:relatedTarget,direction:direction})
if($.support.transition&&this.$element.hasClass('slide')){$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one('bsTransitionEnd',function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger(slidEvent)},0)}).emulateTransitionEnd(Carousel.TRANSITION_DURATION)}else{$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger(slidEvent)}
isCycling&&this.cycle()
return this}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
var old=$.fn.carousel
$.fn.carousel=Plugin
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
var clickHandler=function(e){var href
var $this=$(this)
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
if(!$target.hasClass('carousel'))return
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=false
Plugin.call($target,options)
if(slideIndex){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()}
$(document).on('click.bs.carousel.data-api','[data-slide]',clickHandler).on('click.bs.carousel.data-api','[data-slide-to]',clickHandler)
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
Plugin.call($carousel,$carousel.data())})})}(jQuery);+function($){'use strict';var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.$trigger=$(this.options.trigger).filter('[href="#'+element.id+'"], [data-target="#'+element.id+'"]')
this.transitioning=null
if(this.options.parent){this.$parent=this.getParent()}else{this.addAriaAndCollapsedClass(this.$element,this.$trigger)}
if(this.options.toggle)this.toggle()}
Collapse.VERSION='3.3.0'
Collapse.TRANSITION_DURATION=350
Collapse.DEFAULTS={toggle:true,trigger:'[data-toggle="collapse"]'}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var activesData
var actives=this.$parent&&this.$parent.find('> .panel').children('.in, .collapsing')
if(actives&&actives.length){activesData=actives.data('bs.collapse')
if(activesData&&activesData.transitioning)return}
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
if(actives&&actives.length){Plugin.call(actives,'hide')
activesData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded',true)
this.$trigger.removeClass('collapsed').attr('aria-expanded',true)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded',false)
this.$trigger.addClass('collapsed').attr('aria-expanded',false)
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one('bsTransitionEnd',$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()}
Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=$element.hasClass('in')
$element.attr('aria-expanded',isOpen)
$trigger.toggleClass('collapsed',!isOpen).attr('aria-expanded',isOpen)}
function getTargetFromTrigger($trigger){var href
var target=$trigger.attr('data-target')||(href=$trigger.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
return $(target)}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data&&options.toggle&&option=='show')options.toggle=false
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.collapse
$.fn.collapse=Plugin
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle="collapse"]',function(e){var $this=$(this)
if(!$this.attr('data-target'))e.preventDefault()
var $target=getTargetFromTrigger($this)
var data=$target.data('bs.collapse')
var option=data?'toggle':$.extend({},$this.data(),{trigger:this})
Plugin.call($target,option)})}(jQuery);+function($){'use strict';var backdrop='.dropdown-backdrop'
var toggle='[data-toggle="dropdown"]'
var Dropdown=function(element){$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.VERSION='3.3.0'
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click',clearMenus)}
var relatedTarget={relatedTarget:this}
$parent.trigger(e=$.Event('show.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.trigger('focus').attr('aria-expanded','true')
$parent.toggleClass('open').trigger('shown.bs.dropdown',relatedTarget)}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27|32)/.test(e.which))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if((!isActive&&e.which!=27)||(isActive&&e.which==27)){if(e.which==27)$parent.find(toggle).trigger('focus')
return $this.trigger('click')}
var desc=' li:not(.divider):visible a'
var $items=$parent.find('[role="menu"]'+desc+', [role="listbox"]'+desc)
if(!$items.length)return
var index=$items.index(e.target)
if(e.which==38&&index>0)index--
if(e.which==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).trigger('focus')}
function clearMenus(e){if(e&&e.which===3)return
$(backdrop).remove()
$(toggle).each(function(){var $this=$(this)
var $parent=getParent($this)
var relatedTarget={relatedTarget:this}
if(!$parent.hasClass('open'))return
$parent.trigger(e=$.Event('hide.bs.dropdown',relatedTarget))
if(e.isDefaultPrevented())return
$this.attr('aria-expanded','false')
$parent.removeClass('open').trigger('hidden.bs.dropdown',relatedTarget)})}
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.dropdown')
if(!data)$this.data('bs.dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
var old=$.fn.dropdown
$.fn.dropdown=Plugin
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle,Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','[role="menu"]',Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api','[role="listbox"]',Dropdown.prototype.keydown)}(jQuery);+function($){'use strict';var Modal=function(element,options){this.options=options
this.$body=$(document.body)
this.$element=$(element)
this.$backdrop=this.isShown=null
this.scrollbarWidth=0
if(this.options.remote){this.$element.find('.modal-content').load(this.options.remote,$.proxy(function(){this.$element.trigger('loaded.bs.modal')},this))}}
Modal.VERSION='3.3.0'
Modal.TRANSITION_DURATION=300
Modal.BACKDROP_TRANSITION_DURATION=150
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.checkScrollbar()
this.$body.addClass('modal-open')
this.setScrollbar()
this.escape()
this.$element.on('click.dismiss.bs.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(that.$body)}
that.$element.show().scrollTop(0)
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in').attr('aria-hidden',false)
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$element.find('.modal-dialog').one('bsTransitionEnd',function(){that.$element.trigger('focus').trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger('focus').trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').attr('aria-hidden',true).off('click.dismiss.bs.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one('bsTransitionEnd',$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.trigger('focus')}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keydown.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keydown.dismiss.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.$body.removeClass('modal-open')
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').prependTo(this.$element).on('click.dismiss.bs.modal',$.proxy(function(e){if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus.call(this.$element[0]):this.hide.call(this)},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one('bsTransitionEnd',callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
var callbackRemove=function(){that.removeBackdrop()
callback&&callback()}
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one('bsTransitionEnd',callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else if(callback){callback()}}
Modal.prototype.checkScrollbar=function(){this.scrollbarWidth=this.measureScrollbar()}
Modal.prototype.setScrollbar=function(){var bodyPad=parseInt((this.$body.css('padding-right')||0),10)
if(this.scrollbarWidth)this.$body.css('padding-right',bodyPad+this.scrollbarWidth)}
Modal.prototype.resetScrollbar=function(){this.$body.css('padding-right','')}
Modal.prototype.measureScrollbar=function(){if(document.body.clientWidth>=window.innerWidth)return 0
var scrollDiv=document.createElement('div')
scrollDiv.className='modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth}
function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal
$.fn.modal=Plugin
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('bs.modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
if($this.is('a'))e.preventDefault()
$target.one('show.bs.modal',function(showEvent){if(showEvent.isDefaultPrevented())return
$target.one('hidden.bs.modal',function(){$this.is(':visible')&&$this.trigger('focus')})})
Plugin.call($target,option,this)})}(jQuery);+function($){'use strict';var Tooltip=function(element,options){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null
this.init('tooltip',element,options)}
Tooltip.VERSION='3.3.0'
Tooltip.TRANSITION_DURATION=150
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false,viewport:{selector:'body',padding:0}}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
this.$viewport=this.options.viewport&&$(this.options.viewport.selector||this.options.viewport)
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focusin'
var eventOut=trigger=='hover'?'mouseleave':'focusout'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(self&&self.$tip&&self.$tip.is(':visible')){self.hoverState='in'
return}
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions())
$(obj.currentTarget).data('bs.'+this.type,self)}
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0])
if(e.isDefaultPrevented()||!inDom)return
var that=this
var $tip=this.tip()
var tipId=this.getUID(this.type)
this.setContent()
$tip.attr('id',tipId)
this.$element.attr('aria-describedby',tipId)
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement).data('bs.'+this.type,this)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var orgPlacement=placement
var $container=this.options.container?$(this.options.container):this.$element.parent()
var containerDim=this.getPosition($container)
placement=placement=='bottom'&&pos.bottom+actualHeight>containerDim.bottom?'top':placement=='top'&&pos.top-actualHeight<containerDim.top?'bottom':placement=='right'&&pos.right+actualWidth>containerDim.width?'left':placement=='left'&&pos.left-actualWidth<containerDim.left?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
var complete=function(){var prevHoverState=that.hoverState
that.$element.trigger('shown.bs.'+that.type)
that.hoverState=null
if(prevHoverState=='out')that.leave(that)}
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}}
Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top=offset.top+marginTop
offset.left=offset.left+marginLeft
$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0)
$tip.addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){offset.top=offset.top+height-actualHeight}
var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight)
if(delta.left)offset.left+=delta.left
else offset.top+=delta.top
var isVertical=/top|bottom/.test(placement)
var arrowDelta=isVertical?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight
var arrowOffsetPosition=isVertical?'offsetWidth':'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],isVertical)}
Tooltip.prototype.replaceArrow=function(delta,dimension,isHorizontal){this.arrow().css(isHorizontal?'left':'top',50*(1-delta/dimension)+'%').css(isHorizontal?'top':'left','')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(callback){var that=this
var $tip=this.tip()
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()
that.$element.removeAttr('aria-describedby').trigger('hidden.bs.'+that.type)
callback&&callback()}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&this.$tip.hasClass('fade')?$tip.one('bsTransitionEnd',complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()
this.hoverState=null
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function($element){$element=$element||this.$element
var el=$element[0]
var isBody=el.tagName=='BODY'
var elRect=el.getBoundingClientRect()
if(elRect.width==null){elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top})}
var elOffset=isBody?{top:0,left:0}:$element.offset()
var scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()}
var outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null
return $.extend({},elRect,scroll,outerDims,elOffset)}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0}
if(!this.$viewport)return delta
var viewportPadding=this.options.viewport&&this.options.viewport.padding||0
var viewportDimensions=this.getPosition(this.$viewport)
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll
var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight
if(topEdgeOffset<viewportDimensions.top){delta.top=viewportDimensions.top-topEdgeOffset}else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height){delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}}else{var leftEdgeOffset=pos.left-viewportPadding
var rightEdgeOffset=pos.left+viewportPadding+actualWidth
if(leftEdgeOffset<viewportDimensions.left){delta.left=viewportDimensions.left-leftEdgeOffset}else if(rightEdgeOffset>viewportDimensions.width){delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}}
return delta}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*1000000)
while(document.getElementById(prefix))
return prefix}
Tooltip.prototype.tip=function(){return(this.$tip=this.$tip||$(this.options.template))}
Tooltip.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow'))}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=this
if(e){self=$(e.currentTarget).data('bs.'+this.type)
if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions())
$(e.currentTarget).data('bs.'+this.type,self)}}
self.tip().hasClass('in')?self.leave(self):self.enter(self)}
Tooltip.prototype.destroy=function(){var that=this
clearTimeout(this.timeout)
this.hide(function(){that.$element.off('.'+that.type).removeData('bs.'+that.type)})}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
var selector=options&&options.selector
if(!data&&option=='destroy')return
if(selector){if(!data)$this.data('bs.tooltip',(data={}))
if(!data[selector])data[selector]=new Tooltip(this,options)}else{if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))}
if(typeof option=='string')data[option]()})}
var old=$.fn.tooltip
$.fn.tooltip=Plugin
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQuery);+function($){'use strict';var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.VERSION='3.3.0'
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content').children().detach().end()[this.options.html?(typeof content=='string'?'html':'append'):'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return(this.$arrow=this.$arrow||this.tip().find('.arrow'))}
Popover.prototype.tip=function(){if(!this.$tip)this.$tip=$(this.options.template)
return this.$tip}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
var selector=options&&options.selector
if(!data&&option=='destroy')return
if(selector){if(!data)$this.data('bs.popover',(data={}))
if(!data[selector])data[selector]=new Popover(this,options)}else{if(!data)$this.data('bs.popover',(data=new Popover(this,options)))}
if(typeof option=='string')data[option]()})}
var old=$.fn.popover
$.fn.popover=Plugin
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQuery);+function($){'use strict';function ScrollSpy(element,options){var process=$.proxy(this.process,this)
this.$body=$('body')
this.$scrollElement=$(element).is('body')?$(window):$(element)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||'')+' .nav li > a'
this.offsets=[]
this.targets=[]
this.activeTarget=null
this.scrollHeight=0
this.$scrollElement.on('scroll.bs.scrollspy',process)
this.refresh()
this.process()}
ScrollSpy.VERSION='3.3.0'
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)}
ScrollSpy.prototype.refresh=function(){var offsetMethod='offset'
var offsetBase=0
if(!$.isWindow(this.$scrollElement[0])){offsetMethod='position'
offsetBase=this.$scrollElement.scrollTop()}
this.offsets=[]
this.targets=[]
this.scrollHeight=this.getScrollHeight()
var self=this
this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#./.test(href)&&$(href)
return($href&&$href.length&&$href.is(':visible')&&[[$href[offsetMethod]().top+offsetBase,href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){self.offsets.push(this[0])
self.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.getScrollHeight()
var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(this.scrollHeight!=scrollHeight){this.refresh()}
if(scrollTop>=maxScroll){return activeTarget!=(i=targets[targets.length-1])&&this.activate(i)}
if(activeTarget&&scrollTop<offsets[0]){this.activeTarget=null
return this.clear()}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(!offsets[i+1]||scrollTop<=offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
this.clear()
var selector=this.selector+'[data-target="'+target+'"],'+
this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate.bs.scrollspy')}
ScrollSpy.prototype.clear=function(){$(this.selector).parentsUntil(this.options.target,'.active').removeClass('active')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.scrollspy
$.fn.scrollspy=Plugin
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load.bs.scrollspy.data-api',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
Plugin.call($spy,$spy.data())})})}(jQuery);+function($){'use strict';var Tab=function(element){this.element=$(element)}
Tab.VERSION='3.3.0'
Tab.TRANSITION_DURATION=150
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.data('target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var $previous=$ul.find('.active:last a')
var hideEvent=$.Event('hide.bs.tab',{relatedTarget:$this[0]})
var showEvent=$.Event('show.bs.tab',{relatedTarget:$previous[0]})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.closest('li'),$ul)
this.activate($target,$target.parent(),function(){$previous.trigger({type:'hidden.bs.tab',relatedTarget:$this[0]})
$this.trigger({type:'shown.bs.tab',relatedTarget:$previous[0]})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&(($active.length&&$active.hasClass('fade'))||!!container.find('> .fade').length)
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',false)
element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded',true)
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu')){element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded',true)}
callback&&callback()}
$active.length&&transition?$active.one('bsTransitionEnd',next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next()
$active.removeClass('in')}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
var old=$.fn.tab
$.fn.tab=Plugin
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
var clickHandler=function(e){e.preventDefault()
Plugin.call($(this),'show')}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"]',clickHandler).on('click.bs.tab.data-api','[data-toggle="pill"]',clickHandler)}(jQuery);+function($){'use strict';var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$target=$(this.options.target).on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=this.unpin=this.pinnedOffset=null
this.checkPosition()}
Affix.VERSION='3.3.0'
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0,target:window}
Affix.prototype.getState=function(scrollHeight,height,offsetTop,offsetBottom){var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
var targetHeight=this.$target.height()
if(offsetTop!=null&&this.affixed=='top')return scrollTop<offsetTop?'top':false
if(this.affixed=='bottom'){if(offsetTop!=null)return(scrollTop+this.unpin<=position.top)?false:'bottom'
return(scrollTop+targetHeight<=scrollHeight-offsetBottom)?false:'bottom'}
var initializing=this.affixed==null
var colliderTop=initializing?scrollTop:position.top
var colliderHeight=initializing?targetHeight:height
if(offsetTop!=null&&colliderTop<=offsetTop)return'top'
if(offsetBottom!=null&&(colliderTop+colliderHeight>=scrollHeight-offsetBottom))return'bottom'
return false}
Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop=this.$target.scrollTop()
var position=this.$element.offset()
return(this.pinnedOffset=position.top-scrollTop)}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var height=this.$element.height()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
var scrollHeight=$('body').height()
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top(this.$element)
if(typeof offsetBottom=='function')offsetBottom=offset.bottom(this.$element)
var affix=this.getState(scrollHeight,height,offsetTop,offsetBottom)
if(this.affixed!=affix){if(this.unpin!=null)this.$element.css('top','')
var affixType='affix'+(affix?'-'+affix:'')
var e=$.Event(affixType+'.bs.affix')
this.$element.trigger(e)
if(e.isDefaultPrevented())return
this.affixed=affix
this.unpin=affix=='bottom'?this.getPinnedOffset():null
this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix','affixed')+'.bs.affix')}
if(affix=='bottom'){this.$element.offset({top:scrollHeight-height-offsetBottom})}}
function Plugin(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
var old=$.fn.affix
$.fn.affix=Plugin
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom!=null)data.offset.bottom=data.offsetBottom
if(data.offsetTop!=null)data.offset.top=data.offsetTop
Plugin.call($spy,data)})})}(jQuery);
/*!
 * IE10 viewport hack for Surface/desktop Windows 8 bug
 * Copyright 2014 Twitter, Inc.
 * Licensed under the Creative Commons Attribution 3.0 Unported License. For
 * details, see http://creativecommons.org/licenses/by/3.0/.
 */
(function(){'use strict';if(navigator.userAgent.match(/IEMobile\/10\.0/)){var msViewportStyle=document.createElement('style')
msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'))
document.querySelector('head').appendChild(msViewportStyle)}})();
(function($){$(document).ready(function(){$('#searchsubmit, #commentform #submit').addClass('btn btn-default');$('button, html input[type="button"], input[type="reset"], input[type="submit"]').addClass('btn btn-default');$('input:not(button, html input[type="button"], input[type="reset"], input[type="submit"]), input[type="file"], select, textarea').addClass('form-control');if($('label').parent().not('div')){$('label:not(#searchform label,#commentform label)').wrap('<div></div>');}
$('table').addClass('table table-bordered');$('.attachment-thumbnail').addClass('thumbnail');$('embed-responsive-item,iframe[src*="youtube.com"],embed,object,video').parent().addClass('embed-responsive embed-responsive-16by9');$('.navbar-nav').addClass('blog-nav');$('.dropdown-menu > .active > a, .dropdown-menu > .active > a:hover, .dropdown-menu > .active > a:focus, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover, .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus').closest('.navbar-nav').removeClass('blog-nav');$('#hamburger').click(function(event){event.preventDefault();$('body').toggleClass('nav-active')});});})(jQuery);
"use strict";var BJLL_options=BJLL_options||{},BJLL={_ticking:!1,check:function(){if(!BJLL._ticking){BJLL._ticking=!0,void 0===BJLL.threshold&&(void 0!==BJLL_options.threshold?BJLL.threshold=parseInt(BJLL_options.threshold):BJLL.threshold=200);var e=document.documentElement.clientHeight||body.clientHeight,t=!1,n=document.getElementsByClassName("lazy-hidden");[].forEach.call(n,function(n,a,i){var s=n.getBoundingClientRect();e-s.top+BJLL.threshold>0&&(BJLL.show(n),t=!0)}),BJLL._ticking=!1,t&&BJLL.check()}},show:function(e){e.className=e.className.replace(/(?:^|\s)lazy-hidden(?!\S)/g,""),e.addEventListener("load",function(){e.className+=" lazy-loaded",BJLL.customEvent(e,"lazyloaded")},!1);var t=e.getAttribute("data-lazy-type");if("image"==t)null!=e.getAttribute("data-lazy-srcset")&&e.setAttribute("srcset",e.getAttribute("data-lazy-srcset")),null!=e.getAttribute("data-lazy-sizes")&&e.setAttribute("sizes",e.getAttribute("data-lazy-sizes")),e.setAttribute("src",e.getAttribute("data-lazy-src"));else if("iframe"==t){var n=e.getAttribute("data-lazy-src"),a=document.createElement("div");a.innerHTML=n;var i=a.firstChild;e.parentNode.replaceChild(i,e)}},customEvent:function(e,t){var n;document.createEvent?(n=document.createEvent("HTMLEvents")).initEvent(t,!0,!0):(n=document.createEventObject()).eventType=t,n.eventName=t,document.createEvent?e.dispatchEvent(n):e.fireEvent("on"+n.eventType,n)}};window.addEventListener("load",BJLL.check,!1),window.addEventListener("scroll",BJLL.check,!1),window.addEventListener("resize",BJLL.check,!1),document.getElementsByTagName("body").item(0).addEventListener("post-load",BJLL.check,!1);
document.addEventListener("DOMContentLoaded",(e=>{var t;wpcf7_recaptcha={...null!==(t=wpcf7_recaptcha)&&void 0!==t?t:{}};const c=wpcf7_recaptcha.sitekey,{homepage:n,contactform:a}=wpcf7_recaptcha.actions,o=e=>{const{action:t,func:n,params:a}=e;grecaptcha.execute(c,{action:t}).then((e=>{const c=new CustomEvent("wpcf7grecaptchaexecuted",{detail:{action:t,token:e}});document.dispatchEvent(c)})).then((()=>{"function"==typeof n&&n(...a)})).catch((e=>console.error(e)))};if(grecaptcha.ready((()=>{o({action:n})})),document.addEventListener("change",(e=>{o({action:a})})),"undefined"!=typeof wpcf7&&"function"==typeof wpcf7.submit){const e=wpcf7.submit;wpcf7.submit=(t,c={})=>{o({action:a,func:e,params:[t,c]})}}document.addEventListener("wpcf7grecaptchaexecuted",(e=>{const t=document.querySelectorAll('form.wpcf7-form input[name="_wpcf7_recaptcha_response"]');for(let c=0;c<t.length;c++)t[c].setAttribute("value",e.detail.token)}))}));