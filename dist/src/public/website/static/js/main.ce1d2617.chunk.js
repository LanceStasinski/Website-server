(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],[,,,,,,,,,,,,function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var c=n(1),a=Object(c.createContext)({isLoggedIn:!1,userId:"",username:"",token:"",login:function(e,t,n,c){},logout:function(){}})},function(e,t,n){e.exports={"loading-spinner__overlay":"LoadingSpinner_loading-spinner__overlay__Nj7Ui","center-spinner":"LoadingSpinner_center-spinner__2vNux","ldio-3vi3igwauhw":"LoadingSpinner_ldio-3vi3igwauhw__80mjp","loadingio-spinner-gear-3eru7zplu16":"LoadingSpinner_loadingio-spinner-gear-3eru7zplu16__1eVxx"}},function(e,t,n){e.exports={"menu-btn":"MainNavigation_menu-btn__NuUNW","main-title":"MainNavigation_main-title__p93rJ","main-nav":"MainNavigation_main-nav__jtnTe"}},,,,,function(e,t,n){e.exports={"nav-links":"NavLinks_nav-links__3LEXZ","nav-links_auth":"NavLinks_nav-links_auth__2gvGZ"}},function(e,t,n){e.exports={"drawer-nav-links":"DrawerNavLinks_drawer-nav-links__3sald","drawer-nav-links-auth":"DrawerNavLinks_drawer-nav-links-auth__FSs38",active:"DrawerNavLinks_active__11nzs"}},function(e,t,n){"use strict";n(1);var c=n(8),a=n.n(c),i=n(30),r=n.n(i),s=n(0);t.a=function(e){return a.a.createPortal(Object(s.jsx)("div",{className:"".concat(r.a.backdrop," ").concat(e.backdropClass),onClick:e.onClick}),document.getElementById("backdrop-hook"))}},function(e,t,n){"use strict";n(1);var c=n(13),a=n.n(c),i=n(0);t.a=function(e){return Object(i.jsx)("div",{className:"".concat(e.asOverlay&&a.a["loading-spinner__overlay"]),children:Object(i.jsx)("div",{className:a.a["center-spinner"],children:Object(i.jsx)("div",{className:a.a["loadingio-spinner-gear-3eru7zplu16"],children:Object(i.jsx)("div",{className:a.a["ldio-3vi3igwauhw"],children:Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{}),Object(i.jsx)("div",{}),Object(i.jsx)("div",{}),Object(i.jsx)("div",{}),Object(i.jsx)("div",{}),Object(i.jsx)("div",{})]})})})})})}},,function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var c=n(1),a=Object(c.createContext)({post:{},setContext:function(e,t,n,c,a,i,r,s,j){},clearContext:function(){}})},function(e,t,n){e.exports={"main-header":"MainHeader_main-header__1_9vD"}},function(e,t,n){e.exports={"active-link":"NavItem_active-link__2vQ1Y"}},,,function(e,t,n){e.exports={"side-drawer":"SideDrawer_side-drawer__3vVd_"}},function(e,t,n){e.exports={backdrop:"Backdrop_backdrop__2U85w"}},function(e,t,n){e.exports={"active-link":"DrawerNavItem_active-link__26FB4","drawer-nav-item":"DrawerNavItem_drawer-nav-item__2s2Nj"}},,,,,,,function(e,t,n){},function(e,t,n){},,,,,,,,,function(e,t,n){"use strict";n.r(t);var c,a=n(1),i=n.n(a),r=n(8),s=n.n(r),j=(n(38),n(2)),l=n(10),o=(n(39),n(9)),b=n(25),d=n.n(b),u=n(0),O=function(e){return Object(u.jsx)("header",{className:d.a["main-header"],children:e.children})},x=n(26),h=n.n(x),v=function(e){return Object(u.jsx)(l.c,{to:e.to,exact:!!e.exact,activeClassName:h.a["active-link"],children:e.children})},p=n(19),m=n.n(p),g=n(12),f=function(){var e=Object(a.useContext)(g.a);return Object(u.jsxs)("ul",{className:m.a["nav-links"],children:[Object(u.jsx)("li",{children:Object(u.jsx)(v,{to:"/resume",children:"RESUME"})}),Object(u.jsx)("li",{children:Object(u.jsx)(v,{to:"/portfolio",children:"PORTFOLIO"})}),Object(u.jsx)("li",{children:Object(u.jsx)(v,{to:"/blog",children:"BLOG"})}),Object(u.jsx)("li",{children:Object(u.jsx)(v,{to:"/contact",children:"CONTACT"})}),e.isLoggedIn&&Object(u.jsx)("li",{children:Object(u.jsx)("button",{onClick:e.logout,children:"LOGOUT"})}),!e.isLoggedIn&&Object(u.jsx)("li",{className:m.a["nav-links_auth"],children:Object(u.jsx)(v,{to:"/auth",authLink:!0,children:"LOGIN"})})]})},_=n(14),k=n.n(_),N=n(50),w=n(29),C=n.n(w),I=function(e){var t=Object(a.useRef)(null),n=Object(u.jsx)(N.a,{in:e.show,timeout:200,classNames:"slide-in-down",mountOnEnter:!0,unmountOnExit:!0,nodeRef:t,children:Object(u.jsx)("aside",{ref:t,onClick:e.onClick,className:C.a["side-drawer"],children:e.children})}),c=document.getElementById("drawer-hook");return s.a.createPortal(n,c)},L=n(21),S=n(31),y=n.n(S),T=function(e){return Object(u.jsx)(l.c,{to:e.to,exact:!!e.exact,activeClassName:e.important?"":y.a["active-link"],children:e.children})},D=n(20),E=n.n(D),z=function(){var e=Object(a.useContext)(g.a);return Object(u.jsxs)("ul",{className:E.a["drawer-nav-links"],children:[Object(u.jsx)("li",{children:Object(u.jsx)(T,{to:"/resume",children:"RESUME"})}),Object(u.jsx)("li",{children:Object(u.jsx)(T,{to:"/portfolio",children:"PORTFOLIO"})}),Object(u.jsx)("li",{children:Object(u.jsx)(T,{to:"/blog",children:"BLOG"})}),Object(u.jsx)("li",{children:Object(u.jsx)(T,{to:"/contact",children:"CONTACT"})}),!e.isLoggedIn&&Object(u.jsx)("li",{className:E.a["drawer-nav-links-auth"],children:Object(u.jsx)(T,{to:"/auth",important:!0,children:"LOGIN"})}),e.isLoggedIn&&Object(u.jsx)("li",{children:Object(u.jsx)("button",{onClick:e.logout,children:"LOGOUT"})})]})},P=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],c=t[1],r=function(){c(!1)};return Object(u.jsxs)(i.a.Fragment,{children:[n&&Object(u.jsx)(L.a,{onClick:r}),Object(u.jsx)(I,{show:n,onClick:r,children:Object(u.jsx)("nav",{children:Object(u.jsx)(z,{})})}),Object(u.jsxs)(O,{children:[Object(u.jsx)(l.b,{to:"/",className:k.a["main-title"],children:"LANCE STASINSKI"}),Object(u.jsxs)("button",{className:k.a["menu-btn"],onClick:function(){c(!0)},children:[Object(u.jsx)("span",{}),Object(u.jsx)("span",{}),Object(u.jsx)("span",{})]}),Object(u.jsx)("nav",{className:k.a["main-nav"],children:Object(u.jsx)(f,{})})]})]})},B=n(22),G=n(24),M=Object(a.lazy)((function(){return n.e(12).then(n.bind(null,330))})),U=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(10)]).then(n.bind(null,327))})),R=Object(a.lazy)((function(){return n.e(7).then(n.bind(null,334))})),A=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(3),n.e(6)]).then(n.bind(null,331))})),F=Object(a.lazy)((function(){return n.e(8).then(n.bind(null,333))})),J=Object(a.lazy)((function(){return n.e(5).then(n.bind(null,329))})),V=Object(a.lazy)((function(){return Promise.all([n.e(0),n.e(11)]).then(n.bind(null,328))})),Z=Object(a.lazy)((function(){return n.e(9).then(n.bind(null,332))}));var H=function(){var e,t=function(){var e=Object(a.useState)(""),t=Object(o.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(),s=Object(o.a)(r,2),j=s[0],l=s[1],b=Object(a.useState)(""),d=Object(o.a)(b,2),u=d[0],O=d[1],x=Object(a.useState)(""),h=Object(o.a)(x,2),v=h[0],p=h[1],m=Object(a.useCallback)((function(e,t,n,c){p(n),i(t),O(e);var a=c||new Date((new Date).getTime()+72e5);l(a),localStorage.setItem("user",JSON.stringify({userId:e,token:t,username:n,expiration:a.toISOString()}))}),[]);Object(a.useEffect)((function(){var e=JSON.parse(localStorage.getItem("user"));e&&e.token&&new Date(e.expiration)>new Date&&m(e.userId,e.token,e.username,new Date(e.expiration))}),[m]);var g=Object(a.useCallback)((function(){i(""),l(void 0),O(""),localStorage.removeItem("user")}),[]);return Object(a.useEffect)((function(){if(n&&j){var e=j.getTime()-(new Date).getTime();c=setTimeout(g,e)}else clearTimeout(c)}),[n,j,g]),{token:n,login:m,logout:g,userId:u,username:v}}(),n=t.token,i=t.login,r=t.logout,s=t.userId,b=t.username,d=function(){var e=Object(a.useState)(),t=Object(o.a)(e,2),n=t[0],c=t[1];return{post:n,setContext:Object(a.useCallback)((function(e,t,n,a,i,r,s,j,l){c({id:e,title:t,blurb:n,tags:a,headImg:i,headImgCaption:r,headImgAlt:s,content:j,references:l})}),[]),clearContext:Object(a.useCallback)((function(){c(void 0)}),[])}}(),O=d.post,x=d.setContext,h=d.clearContext;return e=n&&"619670d89157143ae678d88d"===s?Object(u.jsxs)(j.d,{children:[Object(u.jsx)(j.b,{path:"/",exact:!0,children:Object(u.jsx)(M,{})}),Object(u.jsx)(j.b,{path:"/resume",exact:!0,children:Object(u.jsx)(J,{})}),Object(u.jsx)(j.b,{path:"/portfolio",exact:!0,children:Object(u.jsx)(Z,{})}),Object(u.jsx)(j.b,{path:"/blog",exact:!0,children:Object(u.jsx)(R,{})}),Object(u.jsx)(j.b,{path:"/contact",exact:!0,children:Object(u.jsx)(V,{})}),Object(u.jsxs)(G.a.Provider,{value:{post:O,setContext:x,clearContext:h},children:[Object(u.jsx)(j.b,{path:"/blog/create",exact:!0,children:Object(u.jsx)(F,{})}),Object(u.jsx)(j.b,{path:"/blog/post/:postId",exact:!0,children:Object(u.jsx)(A,{})})]}),Object(u.jsx)(j.a,{to:"/"})]}):n?Object(u.jsxs)(j.d,{children:[Object(u.jsx)(j.b,{path:"/",exact:!0,children:Object(u.jsx)(M,{})}),Object(u.jsx)(j.b,{path:"/resume",exact:!0,children:Object(u.jsx)(J,{})}),Object(u.jsx)(j.b,{path:"/portfolio",exact:!0,children:Object(u.jsx)(Z,{})}),Object(u.jsx)(j.b,{path:"/blog",exact:!0,children:Object(u.jsx)(R,{})}),Object(u.jsx)(j.b,{path:"/blog/post/:postId",exact:!0,children:Object(u.jsx)(A,{})}),Object(u.jsx)(j.b,{path:"/contact",exact:!0,children:Object(u.jsx)(V,{})}),Object(u.jsx)(j.a,{to:"/"})]}):Object(u.jsxs)(j.d,{children:[Object(u.jsx)(j.b,{path:"/",exact:!0,children:Object(u.jsx)(M,{})}),Object(u.jsx)(j.b,{path:"/resume",exact:!0,children:Object(u.jsx)(J,{})}),Object(u.jsx)(j.b,{path:"/portfolio",exact:!0,children:Object(u.jsx)(Z,{})}),Object(u.jsx)(j.b,{path:"/blog",exact:!0,children:Object(u.jsx)(R,{})}),Object(u.jsx)(j.b,{path:"/blog/post/:postId",exact:!0,children:Object(u.jsx)(A,{})}),Object(u.jsx)(j.b,{path:"/contact",exact:!0,children:Object(u.jsx)(V,{})}),Object(u.jsx)(j.b,{path:"/auth",exact:!0,children:Object(u.jsx)(U,{})}),Object(u.jsx)(j.a,{to:"/"})]}),Object(u.jsx)(g.a.Provider,{value:{isLoggedIn:!!n,login:i,username:b,logout:r,userId:s,token:n},children:Object(u.jsxs)(l.a,{children:[Object(u.jsx)(P,{}),Object(u.jsx)("main",{children:Object(u.jsx)(a.Suspense,{fallback:Object(u.jsx)(B.a,{asOverlay:!1}),children:e})})]})})};s.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(H,{})}),document.getElementById("root"))}],[[48,2,4]]]);
//# sourceMappingURL=main.ce1d2617.chunk.js.map