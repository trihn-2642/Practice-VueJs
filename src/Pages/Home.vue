<template>
  <div>{{ model }}</div>
</template>

<script>
export default {
  props: {
    msg: String,
    newMsg: {
      type: String,
      default: "hello vue",
    },
  },
  data() {
    return {
      model: this.newMsg,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>