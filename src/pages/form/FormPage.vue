<template>
  <div class="user-form">
    <div class="user-form__input-container">
      <h1 class="user-form__header">Персональные данные</h1>
      <DynamicInput
        inputName="name"
        inputLabel="Имя"
        v-model="user.fullName"
        :hasError="errors.fullName"
        errorMessage="Введите имя"
      />
      <DynamicInput
        inputName="age"
        inputLabel="Возраст"
        inputType="number"
        v-model="user.age"
        :hasError="errors.age"
        errorMessage="Введите возраст"
      />
    </div>
    <div class="user-form__children">
      <div class="user-form__children-header">
        <h2 class="user-form__header">Дети (макс. 5)</h2>
        <button
          v-if="canAddChild"
          class="user-form__add-button"
          @click="addChild"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.13332 7.85555C1.50125 7.85555 0.988866 8.36794 0.988867 9C0.988867 9.63206 1.50126 10.1445 2.13332 10.1445L7.85544 10.1445L7.85545 15.8668C7.85545 16.4989 8.36784 17.0113 8.9999 17.0113C9.63196 17.0113 10.1444 16.4989 10.1444 15.8668L10.1443 10.1445L15.8667 10.1445C16.4988 10.1445 17.0112 9.63207 17.0112 9.00001C17.0112 8.36795 16.4988 7.85556 15.8667 7.85556L10.1443 7.85556L10.1443 2.13338C10.1443 1.50132 9.63195 0.988927 8.99989 0.988927C8.36783 0.988927 7.85544 1.50131 7.85544 2.13338L7.85544 7.85555L2.13332 7.85555Z"
              fill="#01A7FD"
            />
          </svg>
          <p class="button-text">Добавить ребенка</p>
        </button>
      </div>
      <div
        v-for="(child, index) in children"
        :key="index"
        class="user-form__child"
      >
        <DynamicInput
          :inputName="`child-name-${index}`"
          :inputStyles="'width: 260px'"
          inputLabel="Имя ребенка"
          v-model="child.name"
          :hasError="errors.children[index]?.name"
          errorMessage="Введите имя ребенка"
        />
        <DynamicInput
          :inputName="`child-age-${index}`"
          inputLabel="Возраст ребенка"
          :inputStyles="'width: 260px'"
          inputType="number"
          v-model="child.age"
          :hasError="errors.children[index]?.age"
          errorMessage="Введите возраст ребенка"
        />
        <button class="user-form__remove-button" @click="removeChild(index)">
          Удалить
        </button>
      </div>
    </div>
    <button class="user-form__save-button" @click="saveData">Сохранить</button>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import DynamicInput from "../../components/input/DynamicInput.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  components: { DynamicInput },
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
    const user = computed(() => userStore.user);
    const children = computed(() => userStore.children);

    return { user, children, router };
  },
  data() {
    return {
      localUser: {
        fullName: "",
        age: "",
      },
      localChildren: [],
      errors: {
        fullName: false,
        age: false,
        children: [],
      },
    };
  },
  computed: {
    canAddChild() {
      return this.localChildren.length < 5;
    },
  },
  mounted() {
    if (this.user.fullName || this.user.age) {
      this.localUser = { ...this.user };
    }
    if (this.children.length) {
      this.localChildren = this.children.map((child) => ({ ...child }));
    }
  },
  methods: {
    addChild() {
      if (this.localChildren.length < 5) {
        this.localChildren.push({ name: "", age: "" });
        this.errors.children.push({ name: false, age: false });
      }
    },
    removeChild(index) {
      this.localChildren.splice(index, 1);
      this.errors.children.splice(index, 1);
    },
    saveData() {
      this.validateFields();
      if (this.isFormValid()) {
        const userStore = useUserStore();

        userStore.setUser(this.localUser);
        userStore.setChildren(this.localChildren);

        this.$router.push("/preview");
      }
    },
    validateFields() {
      this.errors.fullName = !this.localUser.fullName;
      this.errors.age = !this.localUser.age;

      this.errors.children = this.localChildren.map((child) => ({
        name: !child.name,
        age: !child.age,
      }));
    },
    isFormValid() {
      const userFieldsValid = Boolean(
        this.localUser.fullName && this.localUser.age
      );
      const childrenFieldsValid = this.localChildren.every(
        (child) => child.name && child.age
      );
      const noErrors =
        !this.errors.fullName &&
        !this.errors.age &&
        this.errors.children.every((child) => !child.name && !child.age);

      return userFieldsValid && childrenFieldsValid && noErrors;
    },
  },
};
</script>
<style lang="scss" scoped>
.user-form {
  width: 676px;
  max-height: 80vh;
  overflow-y: scroll;
  padding: 0 20px;

  &__input-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 166px;
  }

  &__header {
    font-size: 20px;
    font-weight: 500;
    line-height: 24px;
  }

  &__children {
    margin: 44px 0 30px;

    &-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 44px;
      margin-bottom: 20px;
    }
  }

  &__child {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }

  &__add-button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 204px;
    height: 44px;
    padding: 10px 20px;
    border-radius: 100px;
    border: 2px solid var(--color-button-primary);
    background-color: transparent;
  }

  &__save-button {
    width: 118px;
    height: 44px;
    padding: 10px 20px;
    border-radius: 100px;
    border: 2px solid var(--color-button-primary);
    background-color: var(--color-button-primary);
    color: var(--color-text-primary);
  }

  &__remove-button {
    border: none;
    background: none;
    color: var(--color-button-primary);
  }
}

.button-text {
  color: var(--color-button-primary);
}
</style>
