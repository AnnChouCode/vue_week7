<template>
    <div class="container py-5">
        <h2 class="mb-5 text-center">登入使用者後台</h2>

      <div class="row justify-content-center">
        <div class="col-6">
            <v-form v-slot="{ errors }" class="form-signin" @submit="login">
            <div class="form-floating mb-3">
                <v-field id="username" name="email" type="email" class="form-control" :class="{ 'is-invalid': errors['email'] }"  placeholder="name@example.com" rules="email|required" v-model="user.username"></v-field>
                <error-message name="email" class="invalid-feedback"></error-message>
              <label for="username">Email address</label>
            </div>
            <div class="form-floating mb-3">
                <v-field id="userpassword" name="password" type="password" class="form-control" :class="{ 'is-invalid': errors['password'] }"  placeholder="Password" rules="required" v-model="user.password"></v-field>
                <error-message name="password" class="invalid-feedback"></error-message>
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </v-form>
        </div>
      </div>
    </div>

</template>

<script>
const { VITE_API } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const url = `${VITE_API}/admin/signin`

      const { username, password } = this.user

      const user = {
        username,
        password
      }

      this.axios.post(url, user)
        .then(res => {
          // cookie 操作
          const { token, expired } = res.data
          document.cookie = `user = ${token}; expires = ${new Date(expired)}`
          // 通知成功 & 轉換頁面
          this.$swal.fire({
            title: '登入成功',
            confirmButtonColor: '#333333',
            confirmButtonText: '確認'
          })
            .then(() => {
              this.$router.push('/admin')
            })
        })
        .catch(err => this.$swal.fire(err.response.data.message))
    }
  }
}
</script>
