import{J as o,K as n}from"./index-V4UXHgs5.js";import{s as i}from"./sweetalert2.all-of4D1rfq.js";var d={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"annchou",BASE_URL:"/vue_week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_API:u,VITE_PATH:c}=d,_=o("adminOrders",{state:()=>({currentOrderList:[],pagination:{}}),actions:{getCurrentOrderList(r=1){const t=`${u}/api/${c}/admin/orders?page=${r}`;return n.get(t).then(e=>{const{orders:a,pagination:s}=e.data;return this.currentOrderList=a,this.pagination=s,e}).catch(e=>{i.fire({icon:"error",text:e.response.data.message})})}}});export{_ as u};
