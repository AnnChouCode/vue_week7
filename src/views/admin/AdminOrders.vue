<template>
  <div class="overflow-y-scroll scrollbar-y-hide vh-100">
    <div class="d-flex justify-content-between py-4 py-md-5 ">
      <h2 class="fw-bold">訂單管理</h2>
      <button type="button" class="btn btn-dark" @click="deleteOrder('all')">清除全部訂單</button>
    </div>
    <div>
      <p v-if="!ordersList.length" class="py-5 text-center">目前沒有訂單</p>
      <!-- 訂單列表 -->
      <table v-else class="table align-middle table-sm">
        <thead>
            <tr>
              <th>訂單編號</th>
              <th class="d-none d-md-table-cell text-center">訂單時間</th>
              <th class="d-none d-lg-table-cell text-center">客戶姓名</th>
              <th class="text-nowrap">付款<span class="d-block d-sm-inline">狀態</span></th>
              <th class="text-nowrap">處理<span class="d-block d-sm-inline">狀態</span></th>
              <th class="d-none d-lg-table-cell text-center">總金額</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="order in ordersList" :key="order.id">
            <td>{{ order.id }}</td>
            <td  class="d-none d-md-table-cell text-center">{{ new Date(order.create_at * 1000).toLocaleString().split(" ")[0] }}</td>
            <td class="d-none d-lg-table-cell text-center">{{ order.user.name }}</td>
            <td>
                <span v-if="order.is_paid" class="text-danger text-nowrap">已付款</span>
                <span v-else class="text-nowrap">未付款</span>
            </td>
            <td>
                <span v-if="order.is_shipping" class="text-nowrap">已出貨</span>
                <span v-else class="text-danger text-nowrap">未出貨</span>
            </td>
            <td class="d-none d-lg-table-cell text-end">NT$ {{ order.total.toLocaleString() }}</td>
            <td>
              <div class="btn-group align-items-center">
                <button
                  type="button"
                  class="btn border-0" @click="showOrder(order.id)">
                  <i class="bi bi-eye text-default"></i>
                </button>
                <button type="button" class="btn border-0" @click="deleteOrder(order.id)">
                  <i class="bi bi-trash text-danger"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 頁碼 -->
      <paginationComponent :pagination="pagination" @get-List="getOrderList"></paginationComponent>
    </div>
  </div>
</template>

<script>
import paginationComponent from '@/components/paginationComponent.vue'
import { useAllAdminOrderStore } from '@/stores/allAdminOrderStore.js'
import { mapStores } from 'pinia'
const ordersStore = useAllAdminOrderStore()
const { VITE_API, VITE_PATH } = import.meta.env

export default {
  data () {
    return {
      ordersList: [],
      pagination: {}
    }
  },
  methods: {
    // 獲取所有訂單
    async getOrderList (page = 1) {
      await ordersStore.getAllOrders(page)

      this.ordersList = ordersStore.allOrders
      this.pagination = ordersStore.pagination
    },

    // 觀看訂單詳細資料
    showOrder (id) {
      this.$router.push(`/admin/orderinfo/${id}`)
    },

    // 刪除訂單
    deleteOrder (id) {
      let url = `${VITE_API}/api/${VITE_PATH}/admin/orders/all`
      let alertTitle = '確定要刪除<span class="text-danger">全部</span>訂單嗎？'

      if (id !== 'all') {
        url = `${VITE_API}/api/${VITE_PATH}/admin/order/${id}`
        alertTitle = `確定要刪除訂單 <p><span class="text-danger">${id}</span> 嗎？</p>`
      }

      // 刪除前詢問
      this.$swal
        .fire({
          title: alertTitle,
          text: '請再次確認，以免影響顧客權益',
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

                // 重整訂單列表
                this.getOrderList()
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
  computed: {
    ...mapStores(useAllAdminOrderStore)
  },
  components: {
    paginationComponent
  },
  mounted () {
    console.log('Orders 的 mounted，即將執行確認登入')
    // 獲取所有資料
    this.getOrderList()
  }
}
</script>

<style></style>
