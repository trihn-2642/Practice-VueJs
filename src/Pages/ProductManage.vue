<template>
  <div>
    <el-container>
      <el-button
        type="primary"
        class="add-product"
        icon="el-icon-circle-plus"
        @click="dialogFormVisible = true"
      >
        Thêm Sản Phẩm
      </el-button>
      <div class="table__wrapper">
        <table>
          <thead>
            <tr>
              <th>Hình Ảnh</th>
              <th>Tên Sản Phẩm</th>
              <th>Kích thước</th>
              <th>Giá Tiền</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in currentProduct" :key="product.id">
              <td>
                <img :src="product.image" />
              </td>
              <td>{{ product.name }}</td>
              <td>
                <span v-for="(size, index) in product.sizes" :key="index">
                  {{ size }}
                </span>
              </td>
              <td>{{ product.price.toLocaleString() }}đ</td>
              <td>
                <i class="el-icon-edit" @click="handleEditProduct(product)"></i>
                <i
                  class="el-icon-delete"
                  @click="handleRemoveProduct(product.id)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
        <el-pagination
          :page-size="1"
          :pager-count="5"
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <router-link to="/home" class="back">Về Trang Chủ</router-link>
      <FormModal
        :open="dialogFormVisible"
        :product="{ ...product }"
        @handleClose="handleClose"
        @handleSubmit="handleSubmit"
      />
    </el-container>
  </div>
</template>

<script>
import FormModal from "@/components/FormModal.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    FormModal,
  },
  computed: {
    ...mapGetters(["products", "limit", "page"]),
    totalPage() {
      return Math.ceil(this.products.length / this.limit);
    },
    currentProduct() {
      const indexOfLastList = this.page * this.limit;
      const indexOfFirstList = indexOfLastList - this.limit;
      const currentList = this.products.slice(
        indexOfFirstList,
        indexOfLastList
      );
      return currentList;
    },
  },
  data() {
    return {
      dialogFormVisible: false,
      product: {
        id: 0,
        name: "",
        image: "",
        sizes: [],
        price: null,
      },
    };
  },
  methods: {
    handleClose: function () {
      this.dialogFormVisible = false;
      this.resetproduct();
    },
    handleSubmit: function (product) {
      if (product.id === 0) {
        this.$store.dispatch("AddProduct", { ...product });
      } else {
        this.$store.dispatch("UpdateProduct", { ...product });
      }
    },
    handleEditProduct: function (product) {
      (this.product.id = product.id),
        (this.product.name = product.name),
        (this.product.image = product.image),
        (this.product.sizes = product.sizes),
        (this.product.price = product.price);
      this.dialogFormVisible = true;
    },
    handleRemoveProduct: function (id) {
      this.$confirm("Bạn có muốn xóa sản phẩm này", {
        confirmButtonText: "Xác Nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("RemoveProduct", id);
          this.$message({
            type: "success",
            message: "Sản phẩm đã được xóa",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Hủy bỏ lệnh xóa",
          });
        });
    },
    resetproduct: function () {
      this.product.id = 0;
      this.product.name = "";
      this.product.image = "";
      this.product.sizes = [];
      this.product.price = null;
    },
    handleCurrentChange: function (page) {
      this.$store.dispatch("changePage", page);
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss">
.el-container {
  width: 1000px;
  margin: 0 auto;
  flex-direction: column;

  .add-product {
    width: 180px;
    margin-bottom: 2rem;
  }

  .table__wrapper {
    width: 100%;

    table {
      width: 100%;
      border-collapse: collapse;

      thead {
        tr {
          width: 100%;
          height: 40px;

          th {
            border: 1px solid rgb(231, 225, 225);
          }
        }
      }

      tbody {
        tr {
          min-height: 80px;

          td {
            border: 1px solid rgb(231, 225, 225);
            text-align: center;
            padding: 0.25rem 0.5rem;

            &:first-child {
              width: 20%;
              img {
                width: 60px;
                height: 60px;
                margin: 0.5rem 0;
              }
            }

            &:nth-child(2) {
              width: 30%;
            }

            &:nth-child(3) {
              width: 20%;
            }

            &:nth-child(4) {
              width: 15%;
            }

            &:last-child {
              width: 15%;
            }

            .el-icon-edit {
              margin-right: 0.625rem;
              color: blue;
              font-size: 1.25rem;
              cursor: pointer;
            }

            .el-icon-delete {
              color: red;
              font-size: 1.25rem;
              cursor: pointer;
            }

            span {
              margin: 0 0.25rem;
            }
          }
        }
      }
    }

    .el-pagination {
      margin-top: 0.5rem;

      .el-pager {
        li {
          border: 1px solid #ccc;
          border-radius: 50%;
          height: 30px;
          min-width: 30px;
          padding: 0;
          margin-right: 0.25rem;
        }
      }

      button {
        border: 1px solid #ccc;
        border-radius: 50%;
        height: 30px;
        min-width: 30px;
        padding: 0;
        margin-right: 0.25rem;
      }
    }
  }

  .back {
    text-decoration: none;
    margin-top: 40px;
    color: deeppink;
    border: 1px solid deeppink;
    width: 130px;
    text-align: center;
    padding: 0.5rem 0;
    border-radius: 8px;
    transition: all 0.35s linear;

    &:hover {
      background: deeppink;
      color: #fff;
    }
  }
}
</style>