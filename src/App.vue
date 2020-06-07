<template>
  <v-app>
    <v-content class="transparent">
      <Background />
      <v-container class="transparent">
        <v-row align="start" justify="center">
          <v-col cols="12">
            <v-img
              position="center center"
              src="https://school.upyun.galvincdn.com/me.png"
              aspect-ratio="1"
              height="96px"
              width="128px"
              class="my-4 mx-auto"
            />

            <h2 class="overline font-weight-bold text-center z-index-fix">
              services # uploader
            </h2>
            <h1 class="heading text-center z-index-fix">
              照片与视频上传
            </h1>

            <v-alert border="left" type="info" color="blue lighten-2" class="mt-4 mb-2" outlined>
              支持上传 10GB 以内的 JPG, PNG 与 GIF 格式的照片、以及 MP4, MOV 格式的视频。若遇文件格式不支持或上传失败等问题，请联系 Galvin。
            </v-alert>

            <v-alert border="left" type="info" color="pink lighten-2" class="mt-4 mb-2" outlined icon="mdi-heart">
              感谢贡献
            </v-alert>
          </v-col>

          <v-col cols="12">
            <Uploader :session="session" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer color="transparent" class="white--text text-center">
      <v-card-text class="white--text pb-0">
        <strong>Galvin</strong>
        —
        <strong>{{ year }}</strong>
      </v-card-text>
      <v-card-text class="white--text pt-1">
        会话识别符
        <strong class="monospace">{{session}}</strong>
      </v-card-text>
    </v-footer>
  </v-app>
</template>

<script>
import Background from './components/Background'
import { v4 as uuidv4 } from 'uuid'
import Uploader from './components/Uploader'

export default {
  name: 'App',
  components: { Uploader, Background },

  data () {
    return {
      session: ''
    }
  },

  created () {
    this.session = uuidv4()
  },

  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style>
  .monospace {
    font-family: "Roboto Mono", "Fira Code", "Roboto", sans-serif;
    font-weight: 500;
  }
  .monospace .normal {
    font-size: 20px
  }
  .monospace .emphasize{
    letter-spacing: -.15rem;
    text-shadow: 0 0 10px rgba(0, 0, 0, .5);
  }
  .monospace .wide {
    letter-spacing: 0 !important;
  }

  .locale-switcher {
    position: fixed !important;
    right: 1em !important;
    top: 1em !important;
    z-index: 99999999;
  }

  .z-index-fix {
    z-index: 5 !important;
  }

  .v-application, .v-application--wrap {
    background: transparent !important;
  }

  .card-background {
    background: rgba(20, 20, 20, .8) !important;
  }

  .theme--dark.v-sheet.v-alert {
    background: rgba(0, 0, 0, .7) !important;
  }
</style>
