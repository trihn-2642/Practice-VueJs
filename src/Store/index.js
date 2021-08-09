import Vue from 'vue'
import Vuex from 'vuex'

import productsManage from './Modules/productsManage';
import paginate from './Modules/paginate';
import cart from './Modules/cart';

Vue.use(Vuex)

const storeData = {
        modules: {
                productsManage,
                paginate,
                cart
	}
}

const store = new Vuex.Store(storeData)

export default store