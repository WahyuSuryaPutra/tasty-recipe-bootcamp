<template>
  <div class="recipe__list-recipe row">
    <!-- Recipe Item Template -->
    <div
      class="col-12 col-lg-3 col-sm-4 position-relative"
      style="padding-top: 12px; padding-bottom: 12px; text-decoration: none"
      v-for="recipe in recipes"
      :key="recipe.id"
    >
      <div class="card text-decoration-none" style="height: 398px">
        <img
          :src="recipe.imageLink"
          class="card-img-top"
          alt="Food"
          height="240"
          width="285"
          style="object-fit: cover"
        />
        <div class="card-body" style="color: #0a0a0a">
          <p class="mb-0">{{ recipe.category }}</p>
          <div class="h-50">
            <router-link :to="`/recipe/${recipe.id}`" class="fs-5 mb-0">{{ recipe.name }}</router-link>
          </div>
          <p>Recipe By {{ recipe.username }}</p>
        </div>
      </div>
      <div
        :class="[
          'position-absolute text-secondary bg-light px-2 py-1 rounded-circle top-0 end-0 m-4 like-icon',
          {
            'text-secondary': !isLike(recipe.likes),
            'text-danger': isLike(recipe.likes),
          },
        ]"
        @click="likeRecipe(recipe)"
      >
        <i class="fas fa-heart"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const props = defineProps({
  recipes: Array,
});

const store = useStore();

const isLike = (likeData) => {
  if (likeData?.length === 0) {
    if (likeData[0] === "null") {
      return false;
    }
  } else {
    const data = likeData.find(
      (like) => like === store.state.auth.userLogin.userId
    );
    console.log(data)
    if (data === undefined) {
      return false;
    } else {
      return true;
    }
  }
};

const router = useRouter();

const likeRecipe = async (recipe) => {
  const isLogin = store.state.auth.isLogin;
  if (!isLogin) {
    router.push("/login");
  } else {
    const likeStatus = isLike(recipe.likes)
    console.log("status", likeStatus);
    const { id: _, ...rest } = recipe
    await store.dispatch("recipe/updateLike", {
      status: likeStatus,
      recipeId: recipe.id,
      recipe: rest
    });
  }
};
</script>


