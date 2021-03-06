<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  <p class="title">
                    <b-icon pack="fas" icon="newspaper" size="is-large" />
                    {{ $t('articles.title') }}
                  </p>
                </div>
              </div>

              <div class="level-right">
                <div class="level-item">
                  <b-icon class="feed" pack="fas" icon="rss" size="is-small" />
                  <a
                    v-for="feed in feeds.formats"
                    :key="feed.name"
                    :href="`${feeds.basepath}/articles/${feed.file}`"
                    :title="feed.name"
                    :alt="feed.name"
                    class="feed"
                  >
                    {{ feed.name }}
                  </a>
                </div>
              </div>
            </div>

            <p>
              {{ $t('articles.text') }}
            </p>

            <br />

            <b-field :label="$t('articles.tags.label')">
              <b-taginput
                v-model="selectedTags"
                :data="shortlistTags"
                :allow-new="false"
                :open-on-focus="true"
                :maxtags="5"
                :placeholder="$t('articles.tags.placeholder')"
                autocomplete
                icon-pack="fas"
                icon="tag"
                @typing="findShortlistTags"
                @input="updateShortlistTags"
              />
            </b-field>

            <br />

            <div
              v-for="yearArticles in filteredArticles"
              :key="yearArticles.year"
            >
              <p class="subtitle">
                {{ yearArticles.year }}
              </p>

              <article
                v-for="article in yearArticles.articles"
                :key="article.slug"
                :data-slug="article.slug"
                class="media"
              >
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>
                        <nuxt-link
                          :to="
                            localePath({
                              name: 'articles-slug',
                              params: { slug: article.slug },
                            })
                          "
                        >
                          {{ article.meta.title }}
                        </nuxt-link>
                      </strong>
                      <small>
                        {{ $d(article.meta.published, 'short') }}
                      </small>
                    </p>

                    <p>{{ article.meta.summary }}</p>

                    <b-taglist>
                      <b-tag v-for="tag in article.meta.tags" :key="tag">
                        {{ tag }}
                      </b-tag>
                    </b-taglist>
                  </div>
                </div>
              </article>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { ContentItem } from '~/content'

export default Vue.extend({
  asyncData(context) {
    const articles = context.$content.articles.map((a) => {
      a.meta.published = new Date(a.meta.published)
      return a
    })

    const tags = articles.reduce((obj, a) => {
      a.meta.tags.forEach((t) => {
        obj.add(t)
      })
      return obj
    }, new Set<string>())

    return {
      articles,
      tags: Array.from(tags).sort(),
      shortlistTags: Array.from(tags).sort(),
    }
  },

  data() {
    return {
      articles: [] as ContentItem[],
      tags: [] as string[],
      selectedTags: [] as string[],
      shortlistTags: [] as string[],
      feeds: this.$t('common.feeds'),
    }
  },

  computed: {
    filteredArticles(): { year: number; articles: ContentItem[] }[] {
      const tagFiltered = this.articles.filter((a) =>
        this.selectedTags.every((t: string) => a.meta.tags.includes(t))
      )

      const byYear = tagFiltered.reduce(
        (obj: { [key: string]: ContentItem[] }, a) => {
          const year = a.meta.published.getFullYear()
          const yearStr = year.toString()
          if (!(yearStr in obj)) {
            obj[yearStr] = []
          }
          obj[yearStr].push(a)
          return obj
        },
        {}
      )

      return Object.entries(byYear)
        .map(([key, value]) => ({
          year: Number.parseInt(key),
          articles: value,
        }))
        .sort((a, b) => b.year - a.year)
    },
  },

  methods: {
    findShortlistTags(tag: string): void {
      this.shortlistTags = this.tags.filter(
        (t) => t.includes(tag.toLowerCase()) && !this.selectedTags.includes(t)
      )
    },

    updateShortlistTags(): void {
      this.shortlistTags = this.tags.filter(
        (t) => !this.selectedTags.includes(t)
      )
    },
  },
})
</script>

<style scoped>
.feed {
  margin-right: 0.5rem;
}
</style>
