<template>
  <div class="preview-page">
    <section class="preview-page__section preview-page__section--user">
      <div>
        <h2 class="preview-page__title">Персональные данные</h2>
        <p v-if="user.fullName" class="preview-page__info">
          {{ user.fullName }}, {{ formatAge(user.age) }}
        </p>
        <p v-else class="preview-page__no-info">Нет данных о родителе</p>
      </div>
    </section>

    <section
      class="preview-page__section preview-page__section--children"
      v-if="children.length"
    >
      <div>
        <h2 class="preview-page__title">Дети</h2>
        <ul class="preview-page__list">
          <li
            v-for="(child, index) in children"
            :key="index"
            class="preview-page__list-item"
          >
            <p class="preview-page__info">
              {{ child.name }}, {{ formatAge(child.age) }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <p class="preview-page__no-info" v-else>Нет данных о детях.</p>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";

export default {
  setup() {
    const userStore = useUserStore();
    const formatAge = (age) => {
      const ageNum = Number(age);
      if (!ageNum) return "";
      const lastDigit = ageNum % 10;
      const lastTwoDigits = ageNum % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return `${ageNum} лет`;
      if (lastDigit === 1) return `${ageNum} год`;
      if (lastDigit >= 2 && lastDigit <= 4) return `${ageNum} года`;
      return `${ageNum} лет`;
    };

    return {
      user: userStore.user,
      children: userStore.children,
      formatAge,
    };
  },
};
</script>

<style lang="scss" scoped>
.preview-page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;

  &__section {
    margin-bottom: 20px;
  }

  &__title {
    font-size: 20px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
  }

  &__info {
    margin: 5px 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }

  &__list {
    list-style-type: none;
    padding: 0;
  }

  &__list-item {
    margin-bottom: 15px;
    width: fit-content;
    background-color: var(--color-bg-secondary);
    padding: 10px 20px;
    border-radius: 5px;
  }

  &__no-info {
    font-style: italic;
    color: var(--color-text-secondary);
  }
}
</style>
