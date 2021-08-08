import Vue from "vue";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

Vue.use(VueToast);

export const toastMsg = (msg, type) => {
    Vue.$toast.open({
        position: 'top-right',
        message: msg,
        type: type, 
        duration: 2000,
    });
}   