<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
:root {
  --primary-color: #ccc;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  background: var(--primary-color) url("./assets/darius.jpg") no-repeat center
    center fixed;
  background-size: cover;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  line-height: 1.6;
}
a {
  color: #fff;
  text-decoration: none;
}
ul {
  list-style: none;
}
.container {
  max-width: 1200px;
  margin: 1rem auto;
  padding: 0 2rem;
  overflow: visible;
}
.form-group {
  margin: 1rem 0;
}
.search {
  background: rgba(0, 0, 0, 0.5);
  border: 4px #fff solid;
  margin-top: 1rem;
  padding: 2rem;
}
input,
select,
textarea {
  display: block;
  width: 100%;
  padding: 0.4rem;
  font-size: 1.2rem;
  border: 1px solid #ccc;
}
.btn {
  display: inline-block;
  background: rgb(168, 59, 59);
  color: #fff;
  padding: 0.4rem 1.3rem;
  border: none;
  cursor: pointer;
  outline: none;
  margin-top: 1rem;
}
@media (max-width: 700px) {
  body {
    background: var(--primary-color);
  }
}
</style>
