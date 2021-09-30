import Vue from 'vue';
export default {
  update: function(el, binding, vnode, oldVnode) {
    el.loader.hide();
    if(binding.value) {
      el.loader = Vue.$loading.show({
        container: el,
        transition: 'none'
      });
    } else {
      el.loader.hide()
    }
  },
  bind: function(el, binding, vnode) {
    el.loader = Vue.$loading.show({
      container: el
    });
  }
};