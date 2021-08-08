<template>
  <el-dialog :visible.sync="isOpen">
    <h5 v-if="product.id !== 0">Cập Nhật Sản Phẩm</h5>
    <h5 v-else>Thêm Sản Phẩm</h5>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Id" prop="name" v-if="ruleForm.id !== 0">
        <el-input v-model="ruleForm.id" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="Tên Sản Phẩm" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Hình Ảnh" prop="image">
        <el-input v-model.number="ruleForm.image"></el-input>
      </el-form-item>
      <el-form-item label="Số Tiền" prop="price">
        <el-input v-model.number="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="Kích Thước" prop="sizes">
        <el-checkbox-group v-model="ruleForm.sizes">
          <el-checkbox label="S" name="sizes"></el-checkbox>
          <el-checkbox label="M" name="sizes"></el-checkbox>
          <el-checkbox label="L" name="sizes"></el-checkbox>
          <el-checkbox label="XL" name="sizes"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item class="btn">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          v-if="ruleForm.id === 0"
        >
          Thêm
        </el-button>
        <el-button type="success" @click="submitForm('ruleForm')" v-else>
          Cập nhật
        </el-button>
        <el-button @click="resetForm('ruleForm')" v-if="ruleForm.id === 0">
          Đặt Lại
        </el-button>
        <el-button type="danger" @click="changeIsOpen()"> Hủy </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    product: Object,
    handleClose: Function,
    handleSubmit: Function,
  },

  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Trường này không được để trống"));
      }
      setTimeout(() => {
        if (value.length < 6) {
          callback(new Error("Trường này không ít hơn 6 kí tự"));
        } else {
          callback();
        }
      }, 1000);
    };

    const checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Trường này không được để trống"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("Trường này là một số"));
        } else {
          if (value < 1000) {
            callback(new Error("Số tiền không thể ít hơn 1000đ"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    const checkImage = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("Trường này không được để trống"));
      } else {
        callback();
      }
    };

    const { id, name, image, sizes, price } = this.product;
    return {
      isOpen: this.open,
      ruleForm: {
        id,
        name,
        image,
        sizes,
        price,
      },
      rules: {
        name: [{ validator: checkName, trigger: "blur" }],
        price: [{ validator: checkPrice, trigger: "blur" }],
        sizes: [
          {
            type: "array",
            required: true,
            message: "Chọn ít nhất 1 loại kích thước",
            trigger: "change",
          },
        ],
        image: [{ validator: checkImage, trigger: "blur" }],
      },
    };
  },
  watch: {
    open: function (val) {
      this.isOpen = val;
    },

    isOpen: function (val) {
      if (!val) {
        this.changeIsOpen();
      }
    },

    product: function (val) {
      const { id, name, image, sizes, price } = { ...val };
      this.ruleForm.id = id;
      this.ruleForm.name = name;
      this.ruleForm.image = image;
      this.ruleForm.sizes = sizes;
      this.ruleForm.price = price;
    },
  },
  methods: {
    changeIsOpen: function () {
      this.$emit("handleClose");
      this.resetForm("ruleForm");
    },
    submitForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("handleSubmit", { ...this.ruleForm });
          this.changeIsOpen();
        } else {
          return false;
        }
      });
    },
    resetForm: function (formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss">
.el-dialog__header {
  padding: 0;
}
.el-dialog__body {
  h5 {
    margin-top: 0;
    font-size: 1.25rem;
    color: rgb(137, 194, 247);
    text-align: center;
  }
}
.close {
  background: #fff;
  border: 0;
  cursor: pointer;
  font-size: 1.25rem;
  color: #909399;
  position: absolute;
  top: 20px;
  right: 20px;
}
label {
  &::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
.el-checkbox-group {
  label {
    &::before {
      display: none;
    }
  }
}

.btn {
  margin-top: 2rem;
}
</style>