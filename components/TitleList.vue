<template>
  <section class="list-container">
    <div v-for="(item, index) in ListItem" :key="index">
      <div :id="item.name" class="list-title">{{ item.name }}</div>
      <div class="list-item" v-for="data in item.list" :key="data.id">
        <div class="date">{{ data.date }}</div>
        <NuxtLink :to="`/post/${data.slug}`">
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
  position: relative;

  &:not(:last-child) {
    padding-bottom: 15px;
  }

  & > .date {
    font-family: var(--source-code-pro);
    font-size: 0.833rem;
    padding-left: 20px;
    margin-right: 20px;
    color: var(--v-searchResultText-base);
  }

  & > a {
    &:hover {
      color: var(--v-primary-lighten2);
    }
  }
}
</style>
