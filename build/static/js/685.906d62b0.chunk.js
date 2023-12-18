"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[685],{4035:function(e,t,s){var a=s(4942),r=s(1413),n=s(9439),l=s(2791),o=s(1243),i=s(7689),c=s(1134),d=s(6727),u=s(4695),m=s(9158),x=s(184);t.Z=function(e){var t,s,p=(0,l.useState)(!1),f=(0,n.Z)(p,2),h=f[0],g=f[1],b=(0,l.useState)(!0),j=(0,n.Z)(b,2),v=j[0],w=j[1],y=(0,i.s0)(),N=(0,l.useState)({email:"",password:""}),Z=(0,n.Z)(N,2),S=Z[0],L=Z[1],k=(0,l.useState)(""),C=(0,n.Z)(k,2),E=C[0],P=C[1],U=d.Ry().shape({email:d.Z_().email("Invalid email format").required("Email is required"),password:d.Z_().required("Password is required")}),A=(0,c.cI)({resolver:(0,u.X)(U)}),I=A.register,q=A.handleSubmit,B=A.formState.errors,R=function(e){var t=e.target,s=t.name,n=t.value;L((0,r.Z)((0,r.Z)({},S),{},(0,a.Z)({},s,n)))};(0,l.useEffect)((function(){var e=Object.values(S).every((function(e){return""!==e}));w(!e)}),[S]);return(0,x.jsxs)("form",{onSubmit:q((function(){g(!0),S.role=e.role,console.log(S),o.Z.post("".concat(m.a,"/login"),S).then((function(e){var t=e.data.token;console.log(e.data.message),t&&(localStorage.setItem("token",t),y("/home"),L({email:"",password:""})),g(!1)})).catch((function(e){console.error("Error:",e),e.response&&e.response.data&&e.response.data.message?P(e.response.data.message):P("An error occurred. Please try again."),g(!1)}))})),className:"grid gap-5 pb-10 h-full max-h-[30rem]",children:[(0,x.jsx)("h1",{className:"m-auto text-black text-3xl font-bold",children:e.tittle}),(0,x.jsxs)("div",{className:"text-black grid justify-items-start",children:[(0,x.jsxs)("label",{children:["Enter Email",(0,x.jsxs)("span",{className:"text-red-600",children:[": ",null===(t=B.email)||void 0===t?void 0:t.message," ","User not found."===E||"User not found2."===E?"User not found.":""]}),(0,x.jsx)("span",{className:"text-red-600",children:"Unverified use try to login by email"===E?"Please log in with your email and complete your information.":""})]}),(0,x.jsx)("input",(0,r.Z)((0,r.Z)({type:"text"},I("email")),{},{value:S.email,onChange:R,className:"p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"}))]}),(0,x.jsxs)("div",{className:"text-black grid justify-items-start",children:[(0,x.jsxs)("label",{children:["Enter Password ",(0,x.jsxs)("span",{className:"text-red-600",children:[": ",null===(s=B.password)||void 0===s?void 0:s.message," ","Authentication failed. Incorrect password."===E?"Incorrect password.":""]})]}),(0,x.jsx)("input",(0,r.Z)((0,r.Z)({type:"password",name:"password"},I("password")),{},{value:S.password,onChange:R,className:"p-3 border h-11 max-w-96 w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"}))]}),(0,x.jsx)("p",{className:"font-bold justify-self-end text-[14px]",children:(0,x.jsx)("a",{href:"/",className:"text-blue-500 hover:text-blue-400 justify-self-end",children:"Forgot your password?"})}),(0,x.jsx)("button",{className:"rounded-md h-11 ".concat(v?"border pointer-events-none border-gray-400 text-blue-400":"bg-blue-500 text-white hover:bg-blue-400"," rounded-md h-11 font-bold text-xl"),type:"submit",disabled:h,children:h?(0,x.jsx)("span",{className:"loading loading-spinner loading-md "}):"Login"}),(0,x.jsxs)("div",{className:"grid gap-1 font-bold",children:[(0,x.jsxs)("p",{className:"m-0 text-left text-[14px] text-gray-600",children:["Login as Employer",(0,x.jsx)("a",{className:"text-blue-500 hover:text-blue-400",href:"/login/employer",children:" Login"})]}),(0,x.jsxs)("p",{className:"m-0 text-left text-[14px] text-gray-600",children:["Login as Supplier ",(0,x.jsx)("a",{className:"text-blue-500 hover:text-blue-400",href:"/login/supplier",children:" Login"})]}),(0,x.jsxs)("p",{className:"m-0 text-left text-[14px] text-gray-600",children:["Login as Channel partner",(0,x.jsx)("a",{className:"text-blue-500 hover:text-blue-400",href:"/login/channelPartner",children:" Login"})]})]})]})}},1548:function(e,t,s){var a=s(4942),r=s(1413),n=s(9439),l=s(2791),o=s(1243),i=s(7689),c=s(1134),d=s(6727),u=s(4695),m=s(9158),x=s(184);t.Z=function(e){var t,s=(0,l.useState)(!1),p=(0,n.Z)(s,2),f=p[0],h=p[1],g=(0,l.useState)(!0),b=(0,n.Z)(g,2),j=b[0],v=b[1],w=((0,i.s0)(),(0,l.useState)(!1)),y=(0,n.Z)(w,2),N=(y[0],y[1]),Z=(0,l.useState)({email:"",password:""}),S=(0,n.Z)(Z,2),L=S[0],k=S[1],C=(0,l.useState)(""),E=(0,n.Z)(C,2),P=E[0],U=E[1],A=(0,l.useState)(""),I=(0,n.Z)(A,2),q=I[0],B=I[1],R=(0,l.useState)(!1),_=(0,n.Z)(R,2),O=_[0],W=_[1];var X=d.Ry().shape({email:d.Z_().email("Invalid email format").required("Email is required")}),z=(0,c.cI)({resolver:(0,u.X)(X)}),F=z.register,J=z.handleSubmit,M=z.formState.errors;(0,l.useEffect)((function(){B("");var e=Object.values(L).every((function(e){return""===e}));v(e)}),[L]);return(0,x.jsxs)("form",{onSubmit:J((function(){W(!1),h(!0),console.log(L),L.role=e.role,o.Z.post("".concat(m.a,"/").concat("As Supplier"===L.role?"sendemailtologinRecuireteragency":"sendemailtologin"),L).then((function(e){console.log(e),k({email:""}),h(!1),W(!0)})).catch((function(e){console.error("Error:",e),B(e.response.data),console.log("Error2:",q),e.response&&e.response.data&&e.response.data.message?U(e.response.data.message):U("An error occurred. Please try again."),h(!1)}))})),className:"grid gap-5 pb-10 h-full max-h-[30rem]",children:[(0,x.jsx)("h1",{className:"m-auto text-black text-3xl font-bold",children:e.tittle}),(0,x.jsxs)("div",{className:"text-black max-w-[349px] w-full grid justify-items-start",children:[(0,x.jsxs)("label",{children:["Enter Email",(0,x.jsxs)("span",{className:"text-red-600",children:[": ",q," ",null===(t=M.email)||void 0===t?void 0:t.message," ","User not found."===P||"User not found2."===P?"User not found.":""]}),(0,x.jsx)("span",{className:"text-green-600",children:O?"Please check your email for the login verification link.":""})]}),(0,x.jsx)("input",(0,r.Z)((0,r.Z)({type:"text"},F("email")),{},{value:L.email,onChange:function(e){var t=e.target,s=t.name,n=t.value;k((0,r.Z)((0,r.Z)({},L),{},(0,a.Z)({},s,n)))},className:"p-3 border h-11 max-w-[349px] w-full border-gray-400 rounded-md focus:outline-none focus:border-blue-500 bg-transparent"}))]}),(0,x.jsxs)("p",{className:"font-bold justify-self-start text-[14px] self-end",children:["Click here to continue with a password: ",(0,x.jsx)("a",{onClick:function(){return function(){N(!0);var e=window.location.href,t=e.includes("?")?"&":"?",s="".concat(e).concat(t).concat("&password=true");window.location.href=s,N(!1)}()},className:"text-blue-500 hover:text-blue-400 justify-self-end cursor-pointer",children:"Continue"})]}),(0,x.jsx)("button",{className:"rounded-md h-11 ".concat(j?"border pointer-events-none border-gray-400 text-blue-400":"bg-blue-500 text-white hover:bg-blue-400"," rounded-md h-11 font-bold text-xl"),type:"submit",disabled:f,children:f?(0,x.jsx)("span",{className:"loading loading-spinner loading-md"}):"Login"}),(0,x.jsxs)("div",{className:"grid gap-1 font-bold",children:[(0,x.jsxs)("p",{className:"m-0 text-left text-[14px] text-gray-600",children:["Login as Channel partner",(0,x.jsx)("a",{className:"text-blue-500 hover:text-blue-400",href:"/login/channelPartner",children:" Login"})]}),(0,x.jsxs)("p",{className:"m-0 text-left text-[14px] text-gray-600",children:["Login as Employer",(0,x.jsx)("a",{className:"text-blue-500 hover:text-blue-400",href:"/login/employer",children:" Login"})]}),(0,x.jsxs)("p",{className:"m-0 text-left text-[14px] text-gray-600",children:["Login as Supplier ",(0,x.jsx)("a",{className:"text-blue-500 hover:text-blue-400",href:"/login/supplier",children:" Login"})]})]})]})}},7685:function(e,t,s){s.r(t);var a=s(9439),r=s(2791),n=s(6949),l=s(4035),o=s(1548),i=s(184);t.default=function(){var e=(0,r.useState)(!1),t=(0,a.Z)(e,2),s=t[0],c=t[1];return(0,r.useEffect)((function(){var e=window.location.href,t=new URLSearchParams(e).get("password");c("true"===t)}),[]),(0,i.jsxs)("div",{className:"flex justify-between w-full   ",children:[(0,i.jsxs)("div",{className:"bg-blue-950 w-full max-w-full h-screen max-md:hidden  grid p-8",children:[(0,i.jsx)("img",{alt:"logo",href:"/",className:"w-[4rem]  m-0 justify-self-start transform hover:scale-[1.1] transition-transform duration-500 cursor-pointer",src:n}),(0,i.jsxs)("div",{className:"m-auto mt-[-5rem] w-full max-w-[30rem] grid gap-5",children:[(0,i.jsx)("h1",{className:"m-auto text-4xl font-bold text-[#BCBAC7]",children:"Welcome!"}),(0,i.jsx)("p",{className:"font-bold text-[#BCBAC7] text-[1.2rem]  ",children:"Welcome to Seamless Job Matching, where your dream career meets its perfect match! ATS Login & Sign Up now to embark on your journey to professional success."})]})]}),(0,i.jsx)("div",{className:"bg-white w-full h-screen  flex align-center justify-center items-center p-8 ",children:s?(0,i.jsx)(l.Z,{tittle:"Login as Supplier",role:"Company"}):(0,i.jsx)(o.Z,{tittle:"Login as Supplier",role:"As Supplier"})})]})}},9158:function(e,t,s){s.d(t,{a:function(){return a}});var a="https://test-back-end-dszgwhplxa-el.a.run.app"},6949:function(e,t,s){e.exports=s.p+"static/media/logo.b5d5329083f68bc12e3c.png"}}]);
//# sourceMappingURL=685.906d62b0.chunk.js.map