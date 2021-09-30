import store from '@/store';
export default {
  methods: {
    notifyErrors: function(adapter) {
      const html = `<div class="snotifyToast__title driver-notification">Error!</div>
          <div class="snotifyToast__body error-msg">${adapter.response.data.message}</div>
          <div class="snotify-icon snotify-icon--error"></div>`;
      this.$snotify.html(html, { type: 'error' });
      if (adapter.response.status == 401) {
        store.dispatch('auth/setTokenExpired', true);
      }
    }
  }
};