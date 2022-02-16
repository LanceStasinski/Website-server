(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[12],{328:function(t,e,a){t.exports={backdrop:"Portfolio_backdrop__10Izn",portfolio:"Portfolio_portfolio__1BNMn",appear:"Portfolio_appear__cboxn",projects:"Portfolio_projects__sLafc"}},329:function(t,e,a){t.exports={"project-card":"PortfolioCard_project-card__2SGsK",removeShadow:"PortfolioCard_removeShadow__3_9jj",drawShadow:"PortfolioCard_drawShadow__2tnk-","project-thumbnail":"PortfolioCard_project-thumbnail__tE0s9","project-info":"PortfolioCard_project-info__TJVU_","project-links":"PortfolioCard_project-links__22UkF","project-links-button":"PortfolioCard_project-links-button__JCXSR",github:"PortfolioCard_github__3Z1KM",spin:"PortfolioCard_spin__1iBvD","modal-backdrop":"PortfolioCard_modal-backdrop__2sWKD"}},336:function(t,e,a){"use strict";a.r(e);var n=a(1),o=a.n(n),i=a(328),s=a.n(i),c=a(329),r=a.n(c),l=a(60),p=a(85),d=a(52),b=a(0),h=function(t){return Object(b.jsx)(o.a.Fragment,{children:Object(b.jsxs)(l.a,{className:r.a["project-card"],children:[Object(b.jsx)("img",{className:r.a["project-thumbnail"],src:t.image,alt:t.title}),Object(b.jsxs)("div",{className:r.a["project-info"],children:[Object(b.jsx)("h2",{children:t.title}),Object(b.jsx)("p",{children:t.description}),Object(b.jsxs)("p",{children:[Object(b.jsx)("b",{children:"Technologies used:"})," ",t.technologies]})]}),Object(b.jsxs)("div",{className:r.a["project-links"],children:[t.external&&Object(b.jsx)(d.a,{className:r.a["project-links-button"],href:t.projectUrl,children:"Visit"}),!t.external&&Object(b.jsx)(d.a,{className:r.a["project-links-button"],to:t.projectUrl,children:"More Info"}),Object(b.jsx)("a",{href:t.gitHubLink,className:r.a.github,target:"_blank",rel:"noopener noreferrer",children:Object(b.jsx)("img",{title:"Github repo",src:p.a,alt:"Github icon"})})]})]})})},u=a.p+"static/media/website.1de03071.JPG",g=a.p+"static/media/travel-app.b1005f6e.JPG",j=a.p+"static/media/NLP-app.73d37620.JPG",m=a.p+"static/media/landing-page.76938663.JPG",f=a.p+"static/media/blog.a8b3f9d7.JPG",x=a.p+"static/media/weather-journal-app.5621c375.JPG",A="https://lancestasinski.herokuapp.com";e.default=function(){return document.title="Portfolio | Lance Stasinski",Object(b.jsx)(o.a.Fragment,{children:Object(b.jsxs)("div",{className:s.a.portfolio,children:[Object(b.jsx)("h1",{children:"PORTFOLIO"}),Object(b.jsx)("hr",{}),Object(b.jsxs)("div",{className:s.a.projects,children:[Object(b.jsx)(h,{image:x,gitHubLink:"https://github.com/LanceStasinski/FEND-03-WeatherJournalApp-React",external:!0,projectUrl:"".concat(A,"/weather-journal-app"),title:"Weather Journal",description:"This app generates a journal entry that contains text input by the user and weather data for the selected zip code. The user has access to complete CRUD operations and they can change their zip code or their prefered measurement units at any time.",technologies:"TypeScript, React, styled components, Node/Express, MongoDB, Axios"}),Object(b.jsx)(h,{image:u,gitHubLink:"https://github.com/LanceStasinski/Website-client",external:!1,projectUrl:"/portfolio/more-info",title:"This Website",description:"My personal website is a single page web application that connects to a REST API. The blog portion is a fullstack application in itself. I write individual posts using a dynamic form and data is stored in MongoDB and an AWS S3 bucket.",technologies:"TypeScript, React, CSS Modules, Node/Express, MongoDB, AWS S3, Jest, Mocha, Chai"}),Object(b.jsx)(h,{image:g,gitHubLink:"https://github.com/LanceStasinski/FEND-05-TravelApp",external:!0,projectUrl:"".concat(A,"/travel-app"),title:"Travel App",description:"This app takes in a location and arrival and departure dates for a trip and returns the weather forecast, information about the country to be visited, and an image of the location. This app makes HTTP requests to four external APIs in specific order to gather the necessary information.",technologies:"HTML5, SCSS, JavaScript, Node/Express, Webpack, Service Workers, Axios, Jest"}),Object(b.jsx)(h,{image:j,gitHubLink:"https://github.com/LanceStasinski/FEND-04-EvaluateNewsApp",external:!0,projectUrl:"".concat(A,"/sentiment-analysis-app"),title:"Sentiment Analysis App",description:"This app takes a in a URL and the UI is updated based on a sentiment analysis of the text at that URL. The sentiment analysis is performed by a natural language processor at a third party API.",technologies:"HTML5, SCSS, JavaScript, Node/Express, Webpack, Service Workers, Axios"}),Object(b.jsx)(h,{image:m,gitHubLink:"https://github.com/LanceStasinski/FEND-02-LandingPage",external:!0,projectUrl:"".concat(A,"/landing-page"),title:"Landing Page",description:"This project is a responsive landing page with CSS animations and dynamic styles that are applied when different sections of the page come into view.",technologies:"HTML5, CSS3, JavaScript"}),Object(b.jsx)(h,{image:f,gitHubLink:"https://github.com/LanceStasinski/FEND-01-BlogPost",external:!0,projectUrl:"".concat(A,"/my-first-blog"),title:"Blog Site",description:"This project was the first website I built with HTML and CSS. It is a responsive and accessible blog that was built to become accustomed to the structure of HTML and to learn how to work with CSS Grid and Flexbox.",technologies:"HTML5, CSS3"})]})]})})}},52:function(t,e,a){"use strict";a(1);var n=a(10),o=a(57),i=a.n(o),s=a(0);e.a=function(t){return t.href?Object(s.jsx)("a",{className:"\n          ".concat(t.className,"\n          ").concat(i.a.button,"\n          ").concat(i.a["button--".concat(t.size||"default")],"\n          ").concat(t.inverse&&i.a["button--inverse"],"\n          ").concat(t.danger&&i.a["button--danger"],"\n        "),href:t.href,id:t.id,target:"_blank",rel:"noopener noreferrer",children:t.children}):t.to?Object(s.jsx)(n.b,{to:t.to,className:"\n          ".concat(t.className,"\n          ").concat(i.a.button,"\n          ").concat(i.a["button--".concat(t.size||"default")],"\n          ").concat(t.inverse&&i.a["button--inverse"],"\n          ").concat(t.danger&&i.a["button--danger"],"\n        "),id:t.id,children:t.children}):Object(s.jsx)("button",{className:"\n        ".concat(t.className,"\n        ").concat(i.a.button,"\n        ").concat(i.a["button--".concat(t.size||"default")],"\n        ").concat(t.inverse&&i.a["button--inverse"],"\n        ").concat(t.danger&&i.a["button--danger"],"\n      "),type:t.type,onClick:t.onClick,disabled:t.disabled,id:t.id,children:t.children})}},57:function(t,e,a){t.exports={button:"Button_button__1rdVi","button--inverse":"Button_button--inverse__-1_92","button--danger":"Button_button--danger__Vl4FB","button--small":"Button_button--small__27bKE","button--big":"Button_button--big__2-DUE"}},60:function(t,e,a){"use strict";a(1);var n=a(63),o=a.n(n),i=a(0);e.a=function(t){return Object(i.jsx)("div",{className:"".concat(t.className," ").concat(o.a.card),style:t.style,children:t.children})}},63:function(t,e,a){t.exports={card:"Card_card__ATtpb"}},85:function(t,e,a){"use strict";e.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAADsklEQVRYw62XQWhcVRSGv3PfNKRvYhijSEVsr0VKlAoV7MJNNxEqJaXNxGZXW5DuLLiTULIoxRbBRZHiTkF3SppMYxUKBko3BZESMOoQCj67MYtaBjuTxDDzjot3k7xM7kxeMnMgEObce/7vnvvuPecKGa0WlQpCPAw6BBwBLFBw7goQAXMgs4q5nbenK1niyvbCU4OCjgNjgvZmCarICvCdItfytljeFUAtKvUJjSvAh4LmsmaqCaQO3FCCibw9Xc0MsBRNHQK9JejgboQ9IGWQU6EtLmwLUPtz6i0RvSPoQDfEUxBPUDkevlL8pSWAW/n9botvgkDeTmfCrK88KvW5tA+kJswrMqnI412IPXZz5zdWqwOgtxKtJgChcWXrnsvl0I6eidnzkmIuKLLoglcd3D33N69I1fkWFXMhZs/LoR09A3J5c8p10H3cG1vgjtqvzV97TPBa3o6sH6NaNF0A9i3Tv/C8HYrTY/+JZk0v/x4CFvN2pJKaM2ho/NGUnboib+RtsZxzVOMtjtomERfYe8E8lwCVt4vh9HLAOHDO1KJSARjzBRX08E73fgcxxmpRqWCEeNh3wynySJG7nQIocleRRx6wXiEeNu5u97FP5O3Ik04Bkhgy0QJvyJAUlmbq1ZhgslPxNYsJJhVZ9biOGJKq1mwP++yppW4BuFgPPS5r2Cip6RSsdEs8Zb4MFIx3qHigOrd+348G/7ne/zSaCbul7GLt97gqhqSTaUqA5gLqx7oFEFA/1uKiiwww55+mF7sF0CbWnAGZ9XkETixFU+c7lV6Kps4LnPB7ZVaSZrPxd4vbsA583KDn82fsyfpOhJ9G3+cCVj8CPhXUeGKvKMGLklDe/FrQ9xOHuQr8BnpJ0Nfd4AXgS0V+atDze78dXvGL3u4NWD0M+g7wgaCvttwU5JvQjp7bUo4VqYCcVeSeEN9fg0hN/PE/KZx89sDmclz5647p0eoPgr67XXbS5dgAuNb5BoCgBdBvgRdAzqpKUzcr15rFAQoHjscgn2TcoS/W2vX1vVGCiaR7BUFDIR4PbfGBirypyGeq8pUiF2NyP7eKuqq9DzKsvqwEl9aXk3amm1JFYpCR0BZnMq4KgOVoUtuIb2lK27blmrhngFmQKui+0I5e3Q1Apra8KRPeh8le+17b55wPoN3DxFuMQltcUIKjilx3d8GuzH3t15XgqE+8ZQbSVoumB4V4HNc3hnZ0b7vxS9HNZfdvpsdpZqtFpUItmj6YAfiga3Qz2f+WPJuV9ucZ1AAAAABJRU5ErkJggg=="}}]);
//# sourceMappingURL=12.ba420916.chunk.js.map