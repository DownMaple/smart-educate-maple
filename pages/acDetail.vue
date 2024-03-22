<template>
  <div class="component">
    <div class="banner-box"></div>
    <div class="detail-box">
      <div class="detail">
        <div class="dm__title">{{data.title}}</div>
        <div class="dm__time">{{data.createTime}}</div>
        <div class="d-rich" v-html="data.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getArticleDetailAPI } from '~/api'
import {useToken} from "~/composables/state";
import {ElMessageBox} from "element-plus";

const route = useRoute()
const id = route.query.id //拿到传递参数
const data = ref({})

async function init() {

  if (!useToken().value) {
    ElMessageBox.confirm('该功能使用需要登录', '是否前往登录', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      window.open('http://admin.qitianxinxi.com/login')
    })
    return false;
  }

  const res = await getArticleDetailAPI(id)
  if (res.code == 200) {
    data.value = res.data
    data.value.content = data.value.content.replace(/<p/g,'<p class="rich-p"').replace(/<img/g,'<img class="rich-img"').replace(/src="[^http|^https]/g, 'src="' + config.baseFileURL)

  }
}

await init()
</script>

<style scoped lang="scss">
.banner-box {
  width: 100%;
  height: 400px;
  position: relative;
  background-image: url("../assets/img/banner02.png");
  background-size: 100% 400px;
  background-position: center top;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.component {
  background-color: #F5F5F5;
}

.detail-box {
  width: 1300px;
  margin: 0 auto;
  padding: 30px 0;

  .detail {
    width: 1200px;
    height: auto;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
    .dm__title {
      font-size: 20px;
      font-weight: bold;
      color: $test-color-title;
      margin-bottom: 15px;
      text-align: center;
    }
    .dm__time {
      font-size: 14px;
      color: #999;
      text-align: center;
      margin-bottom: 15px;
    }
    .d-rich {
      width: 100%;
      border-top: 1px solid #f2f2f2;
      padding-top: 15px;
      p {
        font-size: 16px;
        line-height: 28px;
      }
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
        margin: 10px auto;
      }
    }
  }
}
</style>