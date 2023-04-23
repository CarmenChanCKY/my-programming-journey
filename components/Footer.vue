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

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Footer extends Vue {
  get copyright() {
    return `Copyright ${new Date().getFullYear()}, My Programming Journey`;
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/styles/global.scss";

footer {
  & > .footer-container {
    @extend %center-div;
    & > div {
      border-top: 1px solid var(--v-borderLine-base);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px 0 !important;
    }
  }

  .footer-copyright {
    font-size: 14px;
  }

  .footer-link {
    font-size: 14px;
    display: flex;
    align-items: center;

    & > a {
      color: var(--v-primary-base);
      font-size: 14px;
      text-decoration: none;

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
