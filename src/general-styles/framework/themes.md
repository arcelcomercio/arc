# Temas

## Campaña: violencia contra la mujer

    $color-white: #ffffff;
    $campaign-primary-color: #061524;
    $campaign-secondary-color: #0a2239;

    body {
      background-color: $campaign-primary-color;
    }
    .content-layout-container {
      background-color: $campaign-primary-color;
    }
    .nav {
      &__container-menu,
      &__search-box {
        border-right-color: $color-white;
      }
      &__icon-search,
      &__icon-menu,
      &__btn--section,
      &__list-link {
        color: $color-white;
      }
    }
    .header {
      &__link {
        color: $color-white;
      }
    }
    .featured-story {
      background-color: $campaign-secondary-color;
      overflow: hidden;
      border-radius: 10px;
      &__detail {
        background-color: $campaign-secondary-color;
      }
      &__title-link,
      &__category-link {
        color: $color-white;
        &:hover {
          color: #e86176;
          transition: all .5s ease-out;
        }
      }
    }
    .footer {
      &__info,
      &__sites,
      &__sections,
      &__contact {
        background-color: $campaign-primary-color;
      }
      &__legal-item,
      &__list-title,
      &__list-link,
      &__list-link,
      &__social-title,
      &__social-icon {
        color: $color-white;
      }
      &__sites {
        p {
          color: $color-white;
        }
      }
    }
    .featured-special {
      &__section-link {
        background-color: #e86176;
        border-radius: 4px;
      }
      &__img-link {
        &::after {
          background: linear-gradient(to bottom, rgba(68, 68, 68, 0) 20%, #823b46);
          opacity: 0.9;
        }
      }
    }
