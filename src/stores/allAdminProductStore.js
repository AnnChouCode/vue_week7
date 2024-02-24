import { defineStore } from 'pinia'
import axios from 'axios'
import swal from 'sweetalert2'

const { VITE_API, VITE_PATH } = import.meta.env

export const useAllAdminProductsStore = defineStore('adminProducts', {
  state: () => ({
    // 所有產品
    allProducts: [],
    // 產品分類列表
    categoryList: []
  }),
  actions: {
    // 獲取所有產品
    getAllProducts () {
      const url = `${VITE_API}/api/${VITE_PATH}/admin/products/all`

      // 返回 promise
      return axios.get(url)
        .then(res => {
          this.allProducts = res.data.products
          this.getCategoryList()

          return res // 要傳回的資料
        })
        .catch(err => {
          swal.fire(
            {
              icon: 'error',
              text: err.response.data.message
            }
          )
        })
    },

    // 取得產品分類列表
    getCategoryList () {
      const products = Object.values(this.allProducts)
      const categoryList = new Set(products.map(item => item.category))
      this.categoryList = [...categoryList]
    }
  }
})
