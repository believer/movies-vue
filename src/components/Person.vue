<template>
  <div class="movie">
    <a @click="back">Back</a>
    <div class="content">
      <h1>{{ name }}</h1>
      <ul>
        <li v-for="movie in movies">
          <router-link :to="{ name: 'movie', params: { id: movie.id }}">{{ movie.title }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import List from '@/components/List'
import PERSON from '@/queries/person.graphql'

export default {
  name: 'movies',
  components: {
    List
  },
  data () {
    return {
      movies: []
    }
  },
  computed: {
    name () {
      return this.$route.params.name
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  apollo: {
    movies: {
      query: PERSON,
      variables () {
        return {
          name: this.$route.params.name,
          type: this.$route.params.type
        }
      }
    }
  }
}
</script>

<style scoped>
  .movie {
    display: grid;
    grid-template-columns: [poster] 185px [content] 1fr;
    grid-gap: 30px;
    margin: 100px auto;
    max-width: 960px;
  }

  .poster {
    grid-area: poster;
  }

  .content {
    grid-area: content;
  }

  a {
    color: #42b983;
  }
</style>
