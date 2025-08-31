<template>
  <div
    :class="{
      'search-btn-container': true,
      'mt-9': currentHeaderType !== 'full',
    }"
  >
    <template v-if="currentHeaderType === 'full'">
      <v-btn
        variant="text"
        icon="mdi mdi-magnify"
        color="colorText"
        density="comfortable"
        @click="openSearchDialog = true"
      >
      </v-btn>

      <v-dialog v-model="openSearchDialog" max-width="450">
        <v-card flat>
          <v-text-field
            bg-color="textFieldBackground"
            variant="solo"
            density="comfortable"
            flat
            hide-details="auto"
            placeholder="Search title, content..."
            v-model.trim="searchValue"
            append-inner-icon="mdi mdi-magnify"
            @click:appendInner="searchText"
            @keydown.enter="searchText"
          ></v-text-field>
        </v-card>
      </v-dialog>
    </template>
    <template v-else>
      <v-text-field
        class="input-border"
        bg-color="textFieldBackground"
        variant="solo"
        density="comfortable"
        flat
        hide-details="auto"
        placeholder="Search title, content..."
        v-model.trim="searchValue"
        append-inner-icon="mdi mdi-magnify"
        @click:appendInner="searchText"
        @keydown.enter="searchText"
      ></v-text-field>
    </template>
  </div>
</template>

<script lang="ts" setup>
const { isValid } = useValidator();
const router = useRouter();

interface SearchBarProps {
  currentHeaderType: string;
}

// props
const props = withDefaults(defineProps<SearchBarProps>(), {
  currentHeaderType: "full",
});

// data
const openSearchDialog = ref<boolean>(false);

// model
const [searchValue, editSearchValue] = defineModel<string>({
  set(value: string) {
    return editSearchValue.trim ? value.trim() : value;
  },
});

function searchText() {
  if (isValid(searchValue.value)) {
    let searchKey = searchValue.value?.replaceAll(" ", "-");
    openSearchDialog.value = false;
    router.push({
      name: "SearchKeywordResult",
      params: { keyword: searchKey },
    });
  }
}
</script>

<style lang="scss" scoped>
.input-border {
  border: 1px solid rgb(var(--v-theme-textfieldBorder));
}

header {
  &.simple {
    .search-btn-container {
      width: 100%;
    }
  }
}
</style>
