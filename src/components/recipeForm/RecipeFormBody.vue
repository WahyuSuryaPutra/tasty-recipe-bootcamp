<template>
  <li class="list-group-item">
    <form @submit.prevent="addNewRecipe">
      <div>
        <p class="my-3 fs-5 fw-semibold">General Information</p>
        <div>
          <!-- {{ recipeData }} -->
          <!-- Image Start -->
          <div class="mb-3">
            <base-input type="file"
              identity="recipeImage"
              label="Choose Recipe Photo"
              @input="checkImage"
            ></base-input>

            <div>
              <img
                :src="recipeData.imageLink"
                :alt="recipeData.name"
                class="image"
              />
            </div>
          </div>
          <!-- Image End -->

          <!-- Recipe Title Start -->
          <div class="mb-3">
            <base-input
              type="text"
              identity="recipeTitle"
              placeholder="Give your recipe a title"
              label="Recipe Title"
              v-model="recipeData.name"
            ></base-input>
          </div>
          <!-- Recipe Title  End -->

          <!-- Recipe Description Start -->
          <div class="mb-3">
            <base-text-area
              identity="recipeDescription"
              label="Description"
              placeholder="Share story behind recipe and what is make it special"
              v-model="recipeData.description"
            ></base-text-area>
          </div>
          <!-- Recipe Description End -->

          <!-- Recipe Cateogry Start -->
          <div class="mb-3">
            <base-select
              :data="['Breakfast', 'Lunch', 'Dinner', 'Meals', 'Snacks']"
              v-model="recipeData.category"
            ></base-select>
          </div>
          <!-- Recipe Category End -->
        </div>
      </div>
      <!-- General Information End -->

      <!-- Time Setting Start -->
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Time Setting</p>
        <div>
          <div class="mb-3">
            <base-input
              type="number"
              identity="prepTime"
              placeholder="0"
              label="Prep Time"
              v-model="recipeData.prepTime"
            ></base-input>
          </div>
          <div class="mb-3">
            <base-input
              type="number"
              identity="cookTime"
              placeholder="0"
              label="Cook Time"
              v-model="recipeData.cookTime"
            ></base-input>
          </div>
          <div class="mb-3">
            <base-input
              type="number"
              identity="totalTime"
              placeholder="0"
              label="Total Time"
              v-model="recipeData.totalTime"
              @totalTimeFocus="totalTime"
              readonly="1"
            ></base-input>
          </div>
        </div>
      </div>
      <!-- Time Setting End -->

      <!-- Ingredients Start -->
      <div class="border-top py-1">
        <p class="my-3 fs-5 fw-semibold">Ingredients</p>
        <p>
          Enter one ingredient per line. Include the quantity (i.e. cups,
          tablespoons) and any special preparation (i.e. sifted, softened,
          chopped). Use optional headers to organize the different parts of the
          recipe (i.e. Cake, Frosting, Dressing).
        </p>
        <div>
          <div class="mb-3 row" v-for="count in ingredientCount" :key="count">
            <div class="col-lg-11 col-11">
              <base-input
                type="text"
                identity="ingredient"
                placeholder="Ex : 1 cup sugar"
                v-model="recipeData.ingredients[count - 1]"
              ></base-input>
            </div>
            <div
              class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient"
              style="color: #cb3a31"
              v-if="ingredientCount > 1"
              @click="deleteIngredient(count - 1)"
            >
              <i class="fa-regular fa-trash-can px-1"></i
              ><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>
        <base-button
          class="new-ingredient-btn px-3 py-2"
          type="button"
          @clickButton="addIngredient"
          ><i class="fa-solid fa-plus me-2"></i>Add More</base-button
        >
      </div>
      <!-- Ingredients End -->

      <!-- Direction Start -->
      <div class="border-top my-3">
        <p class="my-3 fs-5 fw-semibold">Directions</p>
        <p>
          Explain how to make your recipe, including oven temperatures, baking
          or cooking times, and pan sizes, etc. Use optional headers to organize
          the different parts of the recipe
        </p>
        <div>
          <div class="mb-3 row" v-for="count in directionCount" :key="count">
            <div class="col-lg-11 col-11">
              <base-input
                type="text"
                identity="direction"
                placeholder="Ex : 1 cup sugar"
                v-model="recipeData.directions[count - 1]"
              ></base-input>
            </div>
            <div
              class="col-lg-1 col-1 col-form-label align-self-end delete-ingredient"
              style="color: #cb3a31"
              v-if="directionCount > 1"
              @click="deleteDirection(count - 1)"
            >
              <i class="fa-regular fa-trash-can px-1"></i
              ><span class="d-none d-md-inline">Delete</span>
            </div>
          </div>
        </div>
        <base-button
          class="new-ingredient-btn px-3 py-2"
          type="button"
          @clickButton="addDirection"
          ><i class="fa-solid fa-plus me-2"></i>Add More</base-button
        >
      </div>
      <!-- Direction End -->

      <!-- Submit Button Start -->
      <div class="border-top py-3 d-flex my-4 justify-content-end">
        <base-button
          @clickButton="cancelRecipe"
          class="cancel-btn px-3 py-2 ms-1"
          >Cancel</base-button
        >
        <base-button class="submit-recipe-btn px-3 py-2 ms-1"
          >Submit</base-button
        >
      </div>
      <!-- Submit Button End -->
    </form>
  </li>
</template>

<script setup>
import BaseInput from "../ui/BaseInput.vue";
import BaseTextArea from "../ui/BaseTextArea.vue";
import BaseSelect from "../ui/BaseSelect.vue";
import BaseButton from "../ui/BaseButton.vue";
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  isEdit: { type: Boolean, default: false },
});

const recipeData = ref({
  imageLink: "",
  name: "",
  description: "",
  category: "",
  prepTime: 0,
  cookTime: 0,
  totalTime: 0,
  ingredients: [],
  directions: [],
});

const ingredientCount = ref(1);
const directionCount = ref(1);

const addIngredient = () => {
  ingredientCount.value++;
};

const addDirection = () => {
  directionCount.value++;
};

const deleteIngredient = (index) => {
  recipeData.ingredients.splice(index, 1);
  ingredientCount.value--;
};

const deleteDirection = (index) => {
  recipeData.directions.splice(index, 1);
  directionCount.value--;
};

const totalTime = () => {
  recipeData.value.totalTime =
    parseInt(recipeData.value.prepTime) + parseInt(recipeData.value.cookTime);
};

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    // console.log(reader.result);
    recipeData.value.imageLink = reader.result;
  });
};

const store = useStore();
const router = useRouter();
const route = useRoute()

const addNewRecipe = async () => {
  if (props.isEdit) {
    await store.dispatch("recipe/updateRecipe", { id: route.params.id, newRecipe: recipeData.value});
  } else {
    await store.dispatch("recipe/addNewRecipe", recipeData.value);
  }
  router.push("/user/user-recipe");
};

onMounted(() => {
  if (props.isEdit) {
    recipeData.value = store.state.recipe.recipeDetail;
    ingredientCount.value = recipeData.value.ingredients.length;
    directionCount.value = recipeData.value.directions.length;
  }
});
</script>

<style scoped>
.image {
  width: 250px;
}
</style>