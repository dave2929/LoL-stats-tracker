<template>
  <div class="box">
    <section class="search">
      <h1>Search a Summoner</h1>
      <button v-on:click="nextbg">Next splash art</button>
      <form v-on:submit.prevent="onSubmit">
        <div class="form-group">
          <input
            type="text"
            id="summoner"
            name="text"
            v-model="summonerName"
            placeholder="Enter a summoner name"
          />
        </div>
        <div class="form-group">
          <input type="submit" value="Submit" class="btn" />
        </div>
      </form>
    </section>
    <div class="tips">
      <p class="first-line-tip">Did you know:</p>
      <p class="second-line-tip">"I'm not a savior. I'm an executioner." - God-King Darius</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      summonerName: "",
      imageCounter: 0,
      bg: ["darius", "diana", "garen", "irelia", "jax", "riven", "yasuo"]
    };
  },
  methods: {
    onSubmit() {
      if (!this.summonerName) {
        this.$toasted.show("Please enter a summoner name", {
          duration: 1000
        });
      } else {
        this.$router.push(`/profile/${this.summonerName}`);
      }
    },
    nextbg() {
      this.imageCounter++;
      if (this.imageCounter > 6) {
        this.imageCounter = this.imageCounter - 7;
      }
      document.body.style.backgroundImage =
        "url(" +
        require("@/assets/" + this.bg[this.imageCounter] + ".jpg") +
        ")";
    }
  }
};
</script>

<style scoped>
.box {
  width: 960px;
  margin: auto;
  position: relative;
  top: 22vh;
}
button {
  display: inline-block;
  background: rgb(168, 59, 59);
  color: #fff;
  padding: 0.4rem 1.3rem;
  border: none;
  cursor: pointer;
  outline: none;
  margin-top: 1rem;
  position: absolute;
  top: 20px;
  right: 36px;
}
.tips {
  max-width: 700px;
  margin: 5vh auto;
  text-align: center;
  font-family: "Palatino Linotype", "Book Antiqua", Palatino, serif;
}
.first-line-tip {
  font-size: 25px;
}
.second-line-tip {
  font-size: 17px;
}
</style>
