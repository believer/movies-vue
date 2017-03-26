<template>
  <div class="feed" v-if="!loading">
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
        :key="movie.id"
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
      query: null
    }
  },
  filters: {
    toDate
  },
  methods: {
    searchQuery (event) {
      this.query = event.target.value
    }
  },
  apollo: {
    feed: {
      query: FEED,
      loadingKey: 'loading'
    },
    search: {
      query: SEARCH,
      variables () {
        return {
          title: this.query
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
