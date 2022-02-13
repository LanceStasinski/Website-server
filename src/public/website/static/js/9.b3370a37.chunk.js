(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{325:function(e,t,a){e.exports={backdrop:"Portfolio_backdrop__10Izn",portfolio:"Portfolio_portfolio__1BNMn",appear:"Portfolio_appear__cboxn",projects:"Portfolio_projects__sLafc"}},326:function(e,t,a){e.exports={"project-card":"PortfolioCard_project-card__2SGsK",removeShadow:"PortfolioCard_removeShadow__3_9jj",drawShadow:"PortfolioCard_drawShadow__2tnk-","project-thumbnail":"PortfolioCard_project-thumbnail__tE0s9","project-info":"PortfolioCard_project-info__TJVU_","project-links":"PortfolioCard_project-links__22UkF","project-links-button":"PortfolioCard_project-links-button__JCXSR",github:"PortfolioCard_github__3Z1KM",spin:"PortfolioCard_spin__1iBvD","modal-backdrop":"PortfolioCard_modal-backdrop__2sWKD"}},333:function(e,t,a){"use strict";a.r(t);var n=a(9),o=a(1),r=a.n(o),c=a(325),i=a.n(c),s=a(326),l=a.n(s),d=a(59),p=a(83),b=a(52),u=a(0),h=function(e){return Object(u.jsx)(r.a.Fragment,{children:Object(u.jsxs)(d.a,{className:l.a["project-card"],children:[Object(u.jsx)("img",{className:l.a["project-thumbnail"],src:e.image,alt:e.title}),Object(u.jsxs)("div",{className:l.a["project-info"],children:[Object(u.jsx)("h2",{children:e.title}),Object(u.jsx)("p",{children:e.description}),Object(u.jsxs)("p",{children:[Object(u.jsx)("b",{children:"Technologies used:"})," ",e.technologies]})]}),Object(u.jsxs)("div",{className:l.a["project-links"],children:[e.external&&Object(u.jsx)(b.a,{className:l.a["project-links-button"],href:e.projectUrl,children:"Visit"}),!e.external&&Object(u.jsx)(b.a,{className:l.a["project-links-button"],to:e.projectUrl,children:"Visit"}),Object(u.jsx)("a",{href:e.gitHubLink,className:l.a.github,target:"_blank",rel:"noopener noreferrer",children:Object(u.jsx)("img",{title:"Github repo",src:p.a,alt:"Github icon"})})]})]})})},j=a.p+"static/media/website.1de03071.JPG",f=a.p+"static/media/travel-app.b1005f6e.JPG",m=a.p+"static/media/NLP-app.73d37620.JPG",g=a.p+"static/media/weather-journal-app.5621c375.JPG",_=a(55),x="https://lancestasinski.herokuapp.com";t.default=function(){document.title="Portfolio | Lance Stasinski";var e=Object(o.useState)(!1),t=Object(n.a)(e,2),a=t[0],c=t[1],s=function(){c(!1)};return Object(o.useEffect)((function(){c(!0)}),[]),Object(u.jsxs)(r.a.Fragment,{children:[Object(u.jsx)(_.a,{show:a,onCancel:s,header:"NOTICE",footer:Object(u.jsx)(b.a,{inverse:!0,onClick:s,children:"Okay"}),backdropClass:i.a.backdrop,children:Object(u.jsx)("p",{children:"This page is still under development. More projects will be added soon!"})}),Object(u.jsxs)("div",{className:i.a.portfolio,children:[Object(u.jsx)("h1",{children:"PORTFOLIO"}),Object(u.jsx)("hr",{}),Object(u.jsxs)("div",{className:i.a.projects,children:[Object(u.jsx)(h,{image:g,gitHubLink:"https://github.com/LanceStasinski/FEND-03-WeatherJournalApp-React",external:!0,projectUrl:"".concat(x,"/weather-journal-app"),title:"Weather Journal",description:"This app generates a journal entry that contains text input by the user and weather data for the selected zip code. The user has access to complete CRUD operations and they can change their zip code or their prefered measurement units at any time.",technologies:"TypeScript, React, styled components, Node/Express, MongoDB, Axios"}),Object(u.jsx)(h,{image:j,gitHubLink:"https://github.com/LanceStasinski/Website-client",external:!1,projectUrl:"".concat("https://lancestasinski.herokuapp.com/"),title:"This Website",description:"My personal website is a single page web application that connects to a REST API. The blog portion is a fullstack application in itself. I write individual posts using a dynamic form and data is stored in MongoDB and an AWS S3 bucket.",technologies:"TypeScript, React, CSS Modules, Node/Express, MongoDB, AWS S3, Jest, Mocha, Chai"}),Object(u.jsx)(h,{image:f,gitHubLink:"https://github.com/LanceStasinski/FEND-05-TravelApp",external:!0,projectUrl:"".concat(x,"/travel-app"),title:"Travel App",description:"This app takes in a location and arrival and departure dates for a trip and returns the weather forecast, information about the country to be visited, and an image of the location. This app makes HTTP requests to four external APIs in specific order to gather the necessary information.",technologies:"HTML, SCSS, JavaScript, Node/Express, Webpack, Service Workers, Axios, Jest"}),Object(u.jsx)(h,{image:m,gitHubLink:"https://github.com/LanceStasinski/FEND-04-EvaluateNewsApp",external:!0,projectUrl:"".concat(x,"/sentiment-analysis-app"),title:"Sentiment Analysis App",description:"This app takes a in a URL and the UI is updated based on a sentiment analysis of the text at that URL. The sentiment analysis is performed by a natural language processor at a third party API.",technologies:"HTML, SCSS, JavaScript, Node/Express, Webpack, Service Workers, Axios"})]})]})]})}},52:function(e,t,a){"use strict";a(1);var n=a(10),o=a(57),r=a.n(o),c=a(0);t.a=function(e){return e.href?Object(c.jsx)("a",{className:"\n          ".concat(e.className,"\n          ").concat(r.a.button,"\n          ").concat(r.a["button--".concat(e.size||"default")],"\n          ").concat(e.inverse&&r.a["button--inverse"],"\n          ").concat(e.danger&&r.a["button--danger"],"\n        "),href:e.href,id:e.id,target:"_blank",rel:"noopener noreferrer",children:e.children}):e.to?Object(c.jsx)(n.b,{to:e.to,className:"\n          ".concat(e.className,"\n          ").concat(r.a.button,"\n          ").concat(r.a["button--".concat(e.size||"default")],"\n          ").concat(e.inverse&&r.a["button--inverse"],"\n          ").concat(e.danger&&r.a["button--danger"],"\n        "),id:e.id,children:e.children}):Object(c.jsx)("button",{className:"\n        ".concat(e.className,"\n        ").concat(r.a.button,"\n        ").concat(r.a["button--".concat(e.size||"default")],"\n        ").concat(e.inverse&&r.a["button--inverse"],"\n        ").concat(e.danger&&r.a["button--danger"],"\n      "),type:e.type,onClick:e.onClick,disabled:e.disabled,id:e.id,children:e.children})}},55:function(e,t,a){"use strict";var n=a(56),o=a(1),r=a.n(o),c=a(8),i=a.n(c),s=a(51),l=a(58),d=a.n(l),p=a(21),b=a(0),u=function(e){var t=Object(b.jsxs)("div",{ref:e.nodeRef,className:"".concat(d.a.modal," ").concat(e.className),style:e.style,children:[Object(b.jsx)("header",{className:"".concat(d.a.modal__header," ").concat(e.headerClass),children:Object(b.jsx)("h2",{children:e.header})}),Object(b.jsxs)("form",{onSubmit:e.onSumbit?e.onSumbit:function(e){return e.preventDefault()},children:[Object(b.jsx)("div",{className:"".concat(d.a.modal__content," ").concat(e.contentClass),children:e.children}),Object(b.jsx)("footer",{className:"".concat(d.a.modal__footer," ").concat(e.footerClass),children:e.footer})]})]});return i.a.createPortal(t,document.getElementById("modal-hook"))};t.a=function(e){var t=r.a.useRef(null);return Object(b.jsxs)(r.a.Fragment,{children:[e.show&&Object(b.jsx)(p.a,{onClick:e.onCancel,backdropClass:e.backdropClass}),Object(b.jsx)(s.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:300,classNames:"modal-transition",nodeRef:t,children:Object(b.jsx)(u,Object(n.a)(Object(n.a)({},e),{},{nodeRef:t}))})]})}},56:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(64);function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){Object(n.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}},57:function(e,t,a){e.exports={button:"Button_button__1rdVi","button--inverse":"Button_button--inverse__-1_92","button--danger":"Button_button--danger__Vl4FB","button--small":"Button_button--small__27bKE","button--big":"Button_button--big__2-DUE"}},58:function(e,t,a){e.exports={modal:"Modal_modal__3BvLd",modal__header:"Modal_modal__header__gy2sw",modal__content:"Modal_modal__content__Q822G",modal__footer:"Modal_modal__footer__2mvrH"}},59:function(e,t,a){"use strict";a(1);var n=a(60),o=a.n(n),r=a(0);t.a=function(e){return Object(r.jsx)("div",{className:"".concat(e.className," ").concat(o.a.card),style:e.style,children:e.children})}},60:function(e,t,a){e.exports={card:"Card_card__ATtpb"}},64:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))},83:function(e,t,a){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAADsklEQVRYw62XQWhcVRSGv3PfNKRvYhijSEVsr0VKlAoV7MJNNxEqJaXNxGZXW5DuLLiTULIoxRbBRZHiTkF3SppMYxUKBko3BZESMOoQCj67MYtaBjuTxDDzjot3k7xM7kxeMnMgEObce/7vnvvuPecKGa0WlQpCPAw6BBwBLFBw7goQAXMgs4q5nbenK1niyvbCU4OCjgNjgvZmCarICvCdItfytljeFUAtKvUJjSvAh4LmsmaqCaQO3FCCibw9Xc0MsBRNHQK9JejgboQ9IGWQU6EtLmwLUPtz6i0RvSPoQDfEUxBPUDkevlL8pSWAW/n9botvgkDeTmfCrK88KvW5tA+kJswrMqnI412IPXZz5zdWqwOgtxKtJgChcWXrnsvl0I6eidnzkmIuKLLoglcd3D33N69I1fkWFXMhZs/LoR09A3J5c8p10H3cG1vgjtqvzV97TPBa3o6sH6NaNF0A9i3Tv/C8HYrTY/+JZk0v/x4CFvN2pJKaM2ho/NGUnboib+RtsZxzVOMtjtomERfYe8E8lwCVt4vh9HLAOHDO1KJSARjzBRX08E73fgcxxmpRqWCEeNh3wynySJG7nQIocleRRx6wXiEeNu5u97FP5O3Ik04Bkhgy0QJvyJAUlmbq1ZhgslPxNYsJJhVZ9biOGJKq1mwP++yppW4BuFgPPS5r2Cip6RSsdEs8Zb4MFIx3qHigOrd+348G/7ne/zSaCbul7GLt97gqhqSTaUqA5gLqx7oFEFA/1uKiiwww55+mF7sF0CbWnAGZ9XkETixFU+c7lV6Kps4LnPB7ZVaSZrPxd4vbsA583KDn82fsyfpOhJ9G3+cCVj8CPhXUeGKvKMGLklDe/FrQ9xOHuQr8BnpJ0Nfd4AXgS0V+atDze78dXvGL3u4NWD0M+g7wgaCvttwU5JvQjp7bUo4VqYCcVeSeEN9fg0hN/PE/KZx89sDmclz5647p0eoPgr67XXbS5dgAuNb5BoCgBdBvgRdAzqpKUzcr15rFAQoHjscgn2TcoS/W2vX1vVGCiaR7BUFDIR4PbfGBirypyGeq8pUiF2NyP7eKuqq9DzKsvqwEl9aXk3amm1JFYpCR0BZnMq4KgOVoUtuIb2lK27blmrhngFmQKui+0I5e3Q1Apra8KRPeh8le+17b55wPoN3DxFuMQltcUIKjilx3d8GuzH3t15XgqE+8ZQbSVoumB4V4HNc3hnZ0b7vxS9HNZfdvpsdpZqtFpUItmj6YAfiga3Qz2f+WPJuV9ucZ1AAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=9.b3370a37.chunk.js.map