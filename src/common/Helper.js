import reqwest from 'reqwest'
import { message } from 'antd'

const Helper = {
	host: 'http://meilong.herigbit.com:9080',
  duration: 1.5,
  message: '提示',
  description: '操作成功',
  notificationSuccess: function() {
    message.success(this.description, this.duration)
  },
	ajax: function(config) {
    reqwest({
      url: this.host + config.url,
      type: 'json',
      method: 'GET',
      success: function (response) {
        if(response.status == 0) {
          config.success(response.data)
        } else {
          message.error(response.message, this.duration)
        }
      },
      error: function (error) {
        message.error('网络发生错误', this.duration)
      },
      complete: function (response) {
        config.complete()
      }
    })
	}
}

export default Helper