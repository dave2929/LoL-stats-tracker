<template>
  <section>
    <div v-if="loading">
      <h3>Loading...</h3>
    </div>
    <div v-if="error">
      <h1>{{ error }}</h1>
      <router-link to="/">Go Back</router-link>
    </div>
    <div v-if="profileData" class="container">
      <div class="gamertag">
        <img :src="profileIcon" alt class="platform-avatar" />
        &nbsp;&nbsp;{{ summonerName }}
        <a
          v-if="live"
          :href="spectator"
          class="liveButton"
        >Live Game</a>
        <a v-if="live === false" class="awayButton" v-on:click="awayButtonClicked">Live Game</a>
      </div>
      <div class="grid" v-if="firstRendered">
        <ul>
          <li class="mainStats">
            <div class="tiers">
              <div v-if="rankedStats[0]">
                <div class="title">Ranked Solo/Duo</div>
                <img :src="rankedStats[0].rankedIcon" alt class="rankedIcon" />
                <div>
                  <span style="font-weight: bold;">{{rankedStats[0].tier}} {{rankedStats[0].rank}}</span>
                  {{rankedStats[0].leaguePoints}}LP
                </div>
                <div>
                  {{rankedStats[0].wins}}W {{rankedStats[0].losses}}L
                  <span
                    style="color: #ff4e50;"
                  >{{rankedStats[0].winRate}}</span>%
                </div>
              </div>
              <div v-if="bothRanked" class="tierLine"></div>
              <div v-if="rankedStats[1]">
                <div class="title">Ranked Flex</div>
                <img :src="rankedStats[1].rankedIcon" alt class="rankedIcon" />
                <div>
                  <span style="font-weight: bold;">{{rankedStats[1].tier}} {{rankedStats[1].rank}}</span>
                  {{rankedStats[1].leaguePoints}}LP
                </div>
                <div>
                  {{rankedStats[1].wins}}W {{rankedStats[1].losses}}L
                  <span
                    style="color: #ff4e50;"
                  >{{rankedStats[1].winRate}}</span>%
                </div>
              </div>
              <div v-if="isRanked == false" class="notRanked">Not Ranked</div>
            </div>
            <div class="mainMastery">
              <img :src="masteryChampionIcons[0]" alt class="icon" />
              <div class="masteryTag">Mastery</div>
              <div class="masteryPoints">{{masteryPoints[0]}}</div>
            </div>
            <div class="mainMastery">
              <img :src="masteryChampionIcons[1]" alt class="icon" />
              <div class="masteryTag">Mastery</div>
              <div class="masteryPoints">{{masteryPoints[1]}}</div>
            </div>
            <div class="mainMastery">
              <img :src="masteryChampionIcons[2]" alt class="icon" />
              <div class="masteryTag">Mastery</div>
              <div class="masteryPoints">{{masteryPoints[2]}}</div>
            </div>
          </li>
          <div v-if="secondRendered[4]">
            <li v-for="(n, i) in totalNum" :key="i" :class="result(i)">
              <div class="wrapper" v-if="secondRendered[i]">
                <div class="info">
                  <div class="gameType">{{matchStats[i].gameType}}</div>
                  <div class="timePassed">{{matchStats[i].gameCreation}}</div>
                  <div class="middleLine"></div>
                  <div class="gameTime">{{matchStats[i].gameDuration}}</div>
                  <div
                    class="result"
                    :class="{ 'defeatFont': matchStats[i].result == 'Defeat'}"
                  >{{matchStats[i].result}}</div>
                </div>
                <div class="icon">
                  <img :src="matchStats[i].championIcon" alt />
                  <div class="championName">{{matchStats[i].championName}}</div>
                </div>
                <div class="spells">
                  <div class="spell">
                    <img :src="matchStats[i].spell1Icon" alt class="spellsIcon" />
                  </div>
                  <div class="spell">
                    <img :src="matchStats[i].spell2Icon" alt class="spellsIcon" />
                  </div>
                </div>
                <div class="runes">
                  <div class="rune">
                    <img :src="matchStats[i].rune1Icon" alt class="runesIcon" />
                  </div>
                  <div class="rune">
                    <img :src="matchStats[i].rune2Icon" alt class="runesIcon" />
                  </div>
                </div>
                <div class="kdaStats">
                  <div class="kda">
                    {{matchStats[i].kills}}
                    <span style="color: #ccc;">/&nbsp;</span>
                    <span>{{matchStats[i].deaths}}</span>
                    <span style="color: #ccc;">&nbsp;/</span>
                    {{matchStats[i].assists}}
                  </div>
                  <div class="kdaValue">
                    {{matchStats[i].kda}}
                    <span style="color: #ccc;">&nbsp;KDA</span>
                  </div>
                  <div class="tags" v-if="thirdRendered[i]">
                    <div v-if="matchStats[i].doubleKills != 0" class="tag">
                      <b>{{matchStats[i].doubleKills}}</b> Double Kill
                    </div>
                    <div v-if="matchStats[i].tripleKills != 0" class="tag">
                      <b>{{matchStats[i].tripleKills}}</b> Triple Kill
                    </div>
                    <div v-if="matchStats[i].quadraKills != 0" class="tag">
                      <b>{{matchStats[i].quadraKills}}</b> Quadra Kill
                    </div>
                    <div v-if="matchStats[i].pentaKills != 0" class="tag">
                      <b>{{matchStats[i].pentaKills}}</b> Penta Kill
                    </div>
                  </div>
                </div>
                <div class="stats" v-if="thirdRendered[i]">
                  <div class="level">
                    Level
                    <b>{{matchStats[i].champLevel}}</b>
                  </div>
                  <div class="cs">
                    CS
                    <b>{{matchStats[i].cs}}</b>
                  </div>
                  <div class="kp">
                    K/P
                    <b style="color: #ff4e50;">{{matchStats[i].kp}}</b>%
                  </div>
                  <div class="dmg">
                    DMG {{matchStats[i].damage}}
                    <div>
                      (
                      <b style="color: #ff4e50;">{{matchStats[i].damagePercentage}}</b>%)
                    </div>
                  </div>
                </div>
                <div class="misc" v-if="thirdRendered[i] == true">
                  <div class="patch">Patch</div>
                  <div class="version">{{latestVersion}}</div>
                  <div class="mastery">Mastery</div>
                  <div class="masteryPoints">{{matchStats[i].championPoints}}</div>
                </div>
              </div>
            </li>
          </div>
          <button v-on:click="showMore">Load more</button>
        </ul>
      </div>
      <router-link to="/">Go Back</router-link>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Vue from "vue";
