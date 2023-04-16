<template>
  <div>
    <section class="post-container">
      <div>
        <section class="post-header-container">
          <div class="post-title">
            {{ postData.title }}
          </div>
          <div class="post-info">
            <div class="post-date">
              <v-icon>{{ dateIcon }}</v-icon>
              <div>{{ postData.date }}</div>
            </div>
            <div class="post-category">
              <v-icon>{{ categoryIcon }}</v-icon>
              <div>{{ postData.category }}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center">
            <v-icon>{{ tagIcon }}</v-icon>
            <div
              v-for="(tag, index) of postData.tags"
              :key="index"
              class="post-tag"
            >
              {{ tag.name }}
            </div>
          </div>
        </section>

        <section class="post-content" v-html="content"></section>

        <section class="post-reference" v-if="postData.reference.length > 0">
          <p class="ref-heading">Reference</p>
          <ul class="ref-ul">
            <li v-for="(reference, index) of postData.reference" :key="index">
              <a :href="reference.hyperlink">{{ reference.name }}</a>
            </li>
          </ul>
        </section>
      </div>
    </section>
  </div>
</template>
  
  <script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiTagOutline, mdiCalendar, mdiFolderOutline } from "@mdi/js";

@Component({ watchQuery: ["page"] })
export default class Post extends Vue {
  // data
  tagIcon: string = mdiTagOutline;
  dateIcon: string = mdiCalendar;
  categoryIcon: string = mdiFolderOutline;
  postData: PostDetailInterface = {
    slug: "",
    title: "",
    date: "",
    category: "",
    category_id: -1,
    tags: [],
    reference: [],
  };
  content: string = "";

  async asyncData({ $axios, params, error }: any) {
    try {
      let slug = "";
      if (params.slug !== undefined) {
        slug = params.slug;
      }

      const postDetail = await $axios.$get("/post/detail", {
        params: { slug },
      });

      console.log(postDetail);

      const postData = {
        slug: params.slug,
        title: postDetail.title,
        date: postDetail.date,
        category: postDetail.category_name,
        category_id: postDetail.category_id,
        tags: postDetail.tags_data,
        reference:
          postDetail.reference_array !== undefined &&
          Array.isArray(postDetail.reference_array)
            ? postDetail.reference_array
            : [],
      };

      const content = postDetail.content;

      return {
        postData,
        content,
      };
    } catch (e) {
      //error({ statusCode: 404, message: 'Post not found' })
    }
  }
}

interface PostDetailInterface {
  slug: string;
  title: string;
  date: string;
  category: string;
  category_id: number;
  tags: Array<TagsInterface>;
  reference: Array<ReferenceInterface>;
}

interface TagsInterface {
  name: string;
  id: number;
}

interface ReferenceInterface {
  name: string;
  hyperlink: string;
}
</script>


<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

.post-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    width: var(--content-width);
  }
}

.post-header-container {
  border-bottom: 2px dashed #939393;
  margin-top: 30px;
  margin-bottom: 40px;
  padding-bottom: 20px;
}

.post-title {
  @extend %post-title;
  margin-bottom: 20px;
}

.post-info {
  @extend %post-info;
}

.post-date {
  @extend %button;
}

.post-category {
  @extend %button;

  &:hover {
    @extend %button-hover;
  }
}

.post-tag {
  @extend %post-card-tag;
  margin-top: 5px;
  margin-bottom: 5px;

  &:hover {
    @extend %post-card-tag-hover;
  }
}

.post-reference {
  .ref-heading {
  }

  .ref-ul {
  }
}

.v-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>