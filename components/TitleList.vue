<template>
  <section class="list-container">
    <div v-for="(item, index) in ListItem" :key="index">
      <div :id="item.listTitle" class="list-title">{{ item.listTitle }}</div>
      <div class="list-item" v-for="data in item.list" :key="data.id">
        <div class="date">{{ data.date }}</div>
        <NuxtLink :to="{ name: 'PostDetail', params: { slug: data.slug } }">
          {{ data.title }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import type TitleListInterface from "~/interfaces/TitleListInterface";

@Component
export default class TitleList extends Vue {
  @Prop({ type: Array, required: true, default: [] })
  ListItem!: Array<TitleListInterface>;
}
</script>

<style lang="scss" scoped>
.list-container {
  margin-top: 40px;
  & > div {
    margin-bottom: 30px;
  }
}
.list-title {
  font-size: 1.111rem;
  margin-bottom: 15px;
}

.list-item {
  display: flex;
  border-left: 1px solid var(--v-dividerBorderLine-base);

  &:not(:last-child) {
    padding-bottom: 15px;
  }

  & > .date {
    font-family: var(--source-code-pro);
    font-size: 0.833rem;
    padding-left: 20px;
    color: var(--v-searchResultText-base);
  }

  & > a {
    padding-left: 20px;
    &:hover {
      color: var(--v-primary-lighten2);
    }
  }
}

@media screen and (max-width: 600px) {
  .list-item {
    flex-direction: column;

    &:not(:last-child) {
      padding-bottom: 25px;
    }
  }
}
</style>
