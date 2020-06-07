(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[6],{112:function(e,t,a){"use strict";a.d(t,"c",(function(){return i})),a.d(t,"d",(function(){return l})),a.d(t,"b",(function(){return p})),a.d(t,"a",(function(){return m}));var n=a(93),r=a.n(n),s=a(100),c=a.n(s),o=a(10),u="https://staging-emr.mecure.com/api/",i=function(e,t){var a,n,s,i,l,p;return r.a.async((function(m){for(;;)switch(m.prev=m.next){case 0:return a=u+e,m.next=3,r.a.awrap(Object(o.a)("access_token"));case 3:return n=m.sent,(s={}).os="web",n&&(s.token=n),m.prev=7,m.next=10,r.a.awrap(c.a.post(a,t,{headers:s}));case 10:return i=m.sent,m.abrupt("return",i.data);case 14:throw m.prev=14,m.t0=m.catch(7),(l=m.t0.response)&&401===l.status&&(Object(o.b)("access_token"),Object(o.b)("name"),window.location.href="/"),p=d(m.t0),new Error(p.message);case 20:case"end":return m.stop()}}),null,null,[[7,14]])},l=function(e,t){var a,n,s,i,l,p;return r.a.async((function(m){for(;;)switch(m.prev=m.next){case 0:return a=u+e,m.next=3,r.a.awrap(Object(o.a)("access_token"));case 3:return n=m.sent,(s={}).os="web",n&&(s.token=n),m.prev=7,m.next=10,r.a.awrap(c.a.put(a,t,{headers:s}));case 10:return i=m.sent,m.abrupt("return",i.data);case 14:throw m.prev=14,m.t0=m.catch(7),(l=m.t0.response)&&401===l.status&&(Object(o.b)("access_token"),Object(o.b)("name"),window.location.href="/"),p=d(m.t0),new Error(p.message);case 20:case"end":return m.stop()}}),null,null,[[7,14]])},p=function(e){var t,a,n,s,i,l,p,m=arguments;return r.a.async((function(f){for(;;)switch(f.prev=f.next){case 0:return t=m.length>1&&void 0!==m[1]?m[1]:"",a=u+e,f.next=4,r.a.awrap(Object(o.a)("access_token"));case 4:return n=f.sent,(s={}).os="web",n&&(s.token=n),f.prev=8,f.next=11,r.a.awrap(c.a.get(a,{params:t,headers:s}));case 11:return i=f.sent,f.abrupt("return",i.data);case 15:throw f.prev=15,f.t0=f.catch(8),(l=f.t0.response)&&401===l.status&&(Object(o.b)("access_token"),Object(o.b)("name"),window.location.href="/"),p=d(f.t0),new Error(p.message);case 21:case"end":return f.stop()}}),null,null,[[8,15]])},m=function(e,t){var a,n,s,i,l,p;return r.a.async((function(m){for(;;)switch(m.prev=m.next){case 0:return a=u+e,m.next=3,r.a.awrap(Object(o.a)("access_token"));case 3:return n=m.sent,(s={}).os="web",n&&(s.token=n),m.prev=7,m.next=10,r.a.awrap(c.a.delete(a,{data:t,headers:s}));case 10:return i=m.sent,m.abrupt("return",i.data);case 14:throw m.prev=14,m.t0=m.catch(7),(l=m.t0.response)&&401===l.status&&(Object(o.b)("access_token"),Object(o.b)("name"),window.location.href="/"),p=d(m.t0),new Error(p.message);case 20:case"end":return m.stop()}}),null,null,[[7,14]])},d=function(e){var t=e.response;if(!t){return{message:"Something Went Wrong ! Please Try again later"}}var a=t.data;if(a){var n=a.msg,r=(a.status,a.statusCode);return{statusCode:r||400,message:n||"Something Went Wrong ! Please Try again later"}}}},113:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return r}));var n="EMR_userLogin",r="note"},115:function(e,t,a){"use strict";var n=a(94),r=(a(100),a(48)),s=a(129),c=a(130),o=a(142),u=a(131),i=a(144),l=a(0),p=a.n(l),m=a(98),d=a(182),f=a(109),b=a(140),h=(a(132),a(133)),v=a.n(h),g=a(134),w=a.n(g),O=function(e){return p.a.createElement(f.z.DropdownIndicator,e,e.selectProps.dropdownIcon)},j=function(e){function t(){return Object(s.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=(t.errorMessages,t.validatorListener,t.select2),n=t.flatpickr,s=t.defaultdate,c=t.parentClass,o=void 0===c?"":c,u=t.id,i=t.dropdownIcon,l=t.inputmask,m=t.selectedOption,f=Object(r.a)(t,["errorMessages","validatorListener","select2","flatpickr","defaultdate","parentClass","id","dropdownIcon","inputmask","selectedOption"]),h="select"==this.props.as?" type-select ":"",g=null!==this.errorText()?" table-error":"";return p.a.createElement("div",{className:h+o+g},this.props.label&&p.a.createElement(d.a.Label,{htmlFor:u&&u,style:{marginTop:"15px"}},this.props.label),a?p.a.createElement(b.a,Object.assign({getOptionLabel:function(e){return e.name},getOptionValue:function(e){return e.id},isClearable:!0,dropdownIcon:i||p.a.createElement("i",{className:"fas fa-caret-down"}),components:{DropdownIndicator:O,IndicatorSeparator:function(){return null}}},f,{onChange:function(t){t?e.props.onChange({target:{name:e.props.name,value:t.id,extra:t}}):e.props.onChange({target:{name:e.props.name,id:"",extra:null}})},ref:function(t){e.input=t}})):n?p.a.createElement(v.a,Object.assign({className:"form-control mt-1",value:m,options:{dateFormat:this.props.dateformat||"d-m-Y",defaultDate:s,enableTime:this.props.enabletime,noCalendar:this.props.nocalendar,minDate:this.props.mindate,maxDate:this.props.maxdate,time_24hr:!0},placeholder:"dd-mm-yyyy"},f,{onChange:function(t){return t&&e.props.onChange({target:{name:e.props.name,value:t}})},ref:function(t){e.input=t}})):l?p.a.createElement(w.a,Object.assign({className:"form-control",mask:"99-99-9999"},f,{ref:function(t){e.input=t}})):p.a.createElement(d.a.Control,Object.assign({},f,{id:u,ref:function(t){e.input=t}})),p.a.createElement("span",null,this.props.postFix),"file"===this.props.type&&p.a.createElement("label",{className:"custom-file-label",htmlFor:u},this.props.value||"Upload Attachment"),p.a.createElement("div",{className:"error-text"},this.errorText()))}},{key:"errorText",value:function(){return this.state.isValid?null:p.a.createElement("div",{style:{color:"red"}},this.getErrorMessage())}}]),t}(m.ValidatorComponent);a.d(t,"b",(function(){return n.a})),a.d(t,"a",(function(){return j}))},171:function(e,t,a){"use strict";var n=a(1),r=a(2),s=a(4),c=a.n(s),o=a(0),u=a.n(o),i=a(5),l=u.a.forwardRef((function(e,t){var a=e.bsPrefix,s=e.noGutters,o=e.as,l=void 0===o?"div":o,p=e.className,m=Object(r.a)(e,["bsPrefix","noGutters","as","className"]),d=Object(i.b)(a,"row");return u.a.createElement(l,Object(n.a)({ref:t},m,{className:c()(p,d,s&&"no-gutters")}))}));l.defaultProps={noGutters:!1},t.a=l},179:function(e,t,a){"use strict";a.r(t);var n=a(93),r=a.n(n),s=a(96),c=a(0),o=a.n(c),u=a(98),i=a(115),l=a(171),p=a(169),m=a(182),d=a(59),f=a(112),b=a(94),h=a(113),v=a(97),g=a(10);t.default=function(e){var t=Object(c.useState)(),a=Object(s.a)(t,2),n=a[0],w=a[1],O=Object(b.a)({email:"",password:""},(function(){var t,a,n,s,c,o,u;return r.a.async((function(i){for(;;)switch(i.prev=i.next){case 0:return w(),i.prev=1,i.next=4,r.a.awrap(Object(f.c)(h.a,j));case 4:t=i.sent,a=t.status,n=t.msg,s=t.data,a?(c=s[0],o=c.name,u=c.user_auth,Object(g.c)("access_token",u),Object(g.c)("name",o),e.history.push("/dashboard")):w(n),i.next=12;break;case 9:i.prev=9,i.t0=i.catch(1),w("Something went wrong!! Please try again later");case 12:case"end":return i.stop()}}),null,null,[[1,9]])})),j=O.inputs,E=O.handleInputChange,x=O.handleSubmit;return o.a.createElement("div",{className:"login-wrap"},o.a.createElement("div",{className:"container"},o.a.createElement(l.a,null,o.a.createElement(p.a,{className:"p-0 mt-5"},o.a.createElement("div",{className:"form-wrap"},n&&o.a.createElement(v.a,{variant:"danger",msg:n}),o.a.createElement("h4",{className:"text-primary font-weight-bold mb-4"},"Log In to SmartServ To-do List"),o.a.createElement(u.ValidatorForm,{onSubmit:x},o.a.createElement(m.a.Group,null,o.a.createElement(i.a,{placeholder:"Email",onChange:E,name:"email",value:j.email,type:"email",validators:["required"],errorMessages:["This field is required"]})),o.a.createElement(m.a.Group,null,o.a.createElement(i.a,{placeholder:"Password",onChange:E,name:"password",type:"password",parentClass:"password",value:j.password,validators:["required"],errorMessages:["Password is not valid"]})),o.a.createElement(m.a.Group,null,o.a.createElement(d.a,{variant:"primary",className:"w-100 m-0 ft-18 py-2",type:"submit"},"Log In"))))))))}},94:function(e,t,a){"use strict";var n=a(99),r=a(108),s=a(93),c=a.n(s),o=a(96),u=a(0);t.a=function(e,t){var a=Object(u.useState)(e),s=Object(o.a)(a,2),i=s[0],l=s[1];return{handleSubmit:function(e){return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:e&&e.preventDefault(),t();case 2:case"end":return a.stop()}}))},handleInputChange:function(e,t){if("function"===typeof e.persist&&e.persist(),"isNumber"===t){var a=(c=e.target.value).replace(/^[a-zA-Z!\u201d$%&\u2019()*\+,\/;\[\\\]\^_`"{|}^~'{}<>:?/,-]+$/,"");l((function(t){return Object(r.a)({},t,Object(n.a)({},e.target.name,a))}))}else if("notEqualToZero"===t){if("00"===(c=e.target.value)||"0"===c){var s=c.replace("");l((function(t){return Object(r.a)({},t,Object(n.a)({},e.target.name,""))}))}else if("-"===c){s=c.replace("");l((function(t){return Object(r.a)({},t,Object(n.a)({},e.target.name,""))}))}else l((function(t){return Object(r.a)({},t,Object(n.a)({},e.target.name,e.target.value))}))}else if("inputTextArea"===t){var c;s=(c=e.target.value).replace(/(<([^>]+)>)/gi,"");l((function(t){return Object(r.a)({},t,Object(n.a)({},e.target.name,s))}))}else e.target.extra?l((function(t){return Object(r.a)({},t,Object(n.a)({},e.target.name,{name:e.target.extra.name,id:e.target.value}))})):l((function(t){return Object(r.a)({},t,Object(n.a)({},e.target.name,e.target.value))}))},inputs:i,setInputs:l,resetState:function(e){l((function(t){return Object(r.a)({},t,{},e)}))}}}},97:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=a(170);t.a=function(e){var t=e.variant,a=e.msg;return r.a.createElement(s.a,{variant:t},a)}}}]);
//# sourceMappingURL=6.162d4d0d.chunk.js.map