import Vue from 'vue'
import Vuex from 'vuex'

import productsManage from './Modules/productsManage';
import paginate from './Modules/paginate';

Vue.use(Vuex)

const storeData = {
        modules: {
                productsManage,
                paginate
	}
}

const store = new Vuex.Store(storeData)

export default store