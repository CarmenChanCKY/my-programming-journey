<template>
  <section class="list-container">
    <div v-for="(item, index) in listItem" :key="index">
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

<script lang="ts" setup>
import type TitleListInterface from "~/interfaces/TitleListInterface";

interface PostPageProps {
  listItem: Array<TitleListInterface>;
}

// props
const props = withDefaults(defineProps<PostPageProps>(), {
  listItem: () => [] as Array<TitleListInterface>,
});
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
  border-left: 2px solid rgb(var(--v-theme-dividerBorderLine));
  padding-top: 7.5px;
  padding-bottom: 7.5px;

  &:hover {
    border-left: 2px solid rgb(var(--v-theme-primaryHover));

    & > a {
      color: rgb(var(--v-theme-primaryHover));
    }
  }

  & > .date {
    font-family: var(--source-code-pro);
    font-size: 0.833rem;
    padding-left: var(--default-padding);
    color: rgb(var(--v-theme-searchResultText));
  }

  & > a {
    padding-left: var(--default-padding);
  }
}

@media screen and (max-width: 600px) {
  .list-item {
    flex-direction: column;
    padding-top: 0;
    border-left: none;

    &:not(:last-child) {
      padding-bottom: 25px;
    }

    &:hover {
      border-left: none;
    }
  }
}
</style>
