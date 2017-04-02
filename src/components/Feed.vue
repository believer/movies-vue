<template>
  <div class="feed" v-if="!loading">
    <div class="display-toggles">
      <button @click="displayAddMovie = !displayAddMovie">{{ displayAddMovie ? 'Hide' : 'Show' }} add movie</button>
      <button @click="displaySearch = !displaySearch">{{ displaySearch ? 'Hide' : 'Show' }} search</button>
    </div>
    
    <form class="addMovie" @submit.prevent="addMovie" v-show="displayAddMovie">
      <input class="input" placeholder="IMDb ID" v-model="imdbId" required />
      <input class="input" placeholder="User ID" v-model="userId" required />
      <input class="input" placeholder="Rating" type="number" v-model="rating" min="0" max="10" />
      <input class="input" placeholder="Date" v-model="date" type="date" />
      <div class="input">
        <input id="wilhelm" v-model="wilhelm" type="checkbox" />
        <label for="wilhelm">Wilhelm</label>
      </div>
      <button type="submit">Add movie</button>
    </form>

    <div v-show="displaySearch">
      <input v-model="query" class="input" placeholder="Search" />
      <select v-model="role" class="input" placeholder="Role">
        <option value="actor">Actor</option>
        <option value="composer">Composer</option>
        <option value="director">Director</option>
        <option value="writer">Writer</option>
      </select>
    </div>

    <ul class="search-results" v-if="query && search.length">
      <router-link
        v-for="(movie, index) in search"
        :key="index"
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
        <gravatar :user="movie.user_email"></gravatar>
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
import INSERT_MOVIE from '@/mutations/insertMovie.graphql'
import moment from 'moment'

export default {
  name: 'feed',
  components: {
    Gravatar
  },
  data () {
    return {
      displaySearch: false,
      displayAddMovie: false,
      feed: [],
      search: [],
      loading: false,
      query: null,
      date: '',
      imdbId: '',
      userId: 0,
      rating: null,
      role: 'actor',
      wilhelm: false
    }
  },
  filters: {
    toDate
  },
  methods: {
    addMovie () {
      this.$apollo.mutate({
        mutation: INSERT_MOVIE,
        variables: {
          input: {
            imdbId: this.imdbId,
            rating: parseInt(this.rating, 10),
            userId: parseInt(this.userId, 10),
            date: this.date === '' ? moment().format('YYYY-MM-DD') : this.date,
            wilhelm: this.wilhelm
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
        },
        updateQueries: {
          feed: (previousQueryResult, { mutationResult }) => {
            return {
              feed: [mutationResult.data.addMovie, ...previousQueryResult.feed],
            }
          }
        }
      })
    }
  },
  apollo: {
    feed: {
      query: FEED
    },
    search: {
      query: SEARCH,
      skip () {
        return this.query === null || this.query.length < 4
      },
      variables () {
        return {
          name: this.query,
          role: this.role
        }
      }
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

  .display-toggles {
    margin-bottom: 20px;
  }

  .search-results {
    display: grid;
    border-bottom: 1px solid var(--color-alto);
    margin-bottom: 20px;
    padding-bottom: 20px;
    grid-template-columns: repeat(3, 1fr);
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
