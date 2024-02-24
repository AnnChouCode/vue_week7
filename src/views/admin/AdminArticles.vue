<template>
    <div class="overflow-y-scroll scrollbar-y-hide vh-100">
        <div class="d-flex justify-content-between py-4 py-md-5">
            <h2 class=" fw-bold">文章管理</h2>
            <router-link to="/admin/articleinfo/new" class="btn btn-dark">建立文章</router-link>
        </div>

      <div>
        <p v-if="!currentArticles.length" class="py-5 text-center">目前沒有文章</p>
        <!-- 文章列表 -->
        <table v-else class="table align-middle">
          <thead>
              <tr>
                <th>標題</th>
                <th>分類</th>
                <th>狀態</th>
                <th class="d-none d-lg-table-cell">作者</th>
                <th class="d-none d-md-table-cell">撰寫日期</th>
                <th></th>
              </tr>
          </thead>
          <tbody>
            <tr v-for="article in currentArticles" :key="article.id">
              <td>{{ article.title }}</td>
              <td>
                <p class="py-1 rounded-pill bg-light text-center text-nowrap">{{ article.category }}</p>
              </td>
              <td>
                <span v-if="article.isPublic" class="text-danger text-nowrap">發佈中</span>
                <span v-else>未發佈</span>
              </td>
              <td  class="d-none d-lg-table-cell">
                {{ article.author }}
              </td>
              <td class="d-none d-md-table-cell">{{ new Date(article.create_at * 1000).toLocaleString().split(" ")[0] }}</td>
              <td>
                <div class="btn-group align-items-center">
                <button
                  type="button"
                  class="btn border-0" @click="showArticlePage(article.id)">
                  <i class="bi bi-pencil text-default"></i>
                </button>
                <button type="button" class="btn border-0" @click="deleteArticle(article.id)">
                  <i class="bi bi-trash text-danger"></i>
                </button>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 頁碼 -->
        <paginationComponent :pagination="pagination" @get-List="getCurrentArticles"></paginationComponent>
      </div>
    </div>
  </template>

<script>
import paginationComponent from '@/components/paginationComponent.vue'

const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      currentArticles: [],
      pagination: {},
      tempCoupon: {},
      isNew: false
    }
  },
  methods: {
    // 獲取所有優惠券
    getCurrentArticles (page = 1) {
      const url = `${VITE_API}/api/${VITE_PATH}/admin/articles?page=${page}`

      this.axios
        .get(url)
        .then((res) => {
          const { articles, pagination } = res.data
          this.currentArticles = articles
          this.pagination = pagination
          console.log(this.currentArticles)
        })
        .catch((err) => {
          this.$swal.fire({
            icon: 'error',
            text: err.response.data.message
          })
        })
    },

    // 觀看文章
    showArticlePage (id) {
      this.$router.push(`/admin/articleinfo/${id}`)
    },

    // 刪除文章
    deleteArticle (id) {
      const url = `${VITE_API}/api/${VITE_PATH}/admin/article/${id}`

      // 刪除前詢問
      this.$swal
        .fire({
          title: '確定要刪除文章嗎？',
          text: '這個動作無法復原',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#787878',
          cancelButtonColor: '#333333',
          cancelButtonText: '取消',
          confirmButtonText: '確認刪除'
        })
        .then((result) => {
          if (result.isConfirmed) {
            // 開啟 loading
            const loader = this.$loading.show()

            this.axios.delete(url)
              .then(res => {
                // 提示訊息
                this.$swal.fire({
                  title: res.data.message,
                  confirmButtonColor: '#333333',
                  confirmButtonText: '確認'
                })
                // 重整文章列表
                this.getCurrentArticles()
              })
              .catch(err => {
                this.$swal.fire(
                  {
                    icon: 'error',
                    text: err.response.data.message
                  }
                )
              })
              .finally(() => {
                // 關閉 loading
                loader.hide()
              })
          }
        })
    }
  },
  components: {
    paginationComponent
  },
  mounted () {
    // 獲取當頁資料
    this.getCurrentArticles()
  }
}
</script>

  <style></style>
