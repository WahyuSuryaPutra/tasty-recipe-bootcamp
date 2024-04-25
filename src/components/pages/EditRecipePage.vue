<template>
  <main>
    <div class="container-md my-5 py-5">
      <recipe-form v-if="detailData && !isLoading" :isEdit="true"></recipe-form>
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import RecipeForm from "../recipeForm/RecipeForm.vue";

const store = useStore();
const route = useRoute();
const detailData = ref();
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await store.dispatch("recipe/getRecipeDetail", route.params.id);
  detailData.value = store.state.recipe.recipeDetail;
  isLoading.value = false;
});
</script>
