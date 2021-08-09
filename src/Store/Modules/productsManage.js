import {PRODUCTS} from '@/Constants';
import { toastMsg } from "@/utils/toastMsg";

const state = {
    products: JSON.parse(localStorage.getItem(PRODUCTS)) || []
}

const getters = {
    products: state => state.products.sort((a,b)=> b.id - a.id),
}

const actions = {
    AddProduct({commit}, product){
        commit('ADD_PRODUCT', product);
    },
    UpdateProduct({commit}, product){
        commit('UPDATE_PRODUCT', product);
    },
    RemoveProduct({commit}, id){
        commit('REMOVE_PRODUCT', id);
    }
}

const mutations = {
    ADD_PRODUCT(state, product){
        const {products} = state;
        if(products.length > 0){
            product.id = products[0].id + 1;
        }else{
            product.id = 1
        }
        products.unshift(product);
        localStorage.setItem(PRODUCTS, JSON.stringify(products));
        toastMsg("Thêm sản phẩm thành công", "success");
        return {...products}
    },
    UPDATE_PRODUCT(state, product){
        const {products} = state;
        const productFind = products.find(p => p.id === product.id);
        if(productFind){
            productFind.name = product.name;
            productFind.image = product.image;
            productFind.price = product.price;
            productFind.sizes = product.sizes;

            localStorage.setItem(PRODUCTS, JSON.stringify(products));
            toastMsg("Cập nhật sản phẩm thành công", "success");
        }
        return {...products}
    },
    REMOVE_PRODUCT(state, id){
        const {products} = state;
        const index = products.findIndex(p => p.id === id);
        products.splice(index, 1);
        localStorage.setItem(PRODUCTS, JSON.stringify(products));
        return {...products}
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}