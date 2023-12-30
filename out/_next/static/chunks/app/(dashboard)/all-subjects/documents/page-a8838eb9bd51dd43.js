(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4545],{69529:function(e,t,n){Promise.resolve().then(n.bind(n,92790))},33610:function(e,t,n){"use strict";n.d(t,{R:function(){return DocumentAPI}});var r=n(41962),a=n(75826),l=n(60171),s=n(2890),i=n.n(s),c=n(15230);let DocumentAPI=class DocumentAPI{static async getTopDocumentsOfSubject(e,t){try{return await a.Z.get("/document/getDocumentOfSubject",{params:{subjectId:e,limit:t}})}catch(e){return console.log(e),l.toast.error("Fetch t\xe0i liệu thất bại"),[]}}static async userUploadFiles(e){console.log("haha");try{return await Promise.all(e.files.map(async t=>{let n=new FormData;console.log(t.name),n.append("request",JSON.stringify({name:t.name,category:e.category,subjectId:e.subjectId})),t.originFileObj&&n.append("up",t.originFileObj);try{await a.Z.post("/document/createDocument",n,{headers:{"Content-Type":"multipart/form-data"}})}catch(e){console.log(e),l.toast.error("Tải t\xe0i liệu thất bại")}})),{ok:!0}}catch(e){return console.log(e),l.toast.error("Tải t\xe0i liệu thất bại"),{ok:!1}}}static async getMySubjectDocs(e,t){try{let n=await a.Z.get("/document/getMyDocumentByStudentId",{params:{studentId:t}});if(n=n.filter(t=>t.subjectId+""===e),0===n.length)return[];let r=i().map(i().groupBy(n,"category"),(e,t)=>({category:t,files:i().map(e,e=>({name:e.name,ext:(0,c.N)(e.link).ext.toUpperCase(),id:e.id,link:e.link,createdAt:new Date(e.createdAt)}))}));return r}catch(e){throw console.log(e),l.toast.error("Lấy m\xf4n học của bạn thất bại"),e}}static async deleteMySubjectDoc(e){return await (0,r.g)(2e3),{ok:!0}}static async getAllDocumentsOfSubject(e){try{let t=await a.Z.get("/document/getDocumentOfSubject",{params:{subjectId:e}});return t.map(e=>({...e,createdAt:new Date(e.createdAt)}))}catch(e){return console.log(e),l.toast.error("Fetch document thất bại"),[]}}static async toggleShare(e){return await (0,r.g)(2e3),{ok:!0}}}},92790:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return AllSubjectsDocumentsPage}});var r=n(57437),a=n(2265),l=n(24010),s=n(14666),i=n(9273),c=n(80338),o=n(68939),d=n(35302),u=n(38371),m=n(42333),h=n(33610),x=n(20911),g=n(65460),f=n(55820),p=n(15230),j=n(61396),b=n.n(j),A=n(93406);n(36045);var y=n(89188),N=n(15567),v=n(95381),w=n(72053),k=n(77013),Z=n(62420),I=n(99231),T=n.n(I),C=n(62510);let{Text:F,Paragraph:S}=d.default,D=(0,u.Z)(),U=(0,u.Z)();function AllSubjectsDocumentsPage(e){let{searchParams:{subjectId:t}}=e,{data:n,isLoading:d,mutate:u}=(0,m.ZP)([D,t],e=>{let[t,n]=e;return h.R.getAllDocumentsOfSubject(n)}),{data:j,isLoading:I}=(0,m.ZP)([U,t],e=>{let[t,n]=e;return x.i.getSubjectById(n)}),[S,P]=(0,a.useState)(""),E=(0,w.y1)(e=>{P(e)},300),O=(0,a.useMemo)(()=>n?(0,k.Z)(S,n,["name","category","userName","link"]):[],[n,S]),B=(0,a.useMemo)(()=>[{key:"order",title:(0,r.jsx)(g.J5,{children:"STT"}),render:(e,t,n)=>({children:(0,r.jsx)(g.J5,{children:n+1})})},{key:"name",title:(0,r.jsx)(g.J5,{children:"T\xean tệp"}),render:(e,t,n)=>({children:(0,r.jsx)(b(),{href:(0,A.A)("/all-subjects/documents/details",{documentId:t.id}),children:(0,r.jsx)(N.Z,{children:(0,r.jsxs)(c.default,{className:"pr-8 w-full max-w-[30vw]",children:[(0,r.jsx)("div",{className:"w-[40px]",children:(0,r.jsx)(f.Z,{ext:(0,p.N)(t.link).ext})}),(0,r.jsxs)("p",{children:[(0,r.jsx)(F,{strong:!0,className:"text-inherit",children:(0,p.N)(t.link).ext.toLocaleUpperCase()})," ",(0,r.jsx)("br",{}),(0,r.jsx)(F,{strong:!0,className:"text-inherit",children:t.name})]})]})})})})},{key:"author",title:(0,r.jsx)(g.J5,{children:"Người đăng tải"}),render:(e,t,n)=>({children:(0,r.jsx)(g.J5,{children:t.userName})})},{key:"stat",title:(0,r.jsx)(g.J5,{children:"Th\xf4ng tin"}),render:(e,t,n)=>({children:(0,r.jsx)(g.J5,{children:"".concat(t.download," lượt tải, ").concat(t.like," lượt th\xedch")})}),sorter:(e,t)=>e.download!==t.download?e.download-t.download:e.like-t.like,showSorterTooltip:!1},{key:"createdAt",title:(0,r.jsx)(g.J5,{children:"Ng\xe0y đăng tải"}),render:(e,t,n)=>({children:(0,r.jsx)(g.J5,{children:t.createdAt.toLocaleString()})}),sorter:(e,t)=>e.createdAt.getTime()-t.createdAt.getTime(),showSorterTooltip:!1}],[]);return(0,r.jsx)(l.default,{title:"T\xe0i liệu m\xf4n học",children:(0,r.jsxs)(c.default,{direction:"vertical",className:"w-full",size:"large",children:[(0,r.jsxs)("div",{className:"flex gap-5 items-center sm:max-lg:flex-col sm:max-lg:items-start",children:[(0,r.jsx)(s.Z,{title:null==j?void 0:j.name}),(0,r.jsx)("div",{className:"flex-1",children:(0,r.jsx)(v.Z,{placeholder:"T\xecm kiếm t\xe0i liệu",className:"h-[40px] w-[25vw]",onChange:e=>E(e.target.value)})}),!T()(j)&&!T()(n)&&(0,r.jsx)(Z.Z,{subjectId:t,subjectName:j.name,categories:n.map(e=>e.category),onEndUpload:()=>u(),children:(0,r.jsxs)("div",{className:"bg-primary hover:bg-dark-primary px-3 py-2 rounded-lg flex gap-2 items-center",children:[(0,r.jsx)(C.wEH,{className:"fill-secondary",size:"1.1em"}),(0,r.jsx)(F,{strong:!0,className:"text-secondary text-fs-inherit",children:"Tải l\xean"})]})})]}),(0,r.jsx)(i.default,{theme:{components:{Table:{rowHoverBg:(0,y._)("gray",80),bodySortBg:(0,y._)("gray",80)}}},children:(0,r.jsx)(o.Z,{dataSource:O,loading:d,rowKey:e=>e.id,pagination:!1,columns:B,className:"w-full",onRow:()=>({className:"hover:bg-gray-200"})})})]})})}},15567:function(e,t,n){"use strict";n.d(t,{Z:function(){return ClickableText}});var r=n(57437);function ClickableText(e){let{onClick:t,children:n}=e;return(0,r.jsx)("span",{className:"cursor-pointer hover:text-clickable",onClick:t,children:n})}n(2265)},55820:function(e,t,n){"use strict";n.d(t,{Z:function(){return DocumentImage}});var r=n(57437),a=n(16691),l=n.n(a),s=n(2265);function DocumentImage(e){let{ext:t}=e,[n,a]=(0,s.useState)("/images/icons/".concat(t.toUpperCase(),".png"));return(0,r.jsx)(l(),{src:n,alt:t,width:5e3,height:5e3,className:"!w-[40px]",onError:e=>a("/images/icons/documents.png")})}},14666:function(e,t,n){"use strict";n.d(t,{Z:function(){return TitleWithBox}});var r=n(57437);n(2265);var a=n(36045),l=n(23986);function TitleWithBox(e){let{color:t,title:n,titleClassName:s,size:i="large",boxContent:c,className:o,boxClassName:d}=e;return(0,r.jsxs)("div",{className:(0,l.m)("flex gap-4 items-center",o),children:[(0,r.jsx)(a.Z,{color:t,className:d,children:c}),(0,r.jsx)("span",{className:(0,l.m)("font-semibold ".concat("ultra"===i?"text-3xl":"text-2xl"),s),children:n})]})}},62420:function(e,t,n){"use strict";n.d(t,{Z:function(){return UserUpload}});var r=n(57437),a=n(89348),l=n(82881),s=n(2265),i=n(27187),c=n(40155),o=n(79404),d=n(43574),u=n(33071),m=n(35302),h=n(14666),x=n(33610),g=n(43581),f=n(58861),p=n(33116),j=n(65137),b=n(16691),A=n.n(b),y={src:"/_next/static/media/upload.4edbf8a1.png",height:256,width:256,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAANlBMVEVMaXFmp/90tf9+xP94uP9Hif91tP9ztP94uv9alv94tP9Iiv9wr/97vf93uP+Fzf90t/9Plf8QRvvwAAAAEnRSTlMAvF51Ldt/5/oLIlFNxF7///cDXOazAAAACXBIWXMAAAdiAAAHYgE4epnbAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAADhJREFUeJxNy0kSwCAIBMABkcWowP8/m1sqfW/gR4geALFPdQeg6d4zIFZ8ywQjndlzYJGpGq3vvjB7AWF+woF1AAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8};let{Dragger:N}=j.default,{Text:v,Paragraph:w}=m.default,k={accept:".jpg,.png,.pdf",name:"file",multiple:!0,action:"".concat("http://localhost:8000/api","/document/dumpUpload"),onChange(e){let{status:t}=e.file;"uploading"!==t&&console.log(e.file,e.fileList),"done"===t?p.ZP.success("Tệp ".concat(e.file.name," tải l\xean th\xe0nh c\xf4ng")):"error"===t&&p.ZP.error("Tệp ".concat(e.file.name," tải l\xean thất bại"))},onDrop(e){console.log("Dropped files",e.dataTransfer.files)},beforeUpload(e){let t=e.size/1024/1024,n=t<=10;return n||p.ZP.error("Dung lượng tệp lớn hơn ".concat("10","MB")),n}};function UploadFileArea(e){return(0,r.jsx)(N,{...k,...e,children:(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)(A(),{src:y,alt:"Tải t\xe0i liệu l\xean",className:"m-auto w-[50px] h-[50px]"}),(0,r.jsx)(w,{strong:!0,className:"text-base",children:"Nhấn hoặc k\xe9o thả để tải t\xe0i liệu"}),(0,r.jsxs)(w,{type:"secondary",className:"text-left",children:[(0,r.jsx)(v,{strong:!0,type:"danger",children:"* "}),"Lưu \xfd: ",(0,r.jsx)("br",{}),"- Dung lượng tệp kh\xf4ng vượt qu\xe1 ",(0,r.jsxs)("strong",{children:["10","MB"]}),". ",(0,r.jsx)("br",{}),"- Đu\xf4i mở rộng được chấp nhận: ",(0,r.jsx)("strong",{children:".jpg,.png,.pdf"}),". ",(0,r.jsx)("br",{}),"- T\xe0i liệu của bạn sẽ được c\xf4ng khai với mọi người"]})]})})}var Z=n(41962),I=n(99231),T=n.n(I),C=n(22396);let{Text:F}=m.default,formItemName=e=>e;function UserUpload(e){let{subjectId:t,subjectName:n,categories:i,onEndUpload:c,children:o}=e,[d,u]=(0,s.useState)(!1);return(0,r.jsxs)(r.Fragment,{children:[T()(o)?(0,r.jsx)(l.Z,{className:" group-hover/document:opacity-100 transition-opacity duration-300",onClick:()=>u(!0),children:(0,r.jsx)(a.u0U,{size:25,className:"fill-royal-gray hover:fill-current"})}):(0,r.jsx)("button",{onClick:()=>u(!0),children:o}),(0,r.jsx)(UploadArea,{uploading:d,onCancel:()=>u(!1),subjectId:t,subjectName:n,categories:i,onEndUpload:c})]})}function UploadArea(e){let{subjectId:t,uploading:n,onCancel:a,subjectName:l,categories:s,onEndUpload:i}=e;return(0,r.jsxs)(u.Z,{title:(0,r.jsx)(h.Z,{title:"Tải t\xe0i liệu l\xean",className:"mb-5"}),open:n,onCancel:a,width:600,destroyOnClose:!0,footer:[],closeIcon:null,children:[(0,r.jsx)(c.default,{}),(0,r.jsx)(FormUpload,{onCancel:a,subjectId:t,subjectName:l,categories:s,onEndUpload:i})]})}function FormUpload(e){let{onCancel:t,subjectId:n,subjectName:a,categories:l,onEndUpload:c}=e,[u]=(0,g.Z)(),m=(0,s.useRef)("");return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(o.Z,{onFinish:handleSubmit,labelCol:{span:4},form:u,initialValues:{["".concat(formItemName("subjectId"))]:a||"vcl"},children:[(0,r.jsx)(o.Z.Item,{name:formItemName("subjectId"),label:(0,r.jsx)(F,{strong:!0,children:"Học phần"}),children:(0,r.jsx)(d.default,{disabled:!0})}),(0,r.jsx)(o.Z.Item,{label:(0,r.jsx)(F,{children:(0,r.jsx)("strong",{children:"Thẻ"})}),rules:[{required:!0,message:"Thẻ kh\xf4ng được rỗng"}],trigger:"onSelect",children:(0,r.jsx)(i.Z,{placeholder:"Chọn thẻ",onChange:e=>m.current=e,options:l.map(e=>({value:e})),popupMatchSelectWidth:!1,filterOption:(e,t)=>!!T()(t)||(0,C.Z)(t.value).includes((0,C.Z)(e))})}),(0,r.jsx)(o.Z.Item,{name:formItemName("files"),rules:[{required:!0,message:"Vui l\xf2ng chọn \xedt nhất một tệp"}],label:(0,r.jsx)("strong",{children:"Tệp"}),getValueFromEvent:e=>null==e?void 0:e.fileList,children:(0,r.jsx)(UploadFileArea,{})}),(0,r.jsx)(o.Z.Item,{wrapperCol:{offset:4},children:(0,r.jsx)(f.k,{onClick:async()=>{u.submit(),await (0,Z.g)(1500)},children:"Lưu lại"})})]})});async function handleSubmit(e){u.setFieldValue(formItemName("subjectId"),n),e.subjectId=n,e.category=m.current,console.log(e),await x.R.userUploadFiles(e),null==c||c(),t()}}},15230:function(e,t,n){"use strict";function getExtOfFile(e){let t,n;let r=e.lastIndexOf(".");return -1!==r?(t=e.slice(0,r),n=e.slice(r+1)):(t=e,n=""),{ext:n,name:t}}n.d(t,{N:function(){return getExtOfFile}})},89188:function(e,t,n){"use strict";n.d(t,{_:function(){return lightenDarkenColor}});let LightenDarkenColor=function(e,t){var n=!1;"#"==e[0]&&(e=e.slice(1),n=!0);var r=parseInt(e,16),a=(r>>16)+t;a>255?a=255:a<0&&(a=0);var l=(r>>8&255)+t;l>255?l=255:l<0&&(l=0);var s=(255&r)+t;return s>255?s=255:s<0&&(s=0),(n?"#":"")+(s|l<<8|a<<16).toString(16)};function lightenDarkenColor(e,t){return LightenDarkenColor(e,t)}}},function(e){e.O(0,[2400,1866,2306,6169,9020,1718,9273,2808,350,260,3986,5022,3954,8110,9271,9385,5623,6912,3574,2333,2838,413,5895,1396,8466,2510,3071,2863,3063,8838,2971,2472,1744],function(){return e(e.s=69529)}),_N_E=e.O()}]);