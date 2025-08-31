<template>
  <footer>
    <section class="footer-container">
      <div>
        <div class="footer-link">
          <a href="https://github.com/CarmenChanCKY" target="_blank">Github</a>
          |
          <a href="https://carmenchancky.github.io/" target="_blank"
            >Personal Website</a
          >
        </div>
        <div class="footer-copyright">&copy; {{ copyright }}</div>
      </div>
    </section>
  </footer>
</template>

<script lang="ts" setup>
const copyright = computed(() => {
  return `Copyright ${new Date().getFullYear()}, My Programming Journey`;
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/global.scss" as *;

footer {
  & > .footer-container {
    @extend %center-div;
    & > div {
      border-top: 1px solid rgb(var(--v-theme-borderLine));
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px 0 !important;
    }
  }

  .footer-copyright {
    font-size: 0.778rem;
  }

  .footer-link {
    font-size: 0.778rem;
    display: flex;
    align-items: center;

    & > a {
      font-size: 0.778rem;

      &:first-child {
        margin-right: 15px;
      }

      &:last-child {
        margin-left: 15px;
      }

      &::after {
        @extend %link;
      }

      &:hover::after {
        @extend %link-hover-animation;
      }
    }
  }
}

@media screen and (max-width: $breakpoint-sm) {
  footer {
    & > .footer-container {
      & > div {
        flex-direction: column;
      }
    }

    .footer-copyright {
      margin-top: 10px;
    }
  }
}
</style>
