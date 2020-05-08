import Vue from "vue";
import Router from "vue-router";
import Search from "./components/Search.vue";
import Spectator from "./components/Spectator.vue";
import Profile from "./components/Profile.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Search",
      component: Search
    },
    {
      path: "/spectator/:summonerName",
      name: "Spectator",
      component: Spectator
    },
    {
      path: "/profile/:summonerName",
      name: "Profile",
      component: Profile
    }
  ]
});
