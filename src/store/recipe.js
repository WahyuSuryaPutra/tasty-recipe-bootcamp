import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            recipes: [],
            recipeDetail: {}
        }
    },
    getters: {
        getRecipes(state) {
            return state.recipes
        }
    },
    mutations: {
        setRecipeData(state, payload) {
            state.recipes = payload
        },
        setRecipeDetail(state, payload) {
            state.recipeDetail = payload
        },
        setNewRecipe(state, payload) {
            state.recipes.push.payload
        }
    },
    actions: {
        async getRecipeData({commit}) {
            try {
                const { data } = await axios.get("https://recipe-timedoor-default-rtdb.firebaseio.com/recipes.json")
                const arr = []
                for (let key in data) {
                    arr.push({ id: key, ...data[key] })
                }
                commit("setRecipeData", arr)
            } catch (error) {
                console.log(error);
            }
        },
        async getRecipeDetail({ commit }, payload) {
            try {
                const { data } = await axios.get(`https://recipe-timedoor-default-rtdb.firebaseio.com/recipes/${payload}.json`)
                commit("setRecipeDetail", data)
            } catch (err) {
                console.log(err)
            }
        },
        async addNewRecipe({ commit, rootState }, payload) {
            const newData = {
                ...payload,
                username: rootState.auth.userLogin.username,
                createdAt: Date.now(),
                likes: ["null"],
                userId: rootState.auth.userLogin.userId,
            };
            try {
                const { data } = await axios.post(
                    `https://recipe-timedoor-default-rtdb.firebaseio.com/recipes.json?auth=${rootState.auth.token}`,
                    newData 
                    
                );

                commit("setNewRecipe", { id: data.name, ...newData });
            } catch (err) {
                console.log(err)
            }
        },
        async deleteRecipe({ dispatch, rootState }, payload) {
            try {
                const { data } = await axios.delete(
                    `https://recipe-timedoor-default-rtdb.firebaseio.com/recipes/${payload}.json?auth=${rootState.auth.token}`
                );
                await dispatch("getRecipeData")
            } catch (err) {
                console.log(err);
            }
        },
        async updateRecipe({ dispatch, rootState }, { id, newRecipe }) {
            try {
                const { data } = await axios.put(
                    `https://recipe-timedoor-default-rtdb.firebaseio.com/recipes/${id}.json?auth=${rootState.auth.token}`,
                    newRecipe
                );
                await dispatch("getRecipeData")
            } catch (error) {
                console.log(error);
            }
        },
        async updateLike({ dispatch, rootState }, {status, recipeId, recipe}) {
            const userId = rootState.auth.userLogin.userId;            
            if (status) {
                const newLikes = recipe.likes.filter((like) => like !== userId);
                recipe.likes = newLikes;
            } else {
                recipe.likes.push(userId);
            }
            try {
                const data = await axios.put(
                    `https://recipe-timedoor-default-rtdb.firebaseio.com/recipes/${recipeId}.json?auth=${rootState.auth.token}`,
                    recipe
                );
                await dispatch("getRecipeData")
            } catch (err) {
                console.log(err)
            }
        },
    }
}