<template>
    <div>
      <label class="form-label" :for="id">{{ label }}</label>
      <select
        :id="id"
        v-bind="$attrs"
        class="form-select"
        :value="modelValue"
        @input="updateSelected($event.target.value)"
      >
        <option :value="null" disabled selected>Selecione uma opção</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
      modelValue: {
        type: String,
        default: "",
      },
      label: {
        type: String,
        default: "",
      },
      options: {
        type: Array,
        required: true,
      },
      selectedOption: {
        type: [String, Number],
        default: null,
      },
    },
    methods: {
      updateSelected(value) {
        this.$emit('update:modelValue', value);
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  