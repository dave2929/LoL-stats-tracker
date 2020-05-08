<template>
  <section>
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div v-if="error">
      <h1>{{ error }}</h1>
      <router-link to="/" class="goBack">Go Back</router-link>
    </div>

    <div v-if="rendered" class="container">
      <div v-for="(n, i) in 10" :key="i" class="block">
        <div class="gameStats">
          <img :src="championIds[i]" alt class="championIcon" />
          <div>
            <a :href="profileLink[i]" class="summonerName">{{names[i]}}</a>
          </div>
        </div>
        <div class="rankedStats">
          <div class="title" v-if="soloRanked[i]">
            Ranked Solo/Duo
            <div>{{soloRanked[i].tier}} {{soloRanked[i].rank}}</div>
            <img :src="soloRanked[i].rankedIcon" alt class="rankedIcon" />
          </div>

          <div class="title" v-if="flexRanked[i]" :class="{secondtitle: soloRanked[i]}">
            Ranked Flex
            <div>{{flexRanked[i].tier}} {{flexRanked[i].rank}}</div>
            <img :src="flexRanked[i].rankedIcon" alt class="rankedIcon" />
          </div>
          <div class="notRanked" v-if="isRanked(i) == false">Not Ranked</div>
        </div>
      </div>
      <router-link :to="link" class="goBack">Go Back</router-link>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Spectator",
  data() {
    return {
      loading: false,
      error: null,
      summonerId: "",
      names: [],
      championIds: [],
      summonerIds: [],
      soloRanked: [],
      flexRanked: [],
      rendered: false,
      profileLink: [],
      link: ""
    };
  },
  async created() {
    this.loading = true;
    this.link = "/profile/" + this.$route.params.summonerName;
    try {
      const res = await axios.get(
        `/api/v1/summoner/${this.$route.params.summonerName}`
      );
      this.summonerId = res.data.id;
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.error = err.response.data.message;
    }

    try {
      const res = await axios.get(
        `/api/v1/summoner/spectator/${this.summonerId}`
      );
      for (let i = 0; i < 10; i++) {
        this.names[i] = res.data.participants[i].summonerName;
        this.championIds[i] = res.data.participants[i].championId;
        this.championIds[i] =
          "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/" +
          this.championIds[i] +
          ".png";
        this.summonerIds[i] = res.data.participants[i].summonerId;
        this.profileLink[i] = "/profile/" + this.names[i];
      }
    } catch (err) {
      this.error = "Not in game";
      this.rendered = false;
    }
    let axiosRequest = [];
    for (let i = 0; i < 10; i++) {
      axiosRequest[i] = axios.get(
        `/api/v1/summoner/rankedStats/${this.summonerIds[i]}`
      );
    }
    try {
      const res = await axios.all(axiosRequest);
      for (let i = 0; i < 10; i++) {
        if (res[i].data[0]) {
          if (res[i].data[0].queueType == "RANKED_FLEX_SR") {
            this.flexRanked[i] = res[i].data[0];
            this.flexRanked[i].icon =
              this.flexRanked[i].tier
                .toLowerCase()
                .charAt(0)
                .toUpperCase() +
              this.flexRanked[i].tier.toLowerCase().substring(1);
            this.flexRanked[
              i
            ].rankedIcon = require("@/assets/ranked-emblems/Emblem_" +
              this.flexRanked[i].icon +
              ".png");
          } else {
            this.soloRanked[i] = res[i].data[0];
            this.soloRanked[i].icon =
              this.soloRanked[i].tier
                .toLowerCase()
                .charAt(0)
                .toUpperCase() +
              this.soloRanked[i].tier.toLowerCase().substring(1);
            this.soloRanked[
              i
            ].rankedIcon = require("@/assets/ranked-emblems/Emblem_" +
              this.soloRanked[i].icon +
              ".png");
          }
          // console.log(this.flexRanked[i]);
        }
        if (res[i].data[1]) {
          this.soloRanked[i] = res[i].data[0];
          this.soloRanked[i].icon =
            this.soloRanked[i].tier
              .toLowerCase()
              .charAt(0)
              .toUpperCase() +
            this.soloRanked[i].tier.toLowerCase().substring(1);
          this.soloRanked[
            i
          ].rankedIcon = require("@/assets/ranked-emblems/Emblem_" +
            this.soloRanked[i].icon +
            ".png");
        }
      }
      this.rendered = true;
      // console.log(this.soloRanked[i]);
    } catch (err) {
      this.error = "Not in game";
    }
  },
  methods: {
    isRanked(i) {
      if (this.soloRanked[i] || this.flexRanked[i]) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  max-width: 1200px;
  height: 600px;
  text-align: center;
  margin: 1rem auto;
  padding: 2rem 1.5rem;
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20vh;
}
a.goBack {
  display: inline-block;
  margin-top: 2rem;
  margin-left: 10px;
  height: 45px;
  border: #fff 2px solid;
  padding: 0.5rem 0.8rem;
}
a.goBack:hover {
  border: #c8c8c8 2px solid;
  color: #c8c8c8;
}
.block {
  border-radius: 20px;
  width: 200px;
  height: 200px;
  display: flex;
  background: rgba(0, 0, 0, 0.6);
  margin-left: 10px;
  text-align: center;
}
.gameStats {
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  text-align: center;
}
.championIcon {
  display: inline-block;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 80px;
  border-radius: 50%;
}
.summonerName {
  width: 80px;
  word-wrap: break-word;
  text-align: center;
  margin-top: 5px;
  padding: 0px;
  font-size: 16px;
}
.summonerName:hover {
  color: #ccc;
}
.title {
  width: 100px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
  padding: 0px;
  font-size: 10px;
}
.title div {
  font-weight: normal;
  color: #ccc;
}
.rankedIcon {
  width: 50px;
  margin-left: 5px;
}
.secondtitle {
  margin: 0px;
}
.firsttitle {
  margin-top: 20px;
}
.notRanked {
  text-align: center;
  font-weight: bold;
  margin-top: 88px;
  font-size: 16px;
}
@media (max-width: 500px) {
  h1 {
    font-size: 1.5rem;
    display: block;
    text-align: center;
  }
  .platform-avatar {
    display: none;
  }
  .grid {
    grid-template-columns: 1fr;
  }
  li p {
    font-size: 1.5rem;
  }
}
</style>
