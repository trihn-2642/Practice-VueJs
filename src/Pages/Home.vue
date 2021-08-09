<template>
  <div class="container">
    <div class="cart">
      <router-link
        to="/productmanage"
        class="btn__manage"
        title="quản lý sản phẩm"
      >
        <i class="el-icon-set-up"></i>
      </router-link>
      <router-link to="/cart" class="btn__cart" title="giỏ hàng">
        <el-badge :value="count" class="icon__cart">
          <i class="el-icon-s-goods"></i>
        </el-badge>
      </router-link>
    </div>
    <ListItem :products="products" @onAddToCart="onAddToCart" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ListItem from "@/components/ListItem.vue";
export default {
  computed: {
    ...mapGetters(["products", "count"]),
  },
  components: {
    ListItem,
  },
  data() {
    return {};
  },
  methods: {
    onAddToCart(cart) {
      this.$store.dispatch("addCart", cart);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 20px;

  .cart {
    padding: 0 0.625rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    a {
      text-decoration: none;

      &.btn__manage {
        padding: 0.125rem 0.25rem;
        color: deeppink;

        &:visited {
          color: deeppink;
        }

        .el-icon-set-up {
          font-size: 1.5rem;
        }
      }

      &.btn__cart {
        padding: 0.125rem 0.25rem;
        color: rgb(59, 141, 248);

        &:visited {
          color: rgb(59, 141, 248);
        }

        .icon__cart {
          .el-icon-s-goods {
            font-size: 1.5rem;
          }
        }
      }
    }
  }
}
</style>