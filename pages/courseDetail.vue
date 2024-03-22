<template>
  <div class="component">
    <div class="banner-box"></div>
    <div class="detail-box">
      <div class="detail">
        <div class="d-up">
          <img class="d-up-img" :src="getImageUrl(data.img)" alt="">
          <div class="d-up-msg">
            <div class="d-up-msg__title">{{ data.title }}</div>
            <div class="d-up-msg-row">
              <div class="d-up-msg__left">课程老师：</div>
              <div class="d-up-msg__right">{{ data.teacherName }}</div>
            </div>
            <div class="d-up-msg-row">
              <div class="d-up-msg__left">课程类型：</div>
              <div class="d-up-msg__right">{{ data.type == 0 ? '公开课' : '专业课' }}</div>
            </div>
            <div class="d-up-msg-row">
              <div class="d-up-msg__left">课时：</div>
              <div class="d-up-msg__right">{{data.hourse}}课时</div>
            </div>
            <div class="d-up-msg-row">
              <div class="d-up-msg__left">学科：</div>
              <div class="d-up-msg__right">{{ data.subject }}</div>
            </div>
            <div class="d-up-msg-row">
              <div class="d-up-msg__left">教材：</div>
              <div class="d-up-msg__right">《{{data.businessBookTitle}}》</div>
            </div>
            <div class="d-up-msg-row">
              <div class="d-up-msg__left">出版社：</div>
              <div class="d-up-msg__right">{{ data.publishing }}</div>
            </div>
            <div class="d-up-msg-row">
              <div class="d-up-msg__left">出版日期：</div>
              <div class="d-up-msg__right">{{ data.publishingTime }}</div>
            </div>
            <div class="d-up-msg-row">
              <div class="d-up-msg__left">课程附件：</div>
              <div class="d-up-msg__right" v-if="fileList && fileList.length > 0">
                <a class="d-up-msg__right__p" v-for="(item,index) in fileList" :key="index" :href="getImageUrl(item.path)" target="_blank">{{ item.name }}</a>
              </div>
              <div class="d-up-msg__right" v-else>暂未上传 </div>
            </div>
          </div>
        </div>
        <div class="d-down">
          <div class="d-down-title">课程介绍</div>
          <div class="d-rich" v-html="data.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCourseDetailAPI } from '~/api'
import {useToken} from "~/composables/state";
import {ElMessageBox} from "element-plus";

const route = useRoute()
const id = route.query.id //拿到传递参数
const data = ref({})
const fileList = ref()
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
  const res = await getCourseDetailAPI(id)
  console.log(res)
  if (res.code == 200) {
    data.value = res.data
    data.value.content = data.value.content.replace(/<p/g,'<p class="rich-p"').replace(/<img/g,'<img class="rich-img"').replace(/src="[^http|^https]/g, 'src="' + config.baseFileURL)
    fileList.value = res.data.book.sysAttachmentList ?? []
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

    .d-up {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      margin-bottom: 30px;

      .d-up-img {
        width: 600px;
        height: auto;
        object-fit: cover;
        margin-right: 35px;
        flex-shrink: 0;
      }

      .d-up-msg {
        flex: 1;

        .d-up-msg__title {
          font-size: 20px;
          font-weight: bold;
          color: $test-color-title;
          margin-bottom: 15px;
        }

        .d-up-msg-row {
          display: flex;
          flex-direction: row;
          padding: 10px 0;

          .d-up-msg__left {
            color: #999;
            width: 100px;
            flex-shrink: 0;
          }

          .d-up-msg__right {
            color: $test-color-title;
            flex: 1;
            .d-up-msg__right__p {
              display: block;
              margin-bottom: 10px;
              color: #3872F6;
            }
          }
        }
      }
    }

    .d-down {
      .d-down-title {
        font-size: 20px;
        font-weight: bold;
        color: $test-color-title;
      }
      .d-rich {
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
}
</style>