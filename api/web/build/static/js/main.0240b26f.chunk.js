(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{71:function(e,t){},73:function(e,t){},96:function(e,t,n){},97:function(e,t,n){},98:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),c=n(38),a=n.n(c),i=n(12),s=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,99)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),r(e),o(e),c(e),a(e)}))},u=n(30),l=n(13),d=n(4),f=n(3),b=Object(i.b)({key:"CURRENT_USER",default:{addr:null,loggedIn:null,cid:null}}),p={logIn:f.logIn,logOut:f.unauthenticate,signUp:f.signUp,changeUser:f.reauthenticate};function j(){var e=Object(i.e)(b),t=Object(d.a)(e,2),n=t[0],o=t[1];return Object(r.useEffect)((function(){return f.currentUser().subscribe(o)}),[o]),[n,null!=n.addr,p]}var m=n(0);function O(){var e=j(),t=Object(d.a)(e,3),n=(t[0],t[1]),r=t[2],o=r.signUp,c=r.logIn,a=Object(l.g)();if(n)return Object(m.jsx)(l.a,{to:"/publish"});return Object(m.jsxs)("div",{children:[Object(m.jsx)("button",{onClick:c,children:"Log In"}),"\xa0",Object(m.jsx)("button",{onClick:o,children:"Sign up"}),"\xa0",Object(m.jsx)("button",{onClick:function(e){e.preventDefault(),a.push("/publish")},children:"Mint an NFT"})]})}var h,g=n(5),x=n.n(g),I=n(10),S=n(16),y=n(6),T="IDLE",k="PROCESSING",v=n(18),C=n(14),P=f.cdc(h||(h=Object(v.a)(["\nimport NonFungibleToken from 0xNonFungibleToken\nimport HandyItems from 0xHandyItems\n\n  pub fun main(address: Address): [UInt64] {\n    if let collection =  getAccount(address).getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath).borrow() {\n      return collection.getIDs()\n    }\n\n    return []\n  }\n"])));function N(e){return null==e?Promise.resolve([]):f.send([f.script(P),f.args([f.arg(e,C.Address)])]).then(f.decode).then((function(e){return e.sort((function(e,t){return e-t}))}))}var w,F=Object(i.c)({key:"account-items::state",default:Object(i.d)({key:"account-items::default",get:function(e){return Object(I.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",N(e));case 1:case"end":return t.stop()}}),t)})))}})}),A=Object(i.c)({key:"account-items::status",default:T});function R(e){var t=Object(i.e)(F(e)),n=Object(d.a)(t,2),r=n[0],o=n[1],c=Object(i.e)(A(e)),a=Object(d.a)(c,2),s=a[0],u=a[1];return{ids:r,status:s,mint:function(e,t,n,r,c,a){return Object(I.a)(x.a.mark((function i(){return x.a.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return u(k),i.next=3,fetch("https://nftpow.herokuapp.com/v1/handy-items/mint",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({recipient:e,name:t,tokenURI:n,color:r,info:c,quantity:a})});case 3:return i.next=5,N(e).then(o);case 5:u(T);case 6:case"end":return i.stop()}}),i)})))()},refresh:function(){return Object(I.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u(k),t.next=3,N(e).then(o);case 3:u(T);case 4:case"end":return t.stop()}}),t)})))()}}}var _=Object(f.cdc)(w||(w=Object(v.a)(['\n  import FungibleToken from 0xFungibleToken\n  import NonFungibleToken from 0xNonFungibleToken\n  import HandyItems from 0xHandyItems\n  import NFTStorefront from 0xNFTStorefront\n\n  pub fun hasItems(_ address: Address): Bool {\n    return getAccount(address)\n      .getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath)\n      .check()\n  }\n\n  pub fun hasStorefront(_ address: Address): Bool {\n    return getAccount(address)\n      .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath)\n      .check()\n  }\n\n  pub fun main(address: Address): {String: Bool} {\n    let ret: {String: Bool} = {}\n    ret["HandyItems"] = hasItems(address)\n    ret["HandyItemsMarket"] = hasStorefront(address)\n    return ret\n  }\n'])));function E(e){return null==e||""==e?Promise.resolve(!1):Object(f.send)([Object(f.script)(_),Object(f.args)([Object(f.arg)(e,C.Address)])]).then(f.decode)}var H,U=n(11),D=function(){var e=Object(I.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function L(){return B.apply(this,arguments)}function B(){return B=Object(I.a)(x.a.mark((function e(){var t,n,r,o,c,a,i,s,u,l,d,b=arguments;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=b.length>0&&void 0!==b[0]?b[0]:[],n=b.length>1&&void 0!==b[1]?b[1]:{},r=n.onStart||D,o=n.onSubmission||D,c=n.onUpdate||D,a=n.onSuccess||D,i=n.onError||D,s=n.onComplete||D,e.prev=8,r(),e.next=12,f.send(t).then(f.decode);case 12:return u=e.sent,e.t0=console,e.t1="%cTX[".concat(u,"]: "),e.t2=z,e.next=18,f.config().get("env");case 18:return e.t3=e.sent,e.t4=u,e.t5=(0,e.t2)(e.t3,e.t4),e.t6=e.t1.concat.call(e.t1,e.t5),e.t0.info.call(e.t0,e.t6,"color:purple;font-weight:bold;font-family:monospace;"),o(u),e.next=26,f.tx(u).subscribe(c);case 26:return l=e.sent,e.next=29,f.tx(u).onceSealed();case 29:return d=e.sent,l(),e.t7=console,e.t8="%cTX[".concat(u,"]: "),e.t9=z,e.next=36,f.config().get("env");case 36:return e.t10=e.sent,e.t11=u,e.t12=(0,e.t9)(e.t10,e.t11),e.t13=e.t8.concat.call(e.t8,e.t12),e.t7.info.call(e.t7,e.t13,"color:green;font-weight:bold;font-family:monospace;"),e.next=43,a(d);case 43:return e.abrupt("return",d);case 46:return e.prev=46,e.t14=e.catch(8),e.t15=console,e.t16="TX[".concat(u,"]: "),e.t17=z,e.next=53,f.config().get("env");case 53:e.t18=e.sent,e.t19=u,e.t20=(0,e.t17)(e.t18,e.t19),e.t21=e.t16.concat.call(e.t16,e.t20),e.t22=e.t14,e.t15.error.call(e.t15,e.t21,e.t22),i(e.t14);case 60:return e.prev=60,e.next=63,s();case 63:return e.finish(60);case 64:case"end":return e.stop()}}),e,null,[[8,46,60,64]])}))),B.apply(this,arguments)}function z(e,t){return"https://flow-view-source.com/".concat(e,"/tx/").concat(t)}var M=Object(f.cdc)(H||(H=Object(v.a)(["\n  import FungibleToken from 0xFungibleToken\n  import NonFungibleToken from 0xNonFungibleToken\n  import HandyItems from 0xHandyItems\n  import NFTStorefront from 0xNFTStorefront\n\n  pub fun hasItems(_ address: Address): Bool {\n    return getAccount(address)\n      .getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath)\n      .check()\n  }\n\n  pub fun hasFLOW(_ address: Address): Bool {\n    let receiver = getAccount(address)\n      .getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowReceiver)\n      .check()\n\n    let balance = getAccount(address)\n      .getCapability<&FlowToken.Vault{FungibleToken.Balance}>(/public/flowBalance)\n      .check()\n\n    return receiver && balance\n  }\n\n  pub fun hasStorefront(_ address: Address): Bool {\n    return getAccount(address)\n      .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath)\n      .check()\n  }\n\n  transaction {\n    prepare(acct: AuthAccount) {\n\n      if !hasItems(acct.address) {\n        if acct.borrow<&HandyItems.Collection>(from: HandyItems.CollectionStoragePath) == nil {\n          acct.save(<-HandyItems.createEmptyCollection(), to: HandyItems.CollectionStoragePath)\n        }\n        acct.unlink(HandyItems.CollectionPublicPath)\n        acct.link<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath, target: HandyItems.CollectionStoragePath)\n      }\n\n      if !hasStorefront(acct.address) {\n        if acct.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath) == nil {\n          acct.save(<-NFTStorefront.createStorefront(), to: NFTStorefront.StorefrontStoragePath)\n        }\n        acct.unlink(NFTStorefront.StorefrontPublicPath)\n        acct.link<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath, target: NFTStorefront.StorefrontStoragePath)\n      }\n    }\n  }\n"])));function K(e){return V.apply(this,arguments)}function V(){return V=Object(I.a)(x.a.mark((function e(t){var n,r=arguments;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.length>1&&void 0!==r[1]?r[1]:{},Object(U.a)(null!=t,"Tried to initialize an account but no address was supplied"),e.abrupt("return",L([Object(f.transaction)(M),Object(f.limit)(70),Object(f.proposer)(f.authz),Object(f.payer)(f.authz),Object(f.authorizations)([f.authz])],n));case 3:case"end":return e.stop()}}),e)}))),V.apply(this,arguments)}var W=Object(i.c)({key:"init::address",default:null}),G=Object(i.c)({key:"init::status",default:T}),q=Object(i.c)({key:"init::state",default:Object(i.d)({key:"init::default",get:function(e){return function(){return E(e)}}})}),J=Object(i.d)({key:"init::computed",get:function(e){return function(){var t=Object(I.a)(x.a.mark((function t(n){var r,o;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.get,o=r(q(e)),t.abrupt("return",o.HandyItems||o.HandyItemsMarket);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}});n(96);function Q(){var e=Object(r.useState)({txtAddress:"",txtName:"",txtImageURL:"",txtColor:"",txtInfo:"",txtQuantity:""}),t=Object(d.a)(e,2),n=t[0],o=t[1],c=Object(l.g)(),a=j(),s=Object(d.a)(a,1)[0],u=R(s.addr),f=function(e){var t=Object(i.e)(W(e)),n=Object(d.a)(t,2),r=n[0],o=n[1],c=Object(i.e)(q(r)),a=Object(d.a)(c,2),s=a[0],u=a[1],l=Object(i.f)(J(r)),f=Object(i.e)(G(r)),b=Object(d.a)(f,2),p=b[0],j=b[1];function m(){E(r).then(u)}return console.log(r),Object(y.a)(Object(y.a)({},s),{},{isInitialized:l,status:null==l?"LOADING":p,recheck:m,initialize:function(e){return Object(I.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:K(null!=e?e:r,{onStart:function(){j(k)},onSuccess:function(){return Object(I.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:m(),j("SUCCESS");case 2:case"end":return e.stop()}}),e)})))()},onError:function(){j("ERROR")},onComplete:function(){return Object(I.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:j(T);case 1:case"end":return e.stop()}}),e)})))()}});case 1:case"end":return t.stop()}}),t)})))()},isSpecificInitialized:function(e){return Object(I.a)(x.a.mark((function t(){var n;return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,E(e);case 2:return n=t.sent,console.log(n),o(e),t.abrupt("return",n.HandyItems||n.HandyItemsMarket);case 6:case"end":return t.stop()}}),t)})))()}})}(null),b=function(e){o(Object(y.a)(Object(y.a)({},n),{},Object(S.a)({},e.target.name,e.target.value)))},p=function(){var e=Object(I.a)(x.a.mark((function e(t){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),18==n.txtAddress.length){e.next=4;break}return alert("Enter Address Corretly!"),e.abrupt("return");case 4:return e.next=6,f.isSpecificInitialized(n.txtAddress);case 6:if(e.sent){e.next=9;break}return alert("Initialize account first!"),e.abrupt("return");case 9:u.mint(n.txtAddress,n.txtName,n.txtImageURL,n.txtColor,n.txtInfo,n.txtQuantity),console.log(u.ids.length);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(m.jsxs)("div",{className:"grid-center",children:[Object(m.jsx)("h1",{children:s.addr}),Object(m.jsx)("h1",{children:"Publish a NFT"}),Object(m.jsx)("form",{children:Object(m.jsxs)("div",{className:"grid-container",children:[Object(m.jsx)("label",{htmlFor:"txtName",children:"Name"}),Object(m.jsx)("input",{name:"txtName",id:"txtName",onChange:b}),Object(m.jsx)("label",{htmlFor:"txtAddress",children:"Address"}),Object(m.jsx)("input",{name:"txtAddress",id:"txtAddress",onChange:b}),Object(m.jsx)("label",{children:"Image URL"}),Object(m.jsx)("input",{name:"txtImageURL",id:"txtImageURL",onChange:b}),Object(m.jsx)("label",{children:"Color"}),Object(m.jsx)("input",{name:"txtColor",id:"txtColor",onChange:b}),Object(m.jsx)("label",{children:"Info"}),Object(m.jsx)("input",{name:"txtInfo",id:"txtInfo",onChange:b}),!1,Object(m.jsx)("label",{children:"Series"}),Object(m.jsx)("input",{name:"txtSeries",id:"txtSeries",onChange:b}),Object(m.jsx)("button",{disabled:s.addr!==n.txtAddress,onClick:function(e){e.preventDefault(),f.initialize(n.txtAddress)},children:"Initialize"}),Object(m.jsx)("button",{disabled:u.status!==T,onClick:p,children:"Send"}),Object(m.jsx)("button",{onClick:function(e){e.preventDefault(),c.push("/list")},children:"View List"})]})})]})}var X,Y,Z,$,ee,te=n(22),ne=n(8),re=n(32),oe="SET_CALLBACK",ce="PROCESS",ae="MAYBE_PROCESS",ie="TIMEOUT",se="ENQUEUE",ue="RESOLVE",le=(X={},Object(S.a)(X,ne.a,(function(e){e.put("need",new Set),e.put("processing",new Set),e.put("hold",{}),setInterval((function(){return e.sendSelf(ie)}),500)})),Object(S.a)(X,oe,(function(e,t,n){e.put("callback",Object(I.a)(x.a.mark((function e(){var t=arguments;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n.apply(void 0,t));case 1:case"end":return e.stop()}}),e)})))),e.sendSelf(ae)})),Object(S.a)(X,se,(function(e,t,n){var r=Object(re.a)(),o={id:r,args:n,reply:t.reply};e.update("need",(function(e){return e.add(r),e})),e.update("hold",(function(e){return Object(y.a)(Object(y.a)({},e),{},Object(S.a)({},r,o))})),e.sendSelf(ae)})),Object(S.a)(X,ie,(function(e){e.get("need").size&&e.sendSelf(ce)})),Object(S.a)(X,ae,(function(e){e.get("need")>=10&&e.sendSelf(ce)})),Object(S.a)(X,ce,(function(e){var t=e.get("callback");if("function"===typeof t){var n=e.get("need");e.update("processing",(function(e){return new Set([].concat(Object(te.a)(e),Object(te.a)(n)))})),e.put("need",new Set);var r=e.get("hold");t(Object(te.a)(n).reduce((function(e,t){return Object(y.a)(Object(y.a)({},e),{},Object(S.a)({},t,r[t].args))}),{})).then((function(t){e.sendSelf(ue,t)}))}})),Object(S.a)(X,ue,(function(e,t,n){for(var r=Object.keys(n),o=function(){var t=a[c];e.get("hold")[t].reply(n[t]),e.update("processing",(function(e){return e.delete(t),e})),e.update("hold",(function(e){return delete e[t],e}))},c=0,a=r;c<a.length;c++)o()})),X),de=f.cdc(Y||(Y=Object(v.a)(["\nimport NonFungibleToken from 0xNonFungibleToken\nimport HandyItems from 0xHandyItems\n\npub struct AccountItem {\n  pub let itemID: UInt64\n  pub let name: String\n  pub let tokenURI: String\n  pub let color: String\n  pub let info: String\n  pub let owner: Address\n\n  init(itemID: UInt64, name: String, tokenURI: String, color: String, info: String, owner: Address) {\n    self.itemID = itemID\n    self.name = name\n    self.tokenURI = tokenURI\n    self.color = color\n    self.info = info\n    self.owner = owner\n  }\n}\n\npub fun fetch(address: Address, id: UInt64): AccountItem? {\n  if let col = getAccount(address).getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath).borrow() {\n    if let item = col.borrowHandyItem(id: id) {\n      return AccountItem(itemID: id, name: item.name, tokenURI: item.tokenURI, \n        color: item.color, info: item.info, owner: address)\n    }\n  }\n\n  return nil\n}\n\npub fun main(keys: [String], addresses: [Address], ids: [UInt64]): {String: AccountItem?} {\n  let r: {String: AccountItem?} = {}\n  var i = 0\n  while i < keys.length {\n    let key = keys[i]\n    let address = addresses[i]\n    let id = ids[i]\n    r[key] = fetch(address: address, id: id)\n    i = i + 1\n  }\n  return r\n}\n"]))),fe=function(e){return Object.keys(e).reduce((function(t,n){return t.keys.push(n),t.addresses.push(e[n][0]),t.ids.push(e[n][1]),t}),{keys:[],addresses:[],ids:[]})},be=(Z="FETCH_ACCOUNT_ITEM",$=function(){var e=Object(I.a)(x.a.mark((function e(t){var n,r,o,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=fe(t),r=n.keys,o=n.addresses,c=n.ids,e.abrupt("return",f.send([f.script(de),f.args([f.arg(r,C.Array(C.String)),f.arg(o,C.Array(C.Address)),f.arg(c.map(Number),C.Array(C.UInt64))])]).then(f.decode));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Object(ne.h)(le,Z),Object(ne.f)(Z,oe,$),{enqueue:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return Object(ne.f)(Z,se,t,{expectReply:!0,timeout:0})}}),pe=be.enqueue;function je(e,t){return me.apply(this,arguments)}function me(){return(me=Object(I.a)(x.a.mark((function e(t,n){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=t){e.next=2;break}return e.abrupt("return",Promise.resolve(null));case 2:if(null!=n){e.next=4;break}return e.abrupt("return",Promise.resolve(null));case 4:return e.abrupt("return",pe(t,n));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Oe=f.cdc(ee||(ee=Object(v.a)(['\n  import FungibleToken from 0xFungibleToken\n  import NonFungibleToken from 0xNonFungibleToken\n  import FlowToken from 0xFlowToken \n  import HandyItems from 0xHandyItems\n  import NFTStorefront from 0xNFTStorefront\n\n  transaction(saleItemID: UInt64, saleItemPrice: UFix64) {\n\n    let flowReceiver: Capability<&FlowToken.Vault{FungibleToken.Receiver}>\n    let handyItemsCollection: Capability<&HandyItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>\n    let storefront: &NFTStorefront.Storefront\n\n    prepare(account: AuthAccount) {\n      // We need a provider capability, but one is not provided by default so we create one if needed.\n      let handyItemsCollectionProviderPrivatePath = /private/handyItemsCollectionProvider\n\n      self.flowReceiver = account.getCapability<&FlowToken.Vault{FungibleToken.Receiver}>(/public/flowTokenReceiver)!\n\n      assert(self.flowReceiver.borrow() != nil, message: "Missing or mis-typed FlowToken receiver")\n\n      if !account.getCapability<&HandyItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(handyItemsCollectionProviderPrivatePath)!.check() {\n        account.link<&HandyItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(handyItemsCollectionProviderPrivatePath, target: HandyItems.CollectionStoragePath)\n      }\n\n      self.handyItemsCollection = account.getCapability<&HandyItems.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(handyItemsCollectionProviderPrivatePath)!\n      assert(self.handyItemsCollection.borrow() != nil, message: "Missing or mis-typed HandyItemsCollection provider")\n      \n      self.storefront = account.borrow<&NFTStorefront.Storefront>(from: NFTStorefront.StorefrontStoragePath)\n        ?? panic("Missing or mis-typed NFTStorefront Storefront")\n    }\n\n    execute {\n      let saleCut = NFTStorefront.SaleCut(\n        receiver: self.flowReceiver,\n        amount: saleItemPrice\n      )\n\n      self.storefront.createSaleOffer(\n        nftProviderCapability: self.handyItemsCollection,\n        nftType: Type<@HandyItems.NFT>(),\n        nftID: saleItemID,\n        salePaymentVaultType: Type<@FlowToken.Vault>(),\n        saleCuts: [saleCut]\n      )\n    }\n  }\n\n'])));function he(e){var t=e.itemID,n=e.price,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(null==t)throw new Error("createSaleOffer(itemID, price) -- itemID required");if(null==n)throw new Error("createSaleOffer(itemID, price) -- price required");return L([f.transaction(Oe),f.args([f.arg(Number(t),C.UInt64),f.arg(String(n),C.UFix64)]),f.proposer(f.authz),f.payer(f.authz),f.authorizations([f.authz]),f.limit(1e3)],r)}function ge(e){return e.split("|")}var xe=Object(i.c)({key:"account-item::state",default:Object(i.d)({key:"account-item::default",get:function(e){return Object(I.a)(x.a.mark((function t(){return x.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",je.apply(void 0,Object(te.a)(ge(e))));case 1:case"end":return t.stop()}}),t)})))}})}),Ie=Object(i.c)({key:"account-item::status",default:T});function Se(e){var t=e.address,n=e.id,r=function(e,t){var n=j(),r=Object(d.a)(n,1)[0],o=R(e),c=function(e,t){return[e,t].join("|")}(e,t),a=Object(i.e)(xe(c)),s=Object(d.a)(a,2),u=s[0],l=s[1],b=Object(i.e)(Ie(c)),p=Object(d.a)(b,2),m=p[0],O=p[1];return Object(y.a)(Object(y.a)({},u),{},{status:m,owned:Object(f.sansPrefix)(r.addr)===Object(f.sansPrefix)(e),refresh:function(){return Object(I.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return O(k),e.next=3,je.apply(void 0,Object(te.a)(ge(c))).then(l);case 3:O(T);case 4:case"end":return e.stop()}}),e)})))()},sell:function(e){return Object(I.a)(x.a.mark((function n(){return x.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,he({itemID:t,price:e},{onStart:function(){O(k)},onSuccess:function(){return Object(I.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o.refresh();case 1:case"end":return e.stop()}}),e)})))()},onComplete:function(){return Object(I.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:O(T);case 1:case"end":return e.stop()}}),e)})))()},onError:function(e){return Object(I.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()}});case 2:case"end":return n.stop()}}),n)})))()}})}(t,n);r.status;return null==t||null==n?null:Object(m.jsxs)("div",{className:"grid-list",children:[Object(m.jsxs)("h3",{children:["Handy#",r.itemID]}),Object(m.jsx)("p",{children:r.name}),Object(m.jsx)("p",{children:r.tokenURI}),Object(m.jsx)("p",{children:r.color}),Object(m.jsx)("p",{children:r.info}),Object(m.jsx)("button",{onClick:function(){return r.sell("5.0")},children:"Sell"})]})}function ye(e){return Object(m.jsx)(r.Suspense,{fallback:null,children:Object(m.jsx)(Se,Object(y.a)({},e))})}function Te(e){var t=e.address,n=R(t),r=j();Object(d.a)(r,1)[0];return null==t?null:n.ids.length<=0?Object(m.jsx)("p",{children:"No Items"}):Object(m.jsxs)("div",{children:[Object(m.jsxs)("div",{className:"grid-list",children:[Object(m.jsx)("h2",{children:"ID"}),Object(m.jsx)("h2",{children:"Name"}),Object(m.jsx)("h2",{children:"Image URL"}),Object(m.jsx)("h2",{children:"Color"}),Object(m.jsx)("h2",{children:"Info"})]}),n.ids.map((function(e){return Object(m.jsx)(ye,{id:e,address:t},e)}))]})}function ke(e){var t=e.address;return Object(m.jsx)(r.Suspense,{fallback:null,children:Object(m.jsx)(Te,{address:t})})}var ve;n(97);function Ce(){var e=Object(r.useState)({txtAddress:""}),t=Object(d.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),a=Object(d.a)(c,2),i=a[0],s=a[1],u=Object(r.useState)(0),f=Object(d.a)(u,2),b=f[0],p=f[1],O=Object(l.g)(),h=j();Object(d.a)(h,1)[0];return Object(m.jsxs)("div",{children:[Object(m.jsx)("h1",{children:"NFT Listings"}),Object(m.jsxs)("div",{children:[Object(m.jsx)("label",{children:"Address: "}),Object(m.jsx)("input",{name:"txtAddress",id:"txtAddress",onChange:function(e){o(Object(y.a)(Object(y.a)({},n),{},Object(S.a)({},e.target.name,e.target.value)))}}),"\xa0",Object(m.jsx)("button",{onClick:function(e){18==n.txtAddress.length?(s(n.txtAddress),p(1-b)):alert("Enter Address Corretly!")},children:"List NFTs"}),"\xa0",Object(m.jsx)("button",{onClick:function(e){e.preventDefault(),O.push("/publish")},children:"Mint an NFT"}),""!=i&&Object(m.jsx)(ke,{address:i})]})]})}var Pe=Object(f.cdc)(ve||(ve=Object(v.a)(['\nimport NFTStorefront from 0xNFTStorefront\n\npub fun main(account: Address): [UInt64] {\n    let storefrontRef = getAccount(account)\n        .getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(\n            NFTStorefront.StorefrontPublicPath\n        )\n        .borrow()\n        ?? panic("Could not borrow public storefront from address")\n    \n    return storefrontRef.getSaleOfferIDs()\n}\n'])));function Ne(e){return null==e||""==e?Promise.resolve([]):Object(f.send)([Object(f.script)(Pe),Object(f.args)([Object(f.arg)(e,C.Address)])]).then(f.decode)}var we,Fe=Object(i.b)({key:"market-items::state",default:[]}),Ae=Object(i.b)({key:"market-items::status",default:T});function Re(){return(Re=Object(I.a)(x.a.mark((function e(t,n){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(f.send)([Object(f.script)(we||(we=Object(v.a)(["\n        import HandyItems from 0xHandyItems\n        import NonFungibleToken from 0xNonFungibleToken\n        import NFTStorefront from 0xNFTStorefront\n\n        pub struct SaleItem {\n          pub let itemID: UInt64\n          pub let name: String\n          pub let tokenURI: String\n          pub let color: String\n          pub let info: String\n          pub let owner: Address\n          pub let price: UFix64\n\n          init(itemID: UInt64, name: String, tokenURI: String, color: String,info: String, owner: Address, price: UFix64) {\n            self.itemID = itemID\n            self.name = name\n            self.tokenURI = tokenURI\n            self.color = color\n            self.info = info\n            self.owner = owner\n            self.price = price\n          }\n        }\n\n        pub fun main(address: Address, saleOfferResourceID: UInt64): SaleItem? {\n          let account = getAccount(address)\n\n          if let storefrontRef = account.getCapability<&NFTStorefront.Storefront{NFTStorefront.StorefrontPublic}>(NFTStorefront.StorefrontPublicPath).borrow() {\n            if let saleOffer = storefrontRef.borrowSaleOffer(saleOfferResourceID: saleOfferResourceID) {\n              let details = saleOffer.getDetails()\n\n              let itemID = details.nftID\n              let itemPrice = details.salePrice\n\n              if let collection = account.getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath).borrow() {\n                if let item = collection.borrowHandyItem(id: itemID) {\n                  return SaleItem(itemID: itemID, name: item.name, tokenURI: item.tokenURI, \n                    color: item.color, info: item.info, owner: address, price: itemPrice)\n                }\n              }\n            }\n          }\n            \n          return nil\n        }\n    "]))),Object(f.args)([Object(f.arg)(t,C.Address),Object(f.arg)(Number(n),C.UInt64)])]).then(f.decode));case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _e(e,t){var n=Object(r.useState)({}),o=Object(d.a)(n,2),c=o[0],a=o[1];return Object(r.useEffect)((function(){(function(e,t){return Re.apply(this,arguments)})(e,t).then(a)}),[]),Object(y.a)({},c)}function Ee(e){var t=e.address,n=e.id,r=j(),o=Object(d.a)(r,2),c=(o[0],o[1],_e(t,n));return console.log(c),Object(m.jsxs)("div",{children:["ID: ",c.itemID," name: ",c.name," Image URL: ",c.tokenURI," color: ",c.color]})}function He(e){return Object(m.jsx)(r.Suspense,{fallback:null,children:Object(m.jsx)(Ee,Object(y.a)({},e))})}function Ue(){var e=function(e){var t=Object(i.e)(Fe),n=Object(d.a)(t,2),o=n[0],c=n[1],a=Object(i.e)(Ae),s=Object(d.a)(a,2),u=s[0];return s[1],Object(r.useEffect)((function(){Ne(e).then(c)}),[e]),{items:o,status:u,refresh:function(){Ne(e).then(c)}}}("0x048ac6df55e9c6e6"),t=e.items;return 0==t.length?Object(m.jsx)("p",{children:"No items listed for sale"}):Object(m.jsx)("ul",{children:t.map((function(e){return Object(m.jsx)(He,{id:e,address:"0x048ac6df55e9c6e6"},e)}))})}function De(){return Object(m.jsx)(r.Suspense,{fallback:null,children:Object(m.jsx)(Ue,{})})}function Le(){Object(l.g)();var e=j(),t=Object(d.a)(e,1)[0];return Object(m.jsxs)("div",{className:"grid-center",children:[Object(m.jsx)("h1",{children:t.addr}),Object(m.jsx)(De,{})]})}function Be(){return Object(m.jsx)("div",{children:"Page Not Found"})}window.fcl=f,window.t=C,f.config().put("faucet","https://testnet-faucet.onflow.org/fund-account").put("accessNode.api","https://access-testnet.onflow.org").put("challenge.handshake","https://fcl-discovery.onflow.org/testnet/authn").put("0xFungibleToken","0x9a0766d93b6608b7").put("0xNonFungibleToken","0xab5876435fbf2063").put("0xNFTStorefront","0xab5876435fbf2063").put("0xHandyItems","0xab5876435fbf2063").put("0xFlowToken","0x7e60df042a9c0868").put("decoder.Type",(function(e){return e.staticType})),console.log(Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_API_ITEM_MINT:"https://nftpow.herokuapp.com/v1/handy-items/mint",REACT_APP_API_URL:"https://nftpow.herokuapp.com",REACT_APP_CONTRACT_FLOW_TOKEN:"0x7e60df042a9c0868",REACT_APP_CONTRACT_FUNGIBLE_TOKEN:"0x9a0766d93b6608b7",REACT_APP_CONTRACT_HANDY_ITEMS:"0xab5876435fbf2063",REACT_APP_CONTRACT_NFT_STOREFRONT:"0xab5876435fbf2063",REACT_APP_CONTRACT_NON_FUNGIBLE_TOKEN:"0xab5876435fbf2063",REACT_APP_FAUCET_ADDRESS:"https://testnet-faucet.onflow.org/fund-account",REACT_APP_FLOW_ACCESS_API_URL:"https://access-testnet.onflow.org",REACT_APP_FLOW_ADDRESS:"0xab5876435fbf2063",REACT_APP_FLOW_TOKEN_ADDRESS:"0x7e60df042a9c0868",REACT_APP_FUNGIBLE_TOKEN_ADDRESS:"0x9a0766d93b6608b7",REACT_APP_NON_FUNGIBLE_TOKEN_ADDRESS:"0xab5876435fbf2063",REACT_APP_WALLET_DISCOVERY:"https://fcl-discovery.onflow.org/testnet/authn"})),a.a.render(Object(m.jsx)(o.a.StrictMode,{children:Object(m.jsx)(i.a,{children:Object(m.jsx)(u.a,{children:Object(m.jsxs)(l.d,{children:[Object(m.jsx)(l.b,{exact:!0,path:"/publish",children:Object(m.jsx)(r.Suspense,{fallback:null,children:Object(m.jsx)(Q,{})})}),Object(m.jsx)(l.b,{exact:!0,path:"/list",children:Object(m.jsx)(Ce,{})}),Object(m.jsx)(l.b,{exact:!0,path:"/market",children:Object(m.jsx)(Le,{})}),Object(m.jsx)(l.b,{exact:!0,path:"/",children:Object(m.jsx)(O,{})}),Object(m.jsx)(l.b,{children:Object(m.jsx)(Be,{})})]})})})}),document.getElementById("root")),s()}},[[98,1,2]]]);
//# sourceMappingURL=main.0240b26f.chunk.js.map