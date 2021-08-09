<template>
  <div class="item">
    <img :src="product.image" :alt="`link ${product.image} error`" />
    <div class="info">
      <div class="info__wrapper">
        <h5 class="name">{{ product.name }}</h5>
        <p class="price">{{ product.price.toLocaleString() }}đ</p>
        <el-radio-group v-model="size">
          <el-radio-button
            v-for="(s, index) in product.sizes"
            :key="index"
            :label="s"
          ></el-radio-button>
        </el-radio-group>
        <i class="el-icon-shopping-bag-2" @click="addToCart()"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    default: function () {
      return {};
    },
    onAddToCart: Function,
  },
  data() {
    return {
      size: this.product.sizes[0],
    };
  },
  methods: {
    addToCart() {
      const { id, name, price, image } = this.product;
      const addCart = {
        id: id,
        name: name,
        price: price,
        image: image,
        quantity: 1,
        size: this.size,
      };
      this.$emit("onAddToCart", addCart);
    },
  },
};
</script>

<style lang="scss">
.item {
  width: 100%;
  height: 220px;
  border: 1px solid rgb(231, 230, 230);
  border-radius: 8px;
  position: relative;
  z-index: 10;

  &:hover {
    .info {
      left: 0;
      visibility: visible;
      opacity: 1;
      transition: all 0.25s linear;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .info {
    top: 0;
    position: absolute;
    left: -100%;
    opacity: 0;
    visibility: hidden;
    background: rgba($color: #000000, $alpha: 0.2);
    width: 100%;
    height: 100%;

    &__wrapper {
      position: absolute;
      bottom: 0;
      padding: 0 0.5rem;
      width: 100%;
      margin-bottom: 0.25rem;

      .name {
        color: #fff;
        font-size: 17px;
        margin: 0;
      }
      .price {
        color: rgb(238, 244, 245);
        margin: 0.5rem 0;
      }

      .el-radio-group {
        label {
          margin-right: 4px;

          &::before {
            margin: 0;
          }
        }

        .el-radio-button__inner {
          padding: 4px 8px;
          border-radius: 4px;
        }
      }

      .el-icon-shopping-bag-2 {
        float: right;
        font-size: 1.25rem;
        color: red;
        background: rgb(230, 227, 227);
        cursor: pointer;
        padding: 1px 2px;
      }
    }
  }
}
</style>