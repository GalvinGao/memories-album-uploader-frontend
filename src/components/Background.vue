<template>
  <v-img
    src="https://penguin.upyun.galvincdn.com/backgrounds/choose-mirror.jpg"
    height="100vh"
    width="100vw"
    class="background"
    gradient="to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 25%, rgba(0, 0, 0, 0) 100%"

    transition="fade-transition"
  />

</template>

<script>
export default {
  name: 'Background'
}
</script>

<style scoped>
  .background {
    position: fixed;
    height: 100vh;
    width: 100vw;
    z-index: -1;
    filter: blur(0px);
  }
</style>
