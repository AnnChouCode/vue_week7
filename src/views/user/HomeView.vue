<template>
  <div class="container py-5">
    <h1 class="mb-3">Hello! Welcome to Dessert Time.</h1>
    <swiperComponent adCategoryTitle="sweet"></swiperComponent>
    <swiperComponent adCategoryTitle="taste"></swiperComponent>
    <swiperComponent adCategoryTitle="spices"></swiperComponent>
  </div>
</template>

<script>
import swiperComponent from '@/components/swiperComponent.vue'

export default {
  components: {
    swiperComponent
  }
}
</script>

<style scoped>
</style>
