(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[11],{327:function(e,t,a){e.exports={"contact-wrapper":"Contact_contact-wrapper__2ZMnd",title:"Contact_title__-eXGa","contact-card":"Contact_contact-card__3fi6L",removeShadow:"Contact_removeShadow__1lI90",drawShadow:"Contact_drawShadow__n3YtC","contact-card-header":"Contact_contact-card-header__3L4AB","input-error":"Contact_input-error__ssqN_","modal-backdrop":"Contact_modal-backdrop__2hHt4",modal:"Contact_modal__38gJ2","modal-content":"Contact_modal-content__2f7h-",okay:"Contact_okay__N1-f5"}},333:function(e,t,a){"use strict";a.r(t);var n=a(55),r=a(53),c=a.n(r),o=a(54),s=a(9),i=a(1),l=a.n(i),d=a(74),u=a(51),b=a(327),m=a.n(b),j=a(52),h=a(60),f=a(58),_=a(20),O=a(59),p=a(56),x=a(0);t.default=function(){document.title="Contact | Lance Stasinski";var e=Object(i.useState)(!1),t=Object(s.a)(e,2),a=t[0],r=t[1],b=Object(i.useState)(!1),v=Object(s.a)(b,2),N=v[0],g=v[1],C=Object(f.a)(),k=C.isLoading,w=C.error,y=C.clearError,S=C.sendRequest,E=Object(i.useRef)(null),M=Object(d.a)({mode:"onChange"}),R=M.register,L=M.formState,B=L.errors,F=L.isValid,q=M.handleSubmit,D=M.reset,I=function(){var e=Object(o.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,S("".concat("https://www.lancestasinski.com/api","/contact"),"POST",JSON.stringify({firstName:t.firstName,lastName:t.lastName,email:t.email,message:t.message}),{"Content-Type":"application/json"});case 3:"Message recieved"===e.sent.message&&(r(!0),D({firstName:"",lastName:"",email:"",message:""})),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),G=function(){r(!1)};return Object(x.jsxs)(l.a.Fragment,{children:[Object(x.jsx)(O.a,{error:w,onClear:y}),Object(x.jsx)(p.a,{className:m.a.modal,show:a,onCancel:G,header:"Message Sent!",footer:Object(x.jsx)("div",{className:m.a.okay,children:Object(x.jsx)(j.a,{type:"button",onClick:G,children:"OK"})}),backdropClass:m.a["modal-backdrop"],children:"Your message has been recieved. Thank you!"}),Object(x.jsxs)("div",{className:m.a["contact-wrapper"],children:[k&&Object(x.jsx)(_.a,{asOverlay:!0}),Object(x.jsx)("h2",{className:m.a.title,children:"Get in touch with me"}),Object(x.jsxs)("ul",{children:[Object(x.jsx)("li",{style:{animation:"slideInRight 1s ease-out forwards",animationDelay:"0s"},children:Object(x.jsx)(h.a,{className:m.a["contact-card"],children:Object(x.jsx)("a",{className:m.a["contact-card-header"],href:"https://www.linkedin.com/in/lance-stasinski/",target:"_blank",rel:"noopener noreferrer",children:Object(x.jsx)("h3",{children:"Connect on LinkedIn"})})})}),Object(x.jsx)("li",{style:{animation:"slideInLeft 1s ease-out forwards",animationDelay:"0.25s"},children:Object(x.jsx)(h.a,{className:m.a["contact-card"],children:Object(x.jsx)("a",{className:m.a["contact-card-header"],href:"https://github.com/LanceStasinski",target:"_blank",rel:"noopener noreferrer",children:Object(x.jsx)("h3",{children:"View my code on Github"})})})}),Object(x.jsx)("li",{style:{animation:"slideInRight 1s ease-out forwards",animationDelay:"0.5s"},children:Object(x.jsxs)(h.a,{className:m.a["contact-card"],children:[Object(x.jsx)("div",{className:m.a["contact-card-header"],onClick:function(){g((function(e){return!e}))},children:Object(x.jsx)("h3",{children:"Send A Message"})}),Object(x.jsx)(u.a,{in:N,timeout:300,mountOnEnter:!0,unmountOnExit:!0,nodeRef:E,classNames:"slide-down",children:Object(x.jsxs)("form",{onSubmit:q((function(e){return I(e)})),ref:E,children:[Object(x.jsx)("label",{htmlFor:"firstName",children:"First Name"}),Object(x.jsx)("input",Object(n.a)(Object(n.a)({type:"text",id:"firstName"},R("firstName",{required:!0})),{},{className:B.firstName&&m.a["input-error"]})),B.firstName&&Object(x.jsx)("p",{children:"Please provide your first name."}),Object(x.jsx)("label",{htmlFor:"lastName",children:"Last Name"}),Object(x.jsx)("input",Object(n.a)(Object(n.a)({type:"text",id:"lastName"},R("lastName",{required:!0})),{},{className:B.lastName&&m.a["input-error"]})),B.lastName&&Object(x.jsx)("p",{children:"Please provide your last name."}),Object(x.jsx)("label",{htmlFor:"email",children:"Email"}),Object(x.jsx)("input",Object(n.a)(Object(n.a)({id:"email",type:"email"},R("email",{required:!0})),{},{className:B.email&&m.a["input-error"]})),B.email&&Object(x.jsx)("p",{children:"Please provide your email."}),Object(x.jsx)("label",{htmlFor:"message",children:"Message"}),Object(x.jsx)("textarea",Object(n.a)(Object(n.a)({id:"message"},R("message",{required:!0})),{},{className:B.message&&m.a["input-error"]})),B.message&&Object(x.jsx)("p",{children:"Please provide a message."}),Object(x.jsx)(j.a,{type:"submit",disabled:!F,children:"SEND"})]})})]})})]})]})]})}},52:function(e,t,a){"use strict";a(1);var n=a(10),r=a(57),c=a.n(r),o=a(0);t.a=function(e){return e.href?Object(o.jsx)("a",{className:"\n          ".concat(e.className,"\n          ").concat(c.a.button,"\n          ").concat(c.a["button--".concat(e.size||"default")],"\n          ").concat(e.inverse&&c.a["button--inverse"],"\n          ").concat(e.danger&&c.a["button--danger"],"\n        "),href:e.href,id:e.id,target:"_blank",rel:"noopener noreferrer",children:e.children}):e.to?Object(o.jsx)(n.b,{to:e.to,className:"\n          ".concat(e.className,"\n          ").concat(c.a.button,"\n          ").concat(c.a["button--".concat(e.size||"default")],"\n          ").concat(e.inverse&&c.a["button--inverse"],"\n          ").concat(e.danger&&c.a["button--danger"],"\n        "),id:e.id,children:e.children}):Object(o.jsx)("button",{className:"\n        ".concat(e.className,"\n        ").concat(c.a.button,"\n        ").concat(c.a["button--".concat(e.size||"default")],"\n        ").concat(e.inverse&&c.a["button--inverse"],"\n        ").concat(e.danger&&c.a["button--danger"],"\n      "),type:e.type,onClick:e.onClick,disabled:e.disabled,id:e.id,children:e.children})}},56:function(e,t,a){"use strict";var n=a(55),r=a(1),c=a.n(r),o=a(8),s=a.n(o),i=a(51),l=a(61),d=a.n(l),u=a(19),b=a(0),m=function(e){var t=Object(b.jsxs)("div",{ref:e.nodeRef,className:"".concat(d.a.modal," ").concat(e.className),style:e.style,children:[Object(b.jsx)("header",{className:"".concat(d.a.modal__header," ").concat(e.headerClass),children:Object(b.jsx)("h2",{children:e.header})}),Object(b.jsxs)("form",{onSubmit:e.onSumbit?e.onSumbit:function(e){return e.preventDefault()},children:[Object(b.jsx)("div",{className:"".concat(d.a.modal__content," ").concat(e.contentClass),children:e.children}),Object(b.jsx)("footer",{className:"".concat(d.a.modal__footer," ").concat(e.footerClass),children:e.footer})]})]});return s.a.createPortal(t,document.getElementById("modal-hook"))};t.a=function(e){var t=c.a.useRef(null);return Object(b.jsxs)(c.a.Fragment,{children:[e.show&&Object(b.jsx)(u.a,{onClick:e.onCancel,backdropClass:e.backdropClass}),Object(b.jsx)(i.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:300,classNames:"modal-transition",nodeRef:t,children:Object(b.jsx)(m,Object(n.a)(Object(n.a)({},e),{},{nodeRef:t}))})]})}},57:function(e,t,a){e.exports={button:"Button_button__1rdVi","button--inverse":"Button_button--inverse__-1_92","button--danger":"Button_button--danger__Vl4FB","button--small":"Button_button--small__27bKE","button--big":"Button_button--big__2-DUE"}},58:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(53),r=a.n(n),c=a(54),o=a(9),s=a(1),i=function(){var e=Object(s.useState)(!1),t=Object(o.a)(e,2),a=t[0],n=t[1],i=Object(s.useState)(),l=Object(o.a)(i,2),d=l[0],u=l[1],b=Object(s.useRef)([]),m=Object(s.useCallback)(function(){var e=Object(c.a)(r.a.mark((function e(t){var a,c,o,s,i,l,d=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=d.length>1&&void 0!==d[1]?d[1]:"GET",c=d.length>2&&void 0!==d[2]?d[2]:null,o=d.length>3&&void 0!==d[3]?d[3]:void 0,n(!0),s=new AbortController,b.current.push(s),e.prev=6,e.next=9,fetch(t,{method:a,body:c,headers:o,signal:s.signal});case 9:return i=e.sent,e.next=12,i.json();case 12:if(l=e.sent,b.current=b.current.filter((function(e){return e!==s})),i.ok){e.next=16;break}throw new Error(l.message);case 16:return n(!1),e.abrupt("return",l);case 20:throw e.prev=20,e.t0=e.catch(6),u(e.t0.message),n(!1),e.t0;case 25:case"end":return e.stop()}}),e,null,[[6,20]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(s.useEffect)((function(){return function(){b.current.forEach((function(e){return e.abort()}))}}),[]),{isLoading:a,error:d,sendRequest:m,clearError:function(){u(void 0)}}}},59:function(e,t,a){"use strict";a(1);var n=a(56),r=a(52),c=a(62),o=a.n(c),s=a(0);t.a=function(e){return Object(s.jsx)(n.a,{onCancel:e.onClear,header:"An error occurred!",show:!!e.error,footer:Object(s.jsx)(r.a,{inverse:!0,onClick:e.onClear,children:"Okay"}),backdropClass:o.a["error-backdrop"],footerClass:o.a["error-footer"],style:{border:"1pt solid #f7e0ad",zIndex:500},children:Object(s.jsx)("p",{children:e.error})})}},60:function(e,t,a){"use strict";a(1);var n=a(63),r=a.n(n),c=a(0);t.a=function(e){return Object(c.jsx)("div",{className:"".concat(e.className," ").concat(r.a.card),style:e.style,children:e.children})}},61:function(e,t,a){e.exports={modal:"Modal_modal__3BvLd",modal__header:"Modal_modal__header__gy2sw",modal__content:"Modal_modal__content__Q822G",modal__footer:"Modal_modal__footer__2mvrH"}},62:function(e,t,a){e.exports={"error-backdrop":"ErrorModal_error-backdrop__Co0CD","error-footer":"ErrorModal_error-footer__2mG7c"}},63:function(e,t,a){e.exports={card:"Card_card__ATtpb"}}}]);
//# sourceMappingURL=11.d0417daa.chunk.js.map