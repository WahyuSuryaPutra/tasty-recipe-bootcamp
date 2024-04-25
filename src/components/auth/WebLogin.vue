<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5;">
    <div style="background-color: #ffffff; width: 400px min-height: 100vh;" class="p-5 m-auto login-form">
      <div class="text-center">
        <img src="../../assets/images/Vector.png" alt="Logo" />
        <h2 class="mt-4">Log in to your account</h2>
        <p>Welcome back! Please enter your details.</p>
      </div>
      <form @submit.prevent="login">
        <div class="my-4">
          <base-input
            type="usernmae" identiy="username"
            placeholder="Your username" label="Email"
            v-model="loginData.email"
          ></base-input>
        </div>
        <div class="my-4">
          <base-input 
            type="password" identiy="password"
            placeholder="Your password" label="Password"
            v-model="loginData.password"
          ></base-input>
        </div>
        <base-button class="login w-100 my-3">Login</base-button>
      </form>
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Don’t have an account?<span style="color: #4c4ddc">
            <router-link to="/signup" class="text-decoration-none">
              Signup</router-link
            ></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseButton from "../ui/BaseButton.vue";
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const loginData = reactive({
  email: "",
  password: "",
  isLogin: true
})

const store = useStore()
const router = useRouter()

const login = async () => {
  await store.dispatch("auth/getLoginData", loginData);
  router.push("/")
}
</script>
