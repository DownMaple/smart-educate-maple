<template>
  <div class="component">
    <div class="swiper-box"  v-if="isLoading">
      <el-carousel class="swiper">
        <el-carousel-item class="swiper-item" v-for="item in banner" :key="item.id">
          <img class="swiper-img" :src="getImageUrl(item.img)" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="main-box">
      <div class="main-title">
        <div class="main-title__txt">公开课</div>
        <div class="main-title__right" @click="toCourse(0)">
          <span>了解更多</span>
          <img class="icon-right" src="../assets/img/to-right.png" alt="">
        </div>
      </div>
      <div class="main-grid">
        <div class="main-item" v-for="item in dataList1" :key="item.id" @click="nextPageTo('/courseDetail',{id:item.id}, true)">
          <div class="main-img-box">
            <img class="main-item__img" :src="getImageUrl(item.img)" alt="">
          </div>
          <div class="main-item__name">{{ item.title }}</div>
          <div class="main-item__cbs">{{ item.publishing }}</div>
        </div>
      </div>
    </div>
    <div class="main-box">
      <div class="main-title">
        <div class="main-title__txt">专业课</div>
        <div class="main-title__right" @click="toCourse(1)">
          <span>了解更多</span>
          <img class="icon-right" src="../assets/img/to-right.png" alt="">
        </div>
      </div>
      <div class="main-grid">
        <div class="main-item" v-for="item in dataList2" :key="item.id" @click="nextPageTo('/courseDetail',{id:item.id}, true)">
          <div class="main-img-box">
            <img class="main-item__img" :src="getImageUrl(item.img)" alt="">
          </div>
          <div class="main-item__name">{{ item.title }}</div>
          <div class="main-item__cbs">{{ item.publishing }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useType } from '~/composables/state'
import { getBannerListAPI, getCourseListAPI } from '~/api'
const isLoading = ref(false)
function toCourse(index) {
  const router = useRouter()
  let url = router.resolve({
    path: '/course',
    query: {
      type: index,
    },
  })
  window.open(url.href)

}

const dataList1 = ref([])
const dataList2 = ref([])
const banner = ref([])

async function init() {
  getBannerListAPI().then(bannerRes => {
    banner.value = [...bannerRes.data.list]
    setTimeout(() => {
      isLoading.value = true
    },500)
  })
  getCourseListAPI(
      0,
      '',
      '',
      '',
      1,
      8
  ).then(res => {
    dataList1.value = [...res.data.list]
  })
  getCourseListAPI(
      1,
      '',
      '',
      '',
      1,
      8
  ).then(res => {
    dataList2.value = [...res.data.list]
  })
}

function toDetail(id) {
  let url = useRouter().resolve({
    path: '/courseDetail',
    query: {
      id,
    },
  })
  window.open(url.href)
}

await init()

</script>

<style scoped lang="scss">
.swiper-box {
  width: 100%;
  height: 500px;

  .swiper {
    width: 100%;
    height: 100%;

    .swiper-item {
      width: 100%;
      height: 100%;

      .swiper-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

:deep(.el-carousel__container) {
  height: 100%;
}

:deep(.el-carousel__indicators .el-carousel__button) {
  height: 4px;
  border-radius: 2px;
  opacity: 0.8;
}

:deep(.el-carousel__indicators .is-active .el-carousel__button) {
  background-color: $test-color;
}
</style>