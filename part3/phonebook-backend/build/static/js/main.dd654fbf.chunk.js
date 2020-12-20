(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{21:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t(1),a=t.n(r),s=t(15),o=t.n(s),u=(t(21),t(6)),i=t(3),l=function(e){var n=e.person,t=e.onDelete;return Object(c.jsxs)(c.Fragment,{children:[n.name," ",n.number," ",Object(c.jsx)("button",{onClick:function(){return t(n.id)},children:"delete"})," ",Object(c.jsx)("br",{})]})},d=function(e){var n=e.persons,t=(e.filteredPersons,e.filter),r=e.handlePersonDelete,a=t?n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})):n;return Object(c.jsx)(c.Fragment,{children:a.map((function(e){return Object(c.jsx)(l,{person:e,onDelete:r},e.name)}))})},f=function(e){var n=e.filter,t=e.handleFilterChange,r=e.onSubmit,a=e.handleNameChange,s=e.handleNumberChange,o=e.newName,u=e.newNumber;return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Persons"}),Object(c.jsxs)("div",{children:["filter shown with: ",Object(c.jsx)("input",{value:n,onChange:t})]}),Object(c.jsxs)("form",{onSubmit:r,children:[Object(c.jsx)("h2",{children:"add a new"}),Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:o,onChange:a})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:u,onChange:s})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})]})},m=function(e){var n=e.notification,t=n.style,r=n.message;return null==r?null:Object(c.jsx)("div",{className:t,children:r})},b=t(4),j=t.n(b),h="/api/persons",O=function(){return j.a.get(h).then((function(e){return e.data}))},g=function(e){return j.a.post(h,e).then((function(e){return e.data}))},v=function(e,n){return j.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){return j.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},x=function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],s=Object(r.useState)({style:null,message:null}),o=Object(i.a)(s,2),l=o[0],b=o[1],j=Object(r.useState)(""),h=Object(i.a)(j,2),x=h[0],w=h[1],y=Object(r.useState)(""),C=Object(i.a)(y,2),N=C[0],S=C[1],T=Object(r.useState)(""),k=Object(i.a)(T,2),D=k[0],P=k[1],F=Object(r.useState)([]),L=Object(i.a)(F,2),A=L[0],E=L[1];Object(r.useEffect)((function(){O().then((function(e){a(e)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)(m,{notification:l}),Object(c.jsx)(f,{filter:D,handleFilterChange:function(e){P(e.target.value);var n=t.filter((function(e){return e.name.toLowerCase().includes(D.toLowerCase())}));console.log(n),E(n)},onSubmit:function(e){if(e.preventDefault(),t.some((function(e){return e.name===x}))){if(window.confirm("".concat(x," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===x})),c=n.id,r=Object(u.a)(Object(u.a)({},n),{},{number:N});v(c,r).then((function(e){console.log(e),a(t.map((function(n){return n.id!==c?n:e}))),w(""),S(""),b({style:"successful",message:"Added ".concat(e.name)}),setTimeout((function(){b({style:null,message:null})}),3e3)})).catch((function(e){b({style:"error",message:"".concat(n.name," has already been removed from the server")}),setTimeout((function(){b({style:null,message:null})}),3e3)}))}}else g({name:x,number:N}).then((function(e){a(t.concat(e)),w(""),S(""),b({style:"successful",message:"Added ".concat(e.name)}),setTimeout((function(){b({message:null,style:null})}),3e3)})).catch((function(e){b({message:"CAUTION: ".concat(e.response.data.error),style:"error"}),setTimeout((function(){b({message:null,style:null})}),3e3)}))},handleNameChange:function(e){w(e.target.value)},handleNumberChange:function(e){S(e.target.value)},newName:x,newNumber:N}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)(d,{persons:t,filteredPersons:A,filter:D,handlePersonDelete:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&p(e).then((function(){var c=t.filter((function(n){return n.id!==e}));a(c),b({style:"successful",message:"".concat(n.name," has been removed")}),setTimeout((function(){b({message:null,style:null})}),3e3)})).catch((function(e){b({style:"error",message:"".concat(n.name," has already been removed before")}),setTimeout((function(){b({message:null,style:null})}),3e3),a(A)}))}})]})};o.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(x,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.dd654fbf.chunk.js.map