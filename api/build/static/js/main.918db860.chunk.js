(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{71:function(t,e){},73:function(t,e){},96:function(t,e,n){},97:function(t,e,n){},98:function(t,e,n){"use strict";n.r(e);var r=n(0),c=n.n(r),a=n(38),o=n.n(a),s=n(12),i=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,99)).then((function(e){var n=e.getCLS,r=e.getFID,c=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),r(t),c(t),a(t),o(t)}))},u=n(33),l=n(13),d=n(3),b=n(4),f=Object(s.b)({key:"CURRENT_USER",default:{addr:null,loggedIn:null,cid:null}}),j={logIn:b.logIn,logOut:b.unauthenticate,signUp:b.signUp,changeUser:b.reauthenticate};function p(){var t=Object(s.e)(f),e=Object(d.a)(t,2),n=e[0],c=e[1];return Object(r.useEffect)((function(){return b.currentUser().subscribe(c)}),[c]),[n,null!=n.addr,j]}var O=n(2);function h(){var t=p(),e=Object(d.a)(t,3),n=(e[0],e[1]),r=e[2],c=r.signUp,a=r.logIn;return n?Object(O.jsx)(l.a,{to:"/publish"}):Object(O.jsxs)("div",{children:[Object(O.jsx)("button",{onClick:a,children:"Log In"}),Object(O.jsx)("button",{onClick:c,children:"Sign up"})]})}var m,x=n(5),g=n.n(x),S=n(11),I=n(15),y=n(6),k="IDLE",T="PROCESSING",v=n(25),C=n(18),A=b.cdc(m||(m=Object(v.a)(["\nimport NonFungibleToken from 0xNonFungibleToken\nimport HandyItems from 0xHandyItems\n\n  pub fun main(address: Address): [UInt64] {\n    if let collection =  getAccount(address).getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath).borrow() {\n      return collection.getIDs()\n    }\n\n    return []\n  }\n"])));function P(t){return null==t?Promise.resolve([]):b.send([b.script(A),b.args([b.arg(t,C.Address)])]).then(b.decode).then((function(t){return t.sort((function(t,e){return t-e}))}))}var N,w=Object(s.c)({key:"account-items::state",default:Object(s.d)({key:"account-items::default",get:function(t){return Object(S.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("hello"),e.abrupt("return",P(t));case 2:case"end":return e.stop()}}),e)})))}})}),_=Object(s.c)({key:"account-items::status",default:k});function E(t){var e=Object(s.e)(w(t)),n=Object(d.a)(e,2),r=n[0],c=n[1],a=Object(s.e)(_(t)),o=Object(d.a)(a,2),i=o[0],u=o[1];return{ids:r,status:i,mint:function(t,e,n,r,a,o){return Object(S.a)(g.a.mark((function s(){return g.a.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return u(T),s.next=3,fetch("https://nftpow.herokuapp.com/v1/handy-items/mint",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({recipient:t,name:e,tokenURI:n,color:r,info:a,quantity:o})});case 3:return s.next=5,P(t).then(c);case 5:u(k);case 6:case"end":return s.stop()}}),s)})))()},refresh:function(){return Object(S.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u(T),e.next=3,P(t).then(c);case 3:u(k);case 4:case"end":return e.stop()}}),e)})))()}}}var F=Object(b.cdc)(N||(N=Object(v.a)(['\n  import FungibleToken from 0xFungibleToken\n  import NonFungibleToken from 0xNonFungibleToken\n  import HandyItems from 0xHandyItems\n  import NFTStorefront from 0xNFTStorefront\n\n  pub fun hasItems(_ address: Address): Bool {\n    return getAccount(address)\n      .getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath)\n      .check()\n  }\n\n  pub fun hasStorefront(_ address: Address): Bool {\n    return getAccount(address)\n      .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath)\n      .check()\n  }\n\n  pub fun main(address: Address): {String: Bool} {\n    let ret: {String: Bool} = {}\n    ret["HandyItems"] = hasItems(address)\n    ret["HandyItemsMarket"] = hasStorefront(address)\n    return ret\n  }\n'])));function R(t){return null==t||""==t?Promise.resolve(!1):Object(b.send)([Object(b.script)(F),Object(b.args)([Object(b.arg)(t,C.Address)])]).then(b.decode)}var H,U=n(10),L=function(){var t=Object(S.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();function D(){return B.apply(this,arguments)}function B(){return B=Object(S.a)(g.a.mark((function t(){var e,n,r,c,a,o,s,i,u,l,d,f=arguments;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=f.length>0&&void 0!==f[0]?f[0]:[],n=f.length>1&&void 0!==f[1]?f[1]:{},r=n.onStart||L,c=n.onSubmission||L,a=n.onUpdate||L,o=n.onSuccess||L,s=n.onError||L,i=n.onComplete||L,t.prev=8,r(),t.next=12,b.send(e).then(b.decode);case 12:return u=t.sent,t.t0=console,t.t1="%cTX[".concat(u,"]: "),t.t2=z,t.next=18,b.config().get("env");case 18:return t.t3=t.sent,t.t4=u,t.t5=(0,t.t2)(t.t3,t.t4),t.t6=t.t1.concat.call(t.t1,t.t5),t.t0.info.call(t.t0,t.t6,"color:purple;font-weight:bold;font-family:monospace;"),c(u),t.next=26,b.tx(u).subscribe(a);case 26:return l=t.sent,t.next=29,b.tx(u).onceSealed();case 29:return d=t.sent,l(),t.t7=console,t.t8="%cTX[".concat(u,"]: "),t.t9=z,t.next=36,b.config().get("env");case 36:return t.t10=t.sent,t.t11=u,t.t12=(0,t.t9)(t.t10,t.t11),t.t13=t.t8.concat.call(t.t8,t.t12),t.t7.info.call(t.t7,t.t13,"color:green;font-weight:bold;font-family:monospace;"),t.next=43,o(d);case 43:return t.abrupt("return",d);case 46:return t.prev=46,t.t14=t.catch(8),t.t15=console,t.t16="TX[".concat(u,"]: "),t.t17=z,t.next=53,b.config().get("env");case 53:t.t18=t.sent,t.t19=u,t.t20=(0,t.t17)(t.t18,t.t19),t.t21=t.t16.concat.call(t.t16,t.t20),t.t22=t.t14,t.t15.error.call(t.t15,t.t21,t.t22),s(t.t14);case 60:return t.prev=60,t.next=63,i();case 63:return t.finish(60);case 64:case"end":return t.stop()}}),t,null,[[8,46,60,64]])}))),B.apply(this,arguments)}function z(t,e){return"https://flow-view-source.com/".concat(t,"/tx/").concat(e)}var M=Object(b.cdc)(H||(H=Object(v.a)(["\n  import FungibleToken from 0xFungibleToken\n  import NonFungibleToken from 0xNonFungibleToken\n  import HandyItems from 0xHandyItems\n  import NFTStorefront from 0xNFTStorefront\n\n  pub fun hasItems(_ address: Address): Bool {\n    return getAccount(address)\n      .getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath)\n      .check()\n  }\n\n  pub fun hasStorefront(_ address: Address): Bool {\n    return getAccount(address)\n      .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath)\n      .check()\n  }\n\n  transaction {\n    prepare(acct: AuthAccount) {\n\n      if !hasItems(acct.address) {\n        if acct.borrow<&HandyItems.Collection>(from: HandyItems.CollectionStoragePath) == nil {\n          acct.save(<-HandyItems.createEmptyCollection(), to: HandyItems.CollectionStoragePath)\n        }\n        acct.unlink(HandyItems.CollectionPublicPath)\n        acct.link<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath, target: HandyItems.CollectionStoragePath)\n      }\n\n      if !hasStorefront(acct.address) {\n        if acct.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath) == nil {\n          acct.save(<-NFTStorefront.createStorefront(), to: NFTStorefront.StorefrontStoragePath)\n        }\n        acct.unlink(NFTStorefront.StorefrontPublicPath)\n        acct.link<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath, target: NFTStorefront.StorefrontStoragePath)\n      }\n    }\n  }\n"])));function K(t){return G.apply(this,arguments)}function G(){return G=Object(S.a)(g.a.mark((function t(e){var n,r=arguments;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=r.length>1&&void 0!==r[1]?r[1]:{},Object(U.a)(null!=e,"Tried to initialize an account but no address was supplied"),t.abrupt("return",D([Object(b.transaction)(M),Object(b.limit)(70),Object(b.proposer)(b.authz),Object(b.payer)(b.authz),Object(b.authorizations)([b.authz])],n));case 3:case"end":return t.stop()}}),t)}))),G.apply(this,arguments)}var Q=Object(s.c)({key:"init::address",default:null}),W=Object(s.c)({key:"init::status",default:k}),q=Object(s.c)({key:"init::state",default:Object(s.d)({key:"init::default",get:function(t){return function(){return R(t)}}})}),J=Object(s.d)({key:"init::computed",get:function(t){return function(){var e=Object(S.a)(g.a.mark((function e(n){var r,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n.get,c=r(q(t)),e.abrupt("return",c.HandyItems||c.HandyItemsMarket);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}});n(96);function V(){var t=Object(r.useState)({txtAddress:"",txtName:"",txtImageURL:"",txtColor:"",txtInfo:"",txtQuantity:""}),e=Object(d.a)(t,2),n=e[0],c=e[1],a=p(),o=Object(d.a)(a,1)[0],i=E(o.addr),u=function(t){var e=Object(s.e)(Q(t)),n=Object(d.a)(e,2),r=n[0],c=n[1],a=Object(s.e)(q(r)),o=Object(d.a)(a,2),i=o[0],u=o[1],l=Object(s.f)(J(r)),b=Object(s.e)(W(r)),f=Object(d.a)(b,2),j=f[0],p=f[1];function O(){R(r).then(u)}return console.log(r),Object(y.a)(Object(y.a)({},i),{},{isInitialized:l,status:null==l?"LOADING":j,recheck:O,initialize:function(t){return Object(S.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:K(null!=t?t:r,{onStart:function(){p(T)},onSuccess:function(){return Object(S.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:O(),p("SUCCESS");case 2:case"end":return t.stop()}}),t)})))()},onError:function(){p("ERROR")},onComplete:function(){return Object(S.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:p(k);case 1:case"end":return t.stop()}}),t)})))()}});case 1:case"end":return e.stop()}}),e)})))()},isSpecificInitialized:function(t){return Object(S.a)(g.a.mark((function e(){var n;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R(t);case 2:return n=e.sent,console.log(n),c(t),e.abrupt("return",n.HandyItems||n.HandyItemsMarket);case 6:case"end":return e.stop()}}),e)})))()}})}(null),l=function(t){c(Object(y.a)(Object(y.a)({},n),{},Object(I.a)({},t.target.name,t.target.value)))},b=function(){var t=Object(S.a)(g.a.mark((function t(e){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.next=3,u.isSpecificInitialized(n.txtAddress);case 3:if(t.sent){t.next=6;break}return alert("Initialize account first!"),t.abrupt("return");case 6:i.mint(n.txtAddress,n.txtName,n.txtImageURL,n.txtColor,n.txtInfo,n.txtQuantity),console.log(i.ids.length);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(O.jsxs)("div",{className:"grid-center",children:[Object(O.jsx)("h1",{children:o.addr}),Object(O.jsx)("h1",{children:"Publish a NFT"}),Object(O.jsx)("form",{children:Object(O.jsxs)("div",{className:"grid-container",children:[Object(O.jsx)("label",{htmlFor:"txtName",children:"Name"}),Object(O.jsx)("input",{name:"txtName",id:"txtName",onChange:l}),Object(O.jsx)("label",{htmlFor:"txtAddress",children:"Address"}),Object(O.jsx)("input",{name:"txtAddress",id:"txtAddress",onChange:l}),Object(O.jsx)("label",{children:"Image URL"}),Object(O.jsx)("input",{name:"txtImageURL",id:"txtImageURL",onChange:l}),Object(O.jsx)("label",{children:"Color"}),Object(O.jsx)("input",{name:"txtColor",id:"txtColor",onChange:l}),Object(O.jsx)("label",{children:"Info"}),Object(O.jsx)("input",{name:"txtInfo",id:"txtInfo",onChange:l}),Object(O.jsx)("label",{children:"Quantity"}),Object(O.jsx)("input",{name:"txtQuantity",id:"txtQuantity",onChange:l}),Object(O.jsx)("label",{children:"Series"}),Object(O.jsx)("input",{name:"txtSeries",id:"txtSeries",onChange:l}),Object(O.jsx)("button",{disabled:o.addr!==n.txtAddress,onClick:function(t){t.preventDefault(),u.initialize(n.txtAddress)},children:"Initialize"}),Object(O.jsx)("button",{disabled:i.status!==k,onClick:b,children:"Send"})]})})]})}var X,Y,Z,$,tt=n(21),et=n(8),nt=n(31),rt="SET_CALLBACK",ct="PROCESS",at="MAYBE_PROCESS",ot="TIMEOUT",st="ENQUEUE",it="RESOLVE",ut=(X={},Object(I.a)(X,et.a,(function(t){t.put("need",new Set),t.put("processing",new Set),t.put("hold",{}),setInterval((function(){return t.sendSelf(ot)}),500)})),Object(I.a)(X,rt,(function(t,e,n){t.put("callback",Object(S.a)(g.a.mark((function t(){var e=arguments;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",n.apply(void 0,e));case 1:case"end":return t.stop()}}),t)})))),t.sendSelf(at)})),Object(I.a)(X,st,(function(t,e,n){var r=Object(nt.a)(),c={id:r,args:n,reply:e.reply};t.update("need",(function(t){return t.add(r),t})),t.update("hold",(function(t){return Object(y.a)(Object(y.a)({},t),{},Object(I.a)({},r,c))})),t.sendSelf(at)})),Object(I.a)(X,ot,(function(t){t.get("need").size&&t.sendSelf(ct)})),Object(I.a)(X,at,(function(t){t.get("need")>=10&&t.sendSelf(ct)})),Object(I.a)(X,ct,(function(t){var e=t.get("callback");if("function"===typeof e){var n=t.get("need");t.update("processing",(function(t){return new Set([].concat(Object(tt.a)(t),Object(tt.a)(n)))})),t.put("need",new Set);var r=t.get("hold");e(Object(tt.a)(n).reduce((function(t,e){return Object(y.a)(Object(y.a)({},t),{},Object(I.a)({},e,r[e].args))}),{})).then((function(e){t.sendSelf(it,e)}))}})),Object(I.a)(X,it,(function(t,e,n){for(var r=Object.keys(n),c=function(){var e=o[a];t.get("hold")[e].reply(n[e]),t.update("processing",(function(t){return t.delete(e),t})),t.update("hold",(function(t){return delete t[e],t}))},a=0,o=r;a<o.length;a++)c()})),X),lt=b.cdc(Y||(Y=Object(v.a)(["\nimport NonFungibleToken from 0xNonFungibleToken\nimport HandyItems from 0xHandyItems\n\npub struct AccountItem {\n  pub let itemID: UInt64\n  pub let name: String\n  pub let tokenURI: String\n  pub let color: String\n  pub let info: String\n  pub let owner: Address\n\n  init(itemID: UInt64, name: String, tokenURI: String, color: String, info: String, owner: Address) {\n    self.itemID = itemID\n    self.name = name\n    self.tokenURI = tokenURI\n    self.color = color\n    self.info = info\n    self.owner = owner\n  }\n}\n\npub fun fetch(address: Address, id: UInt64): AccountItem? {\n  if let col = getAccount(address).getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath).borrow() {\n    if let item = col.borrowHandyItem(id: id) {\n      return AccountItem(itemID: id, name: item.name, tokenURI: item.tokenURI, \n        color: item.color, info: item.info, owner: address)\n    }\n  }\n\n  return nil\n}\n\npub fun main(keys: [String], addresses: [Address], ids: [UInt64]): {String: AccountItem?} {\n  let r: {String: AccountItem?} = {}\n  var i = 0\n  while i < keys.length {\n    let key = keys[i]\n    let address = addresses[i]\n    let id = ids[i]\n    r[key] = fetch(address: address, id: id)\n    i = i + 1\n  }\n  return r\n}\n"]))),dt=function(t){return Object.keys(t).reduce((function(e,n){return e.keys.push(n),e.addresses.push(t[n][0]),e.ids.push(t[n][1]),e}),{keys:[],addresses:[],ids:[]})},bt=(Z="FETCH_ACCOUNT_ITEM",$=function(){var t=Object(S.a)(g.a.mark((function t(e){var n,r,c,a;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=dt(e),r=n.keys,c=n.addresses,a=n.ids,t.abrupt("return",b.send([b.script(lt),b.args([b.arg(r,C.Array(C.String)),b.arg(c,C.Array(C.Address)),b.arg(a.map(Number),C.Array(C.UInt64))])]).then(b.decode));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Object(et.h)(ut,Z),Object(et.f)(Z,rt,$),{enqueue:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return Object(et.f)(Z,st,e,{expectReply:!0,timeout:0})}}),ft=bt.enqueue;function jt(t,e){return pt.apply(this,arguments)}function pt(){return(pt=Object(S.a)(g.a.mark((function t(e,n){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!=e){t.next=2;break}return t.abrupt("return",Promise.resolve(null));case 2:if(null!=n){t.next=4;break}return t.abrupt("return",Promise.resolve(null));case 4:return t.abrupt("return",ft(e,n));case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function Ot(t){return t.split("|")}var ht=Object(s.c)({key:"account-item::state",default:Object(s.d)({key:"account-item::default",get:function(t){return Object(S.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",jt.apply(void 0,Object(tt.a)(Ot(t))));case 1:case"end":return e.stop()}}),e)})))}})}),mt=Object(s.c)({key:"account-item::status",default:k});function xt(t){var e=t.address,n=t.id,r=function(t,e){var n=p(),r=Object(d.a)(n,1)[0],c=(E(t),function(t,e){return[t,e].join("|")}(t,e)),a=Object(s.e)(ht(c)),o=Object(d.a)(a,2),i=o[0],u=o[1],l=Object(s.e)(mt(c)),f=Object(d.a)(l,2),j=f[0],O=f[1];return Object(y.a)(Object(y.a)({},i),{},{status:j,owned:Object(b.sansPrefix)(r.addr)===Object(b.sansPrefix)(t),refresh:function(){return Object(S.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return O(T),t.next=3,jt.apply(void 0,Object(tt.a)(Ot(c))).then(u);case 3:O(k);case 4:case"end":return t.stop()}}),t)})))()}})}(e,n);r.status;return null==e||null==n?null:Object(O.jsxs)("div",{className:"grid-list",children:[Object(O.jsxs)("h3",{children:["Handy#",r.itemID]}),Object(O.jsx)("p",{children:r.name}),Object(O.jsx)("p",{children:r.tokenURI}),Object(O.jsx)("p",{children:r.color}),Object(O.jsx)("p",{children:r.info})]})}function gt(t){return Object(O.jsx)(r.Suspense,{fallback:null,children:Object(O.jsx)(xt,Object(y.a)({},t))})}function St(t){var e=t.address,n=E(e),r=p();Object(d.a)(r,1)[0];return null==e?null:n.ids.length<=0?Object(O.jsx)("p",{children:"No Items"}):Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"grid-list",children:[Object(O.jsx)("h2",{children:"ID"}),Object(O.jsx)("h2",{children:"Name"}),Object(O.jsx)("h2",{children:"Image URL"}),Object(O.jsx)("h2",{children:"Color"}),Object(O.jsx)("h2",{children:"Info"})]}),n.ids.map((function(t){return Object(O.jsx)(gt,{id:t,address:e},t)}))]})}function It(t){var e=t.address;return Object(O.jsx)(r.Suspense,{fallback:null,children:Object(O.jsx)(St,{address:e})})}n(97);function yt(){var t=Object(r.useState)({txtAddress:""}),e=Object(d.a)(t,2),n=e[0],c=e[1],a=Object(r.useState)(""),o=Object(d.a)(a,2),s=o[0],i=o[1],u=Object(r.useState)(0),b=Object(d.a)(u,2),f=b[0],j=b[1],h=(Object(l.g)(),p());Object(d.a)(h,1)[0];return Object(O.jsxs)("div",{children:[Object(O.jsx)("h1",{children:"NFT Listings"}),Object(O.jsxs)("div",{children:[Object(O.jsx)("label",{children:"Address: "}),Object(O.jsx)("input",{name:"txtAddress",id:"txtAddress",onChange:function(t){c(Object(y.a)(Object(y.a)({},n),{},Object(I.a)({},t.target.name,t.target.value)))}}),Object(O.jsx)("button",{onClick:function(t){i(n.txtAddress),j(1-f)},children:"List NFTs"}),""!=s&&Object(O.jsx)(It,{address:s})]})]})}function kt(){return Object(O.jsx)("div",{children:"Page Not Found"})}window.fcl=b,window.t=C,b.config().put("faucet","https://testnet-faucet.onflow.org/fund-account").put("accessNode.api","http://16ba-188-43-136-33.ngrok.io").put("challenge.handshake","https://fcl-discovery.onflow.org/testnet/authn").put("0xFungibleToken","0xee82856bf20e2aa6").put("0xNonFungibleToken","0xf8d6e0586b0a20c7").put("0xNFTStorefront","0xf8d6e0586b0a20c7").put("0xHandyItems","0xf8d6e0586b0a20c7").put("decoder.Type",(function(t){return t.staticType})),console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_ITEM_MINT:"https://nftpow.herokuapp.com/v1/handy-items/mint",REACT_APP_API_URL:"https://nftpow.herokuapp.com",REACT_APP_CONTRACT_FUNGIBLE_TOKEN:"0xee82856bf20e2aa6",REACT_APP_CONTRACT_HANDY_ITEMS:"0xf8d6e0586b0a20c7",REACT_APP_CONTRACT_NFT_STOREFRONT:"0xf8d6e0586b0a20c7",REACT_APP_CONTRACT_NON_FUNGIBLE_TOKEN:"0xf8d6e0586b0a20c7",REACT_APP_FAUCET_ADDRESS:"https://testnet-faucet.onflow.org/fund-account",REACT_APP_FLOW_ACCESS_API_URL:"http://16ba-188-43-136-33.ngrok.io",REACT_APP_FLOW_ADDRESS:"0xf8d6e0586b0a20c7",REACT_APP_FUNGIBLE_TOKEN_ADDRESS:"0xee82856bf20e2aa6",REACT_APP_NON_FUNGIBLE_TOKEN_ADDRESS:"0xf8d6e0586b0a20c7",REACT_APP_WALLET_DISCOVERY:"https://fcl-discovery.onflow.org/testnet/authn"})),o.a.render(Object(O.jsx)(c.a.StrictMode,{children:Object(O.jsx)(s.a,{children:Object(O.jsx)(u.a,{children:Object(O.jsxs)(l.d,{children:[Object(O.jsx)(l.b,{exact:!0,path:"/publish",children:Object(O.jsx)(r.Suspense,{fallback:null,children:Object(O.jsx)(V,{})})}),Object(O.jsx)(l.b,{exact:!0,path:"/list",children:Object(O.jsx)(yt,{})}),Object(O.jsx)(l.b,{exact:!0,path:"/",children:Object(O.jsx)(h,{})}),Object(O.jsx)(l.b,{children:Object(O.jsx)(kt,{})})]})})})}),document.getElementById("root")),i()}},[[98,1,2]]]);
//# sourceMappingURL=main.918db860.chunk.js.map