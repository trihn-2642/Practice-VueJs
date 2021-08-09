import {CART} from '@/Constants';
import { toastMsg } from "@/utils/toastMsg";

const state = {
    cart: JSON.parse(localStorage.getItem(CART)) || []
}

const getters = {
    cart: state => state.cart,
    count: state => state.cart.length
}

const actions = {
    addCart({commit}, cartProduct){
        commit('ADD_CART', cartProduct);
    }
}

const mutations = {
    ADD_CART(state, cartProduct){
        const {cart} = state;
        const index = cart.findIndex(c => c.id === cartProduct.id && c.size == cartProduct.size);
        if(index >= 0){
            cart[index].quantity += cartProduct.quantity;
        }else{
            cart.push(cartProduct);
        }
        localStorage.setItem(CART, JSON.stringify(cart));
        toastMsg("Đã thêm sản phẩm vào giỏ hàng", "success");
        return {...cart};
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}