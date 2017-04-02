<template>
  <div class="movie" v-if="movie">
    <a @click="back">Back</a>
    <div class="poster">
      <img :src="poster" />
    </div>
    <div class="content">
      <h1>{{ movie.title }}</h1>
      <h4 v-if="movie.tagline">"{{ movie.tagline }}"</h4>

      <ul class="users-viewed">
        <li class="users-view" v-for="(user, index) in movie.users_viewed">
          <gravatar :user="user"></gravatar>
          <div class="users-rating">{{ movie.users_ratings[index] }}</div>
        </li>
      </ul>
      
      <list :items="movie.actors" title="Cast" role="actor"></list>
      <list :items="movie.directors" title="Director" role="director"></list>
      <list :items="movie.composers" title="Music" role="composer"></list>
      <list :items="movie.writers" title="Writer" role="writer"></list>
    </div>
  </div>
  <div v-else>
    No movie found
  </div>
</template>

<script>
import gql from 'graphql-tag'
import Gravatar from '@/components/Gravatar'
import List from '@/components/List'
import MOVIES from '@/queries/movies.graphql'

export default {
  name: 'movies',
  components: {
    Gravatar,
    List
  },
  data () {
    return {
      movie: {}
    }
  },
  computed: {
    poster () {
      if (this.movie.poster) {
        return `https://image.tmdb.org/t/p/w320${this.movie.poster}`
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  apollo: {
    movies: {
      query: MOVIES,
      variables () {
        return {
          id: this.$route.params.id
        }
      },
      result (data) {
        this.movie = data.movies[0]
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

  .users-viewed {
    display: flex;
    margin-top: 20px;
  }

  .users-view {
    align-items: center;
    display: flex;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  .users-rating {
    font-weight: bold;
    margin-left: 10px;
  }

  a {
    color: #42b983;
  }
</style>
