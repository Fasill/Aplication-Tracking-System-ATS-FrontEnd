"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[13],{9055:function(e,t,a){a(2791);t.Z=a.p+"static/media/plus.7a855e84c72aed86d403cf4263758cf9.svg"},6225:function(e,t,a){a.d(t,{Z:function(){return h}});var n=a(4942),s=a(1413),r=a(9439),l=a(2791);a.p;var o=a.p+"static/media/plusWhite.70746a12d79c266029e41c73e85d8183.svg",i=a(1243),c=a(4695),d=a(1134),u=a(6727),m=a(9158),p=a(184),h=function(e){var t,a,h=(0,l.useState)(!1),f=(0,r.Z)(h,2),x=(f[0],f[1]),g=(0,l.useState)(!1),b=(0,r.Z)(g,2),v=b[0],j=b[1],w=(0,l.useState)({name:"",email:""}),y=(0,r.Z)(w,2),Z=y[0],N=y[1],S=(0,l.useState)(!1),k=(0,r.Z)(S,2),I=k[0],C=k[1],E=u.Ry().shape({name:u.Z_().required("Name is required"),email:u.Z_().email("Invalid email format").required("Email is required")}),A=(0,d.cI)({resolver:(0,c.X)(E)}),_=A.register,M=A.handleSubmit,R=A.formState.errors,O=function(e){var t=e.target,a=t.name,r=t.value;N((0,s.Z)((0,s.Z)({},Z),{},(0,n.Z)({},a,r))),x(""==Z.email&&""==Z.name)};return(0,p.jsxs)("div",{className:" w-full max-w-[512px] rounded-md",onClick:function(e){return e.stopPropagation()},children:[(0,p.jsx)("div",{className:" flex gap-[15px] pl-[15px] items-center justify-center font-bold rounded-t-md",children:(0,p.jsx)("p",{children:"Add Team Member"})}),(0,p.jsxs)("form",{className:"bg-white m-[15px] p-[15px] grid gap-10 rounded-md",onSubmit:M((function(){j(!0);var t=localStorage.getItem("token");Z.token=t,Z.compId=e.compId,i.Z.post("".concat(m.a,"/adduser"),Z).then((function(e){C(!0),j(!1),window.location.reload()})).catch((function(e){console.log("error",e),j(!1)}))})),children:[(0,p.jsxs)("div",{className:"text-black grid justify-items-start",children:[(0,p.jsxs)("label",{children:["Enter name ",(0,p.jsxs)("span",{className:"text-red-600",children:["* ",null===(t=R.email)||void 0===t?void 0:t.message," "]}),(0,p.jsx)("span",{className:"text-green-600",children:I?"Invitation Email Sent":""})]}),(0,p.jsx)("input",(0,s.Z)((0,s.Z)({type:"text"},_("name")),{},{value:Z.name,onChange:O,className:"p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"}))]}),(0,p.jsxs)("div",{className:"text-black grid justify-items-start",children:[(0,p.jsxs)("label",{children:["Enter Email ",(0,p.jsxs)("span",{className:"text-red-600",children:["* ",null===(a=R.email)||void 0===a?void 0:a.message," "]}),(0,p.jsx)("span",{className:"text-green-600",children:I?"Invitation Email Sent":""})]}),(0,p.jsx)("input",(0,s.Z)((0,s.Z)({type:"text"},_("email")),{},{value:Z.email,onChange:O,className:"p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"}))]}),(0,p.jsx)("button",{disabled:v,className:"font-bold text-xl text-white flex items-center justify-center h-[42px] bg-blue-500 rounded",type:"submit",children:v?(0,p.jsx)("span",{className:"loading loading-spinner loading-md"}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("img",{src:o,alt:"Add Member"}),(0,p.jsx)("p",{children:"Add Member"})]})})]})]})}},8055:function(e,t,a){a.d(t,{Z:function(){return d}});var n=a(3433),s=a(9439),r=a(2791);var l=a.p+"static/media/searchIconbig.56ba9a3915276d57a29b8f810837f00e.svg";var o=a.p+"static/media/trash.798164512cd2136210030e9031b65003.svg",i=a(1243),c=a(184),d=function(e){var t=(0,r.useState)("Admin"),a=(0,s.Z)(t,2),d=(a[0],a[1],(0,r.useState)(!1)),u=(0,s.Z)(d,2),m=u[0],p=u[1],h=(0,r.useState)(""),f=(0,s.Z)(h,2),x=f[0],g=f[1],b=(0,r.useState)([]),v=(0,s.Z)(b,2),j=v[0],w=v[1],y=(0,r.useState)(!1),Z=(0,s.Z)(y,2),N=Z[0],S=Z[1],k=(0,r.useState)(!1),I=(0,s.Z)(k,2),C=I[0],E=I[1],A=(0,r.useState)(!1),_=(0,s.Z)(A,2),M=_[0],R=_[1];(0,r.useEffect)((function(){R("company"===e.role),E("Admin"===e.role),S("Owner"===e.role),x.length>0&&O(x)}),[x]);var O=function(e){p(!0);var t=localStorage.getItem("token");i.Z.post("https://test-back-end-dszgwhplxa-el.a.run.app/Searchmember",{name:e,token:t}).then((function(e){console.log(e.data.members),w(e.data.members),p(!1)})).catch((function(e){console.error("Error:",e),p(!1)}))},z=function(e){console.log(e),i.Z.get("https://test-back-end-dszgwhplxa-el.a.run.app/deletemember?email=".concat(e)).then((function(e){console.log(e),O(x)}))};return(0,c.jsxs)("div",{className:"bg-white shadow-md rounded-lg h-[510px] w-full max-w-[50rem]",onClick:function(e){return e.stopPropagation()},children:[(0,c.jsxs)("div",{className:"bg-white border pl-4 pr-12 h-[56px] rounded-t-lg flex items-center",children:[m?(0,c.jsx)("span",{className:"loading loading-spinner text-primary"}):(0,c.jsx)("img",{src:l,alt:"Avatar"}),(0,c.jsx)("input",{disabled:!e.accessState,onChange:function(e){var t=e.target.value;g(t)},value:x,type:"text",className:"bg-white w-full h-[28px] p-4 justify-self-center border-transparent focus:outline-none",placeholder:"Search Member"})]}),(0,c.jsx)("div",{children:j.map((function(e,t){return(0,c.jsxs)("div",{className:"border-gray shadow-md pl-2 pr-2 border bg-white m-1 rounded-md flex justify-between items-center",children:[(0,c.jsx)("p",{children:e.name}),(0,c.jsx)("p",{children:e.email}),(0,c.jsxs)("div",{className:"flex gap-1",children:[(0,c.jsxs)("select",{className:"select w-full max-w-[8rem]",value:e.role,onChange:function(e){return function(e,t){var a=e.target.value,s=(0,n.Z)(j);s[t].role=a,w(s);var r={email:s[t].email,role:a},l=localStorage.getItem("token");i.Z.post("https://test-back-end-dszgwhplxa-el.a.run.app/updateMemberRole",{data:r,token:l}).then((function(e){console.log("Role updated successfully:",e.data)})).catch((function(e){console.error("Error updating role:",e)}))}(e,t)},disabled:"Owner"===e.role&&!N&&!M,children:[(0,c.jsx)("option",{value:"Owner",disabled:C,children:"Owner"}),(0,c.jsx)("option",{value:"Admin",children:"Admin"}),(0,c.jsx)("option",{value:"Recruiter",children:"Recruiter"})]}),(0,c.jsxs)("div",{className:"flex items-center justify-center",children:[(0,c.jsx)("img",{className:M||C||N?" bg-transparent cursor-pointer hover:scale-110 ".concat("Owner"!==e.role||N||M?"":"cursor-not-allowed "):"hidden",src:o,onClick:function(){("Owner"!==e.role||N||M)&&document.getElementById("my_modal_2").showModal()}}),(0,c.jsxs)("dialog",{id:"my_modal_2",className:"modal",children:[(0,c.jsxs)("div",{className:"modal-box",children:[(0,c.jsx)("p",{className:"py-4",children:"Are you sure you want to delete this item?"}),(0,c.jsx)("button",{method:"dialog",onClick:function(){return t=e.email,document.getElementById("my_modal_2").close(),z(t),void O();var t},children:"Confirm"})]}),(0,c.jsx)("form",{method:"dialog",className:"modal-backdrop",children:(0,c.jsx)("button",{children:"close"})})]})]})]})]},t)}))})]})}},4440:function(e,t,a){a.d(t,{Z:function(){return u}});var n=a(9439),s=a(2791);var r=a.p+"static/media/searchIcon.b1f781b99ceaafb9c831949bb54ae3cd.svg";var l=a.p+"static/media/bell.ec0a49829142c6865f44c996f9a29469.svg",o=a(7689),i=a(9434),c=a(6522),d=a(184),u=function(e){var t=(0,i.v9)((function(e){return e.user.value})),a=(0,i.v9)((function(e){return e.nav.value.collapse})),u=(0,i.I0)(),m=(0,o.s0)(),p=(0,s.useState)(!1),h=(0,n.Z)(p,2),f=h[0],x=h[1];(0,s.useEffect)((function(){console.log("from redux store ",t)}),[t]),(0,s.useEffect)((function(){x(a)}),[a]);var g=e.Searchbttnstat;return(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)("div",{className:"bg-[#] flex items-center justify-between h-[64px] p-[12px] gap-[3rem] border-b shadow-md",children:[(0,d.jsx)("div",{className:"flex gap-3 items-center",children:(0,d.jsxs)("label",{className:"btn btn-circle bg-transparent border-none swap swap-rotate hover:bg-transparent xl:hidden z-[100]",onClick:function(){u((0,c.um)({collapse:!f}))},children:[(0,d.jsx)("input",{type:"checkbox"}),(0,d.jsx)("svg",{className:"swap-off",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 512 512",fill:"#808080",children:(0,d.jsx)("path",{fill:"#808080",d:"M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"})}),(0,d.jsx)("svg",{className:"swap-on fill-current ",xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 512 512",children:(0,d.jsx)("polygon",{fill:"black",points:"400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"})})]})}),(0,d.jsxs)("button",{className:"bg-white border border-blue-300 w-[500px] h-[28px] rounded-md flex items-center p-4 gap-5 max-md:hidden",onClick:function(){g(!0)},children:[(0,d.jsx)("img",{src:r,alt:"Avatar"}),(0,d.jsx)("p",{children:"Search"})]}),(0,d.jsxs)("div",{className:"flex gap-8 ",children:[(0,d.jsx)("img",{src:l,alt:"Notification"}),(0,d.jsx)("div",{className:"avatar placeholder dropdown dropdown-end",children:(0,d.jsxs)("div",{tabIndex:0,className:"bg-[rgb(27,106,218)] cursor-pointer text-neutral-content rounded-full w-10 border-[rgb(27,106,218)] border-2 hover:border-[#FF9D56]",children:[(0,d.jsxs)("span",{className:"text-xs",children:[e.firstInitial," ",e.lastInitial]}),(0,d.jsxs)("ul",{tabIndex:0,className:"mt-[10rem] absolute dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 text-black",children:[(0,d.jsx)("li",{children:!e.isClient&&(0,d.jsx)("p",{onClick:function(){return m("/app/profile")},children:"My Profile"})}),(0,d.jsx)("li",{onClick:function(){localStorage.setItem("token",""),m("/login")},children:(0,d.jsx)("p",{children:"Sign Out"})})]})]})})]})]})})}},1013:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var n=a(9439),s=(a(9055),a(4440),a(6225),a(8055)),r="style_bg_blur__FKlsc",l=a(2791),o=a(1243),i=a(7689),c=a(9434),d=a(3533),u=a(9158),m=a(184),p=function(){var e=(0,i.s0)(),t=(0,c.I0)(),a=(0,l.useState)(!1),p=(0,n.Z)(a,2),h=(p[0],p[1],(0,l.useState)(!1)),f=(0,n.Z)(h,2),x=f[0],g=f[1],b=(0,l.useState)(""),v=(0,n.Z)(b,2),j=v[0],w=v[1],y=(0,l.useState)(!1),Z=(0,n.Z)(y,2),N=Z[0],S=Z[1],k=(0,l.useState)(""),I=(0,n.Z)(k,2),C=I[0],E=I[1],A=(0,l.useState)(""),_=(0,n.Z)(A,2),M=_[0],R=_[1];(0,l.useEffect)((function(){var a=localStorage.getItem("token");if(a)try{var s=[o.Z.post("".concat(u.a,"/verify"),{token:a}),o.Z.post("".concat(u.a,"/allInfo?token=").concat(a))];Promise.all(s).then((function(a){var s=(0,n.Z)(a,2),r=s[0],l=s[1];console.log("Verification Response:",r),console.log("allInfo Response:",l.data),S("company"===l.data.type||"Recruiter"!==l.data.info.role),w("user"===l.data.type?l.data.info.role:"company"),E(l.data.info.name),R("company"!==l.data.type?l.data.info.company:""),t((0,d.um)({infos:l.data})),console.log(M),r.data&&"expectedValue"!==!r.data.someProperty||e("/login")})).catch((function(t){e("/login"),console.error("Error:",t)}))}catch(r){console.log(r),e("/login")}else e("/login")}),[e]);var O=C.split(" "),z=O[0],F=O[O.length-1];z.charAt(0),F.charAt(0);return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:"flex flex-col bg-white w-[100%]  "}),(0,m.jsx)("div",{className:x?"absolute top-0 h-screen w-screen bg-gray-900 bg-opacity-50 flex items-center justify-center z-[40]":"hidden",onClick:function(){return g(!1)},children:(0,m.jsx)("div",{className:r+" p-[38px]  w-full h-full flex items-center justify-center",children:(0,m.jsx)(s.Z,{role:j,accessState:N})})})]})}},9158:function(e,t,a){a.d(t,{a:function(){return n}});var n="http://localhost:8080"}}]);
//# sourceMappingURL=13.ee9c471c.chunk.js.map