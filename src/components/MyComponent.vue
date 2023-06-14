<template>
  <div>
    <h2>Hellooooo</h2>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
/* Add your component-specific styles here */
</style>
