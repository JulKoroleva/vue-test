import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      fullName: "",
      age: "",
    },
    children: [],
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
    },
    setChildren(childrenData) {
      this.children = childrenData;
    },
    resetUserData() {
      this.user = { fullName: "", age: "" };
      this.children = [];
    },
  },
});
