<template>
  <div v-if="hasItems">
    <h5 v-if="title">{{ title }}</h5>
    <ul class="list">
      <li v-for="item in items">
        <router-link :to="{ name: 'person', params: { name: item, role: role } }">{{ item }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'list',
    props: ['items', 'title', 'role'],
    computed: {
      hasItems () {
        return this.items && this.items.length
      }
    }
  }
</script>

<style scoped>
  .list {
    display: grid;
    grid-template-columns: repeat(auto-fit, 200px);
    grid-gap: 5px;
    list-style-type: none;
  }
</style>