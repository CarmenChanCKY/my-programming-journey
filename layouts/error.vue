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
      <v-btn class="mt-10" nuxt color="primary" outlined @click="redirectRoute">
        Home
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ layout: "empty" })
export default class Error extends Vue {
  @Prop({ type: Object, required: true }) error!: {
    statusCode: number;
    name: string;
    message: string;
  };

  head() {
    let title = this.error.name;

    return {
      title,
      meta: [{ hid: "og_url", name: "og:url", content: window.location.href }],
    };
  }

  mainMessage: string = "";
  subMessage: string = "";
  showFullMessage: boolean = false;

  redirectRoute() {
    if (this.$route.name === "Home") {
      this.$router.go(0);
    } else {
      this.$router.replace({ name: "Home" });
    }
  }

  created() {
    console.log(this.error);
    const statusCode = parseInt(this.error.statusCode.toString());

    this.showFullMessage = false;
    this.mainMessage = this.error.statusCode.toString();
    this.subMessage = this.error.name;

    if (statusCode === 429) {
      this.mainMessage = this.error.name;
      this.subMessage = this.error.message;
      this.showFullMessage = true;
    }
  }
}
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
