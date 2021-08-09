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
    },
    changeQuantity({commit}, payload){
        commit('CHANGE_QUANTITY', payload);
    },
    removeProductInCart({commit}, index){
        commit('REMOVE_PRODUCT_IN_CART', index);
    },
    pay({commit}){
        commit('PAY');
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
    },
    CHANGE_QUANTITY(state, payload){
        const {index, quantity} = payload;
        const {cart} = state;
        const newCart = cart.map((c, i )=> {
            if(i === index){
                return {
                    ...c,
                    quantity
                }
            }else{
                return c;
            }
        })
        localStorage.setItem(CART, JSON.stringify(newCart));
        return {...newCart};
    },
    REMOVE_PRODUCT_IN_CART(state, index){
        const {cart} = state;
        const checkIndex = cart.some((c,i) => i === index);
        if(checkIndex){
            cart.splice(index, 1);     
        }
        localStorage.setItem(CART, JSON.stringify(cart));
        return {...cart};
    },
    PAY(state){
        state.cart = [];
        localStorage.removeItem(CART);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}