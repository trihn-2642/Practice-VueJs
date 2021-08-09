<template>
  <div>
    <el-container>
      <h5 class="cart__header">Giỏ Hàng</h5>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Hình Ảnh</th>
            <th>Tên Sản Phẩm</th>
            <th>Kích thước</th>
            <th>Giá Tiền</th>
            <th>Số Lượng</th>
            <th>Thành Tiền</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in cart" :key="index">
            <td>
              {{ index + 1 }}
            </td>
            <td>
              <img :src="product.image" />
            </td>
            <td>{{ product.name }}</td>
            <td>
              {{ product.size }}
            </td>
            <td>{{ product.price.toLocaleString() }}đ</td>
            <td>
              <el-input-number
                v-model="product.quantity"
                @change="handleChangeQuantity(index, product.quantity)"
                :min="1"
                :max="10"
              ></el-input-number>
            </td>
            <td>
              {{ intoMoney(product.price, product.quantity).toLocaleString() }}đ
            </td>
            <td>
              <i
                class="el-icon-delete"
                @click="handleRemoveProductInCart(index)"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="cart.length !== 0" class="cart__into-money">
        <span>Tổng Tiền:</span>
        <span>{{ totalMoney(cart).toLocaleString() }}đ</span>
      </div>
      <div v-if="cart.length === 0" class="cart__empty">
        <p>Chưa có sản phẩm nào được thêm vào?</p>
        <router-link to="/home">Mua Sản Phẩm</router-link>
      </div>
      <div class="cart__payment">
        <router-link to="/home" class="back">Trang Chủ</router-link>
        <button v-if="cart.length !== 0" @click="handleCheckout">
          Thanh Toán
        </button>
      </div>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  beforeCreate() {
    document.title = "Giỏ Hàng";
  },
  computed: {
    ...mapGetters(["cart"]),
  },
  methods: {
    intoMoney(price, quantity) {
      return price * quantity;
    },

    totalMoney(cart) {
      return cart.reduce((accumulator, currentValue) => {
        return (accumulator += this.intoMoney(
          currentValue.price,
          currentValue.quantity
        ));
      }, 0);
    },

    handleChangeQuantity(index, quantity) {
      this.$store.dispatch("changeQuantity", { index, quantity });
    },

    handleRemoveProductInCart(index) {
      this.$confirm("Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?", {
        confirmButtonText: "Xác Nhận",
        cancelButtonText: "Thoát",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("removeProductInCart", index);
          this.$message({
            type: "success",
            message: "Sản phẩm này đã được xóa khỏi giỏ hàng.",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Lệnh xóa đã được hủy bỏ.",
          });
        });
    },

    handleCheckout() {
      this.$confirm("Bạn có muốn thanh toán đơn hàng này?", {
        confirmButtonText: "Xác Nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("pay");
          this.$message({
            type: "success",
            message: "Xác nhận đặt hàng thành công",
          });
        })
        .catch(() => {
          this.$message({
            type: "warning",
            message: "Đơn hàng chưa được xác nhận",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.cart__header {
  font-size: 1.25rem;
  text-align: center;
  color: deeppink;
}

table {
  width: 100%;
  border-collapse: collapse;

  thead {
    tr {
      height: 40px;
      width: 100%;

      th {
        border: 1px solid rgb(231, 225, 225);
      }
    }
  }

  tbody {
    tr {
      height: 80px;
      width: 100%;

      td {
        border: 1px solid rgb(231, 225, 225);
        text-align: center;
        padding: 0.25rem 0.5rem;

        &:first-child {
          width: 5%;
        }

        &:nth-child(2) {
          width: 10%;

          img {
            width: 60px;
            height: 60px;
            margin: 0.5rem 0;
          }
        }

        &:nth-child(3) {
          width: 25%;
        }

        &:nth-child(4) {
          width: 10%;
        }

        &:nth-child(5) {
          width: 10%;
        }

        &:nth-child(6) {
          width: 20%;
          .el-input-number {
            width: 130px;
          }
        }

        &:nth-child(7) {
          width: 10%;
        }

        &:last-child {
          width: 10%;

          .el-icon-delete {
            color: red;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.cart__empty {
  width: 100%;
  text-align: center;

  p {
    margin: 1.5rem 0 2rem;
    font-size: 1.0625rem;
    color: #090909;
  }

  a {
    border: 1px solid rgb(31, 134, 66);
    color: rgb(31, 134, 66);
    text-decoration: none;
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
    margin-top: 2rem;
    transition: all 0.35s linear;

    &:hover {
      background: rgb(31, 134, 66);
      color: #fff;
    }
  }
}

.cart__into-money {
  display: flex;
  justify-content: space-between;
  border: 1px solid rgb(231, 225, 225);
  border-top: 0;
  padding: 0.5rem 1rem;

  span {
    font-size: 1.125rem;
    color: #090909;

    &:last-child {
      margin-right: 3rem;
      color: red;
    }
  }
}

.cart__payment {
  display: flex;
  justify-content: space-between;

  button {
    text-decoration: none;
    margin-top: 40px;
    border: 1px solid rgb(76, 231, 115);
    width: 130px;
    text-align: center;
    padding: 0.5rem 0;
    border-radius: 8px;
    transition: all 0.35s linear;
    background: rgb(76, 231, 115);
    color: #fff;
    cursor: pointer;

    &:hover {
      background: #fff;
      color: rgb(76, 231, 115);
    }
  }
}
</style>