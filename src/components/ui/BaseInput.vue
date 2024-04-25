<template>
  <div :class="{'input-wrapper': type == 'file'}">
    <label :for="identity" class="fw-semibold"
      >{{ label }} <span style="color: #cb3a31">*</span>
      <slot></slot>
    </label>
    <input
      :class="[{ 'file-input': type == 'file' }, 'form-control']"
      :type="type"
      :id="identity"
      :placeholder="placeholder"
      :readonly="readonly === '1'"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @keyup="$emit('keyInput', $event.target.value)"
      @focus="$emit('totalTimeFocus', $event.target.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, require: true },
  label: { type: String, require: true },
  identity: { type: String, require: true },
  placeholder: { type: String, require: false },
  readonly: { type: String, require: true, default: "0" },
  // isImage: { type: Boolean, require: true, default: false },
  modelValue: { type: [String, Number] },
});
</script>

<style scoped>
.input-wrapper {
  padding: 0.375rem 0.75rem;
  width: 200px;
  text-align: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 1px solid #ced4da;
  background-color: #ced4da;
  border-radius: 0.375rem;
  margin-bottom: 10px;
  transition: all 1s ease;
}

.input-wrapper:hover {
  background-color: #b9bec3;
}

.file-input {
  cursor: pointer;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  font-size: 50px;
  opacity: 0;
}
</style>