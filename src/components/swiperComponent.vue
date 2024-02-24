<template>
<div class="py-3">
  <h3 class="mb-3">{{ adTitle[adCategoryTitle] }}</h3>
  <Swiper
    :slidesPerView="1"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :breakpoints="{
        768: {
          slidesPerView: 3,
        },
      }"
      :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
    >
      <SwiperSlide v-for="(item, idx) in adCurrentCategory" :key="idx">
      <router-link :to="`/productinfo/${item.id}`">
        <img :src="item.imageUrl" :alt="item.title" class="mb-2">
      <p class="text-center text-dark">{{ item.title }}</p>
      </router-link>
      </SwiperSlide>
    </Swiper>
</div>
</template>

<script>
// import Swiper js
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const { VITE_API, VITE_PATH } = import.meta.env

export default {
  props: ['adCategoryTitle'],
  data () {
    return {
      allProducts: [],
      adTitle: {
        sweet: '猜你喜歡吃甜甜',
        taste: '邀請你來嚐口感',
        spices: '美味氣氛隨你加'
      },
      regexCategory: {
        sweet: /(蛋糕|糖果)/,
        taste: /(麵包|餅乾)/,
        spices: /(餐具|飲料|果醬)/
      },
      adCurrentCategory: [],
      modules: [Autoplay, Pagination, Navigation]
    }
  },
  methods: {
    // 取得產品分類列表
    getAdCategory () {
      const allData = this.allProducts
      const regexMap = Object.entries(this.regexCategory)

      allData.forEach(data => {
        regexMap.forEach(([category, reg]) => {
          if (category === this.adCategoryTitle && reg.test(data.category)) {
            this.adCurrentCategory.push(data)
          }
        })
      })
    },

    // 獲取所有產品
    getAllProducts () {
      const url = `${VITE_API}/api/${VITE_PATH}/products/all`

      this.axios.get(url)
        .then(res => {
          this.allProducts = res.data.products
          this.getAdCategory()
        })
        .catch(err => {
          this.$swal.fire(
            {
              icon: 'error',
              text: err.response.data.message
            }
          )
        })
    }
  },
  mounted () {
    this.getAllProducts()
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style>
.swiper-slide img {
  display: block;
  width: 100%;
  max-height: 170px;
  object-fit: cover;
}

.swiper-wrapper{
  margin-bottom:3rem;
}
</style>
