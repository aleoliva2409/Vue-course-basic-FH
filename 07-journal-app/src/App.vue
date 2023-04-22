<template>
  <h1 v-if="authStatus === 'authenticating'">{{ authStatus }}</h1>
  <RouterView v-else />
</template>

<script>
import useAuth from './modules/auth/composables/useAuth';
export default {
  setup() {
    const { authStatus, checkAuthStatus } = useAuth();
    checkAuthStatus();
    return {
      authStatus,
    };
  },
};
</script>
