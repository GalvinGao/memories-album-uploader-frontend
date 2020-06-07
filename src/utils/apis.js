import service from './service'

export default {
  upload: {
    initiate (filename) {
      return service.post('/upload/initiate', {
        filename
      })
    },
    transfer (file, { policy, authorization, bucket, filename }, { progress, cancelToken }) {
      const formData = new FormData()
      formData.append('policy', policy)
      formData.append('authorization', authorization)
      formData.append('file', file, filename)

      return service({
        method: 'post',
        url: `https://v0.api.upyun.com/${bucket}`,
        timeout: 86400000, // 24 hours: 10GB file requires 115.74k/s. pretty long enough.
        data: formData, // form data
        onUploadProgress: progress,
        cancelToken
      })
    }
  }
}
