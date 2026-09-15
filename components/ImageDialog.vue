<template>
  <v-dialog v-model="openDialog" scrollable max-width="1200px">
    <v-card flat>
      <v-img draggable="false" :src="props.img"></v-img>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
interface ImageDialogProps {
  img: string;
}

// props
const props = defineProps<ImageDialogProps>();

const openDialog = defineModel("openDialog", {
  type: Boolean,
  default: false,
});
</script>
