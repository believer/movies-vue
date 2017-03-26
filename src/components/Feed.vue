<template>
  <div class="feed" v-if="!loading">
    <form class="addMovie" @submit.prevent="addMovie">
      <input class="input" placeholder="IMDb ID" v-model="imdbId" />
      <input class="input" placeholder="User ID" v-model="userId" />
      <input class="input" placeholder="Rating" v-model="rating" type="number" />
      <input class="input" placeholder="Date" v-model="date" type="date" />
      <button type="submit">Add movie</button>
    </form>

    <input @keyup.enter="searchQuery" class="input" placeholder="Search" />
    <ul v-if="query && search.length">
      <router-link
        v-for="(movie, index) in search"
        :key="movie.id"
        :to="{ name: 'movie', params: { id: movie.id }}"
        class="link"
        tag="li">
        <div>{{ movie.title }}</div>
      </router-link>
    </ul>

    <ul>
      <router-link
        v-for="(movie, index) in feed"
        :key="index"
        :to="{ name: 'movie', params: { id: movie.id }}"
        class="link"
        tag="li">
        <gravatar :user="movie.user"></gravatar>
        <div>{{ movie.title }}</div>
        <div class="date">{{ movie.date | toDate }}</div>
        <div class="rating">{{ movie.rating }}</div>
      </router-link>
    </ul>
  </div>
  <div class="feed" v-else>
    Loading
  </div>  
</template>

<script>
import gql from 'graphql-tag'
import Gravatar from '@/components/Gravatar'
import { toDate } from '@/utils/helpers'
import FEED from '@/queries/feed.graphql'
import SEARCH from '@/queries/search.graphql'
import ADD_MOVIE from '@/mutations/addMovie.graphql'

export default {
  name: 'feed',
  components: {
    Gravatar
  },
  data () {
    return {
      feed: [],
      search: [],
      loading: false,
      query: null,
      date: '',
      imdbId: '',
      userId: '',
      rating: null
    }
  },
  filters: {
    toDate
  },
  methods: {
    searchQuery (event) {
      this.query = event.target.value
    },
    addMovie () {
      this.$apollo.mutate({
        mutation: ADD_MOVIE,
        variables: {
          id: this.imdbId,
          rating: parseInt(this.rating, 10),
          userid: this.userId
        },
        updateQueries: {
          feed: (previousQueryResult, { mutationResult }) => {
            return {
              feed: [mutationResult.data.addMovie, ...previousQueryResult.feed],
            }
          }
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addMovie: {
            __typename: 'Movie',
            id: '-1',
            date: new Date(),
            rating: this.rating,
            title: '',
            user: {
              email: '',
              __typename: 'User'
            }
          }
        }
      })
    }
  },
  apollo: {
    feed: {
      query: FEED,
      result (data) {
        console.log(data)
      },
      loadingKey: 'loading'
    }
  }
}
</script>

<style scoped>
  ul {
    display: grid;
  }

  li {
    align-items: center;
    display: grid;
    grid-template-columns: auto 1fr auto 50px;
    grid-column-gap: 10px;
  }

  .addMovie {
    margin-bottom: 30px;
  }

  .feed {
    margin: 100px auto;
    max-width: 960px;
  }

  .link {
    cursor: pointer;
    padding: 10px;

    &:hover {
      background: rgb(66, 185, 131, 0.3);
    }
  }

  .input {
    border: 1px solid var(--color-alto);
    border-radius: 3px;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 10px;
    width: 100%;

    &:focus {
      outline-color: var(--color-ocean-green);
    }
  }

  .date {
    color: #aaa;
  }

  .rating {
    font-weight: bold;
    text-align: right;
  }
</style>
