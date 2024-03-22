import { config } from '~/utils/config.js'
import { ElMessageBox } from 'element-plus'
import { useToken } from '~/composables/state'

export function getImageUrl(url = '') {
  return url != '' ? config.baseFileURL + url : ''
}

export function nextPageTo(urlStr,data = {}, is = false) {
  if (is) {
    if (useToken().value) {
      let url = useRouter().resolve({
        path: urlStr,
        query: data,
      })
      window.open(url.href)
    } else {
      ElMessageBox.confirm('该功能使用需要登录', '是否前往登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        window.open('http://admin.qitianxinxi.com/login')
      })
    }
  }
  
}