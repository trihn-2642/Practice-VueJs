<template>
  <div class="list__item">
    <div v-for="product in products" :key="product.id" class="item__wrapper">
      <Item :product="product" @onAddToCart="AddToCart" />
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
export default {
  props: {
    products: {
      type: Array,
      default: function () {
        return [];
      },
    },
    onAddToCart: Function,
  },
  components: {
    Item,
  },
  methods: {
    AddToCart(cart) {
      this.$emit("onAddToCart", cart);
    },
  },
};
</script>

<style lang="scss" scoped>
.list__item {
  display: flex;
  flex-wrap: wrap;

  .item__wrapper {
    width: 20%;
    padding: 0.625rem;
  }
}
</style>