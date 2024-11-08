<template>
    <div :class="[inputMainClass, { error: hasError }]">
      <label
        :for="inputName"
        :class="[{ 'dynamic-input__placeholder_active': isActive }, labelClass]"
      >
        {{ inputLabel }}
      </label>
      <input
        :name="inputName"
        :id="inputName"
        :type="inputType"
        :class="inputClass"
        :style="inputStyles"
        v-model="internalValue"
        @focus="activatePlaceholder"
        @blur="deactivatePlaceholder"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      inputMainClass: { type: String, default: "dynamic-input" },
      inputName: { type: String, required: true },
      labelClass: { type: String, default: "dynamic-input__placeholder" },
      inputLabel: { type: String, required: true },
      inputType: { type: String, default: "text" },
      inputClass: { type: String, default: "dynamic-input__data" },
      modelValue: { type: [String, Number], default: "" },
      hasError: { type: Boolean, default: false },
      inputStyles: {
        type: String,
      },
    },
    data() {
      return {
        isActive: !!this.modelValue, 
        internalValue: this.modelValue,
      };
    },
    methods: {
      activatePlaceholder() {
        this.isActive = true;
      },
      deactivatePlaceholder() {
        if (!this.internalValue) {
          this.isActive = false;
        }
      },
    },
    watch: {
      modelValue(newVal) {
        this.internalValue = newVal;
        this.isActive = !!newVal;
      },
      internalValue(newVal) {
        this.$emit("update:modelValue", newVal); 
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  @import "../../styles/variables.scss";
  
  .dynamic-input {
    width: 100%;
    position: relative;
  
    &__data {
      width: 100%;
      height: 56px;
      padding: 10px;
      font-size: 16px;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      transition: border-color 0.3s;
  
      &:focus {
        outline: none;
        border: 1px solid var(--color-border-active);
      }
    }
  
    &__placeholder {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
      font-size: 18px;
      font-weight: 300;
      color: var(--color-text-secondary);
      transition: all 0.3s;
    }
  
    &__placeholder_active {
      top: 10px;
      font-size: 12px;
      font-weight: 200;
    }
  }
  
  .input__error {
    color: red;
    display: none;
  }
  
  .input__error_visible {
    display: block;
    position: absolute;
    font-size: 9px;
    z-index: 1000;
    opacity: 0.6;
  }
  
  .error .dynamic-input__data {
    border-color: red;
  }
  </style>
  