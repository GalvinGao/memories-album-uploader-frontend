<template>
  <file-pond
    ref="pond"

    :allow-multiple="true"
    :allow-revert="false"
    :allow-replace="false"
    :instant-upload="true"

    label-idle="<span class=&quot;hidden-sm-and-down&quot;>拖拽文件至此 或 </span><span class=&quot;filepond--label-action&quot;> 选择照片或视频 </span><br><span class='caption'>可上传 10GB 内的照片与视频文件；支持多选</span>"
    file-validate-type-label-expected-types="仅支持照片 (JPG, PNG, GIF) 与视频 (MP4, MOV) 文件"
    label-file-waiting-for-size="等待照片大小..."
    label-file-loading="正在加载照片..."
    label-file-load-error="无法加载照片"
    label-file-processing="正在上传..."
    label-tap-to-retry="轻点以重试"
    label-tap-to-cancel="轻点以取消"
    label-tap-to-undo="轻点以撤销"
    label-file-processing-complete="上传成功"
    label-file-processing-error="上传时出现错误"
    label-file-processing-aborted="上传已取消"
    label-button-retry-item-processing="重试"
    label-button-abort-item-processing="取消"
    label-file-type-not-allowed="不支持的文件类型"
    label-max-file-size-exceeded="文件过大"
    label-max-file-size="仅可上传最大 {filesize} 的照片文件"

    accepted-file-types="image/jpg, image/jpeg, image/png, image/gif, video/mp4, video/quicktime"
    max-file-size="10000MB"

    :server="server"
    :files="files"
  />
</template>

<script>
import axios from 'axios'

// Import Vue FilePond
import vueFilePond from 'vue-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Import image preview and file type validation plugins
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import apis from '@/utils/apis'

// Create component
const FilePond = vueFilePond(FilePondPluginFileValidateSize, FilePondPluginFileValidateType, FilePondPluginImagePreview)

export default {
  name: 'Uploader',
  components: {
    FilePond
  },
  props: {
    session: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      files: [],
      server: {
        process: (_, file, metadata, load, error, progress, abort) => {
          const cancelTokenSource = axios.CancelToken.source()
          apis.upload.initiate(file.name)
            .then(initiateResp => {
              console.debug('initiation succeeded', initiateResp)
              return apis.upload.transfer(
                file,
                initiateResp.data,
                {
                  progress: progressEvent => {
                    if (progressEvent.total > 0) {
                      progress(progressEvent.lengthComputable, progressEvent.loaded, progressEvent.total)
                    }
                  },
                  cancelToken: cancelTokenSource.token
                }
              )
                .then(transferResp => {
                  console.debug('transfer succeeded', transferResp)
                  load(initiateResp.data.filename)
                })
                .catch((err) => {
                  console.error('transfer failed', err)
                  error(err)
                })
            })
            .catch(failure => {
              console.debug('initiated failed', failure)
              error()
            })
          return {
            abort: () => {
              cancelTokenSource.cancel('用户取消了上传操作')
              abort()
            }
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
