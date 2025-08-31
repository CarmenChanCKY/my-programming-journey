<template>
  <v-container fluid style="height: 100%">
    <div class="error-container">
      <div v-if="!showFullMessage" class="error-code-container">
        <span class="error-code">
          {{ mainMessage }}
        </span>
        <div class="divider">|</div>
        <span class="error-message">
          {{ subMessage }}
        </span>
      </div>
      <div v-else class="error-message-container">
        <div class="main-message">{{ mainMessage }}</div>
        <div class="sub-message">{{ subMessage }}</div>
      </div>
      <v-btn
        class="mt-10"
        color="primary"
        variant="outlined"
        @click="redirectRoute"
      >
        Home
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object as () => {
    statusCode: number;
    name: string;
    message: string;
  },
});

if (import.meta.client) {
  useHead({
    title: props.error?.name,
    meta: [{ name: "og:url", content: window.location.href }],
  });
}

const router = useRouter();

// data
const mainMessage = ref<string>("");
const subMessage = ref<string>("Not Found");
const showFullMessage = ref<boolean>(false);

function redirectRoute() {
  router.replace({ name: "Home" });
}

onBeforeMount(() => {
  const statusCode = parseInt(props.error?.statusCode.toString() ?? "0");
  showFullMessage.value = false;
  mainMessage.value = props.error?.message.toString() ?? "";

  subMessage.value = props.error?.name ?? "";

  if (statusCode === 429) {
    mainMessage.value = props.error?.name ?? "";
    subMessage.value = props.error?.message ?? "";
    showFullMessage.value = true;
  }
});
</script>

<style lang="scss" scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: inherit;
}

.error-code-container {
  display: flex;
  align-items: center;

  & > .error-code,
  & > .error-message {
    font-size: 1.625rem;
  }

  & > .divider {
    font-size: 1.625rem;
    width: 35px;
    text-align: center;
  }
}

.error-message-container {
  & > div {
    text-align: center;
    line-height: 2;
  }

  & > .main-message {
    font-size: 1.75rem;
  }

  & > .sub-message {
    font-size: 1.25rem;
  }
}
</style>
