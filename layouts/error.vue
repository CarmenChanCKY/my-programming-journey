<template>
  <v-container fluid style="height: 100%">
    <div class="error-container">
      <div v-if="errorCodeFound" class="error-code-container">
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
      <v-btn class="mt-10" nuxt color="primary" outlined :to="'/'">
        Back to Home
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      errorMessage: [
        {
          code: [404],
          message: "Not Found",
        },
        {
          code: [500, 502],
          message: "Server Error",
        },
      ],
      errorCodeFound: false,
      mainMessage: "",
      subMessage: "",
    };
  },
  head() {
    let index = this.errorMessage.findIndex((obj) => {
      return obj.code.includes(this.error.statusCode);
    });

    let title = "";

    if (index !== -1) {
      title = `${this.error.statusCode} ${this.errorMessage[index].message}`;
    } else {
      title = "Error occurred";
    }

    return {
      title,
    };
  },
  created() {
    const statusCode = parseInt(this.error.statusCode);

    let index = this.errorMessage.findIndex((obj) => {
      return obj.code.includes(statusCode);
    });

    if (index !== -1) {
      this.errorCodeFound = true;
      this.mainMessage = statusCode;
      this.subMessage = this.errorMessage[index].message;
    } else {
      this.errorCodeFound = false;
      this.mainMessage = "Oops...";
      this.subMessage = "Some error occurred. Please try again.";
    }
  },
};
</script>

<style scoped>
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
}

.error-code-container > .error-code,
.error-code-container > .error-message {
  font-size: 1.625rem;
}

.error-code-container > .divider {
  font-size: 1.625rem;
  width: 35px;
  text-align: center;
}

.error-message-container > div {
  text-align: center;
  line-height: 2;
}

.error-message-container > .main-message {
  font-size: 1.75rem;
}

.error-message-container > .sub-message {
  font-size: 1.25rem;
}
</style>
