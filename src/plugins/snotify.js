import Vue from 'vue'
import Snotify from 'vue-snotify';
import 'vue-snotify/styles/material.css';

const toastOptions = {
  toast: {
    position: "rightTop",
    showProgressBar: false,
    timeout: 3000
  }
}

Vue.use(Snotify, toastOptions);