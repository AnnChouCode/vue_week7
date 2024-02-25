import{p as k}from"./paginationComponent-Qg2CyUmd.js";import{M as x}from"./modal-lLWtzF-w.js";import{_ as v,r as _,o as a,c as d,b as t,t as f,d as u,w as B,R as b,L as I,X as y,F as g,I as M}from"./index-V4UXHgs5.js";const $={data(){return{modal:null,tempCouponInfo:{},due_date:""}},props:["couponInfo","isNew"],watch:{couponInfo(){this.tempCouponInfo=this.couponInfo;const s=new Date(this.couponInfo.due_date*1e3).toISOString().split("T");this.due_date=s[0]},due_date(){const s=new Date(this.due_date);this.tempCouponInfo.due_date=Math.floor(s/1e3)}},methods:{openModal(){this.modal.show()},closeModal(){this.modal.hide()}},mounted(){this.modal=new x(this.$refs.adminCouponModal,{keyboard:!1,backdrop:"static"})}},V={class:"modal",tabindex:"-1",ref:"adminCouponModal"},T={class:"modal-dialog modal-lg modal-dialog-centered"},L={class:"modal-content"},N={class:"modal-header"},W={key:0,class:"modal-title fw-bold"},q={key:1,class:"modal-title fw-bold"},S=t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),D={class:"modal-body"},E=t("label",{for:"title",class:"form-label fw-bold has-required"},"優惠券標題",-1),U=t("label",{for:"code",class:"form-label fw-bold has-required"},"優惠碼",-1),A=t("span",{class:"ms-2 text-info fs-info"},"建立後無法更改",-1),P=t("label",{for:"discound",class:"form-label fw-bold has-required"},"訂單折扣百分比",-1),R=t("span",{class:"ms-2 text-info fs-info"},"建立後無法更改",-1),O=t("label",{for:"due_date",class:"form-label fw-bold has-required"},"優惠到期日",-1),Q={class:"form-check form-switch"},j={class:"form-check-label",for:"is_enabled"},F={key:0},G={key:1},H={class:"d-flex justify-content-end gap-2 pt-3"};function z(s,o,n,r,e,l){const p=_("v-field"),m=_("error-message"),c=_("v-form");return a(),d("div",V,[t("div",T,[t("div",L,[t("div",N,[n.isNew?(a(),d("h5",W,"建立優惠券")):(a(),d("h5",q,"優惠券："+f(e.tempCouponInfo.code),1)),S]),t("div",D,[u(c,{class:"d-flex flex-column gap-3"},{default:B(({errors:h})=>[t("div",null,[E,u(p,{class:b(["form-control",{"is-invalid":h.title}]),type:"text",placeholder:"請輸入標題",modelValue:e.tempCouponInfo.title,"onUpdate:modelValue":o[0]||(o[0]=i=>e.tempCouponInfo.title=i),id:"title",name:"title",rules:"required"},null,8,["modelValue","class"]),u(m,{name:"title",class:"invalid-feedback"})]),t("div",null,[U,A,u(p,{class:b(["form-control",{"is-invalid":h.code}]),placeholder:"請輸入 6-24 個字元內的英數組合優惠碼",modelValue:e.tempCouponInfo.code,"onUpdate:modelValue":o[1]||(o[1]=i=>e.tempCouponInfo.code=i),id:"code",name:"code",rules:"required|alpha_num|max:24|min:6",disabled:!n.isNew},null,8,["modelValue","class","disabled"]),u(m,{name:"code",class:"invalid-feedback"})]),t("div",null,[P,R,u(p,{class:b(["form-control",{"is-invalid":h.code}]),type:"number",placeholder:"請輸入 1-99",modelValue:e.tempCouponInfo.percent,"onUpdate:modelValue":o[2]||(o[2]=i=>e.tempCouponInfo.percent=i),modelModifiers:{number:!0},id:"discount",name:"discount",rules:"required|between:1,99",disabled:!n.isNew},null,8,["modelValue","class","disabled"]),u(m,{name:"discount",class:"invalid-feedback"})]),t("div",null,[O,u(p,{class:b(["form-control",{"is-invalid":h.due_date}]),type:"date",placeholder:"請設定日期",modelValue:e.due_date,"onUpdate:modelValue":o[3]||(o[3]=i=>e.due_date=i),id:"due_date",name:"due_date",rules:"required"},null,8,["modelValue","class"]),u(m,{name:"due_date",class:"invalid-feedback"})]),t("div",Q,[I(t("input",{class:"form-check-input",type:"checkbox",role:"switch",id:"is_enabled",checked:"","onUpdate:modelValue":o[4]||(o[4]=i=>e.tempCouponInfo.is_enabled=i),"true-value":1,"false-value":0},null,512),[[y,e.tempCouponInfo.is_enabled]]),t("label",j,[e.tempCouponInfo.is_enabled?(a(),d("span",F,"更改為未啟用")):(a(),d("span",G,"更改為已啟用"))])]),t("div",H,[t("button",{type:"button",class:"btn btn-outline-dark",onClick:o[5]||(o[5]=(...i)=>l.closeModal&&l.closeModal(...i))},"取消"),t("button",{type:"button",class:"btn btn-dark text-white",onClick:o[6]||(o[6]=i=>this.$emit("updateCoupon",e.tempCouponInfo))},f(n.isNew?"新增優惠券":"更新優惠券"),1)])]),_:1})])])])],512)}const X=v($,[["render",z]]);var J={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"annchou",BASE_URL:"/vue_week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API:C,VITE_PATH:w}=J,K={data(){return{couponList:[],pagination:{},tempCoupon:{},isNew:!1,swalQuestionWithBootstrapButtons:null,swalInfoCheckWithBootstrapButtons:null}},methods:{getCouponList(s=1){const o=`${C}/api/${w}/admin/coupons?page=${s}`;this.axios.get(o).then(n=>{const{coupons:r,pagination:e}=n.data;this.couponList=r,this.pagination=e}).catch(n=>{this.swalInfoCheckWithBootstrapButtons.fire({icon:"error",text:n.response.data.message,confirmButtonText:"確認"})})},updateCoupon(s){const o=this.$loading.show();let n=`${C}/api/${w}/admin/coupon`,r="post";this.isNew||(n+=`/${s.id}`,r="put"),this.axios[r](n,{data:s}).then(e=>{this.swalInfoCheckWithBootstrapButtons.fire({title:e.data.message,confirmButtonText:"確認"}),this.$refs.adminCouponModal.closeModal(),this.getCouponList()}).catch(e=>{this.swalInfoCheckWithBootstrapButtons.fire({icon:"error",text:e.response.data.message,confirmButtonText:"確認"})}).finally(()=>{o.hide()})},showCoupon(s,o){s==="create"&&(this.isNew=!0,this.tempCoupon={title:"",is_enabled:0,percent:null,due_date:new Date().getTime()/1e3,code:""}),s==="edit"&&(this.isNew=!1,this.tempCoupon={...o}),this.$refs.adminCouponModal.openModal()},deleteCoupon(s){const o=`${C}/api/${w}/admin/coupon/${s}`,n=`確定要刪除優惠券 <span class="text-danger">${s}</span> 嗎？`;this.swalQuestionWithBootstrapButtons.fire({title:n,text:"請再次確認，以免影響顧客權益",icon:"question",showCancelButton:!0,cancelButtonText:"取消",confirmButtonText:"確認刪除"}).then(r=>{if(r.isConfirmed){const e=this.$loading.show();this.axios.delete(o).then(l=>{this.swalInfoCheckWithBootstrapButtons.fire({title:l.data.message,confirmButtonText:"確認"}),this.getCouponList()}).catch(l=>{this.swalInfoCheckWithBootstrapButtons.fire({icon:"error",text:l.response.data.message,confirmButtonText:"確認"})}).finally(()=>{e.hide()})}})}},components:{paginationComponent:k,adminCouponModal:X},mounted(){this.getCouponList(),this.swalQuestionWithBootstrapButtons=this.$swal.mixin({customClass:{confirmButton:"m-1 btn btn-outline-default",cancelButton:"m-1 btn btn-default"},buttonsStyling:!1}),this.swalInfoCheckWithBootstrapButtons=this.$swal.mixin({customClass:{confirmButton:"m-1 btn btn-default"},buttonsStyling:!1})}},Y={class:"overflow-y-scroll scrollbar-y-hide vh-100"},Z={class:"d-flex justify-content-between py-4 py-md-5"},tt=t("h2",{class:"fw-bold"},"優惠券管理",-1),et={key:0,class:"py-5 text-center"},ot={key:1,class:"table align-middle"},st=t("thead",null,[t("tr",null,[t("th",{class:"d-none d-md-table-cell"},"優惠碼"),t("th",null,"型式"),t("th",null,"到期日"),t("th",null,"狀態"),t("th")])],-1),nt={class:"d-none d-md-table-cell"},lt={class:"fw-bold"},it={class:"text-default"},at={key:0,class:"text-danger"},dt={key:1},ct={class:"btn-group align-items-center"},ut=["onClick"],rt=t("i",{class:"bi bi-pencil text-default"},null,-1),pt=[rt],mt=["onClick"],ht=t("i",{class:"bi bi-trash text-danger"},null,-1),ft=[ht];function _t(s,o,n,r,e,l){const p=_("paginationComponent"),m=_("adminCouponModal");return a(),d(g,null,[t("div",Y,[t("div",Z,[tt,t("button",{type:"button",class:"btn btn-dark",onClick:o[0]||(o[0]=c=>l.showCoupon("create"))},"建立優惠券")]),t("div",null,[e.couponList.length?(a(),d("table",ot,[st,t("tbody",null,[(a(!0),d(g,null,M(e.couponList,c=>(a(),d("tr",{key:c.id},[t("td",nt,f(c.code),1),t("td",null,[t("p",lt,f(c.title),1),t("span",it,"折扣："+f(c.percent)+" %",1)]),t("td",null,f(new Date(c.due_date*1e3).toLocaleString().split(" ")[0]),1),t("td",null,[c.is_enabled?(a(),d("span",at,"啟用中")):(a(),d("span",dt,"未啟用"))]),t("td",null,[t("div",ct,[t("button",{type:"button",class:"btn border-0",onClick:h=>l.showCoupon("edit",c)},pt,8,ut),t("button",{type:"button",class:"btn border-0",onClick:h=>l.deleteCoupon(c.id)},ft,8,mt)])])]))),128))])])):(a(),d("p",et,"目前沒有優惠券")),u(p,{pagination:e.pagination,onGetList:l.getCouponList},null,8,["pagination","onGetList"])])]),u(m,{isNew:e.isNew,couponInfo:e.tempCoupon,ref:"adminCouponModal",onUpdateCoupon:l.updateCoupon},null,8,["isNew","couponInfo","onUpdateCoupon"])],64)}const gt=v(K,[["render",_t]]);export{gt as default};
