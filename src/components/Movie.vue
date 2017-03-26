<template>
  <div class="movie">
    <a @click="back">Back</a>
    <div class="poster">
      <img :src="poster" />
    </div>
    <div class="content">
      <h1>{{ movie.title }}</h1>
      <h4 v-if="movie.tagline">"{{ movie.tagline }}"</h4>
      
      <list :items="movie.cast" title="Cast" type="cast"></list>
      <list :items="movie.director" title="Director" type="director"></list>
      <list :items="movie.music" title="Music" type="music"></list>
      <list :items="movie.writer" title="Writer" type="writer"></list>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import List from '@/components/List'
import MOVIE from '@/queries/movie.graphql'

export default {
  name: 'movies',
  components: {
    List
  },
  data () {
    return {
      movie: {}
    }
  },
  computed: {
    poster () {
      if (this.movie.images) {
        return `https://image.tmdb.org/t/p/w320${this.movie.images.poster}`
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  apollo: {
    movie: {
      query: MOVIE,
      variables () {
        return {
          id: this.$route.params.id
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
