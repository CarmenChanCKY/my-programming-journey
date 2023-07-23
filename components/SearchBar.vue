<template>
  <div
    :class="{
      'search-btn-container': true,
      'mt-9': currentHeaderType !== 'full',
    }"
  >
    <template v-if="currentHeaderType === 'full'">
      <v-btn icon color="colorText" @click="openSearchDialog = true">
        <v-icon>{{ searchButton }}</v-icon>
      </v-btn>

      <v-dialog v-model="openSearchDialog" max-width="450">
        <v-card flat>
          <v-text-field
            background-color="textFieldBackground"
            solo
            flat
            autofocus
            hide-details="auto"
            placeholder="Search title, content..."
            v-model="searchValue"
            :append-icon="searchButton"
            @click:append="searchText"
            @keydown.enter="searchText"
          ></v-text-field>
        </v-card>
      </v-dialog>
    </template>
    <template v-else>
      <v-text-field
        class="input-border"
        background-color="textFieldBackground"
        solo
        flat
        autofocus
        hide-details="auto"
        placeholder="Search title, content..."
        v-model="searchValue"
        :append-icon="searchButton"
        @click:append="searchText"
        @keydown.enter="searchText"
      ></v-text-field>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mdiMagnify } from "@mdi/js";

@Component
export default class SearchBar extends Vue {
  @Prop({ type: String, default: "full", required: true })
  currentHeaderType!: string;

  searchButton: string = mdiMagnify;
  openSearchDialog: boolean = false;
  searchValue: string = "";

  searchText() {
    if (
      this.searchValue === undefined ||
      this.searchValue === null ||
      this.searchValue === ""
    ) {
      return;
    } else {
      let searchKey = this.searchValue.trim().replaceAll(" ", "-");
      this.$router.push({ path: `/search/${searchKey}/` });
    }
  }
}
</script>

<style lang="scss" scoped>
.input-border {
  border: 1px solid var(--v-textfieldBorder-base);
}
</style>
