"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5022],{67979:function(e,t,o){var n=o(26314).default,r=o(36199).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(o(2265)),i=n(o(54440)),l=o(98167),s=o(9273),c=n(o(82298));t.default=e=>{let{className:t,prefixCls:o,style:n,color:r,children:u,text:d,placement:m="end",rootClassName:b}=e,{getPrefixCls:p,direction:f}=a.useContext(s.ConfigContext),g=p("ribbon",o),$=`${g}-wrapper`,[v,y,h]=(0,c.default)(g,$),O=(0,l.isPresetColor)(r,!1),C=(0,i.default)(g,`${g}-placement-${m}`,{[`${g}-rtl`]:"rtl"===f,[`${g}-color-${r}`]:O},t),k={},S={};return r&&!O&&(k.background=r,S.color=r),v(a.createElement("div",{className:(0,i.default)($,b,y,h)},u,a.createElement("div",{className:(0,i.default)(C,y),style:Object.assign(Object.assign({},k),n)},a.createElement("span",{className:`${g}-text`},d),a.createElement("div",{className:`${g}-corner`,style:S}))))}},68896:function(e,t,o){var n=o(36199).default,r=o(26314).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(o(54440)),i=n(o(2265)),l=o(39904),s=o(9273),c=r(o(51313)),__rest=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(o[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)0>t.indexOf(n[r])&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};let u=i.forwardRef((e,t)=>{let{prefixCls:o,count:n,className:r,motionClassName:u,style:d,title:m,show:b,component:p="sup",children:f}=e,g=__rest(e,["prefixCls","count","className","motionClassName","style","title","show","component","children"]),{getPrefixCls:$}=i.useContext(s.ConfigContext),v=$("scroll-number",o),y=Object.assign(Object.assign({},g),{"data-show":b,style:d,className:(0,a.default)(v,r,u),title:m}),h=n;if(n&&Number(n)%1==0){let e=String(n).split("");h=i.createElement("bdi",null,e.map((t,o)=>i.createElement(c.default,{prefixCls:v,count:Number(n),value:t,key:e.length-o})))}return(d&&d.borderColor&&(y.style=Object.assign(Object.assign({},d),{boxShadow:`0 0 0 1px ${d.borderColor} inset`})),f)?(0,l.cloneElement)(f,e=>({className:(0,a.default)(`${v}-custom-component`,null==e?void 0:e.className,u)})):i.createElement(p,Object.assign({},y,{ref:t}),h)});t.default=u},51313:function(e,t,o){var n=o(36199).default,r=o(26314).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){let t,o;let{prefixCls:n,count:r,value:a}=e,l=Number(a),s=Math.abs(r),[c,u]=i.useState(l),[d,m]=i.useState(s),onTransitionEnd=()=>{u(l),m(s)};if(i.useEffect(()=>{let e=setTimeout(()=>{onTransitionEnd()},1e3);return()=>{clearTimeout(e)}},[l]),c===l||Number.isNaN(l)||Number.isNaN(c))t=[i.createElement(UnitNumber,Object.assign({},e,{key:l,current:!0}))],o={transition:"none"};else{t=[];let n=l+10,r=[];for(let e=l;e<=n;e+=1)r.push(e);let a=r.findIndex(e=>e%10===c);t=r.map((t,o)=>i.createElement(UnitNumber,Object.assign({},e,{key:t,value:t%10,offset:o-a,current:o===a})));let u=d<s?1:-1;o={transform:`translateY(${-function(e,t,o){let n=e,r=0;for(;(n+10)%10!==t;)n+=o,r+=o;return r}(c,l,u)}00%)`}}return i.createElement("span",{className:`${n}-only`,style:o,onTransitionEnd:onTransitionEnd},t)};var a=r(o(54440)),i=n(o(2265));function UnitNumber(e){let t,{prefixCls:o,value:n,current:r,offset:l=0}=e;return l&&(t={position:"absolute",top:`${l}00%`,left:0}),i.createElement("span",{style:t,className:(0,a.default)(`${o}-only-unit`,{current:r})},n)}},95022:function(e,t,o){var n=o(26314).default,r=o(36199).default;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=r(o(2265)),i=n(o(54440)),l=n(o(52640)),s=o(98167),c=o(39904),u=o(9273),d=n(o(67979)),m=n(o(68896)),b=n(o(7920)),__rest=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&0>t.indexOf(n)&&(o[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)0>t.indexOf(n[r])&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(o[n[r]]=e[n[r]]);return o};let p=a.forwardRef((e,t)=>{var o,n,r,d,p;let{prefixCls:f,scrollNumberPrefixCls:g,children:$,status:v,text:y,color:h,count:O=null,overflowCount:C=99,dot:k=!1,size:S="default",title:j,offset:N,style:w,className:x,rootClassName:E,classNames:T,styles:P,showZero:_=!1}=e,I=__rest(e,["prefixCls","scrollNumberPrefixCls","children","status","text","color","count","overflowCount","dot","size","title","offset","style","className","rootClassName","classNames","styles","showZero"]),{getPrefixCls:R,direction:B,badge:z}=a.useContext(u.ConfigContext),M=R("badge",f),[D,F,W]=(0,b.default)(M),H=O>C?`${C}+`:O,Z="0"===H||0===H,A=null===O||Z&&!_,K=(null!=v||null!=h)&&A,q=k&&!Z,U=q?"":H,L=(0,a.useMemo)(()=>{let e=null==U||""===U;return(e||Z&&!_)&&!q},[U,Z,_,q]),V=(0,a.useRef)(O);L||(V.current=O);let X=V.current,Y=(0,a.useRef)(U);L||(Y.current=U);let G=Y.current,J=(0,a.useRef)(q);L||(J.current=q);let Q=(0,a.useMemo)(()=>{if(!N)return Object.assign(Object.assign({},null==z?void 0:z.style),w);let e={marginTop:N[1]};return"rtl"===B?e.left=parseInt(N[0],10):e.right=-parseInt(N[0],10),Object.assign(Object.assign(Object.assign({},e),null==z?void 0:z.style),w)},[B,N,w,null==z?void 0:z.style]),ee=null!=j?j:"string"==typeof X||"number"==typeof X?X:void 0,et=L||!y?null:a.createElement("span",{className:`${M}-status-text`},y),eo=X&&"object"==typeof X?(0,c.cloneElement)(X,e=>({style:Object.assign(Object.assign({},Q),e.style)})):void 0,en=(0,s.isPresetColor)(h,!1),er=(0,i.default)(null==T?void 0:T.indicator,null===(o=null==z?void 0:z.classNames)||void 0===o?void 0:o.indicator,{[`${M}-status-dot`]:K,[`${M}-status-${v}`]:!!v,[`${M}-color-${h}`]:en}),ea={};h&&!en&&(ea.color=h,ea.background=h);let ei=(0,i.default)(M,{[`${M}-status`]:K,[`${M}-not-a-wrapper`]:!$,[`${M}-rtl`]:"rtl"===B},x,E,null==z?void 0:z.className,null===(n=null==z?void 0:z.classNames)||void 0===n?void 0:n.root,null==T?void 0:T.root,F,W);if(!$&&K){let e=Q.color;return D(a.createElement("span",Object.assign({},I,{className:ei,style:Object.assign(Object.assign(Object.assign({},null==P?void 0:P.root),null===(r=null==z?void 0:z.styles)||void 0===r?void 0:r.root),Q)}),a.createElement("span",{className:er,style:Object.assign(Object.assign(Object.assign({},null==P?void 0:P.indicator),null===(d=null==z?void 0:z.styles)||void 0===d?void 0:d.indicator),ea)}),y&&a.createElement("span",{style:{color:e},className:`${M}-status-text`},y)))}return D(a.createElement("span",Object.assign({ref:t},I,{className:ei,style:Object.assign(Object.assign({},null===(p=null==z?void 0:z.styles)||void 0===p?void 0:p.root),null==P?void 0:P.root)}),$,a.createElement(l.default,{visible:!L,motionName:`${M}-zoom`,motionAppear:!1,motionDeadline:1e3},e=>{var t,o;let{className:n,ref:r}=e,l=R("scroll-number",g),s=J.current,c=(0,i.default)(null==T?void 0:T.indicator,null===(t=null==z?void 0:z.classNames)||void 0===t?void 0:t.indicator,{[`${M}-dot`]:s,[`${M}-count`]:!s,[`${M}-count-sm`]:"small"===S,[`${M}-multiple-words`]:!s&&G&&G.toString().length>1,[`${M}-status-${v}`]:!!v,[`${M}-color-${h}`]:en}),u=Object.assign(Object.assign(Object.assign({},null==P?void 0:P.indicator),null===(o=null==z?void 0:z.styles)||void 0===o?void 0:o.indicator),Q);return h&&!en&&((u=u||{}).background=h),a.createElement(m.default,{prefixCls:l,show:!L,motionClassName:n,className:c,count:G,title:ee,style:u,key:"scrollNumber",ref:r},eo)}),et))});p.Ribbon=d.default,t.default=p},7920:function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0}),t.prepareToken=t.prepareComponentToken=t.default=void 0;var n=o(89426),r=o(5101),a=o(18710);let i=new n.Keyframes("antStatusProcessing",{"0%":{transform:"scale(0.8)",opacity:.5},"100%":{transform:"scale(2.4)",opacity:0}}),l=new n.Keyframes("antZoomBadgeIn",{"0%":{transform:"scale(0) translate(50%, -50%)",opacity:0},"100%":{transform:"scale(1) translate(50%, -50%)"}}),s=new n.Keyframes("antZoomBadgeOut",{"0%":{transform:"scale(1) translate(50%, -50%)"},"100%":{transform:"scale(0) translate(50%, -50%)",opacity:0}}),c=new n.Keyframes("antNoWrapperZoomBadgeIn",{"0%":{transform:"scale(0)",opacity:0},"100%":{transform:"scale(1)"}}),u=new n.Keyframes("antNoWrapperZoomBadgeOut",{"0%":{transform:"scale(1)"},"100%":{transform:"scale(0)",opacity:0}}),d=new n.Keyframes("antBadgeLoadingCircle",{"0%":{transformOrigin:"50%"},"100%":{transform:"translate(50%, -50%) rotate(360deg)",transformOrigin:"50%"}}),genSharedBadgeStyle=e=>{let{componentCls:t,iconCls:o,antCls:m,badgeShadowSize:b,motionDurationSlow:p,textFontSize:f,textFontSizeSM:g,statusSize:$,dotSize:v,textFontWeight:y,indicatorHeight:h,indicatorHeightSM:O,marginXS:C,calc:k}=e,S=`${m}-scroll-number`,j=(0,a.genPresetColor)(e,(e,o)=>{let{darkColor:n}=o;return{[`&${t} ${t}-color-${e}`]:{background:n,[`&:not(${t}-count)`]:{color:n}}}});return{[t]:Object.assign(Object.assign(Object.assign(Object.assign({},(0,r.resetComponent)(e)),{position:"relative",display:"inline-block",width:"fit-content",lineHeight:1,[`${t}-count`]:{zIndex:e.indicatorZIndex,minWidth:h,height:h,color:e.badgeTextColor,fontWeight:y,fontSize:f,lineHeight:(0,n.unit)(h),whiteSpace:"nowrap",textAlign:"center",background:e.badgeColor,borderRadius:k(h).div(2).equal(),boxShadow:`0 0 0 ${(0,n.unit)(b)} ${e.badgeShadowColor}`,transition:`background ${e.motionDurationMid}`,a:{color:e.badgeTextColor},"a:hover":{color:e.badgeTextColor},"a:hover &":{background:e.badgeColorHover}},[`${t}-count-sm`]:{minWidth:O,height:O,fontSize:g,lineHeight:(0,n.unit)(O),borderRadius:k(O).div(2).equal()},[`${t}-multiple-words`]:{padding:`0 ${(0,n.unit)(e.paddingXS)}`,bdi:{unicodeBidi:"plaintext"}},[`${t}-dot`]:{zIndex:e.indicatorZIndex,width:v,minWidth:v,height:v,background:e.badgeColor,borderRadius:"100%",boxShadow:`0 0 0 ${(0,n.unit)(b)} ${e.badgeShadowColor}`},[`${t}-dot${S}`]:{transition:`background ${p}`},[`${t}-count, ${t}-dot, ${S}-custom-component`]:{position:"absolute",top:0,insetInlineEnd:0,transform:"translate(50%, -50%)",transformOrigin:"100% 0%",[`&${o}-spin`]:{animationName:d,animationDuration:"1s",animationIterationCount:"infinite",animationTimingFunction:"linear"}},[`&${t}-status`]:{lineHeight:"inherit",verticalAlign:"baseline",[`${t}-status-dot`]:{position:"relative",top:-1,display:"inline-block",width:$,height:$,verticalAlign:"middle",borderRadius:"50%"},[`${t}-status-success`]:{backgroundColor:e.colorSuccess},[`${t}-status-processing`]:{overflow:"visible",color:e.colorPrimary,backgroundColor:e.colorPrimary,"&::after":{position:"absolute",top:0,insetInlineStart:0,width:"100%",height:"100%",borderWidth:b,borderStyle:"solid",borderColor:"inherit",borderRadius:"50%",animationName:i,animationDuration:e.badgeProcessingDuration,animationIterationCount:"infinite",animationTimingFunction:"ease-in-out",content:'""'}},[`${t}-status-default`]:{backgroundColor:e.colorTextPlaceholder},[`${t}-status-error`]:{backgroundColor:e.colorError},[`${t}-status-warning`]:{backgroundColor:e.colorWarning},[`${t}-status-text`]:{marginInlineStart:C,color:e.colorText,fontSize:e.fontSize}}}),j),{[`${t}-zoom-appear, ${t}-zoom-enter`]:{animationName:l,animationDuration:e.motionDurationSlow,animationTimingFunction:e.motionEaseOutBack,animationFillMode:"both"},[`${t}-zoom-leave`]:{animationName:s,animationDuration:e.motionDurationSlow,animationTimingFunction:e.motionEaseOutBack,animationFillMode:"both"},[`&${t}-not-a-wrapper`]:{[`${t}-zoom-appear, ${t}-zoom-enter`]:{animationName:c,animationDuration:e.motionDurationSlow,animationTimingFunction:e.motionEaseOutBack},[`${t}-zoom-leave`]:{animationName:u,animationDuration:e.motionDurationSlow,animationTimingFunction:e.motionEaseOutBack},[`&:not(${t}-status)`]:{verticalAlign:"middle"},[`${S}-custom-component, ${t}-count`]:{transform:"none"},[`${S}-custom-component, ${S}`]:{position:"relative",top:"auto",display:"block",transformOrigin:"50% 50%"}},[`${S}`]:{overflow:"hidden",[`${S}-only`]:{position:"relative",display:"inline-block",height:h,transition:`all ${e.motionDurationSlow} ${e.motionEaseOutBack}`,WebkitTransformStyle:"preserve-3d",WebkitBackfaceVisibility:"hidden",[`> p${S}-only-unit`]:{height:h,margin:0,WebkitTransformStyle:"preserve-3d",WebkitBackfaceVisibility:"hidden"}},[`${S}-symbol`]:{verticalAlign:"top"}},"&-rtl":{direction:"rtl",[`${t}-count, ${t}-dot, ${S}-custom-component`]:{transform:"translate(-50%, -50%)"}}})}},prepareToken=e=>{let{fontHeight:t,lineWidth:o,marginXS:n,colorBorderBg:r}=e,i=e.colorBgContainer,l=e.colorError,s=e.colorErrorHover,c=(0,a.mergeToken)(e,{badgeFontHeight:t,badgeShadowSize:o,badgeTextColor:i,badgeColor:l,badgeColorHover:s,badgeShadowColor:r,badgeProcessingDuration:"1.2s",badgeRibbonOffset:n,badgeRibbonCornerTransform:"scaleY(0.75)",badgeRibbonCornerFilter:"brightness(75%)"});return c};t.prepareToken=prepareToken;let prepareComponentToken=e=>{let{fontSize:t,lineHeight:o,fontSizeSM:n,lineWidth:r}=e;return{indicatorZIndex:"auto",indicatorHeight:Math.round(t*o)-2*r,indicatorHeightSM:t,dotSize:n/2,textFontSize:n,textFontSizeSM:n,textFontWeight:"normal",statusSize:n/2}};t.prepareComponentToken=prepareComponentToken,t.default=(0,a.genStyleHooks)("Badge",e=>{let t=prepareToken(e);return genSharedBadgeStyle(t)},prepareComponentToken)},82298:function(e,t,o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(89426),r=o(7920),a=o(5101),i=o(18710);let genRibbonStyle=e=>{let{antCls:t,badgeFontHeight:o,marginXS:r,badgeRibbonOffset:l,calc:s}=e,c=`${t}-ribbon`,u=`${t}-ribbon-wrapper`,d=(0,i.genPresetColor)(e,(e,t)=>{let{darkColor:o}=t;return{[`&${c}-color-${e}`]:{background:o,color:o}}});return{[`${u}`]:{position:"relative"},[`${c}`]:Object.assign(Object.assign(Object.assign(Object.assign({},(0,a.resetComponent)(e)),{position:"absolute",top:r,padding:`0 ${(0,n.unit)(e.paddingXS)}`,color:e.colorPrimary,lineHeight:(0,n.unit)(o),whiteSpace:"nowrap",backgroundColor:e.colorPrimary,borderRadius:e.borderRadiusSM,[`${c}-text`]:{color:e.colorTextLightSolid},[`${c}-corner`]:{position:"absolute",top:"100%",width:l,height:l,color:"currentcolor",border:`${(0,n.unit)(s(l).div(2).equal())} solid`,transform:e.badgeRibbonCornerTransform,transformOrigin:"top",filter:e.badgeRibbonCornerFilter}}),d),{[`&${c}-placement-end`]:{insetInlineEnd:s(l).mul(-1).equal(),borderEndEndRadius:0,[`${c}-corner`]:{insetInlineEnd:0,borderInlineEndColor:"transparent",borderBlockEndColor:"transparent"}},[`&${c}-placement-start`]:{insetInlineStart:s(l).mul(-1).equal(),borderEndStartRadius:0,[`${c}-corner`]:{insetInlineStart:0,borderBlockEndColor:"transparent",borderInlineStartColor:"transparent"}},"&-rtl":{direction:"rtl"}})}};t.default=(0,i.genStyleHooks)(["Badge","Ribbon"],e=>{let t=(0,r.prepareToken)(e);return genRibbonStyle(t)},r.prepareComponentToken)}}]);