export default {
  name: "Profile",
  data() {
    return {
      loading: false,
      error: null,
      summonerName: "",
      summonerId: "",
      accountId: "",
      profileIcon: "",
      profileData: null,
      live: false,
      matchId: [],
      matchStats: [],
      participantId: [],
      version: [],
      masteryPoints: [],
      masteryChampions: [],
      masteryChampionIcons: [],
      rankedStats: [],
      latestVersion: "",
      totalNum: 5,
      currentPage: 1,
      maxPerPage: 5,
      pageCount: 0,
      firstRendered: false,
      secondRendered: [],
      thirdRendered: [],
      spectator: "",
      runes: [],
      champions: [],
      spells: [],
      results: []
    };
  },
  async created() {
    this.loading = true;
    // Update latest version
    try {
      const res = await axios.get(
        `https://ddragon.leagueoflegends.com/api/versions.json`
      );
      this.latestVersion = res.data[0];
    } catch (err) {
      this.live = false;
      this.loading = false;
    }
    try {
      this.summonerName = this.$route.params.summonerName;
      const res = await axios.get(
        `/api/v1/summoner/${this.$route.params.summonerName}`
      );
      if (res.data.status && res.data.status.status_code === 404) {
        this.loading = false;
        this.error = res.data.status.message;
      } else {
        this.summonerId = res.data.id;
        this.accountId = res.data.accountId;
        this.profileIcon =
          "https://ddragon.leagueoflegends.com/cdn/" +
          this.latestVersion +
          "/img/profileicon/" +
          res.data.profileIconId +
          ".png";
      }
    } catch (err) {
      this.loading = false;
      this.error = err.response.data.message;
    }
    if (this.accountId && this.summonerId) {
      let axiosProfile = axios.get(
        `/api/v1/summoner/profile/${this.accountId}`
      );
      let axiosSpectator = axios.get(
        `/api/v1/summoner/spectator/${this.summonerId}`
      );
      let axiosMastery = axios.get(
        `/api/v1/summoner/mastery/${this.summonerId}`
      );
      let axiosRankedStats = axios.get(
        `/api/v1/summoner/rankedStats/${this.summonerId}`
      );
      try {
        const res = await axios.all([
          axiosProfile,
          axiosSpectator,
          axiosMastery,
          axiosRankedStats
        ]);
        // Load match
        this.profileData = res[0].data;
        for (let i = 0; i < 50; i++) {
          this.matchId[i] = res[0].data.matches[i].gameId;
        }

        // Check if live game
        if (res[1].data.error) {
          this.live = false;
        } else {
          this.live = true;
        }
        this.loading = false;

        // Summoner mastery
        for (let i = 0; i < 3; i++) {
          this.masteryPoints[i] = res[2].data[i].championPoints
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          this.masteryChampions[i] = res[2].data[i].championId;
          this.masteryChampionIcons[i] =
            "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/" +
            this.masteryChampions[i] +
            ".png";
        }

        // Ranked stats
        if (res[3].data[0]) {
          if (res[3].data[0].queueType != "RANKED_FLEX_SR") {
            this.rankedStats[0] = res[3].data[0];
            this.rankedStats[0].winRate = Math.floor(
              (this.rankedStats[0].wins /
                (this.rankedStats[0].wins + this.rankedStats[0].losses)) *
                100
            );
            this.rankedStats[0].icon =
              this.rankedStats[0].tier
                .toLowerCase()
                .charAt(0)
                .toUpperCase() +
              this.rankedStats[0].tier.toLowerCase().substring(1);
            this.rankedStats[0].rankedIcon = require("@/assets/ranked-emblems/Emblem_" +
              this.rankedStats[0].icon +
              ".png");
          } else {
            this.rankedStats[1] = res[3].data[0];
            this.rankedStats[1].winRate = Math.floor(
              (this.rankedStats[1].wins /
                (this.rankedStats[1].wins + this.rankedStats[1].losses)) *
                100
            );
            this.rankedStats[1].icon =
              this.rankedStats[1].tier
                .toLowerCase()
                .charAt(0)
                .toUpperCase() +
              this.rankedStats[1].tier.toLowerCase().substring(1);
            this.rankedStats[1].rankedIcon = require("@/assets/ranked-emblems/Emblem_" +
              this.rankedStats[1].icon +
              ".png");
          }
        }
        if (res[3].data[1]) {
          this.rankedStats[1] = res[3].data[1];
          this.rankedStats[1].winRate = Math.floor(
            (this.rankedStats[1].wins /
              (this.rankedStats[1].wins + this.rankedStats[1].losses)) *
              100
          );
          this.rankedStats[1].icon =
            this.rankedStats[1].tier
              .toLowerCase()
              .charAt(0)
              .toUpperCase() +
            this.rankedStats[1].tier.toLowerCase().substring(1);
          this.rankedStats[1].rankedIcon = require("@/assets/ranked-emblems/Emblem_" +
            this.rankedStats[1].icon +
            ".png");
        }
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.error = err.response.data.message;
      }
    }
    this.firstRendered = true;
    if (!this.error) {
      this.updateStats();
    }
  },
  methods: {
    awayButtonClicked() {
      this.$toasted.show("Player is not in an active game", {
        duration: 1000
      });
    },
    result(i) {
      if (this.matchStats[i] && this.matchStats[i].result == "Defeat") {
        return "defeat";
      }
    },
    showMore() {
      this.currentPage++;
      this.updateStats();
    },
    async updateStats() {
      this.pageCount = this.currentPage * this.maxPerPage;
      this.totalNum = this.pageCount;
      // match counter
      let lastPage = (this.currentPage - 1) * this.maxPerPage;
      let i = lastPage;
      let axiosRequest = [];

      while (i < this.pageCount && this.matchId[i]) {
        // Get recent matches
        axiosRequest[i] = axios.get(
          `/api/v1/summoner/match/${this.matchId[i]}`
        );
        i++;
      }
      axiosRequest[this.pageCount] = axios.get(
        "https://ddragon.leagueoflegends.com/cdn/" +
          this.latestVersion +
          "/data/en_US/runesReforged.json"
      );
      axiosRequest[this.pageCount + 1] = axios.get(
        "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
      );
      axiosRequest[this.pageCount + 2] = axios.get(
        "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells.json"
      );
      try {
        const res = await axios.all(axiosRequest);
        for (let i = lastPage; i < this.pageCount; i++) {
          Vue.set(this.matchStats, i, res[i].data);
          this.matchStats[i].version = res[i].data.gameVersion.match(
            /[^.]+(\.[^.]+)?/
          )[0];
          Vue.set(this.secondRendered, i, true);
          for (let j = 0; j < 10; j++) {
            if (
              this.matchStats[i].participantIdentities[j].player.summonerName ==
              this.summonerName
            ) {
              this.participantId[i] = this.matchStats[i].participantIdentities[
                j
              ].participantId;
              break;
            }
          }
          this.runes = res[this.pageCount].data;
          this.champions = res[this.pageCount + 1].data;
          this.spells = res[this.pageCount + 2].data;
          this.matchStats[i].championId = this.matchStats[i].participants[
            this.participantId[i] - 1
          ].championId;
        }
      } catch (err) {
        console.log(err);
        this.error = "Server Error";
      }
      // console.log(this.matchStats);
      console.log(this.secondRendered);
      // Data Process
      for (let i = lastPage; i < this.pageCount; i++) {
        if (this.matchStats[i].queueId === 0) {
          this.matchStats[i].gameType = "Custom Games";
        } else if (this.matchStats[i].queueId === 400) {
          this.matchStats[i].gameType = "Draft Pick";
        } else if (this.matchStats[i].queueId === 420) {
          this.matchStats[i].gameType = "Ranked Solo";
        } else if (this.matchStats[i].queueId === 430) {
          this.matchStats[i].gameType = "Blind Pick";
        } else if (this.matchStats[i].queueId === 440) {
          this.matchStats[i].gameType = "Ranked Flex";
        } else if (this.matchStats[i].queueId === 450) {
          this.matchStats[i].gameType = "ARAM";
        } else if (
          this.matchStats[i].queueId === 830 ||
          this.matchStats[i].queueId === 840 ||
          this.matchStats[i].queueId === 850
        ) {
          this.matchStats[i].gameType = "Bot Games";
        } else if (this.matchStats[i].queueId === 900) {
          this.matchStats[i].gameType = "URF";
        } else if (this.matchStats[i].queueId === 920) {
          this.matchStats[i].gameType = "Poro King Games";
        } else if (this.matchStats[i].queueId === 1020) {
          this.matchStats[i].gameType = "One for All";
        } else {
          this.matchStats[i].gameType = "Other";
        }
      }
      let date = new Date().getTime();
      for (let i = lastPage; i < this.pageCount; i++) {
        this.matchStats[i].gameCreation =
          date - this.matchStats[i].gameCreation;
        let temp = Math.floor(this.matchStats[i].gameCreation / 1000);
        if (temp >= 2 * 86400) {
          this.matchStats[i].gameCreation =
            Math.floor(temp / 86400) + " days ago";
        } else if (temp >= 86400) {
          this.matchStats[i].gameCreation =
            Math.floor(temp / 86400) + " day ago";
        } else if (temp >= 7200) {
          this.matchStats[i].gameCreation =
            Math.floor(temp / 3600) + " hours ago";
        } else if (temp >= 3600) {
          this.matchStats[i].gameCreation =
            Math.floor(temp / 3600) + " hour ago";
        } else if (temp >= 120) {
          this.matchStats[i].gameCreation =
            Math.floor(temp / 60) + " minutes ago";
        } else if (temp >= 60) {
          this.matchStats[i].gameCreation =
            Math.floor(temp / 60) + " minute ago";
        } else if (temp > 1) {
          this.matchStats[i].gameCreation = Math.floor(temp) + " seconds ago";
        } else {
          this.matchStats[i].gameCreation = "a few seconds ago";
        }
      }

      // game time
      for (let i = lastPage; i < this.pageCount; i++) {
        let minute = Math.floor(this.matchStats[i].gameDuration / 60);
        let second = Math.floor(this.matchStats[i].gameDuration - 60 * minute);
        this.matchStats[i].gameDuration = minute + "m " + second + "s";
      }

      // win or lose
      for (let i = lastPage; i < this.pageCount; i++) {
        for (let j = 0; j < 10; j++) {
          if (
            this.matchStats[i].participants[j].participantId ==
            this.participantId[i]
          ) {
            this.matchStats[i].result = this.matchStats[i].participants[
              j
            ].stats.win;
            break;
          }
        }
        if (this.matchStats[i].result == false) {
          this.matchStats[i].result = "Defeat";
        } else {
          this.matchStats[i].result = "Victory";
        }
      }
      // Champion name and icon
      for (let i = lastPage; i < this.pageCount; i++) {
        for (let j = 0; j < this.champions.length; j++) {
          if (this.matchStats[i].championId == this.champions[j].id) {
            this.matchStats[i].championName = this.champions[j].name;
            break;
          }
        }
        this.matchStats[i].championIcon =
          "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/" +
          this.matchStats[i].championId +
          ".png";
      }

      // Spell icon
      for (let i = lastPage; i < this.pageCount; i++) {
        this.matchStats[i].spell1Id = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].spell1Id;
        this.matchStats[i].spell2Id = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].spell2Id;
        for (let j = 0; j < this.spells.length; j++) {
          if (this.spells[j].id == this.matchStats[i].spell1Id) {
            this.matchStats[i].spell1Id = this.spells[j].iconPath
              .split("/")
              .pop()
              .toLowerCase();
            break;
          }
        }
        for (let j = 0; j < this.spells.length; j++) {
          if (this.spells[j].id == this.matchStats[i].spell2Id) {
            this.matchStats[i].spell2Id = this.spells[j].iconPath
              .split("/")
              .pop()
              .toLowerCase();
            break;
          }
        }
        this.matchStats[i].spell1Icon =
          "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/" +
          this.matchStats[i].spell1Id;
        this.matchStats[i].spell2Icon =
          "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/data/spells/icons2d/" +
          this.matchStats[i].spell2Id;
      }

      // Rune icon
      for (let i = lastPage; i < this.pageCount; i++) {
        this.matchStats[i].rune1Id = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.perk0;
        this.matchStats[i].rune2Id = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.perkSubStyle;
        for (let j = 0; j < this.runes.length; j++) {
          if (
            Math.floor(this.runes[j].id / 100) ==
            Math.floor(this.matchStats[i].rune1Id / 100)
          ) {
            for (let k = 0; k < this.runes[j].slots[0].runes.length; k++) {
              if (
                this.matchStats[i].rune1Id == this.runes[j].slots[0].runes[k].id
              ) {
                this.matchStats[i].rune1Id = this.runes[j].slots[0].runes[
                  k
                ].icon;
              }
            }
          }
        }
        for (let j = 0; j < this.runes.length; j++) {
          if (this.runes[j].id == this.matchStats[i].rune2Id) {
            this.matchStats[i].rune2Id = this.runes[j].icon;
            break;
          }
        }
        this.matchStats[i].rune1Icon =
          "https://ddragon.leagueoflegends.com/cdn/img/" +
          this.matchStats[i].rune1Id;
        this.matchStats[i].rune2Icon =
          "https://ddragon.leagueoflegends.com/cdn/img/" +
          this.matchStats[i].rune2Id;
      }
      // KDA
      for (let i = lastPage; i < this.pageCount; i++) {
        this.matchStats[i].kills = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.kills;
        this.matchStats[i].deaths = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.deaths;
        this.matchStats[i].assists = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.assists;
        if (this.matchStats[i].deaths == 0) {
          this.matchStats[i].kda = "Perfect";
        } else {
          let kda =
            (this.matchStats[i].kills + this.matchStats[i].assists) /
            this.matchStats[i].deaths;
          this.matchStats[i].kda = kda.toFixed(2);
        }
      }
      // Mastery
      for (let i = lastPage; i < this.pageCount; i++) {
        axiosRequest[i] = axios.get(
          `/api/v1/summoner/mastery/${this.summonerId}/${this.matchStats[i].championId}`
        );
      }
      try {
        const res = await axios.all(axiosRequest);
        for (let i = lastPage; i < this.pageCount; i++) {
          this.matchStats[i].championPoints = res[i].data.championPoints
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          Vue.set(this.thirdRendered, i, true);
        }
      } catch (err) {
        this.error = "Server Error";
      }

      // console.log(this.profileData);
      // cs and kill tags
      for (let i = lastPage; i < this.pageCount; i++) {
        this.matchStats[i].cs =
          this.matchStats[i].participants[this.participantId[i] - 1].stats
            .totalMinionsKilled +
          this.matchStats[i].participants[this.participantId[i] - 1].stats
            .neutralMinionsKilled;
        this.matchStats[i].doubleKills = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.doubleKills;
        this.matchStats[i].tripleKills = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.tripleKills;
        this.matchStats[i].quadraKills = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.quadraKills;
        this.matchStats[i].pentaKills = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.pentaKills;
      }
      // total damage and kills
      for (let i = lastPage; i < this.pageCount; i++) {
        if (this.participantId[i] > 5) {
          this.matchStats[i].totalKills =
            this.matchStats[i].participants[5].stats.kills +
            this.matchStats[i].participants[6].stats.kills +
            this.matchStats[i].participants[7].stats.kills +
            this.matchStats[i].participants[8].stats.kills +
            this.matchStats[i].participants[9].stats.kills;
          this.matchStats[i].totalDamageDealtToChampions =
            this.matchStats[i].participants[5].stats
              .totalDamageDealtToChampions +
            this.matchStats[i].participants[6].stats
              .totalDamageDealtToChampions +
            this.matchStats[i].participants[7].stats
              .totalDamageDealtToChampions +
            this.matchStats[i].participants[8].stats
              .totalDamageDealtToChampions +
            this.matchStats[i].participants[9].stats
              .totalDamageDealtToChampions;
        } else {
          this.matchStats[i].totalKills =
            this.matchStats[i].participants[0].stats.kills +
            this.matchStats[i].participants[1].stats.kills +
            this.matchStats[i].participants[2].stats.kills +
            this.matchStats[i].participants[3].stats.kills +
            this.matchStats[i].participants[4].stats.kills;
          this.matchStats[i].totalDamageDealtToChampions =
            this.matchStats[i].participants[0].stats
              .totalDamageDealtToChampions +
            this.matchStats[i].participants[1].stats
              .totalDamageDealtToChampions +
            this.matchStats[i].participants[2].stats
              .totalDamageDealtToChampions +
            this.matchStats[i].participants[3].stats
              .totalDamageDealtToChampions +
            this.matchStats[i].participants[4].stats
              .totalDamageDealtToChampions;
        }
        let temp =
          (this.matchStats[i].participants[this.participantId[i] - 1].stats
            .kills +
            this.matchStats[i].participants[this.participantId[i] - 1].stats
              .kills) /
          this.matchStats[i].totalKills;
        this.matchStats[i].kp = Math.floor(temp * 100);
        this.matchStats[i].damage = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.totalDamageDealtToChampions;
        temp =
          this.matchStats[i].damage /
          this.matchStats[i].totalDamageDealtToChampions;
        this.matchStats[i].damagePercentage = Math.floor(temp * 100);
        this.matchStats[i].champLevel = this.matchStats[i].participants[
          this.participantId[i] - 1
        ].stats.champLevel;
      }
      this.spectator = "/spectator/" + this.summonerName;
    }
  },
  computed: {
    isRanked() {
      if (this.rankedStats[0] || this.rankedStats[1]) {
        return true;
      } else {
        return false;
      }
    },
    bothRanked() {
      if (this.rankedStats[0] && this.rankedStats[1]) {
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
  width: 800px;
  margin: 1rem auto;
  padding: 2rem 1.5rem;
  border-radius: 20px;
}
div.gamertag {
  font-size: 2rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.3rem 1rem;
  text-align: center;
  border-radius: 20px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}
a.router-link-active {
  display: inline-block;
  margin-top: 2rem;
  border: #fff 2px solid;
  padding: 0.5rem 0.8rem;
}
a.router-link-active:hover {
  border: #c8c8c8 2px solid;
  color: #c8c8c8;
}
.platform-avatar {
  width: 40px;
  top: 0px;
  margin-right: 0.7rem;
}
.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
}
li {
  background: #063663;
  padding: 1rem;
  margin-bottom: 0.7rem;
  border-radius: 10px;
  display: flex;
}
.wrapper {
  display: flex;
}
.defeat {
  background: #45192b;
}
.liveButton {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 20px;
  margin-left: auto;
}
.awayButton {
  background-color: gray;
  border: none;
  color: white;
  padding: 5px 15px;
  text-align: center;
  text-decoration: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 20px;
  margin-left: auto;
}
.info {
  margin-top: 10px;
}
.icon {
  margin-left: 20px;
  text-align: center;
}
.spells {
  margin-top: 10px;
}
.runes {
  margin-top: 10px;
}
.kdaStats {
  margin-left: 10px;
}
.stats {
  margin-left: 10px;
}
.misc {
  width: 100px;
  margin-left: 10px;
  text-align: center;
}
.gameType {
  width: 80px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  padding: 0px;
  font-size: 12px;
}
.timePassed {
  width: 80px;
  text-align: center;
  margin-bottom: 5px;
  padding: 0px;
  font-size: 12px;
}
.middleLine {
  height: 2px;
  width: 50px;
  position: relative;
  left: 15px;
  background-color: #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}
.gameTime {
  width: 80px;
  text-align: center;
  margin-bottom: 5px;
  padding: 0px;
  font-size: 12px;
}
.result {
  color: #08a6ff;
  width: 80px;
  text-align: center;
  margin-bottom: 5px;
  padding: 0px;
  font-size: 15px;
}
.defeatFont {
  color: #ff4e50;
}
.icon img {
  margin-top: 5px;
  width: 90px;
  border-radius: 50%;
}
.championName {
  color: #c8c8c8;
  font-weight: bold;
  width: 100px;
  text-align: center;
  padding: 0px;
  font-size: 15px;
}
.spells .spell {
  margin-top: 5px;
  margin-left: 5px;
}
.spellsIcon {
  width: 30px;
}
.runes .rune {
  margin-top: 5px;
  margin-left: 8px;
}

.runesIcon {
  width: 30px;
}
.kda {
  width: 200px;
  text-align: center;
  margin-top: 33px;
  padding: 0px;
  font-size: 23px;
}
.kda span {
  color: #ff4e50;
}
.kdaValue {
  width: 200px;
  text-align: center;
  margin-top: 0px;
  padding: 0px;
  font-size: 15px;
}
.cs {
  color: #ccc;
  width: 100px;
  text-align: center;
  margin-top: 5px;
  padding: 0px;
  font-size: 16px;
}
.kp {
  color: #ccc;
  width: 100px;
  text-align: center;
  margin-top: 5px;
  padding: 0px;
  font-size: 16px;
}
.dmg {
  color: #ccc;
  width: 100px;
  text-align: center;
  margin-top: 5px;
  padding: 0px;
  font-size: 16px;
}
.level {
  color: #ccc;
  width: 100px;
  text-align: center;
  margin-top: 5px;
  padding: 0px;
  font-size: 16px;
}
.patch {
  color: #ccc;
  width: 100px;
  text-align: center;
  margin-top: 5px;
  padding: 0px;
  font-size: 24px;
}
.version {
  width: 100px;
  text-align: center;
  margin-top: 0px;
  padding: 0px;
  font-size: 16px;
}
.mastery {
  color: #ccc;
  width: 100px;
  text-align: center;
  margin-top: 5px;
  padding: 0px;
  font-size: 24px;
}
.masteryPoints {
  width: 100px;
  text-align: center;
  margin-top: 0px;
  padding: 0px;
  font-size: 16px;
}
.tags {
  width: 200px;
  text-align: center;
}
.tag {
  display: inline-block;
  width: 100px;
  background-color: #ee5a52;
  border-radius: 50px;
  text-align: center;
  margin-top: 5px;
}
.wrapper {
  display: flex;
}
.mainStats {
  background: rgba(0, 0, 0, 0.6);
}
.mainMastery {
  text-align: center;
  margin-left: 60px;
}
.mainMastery .masteryPoints {
  width: 120px;
  font-size: 20px;
  color: #08a6ff;
}
.mainMastery img {
  margin-top: 5px;
  margin-left: 0px;
  width: 120px;
  border-radius: 50%;
  border: #fff 4px solid;
}
.masteryTag {
  font-size: 12px;
  color: #ccc;
}
.tiers {
  text-align: center;
}
.tiers div {
  width: 160px;
  text-align: right;
  margin-bottom: 5px;
  padding: 0px;
  font-size: 12px;
  color: #ccc;
}
.tiers .title {
  width: 150px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
  padding: 0px;
  font-size: 12px;
}
.tiers .notRanked {
  width: 150px;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 0px;
  font-size: 16px;
  margin-top: 80px;
}

.tierLine {
  height: 2px;
  width: 100px;
  position: relative;
  left: 15px;
  background-color: #ccc;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.rankedIcon {
  width: 40px;
  margin-left: 10px;
  float: left;
}
button {
  display: inline-block;
  background: #ccc;
  color: black;
  padding: 0.4rem 1.3rem;
  border: none;
  cursor: pointer;
  outline: none;
  width: 100%;
  height: 50px;
  font-size: 1.2rem;
  border-radius: 10px;
}
button:hover {
  text-decoration: underline;
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
