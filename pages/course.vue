<template>
  <div class="component">
    <div class="banner-box">
      <div class="banner-filter">
        <div class="banner-row">
          <div class="banner-row__title">课程类型:</div>
          <div class="banner-row-xxk">
            <el-button class="banner-xxk-item" @click="courseTypeSelect(0)" :class="type == 0?' banner-xxk-act':''">公共课</el-button>
            <el-button class="banner-xxk-item" @click="courseTypeSelect(1)" :class="type == 1?' banner-xxk-act':''">专业课</el-button>
          </div>
        </div>
        <div class="banner-row" v-if="type == 0">
          <div class="banner-row__title">学科:</div>
          <div class="banner-row-xxk">
            <el-button class="banner-xxk-item"  :class="subjectIndex == -1?' banner-xxk-act':''"  @click="selectSubject(-1)">全部</el-button>
            <el-button class="banner-xxk-item" v-for="(item,index) in subjectList" :key="item.id" @click="selectSubject(index)" :class="subjectIndex == index?' banner-xxk-act':''">
              {{ item.title }}</el-button>
          </div>
        </div>
        <div class="banner-row" v-if="type == 1">
          <div class="banner-row__title">院校:</div>
          <div class="banner-row-xxk">
            <el-button class="banner-xxk-item"  :class="deptIndex == -1?' banner-xxk-act':''"  @click="selectDept(-1)">全部</el-button>
            <el-button class="banner-xxk-item" v-for="(item,index) in deptList" :key="item.id" @click="selectDept(index)" :class="deptIndex == index?' banner-xxk-act':''">
              {{ item.title }}</el-button>
          </div>
        </div>
        <div class="banner-row" v-if="type == 1">
          <div class="banner-row__title">专业:</div>
          <div class="banner-row-xxk">
            <el-button class="banner-xxk-item"  :class="majorIndex == -1?' banner-xxk-act':''"  @click="selectMajor(-1)">全部</el-button>
            <el-button class="banner-xxk-item" v-for="(item,index) in majorList" :key="item.id" @click="selectMajor(index)" :class="majorIndex == index?' banner-xxk-act':''">
              {{ item.title }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-empty description="暂无课程" v-show="dataList.length === 0"/>
    <div class="main-box">
      <div class="main-grid">
        <div class="main-item"  v-for="item in dataList" :key="item.id" @click="nextPageTo('/courseDetail',{id:item.id}, true)">
          <div class="main-img-box">
            <img class="main-item__img" :src="getImageUrl(item.img)" alt="">
          </div>
          <div class="main-item__name">{{ item.title }}</div>
          <div class="main-item__cbs">{{ item.publishing }}</div>
        </div>
      </div>
      <div class="main-page">
        <el-pagination
            v-model:current-page="pageNum"
            v-model:page-size="pageSize"
            layout="total,  prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

import { getCourseListAPI, getDictionaryAPI } from '~/api'
import { getImageUrl } from '~/utils/index.js'
import { useType } from '~/composables/state'
import { ElLoading } from 'element-plus'


// 课程类型
const type = ref(0)
const route = useRoute()
type.value =  route.query.type ?? 0 //拿到传递参数
function courseTypeSelect(index) {
  if (type.value != index) {
    if(index == 0) {
      majorIndex.value = -1
      deptIndex.value = -1
    } else if(index == 1) {
      subjectIndex.value = -1
    }
    type.value = index
    init()
  }
}

// 学科
const subjectList = ref([])
const subjectIndex = ref(-1)
async function initSubject() {
  const res = await getDictionaryAPI('Subject')
  subjectList.value = [...res.data]
}
function selectSubject(index) {
  if (subjectIndex.value != index) {
    subjectIndex.value = index
    init()
  }
}

// 专业
const majorList = ref([])
const majorIndex = ref(-1)
async function initMajor() {
  const res = await getDictionaryAPI('major')
  majorList.value = [...res.data]
}
function selectMajor(index) {
  if (majorIndex.value != index) {
    majorIndex.value = index
    init()
  }
}
// 专业
const deptList = ref([])
const deptIndex = ref(-1)
async function initDept() {
  const res = await getDictionaryAPI('department')
  deptList.value = [...res.data]
}
function selectDept(index) {
  if (deptIndex.value != index) {
    deptIndex.value = index
    init()
  }
}
// 分页
const pageNum = ref(1)
const pageSize = ref(16)
const total = ref(0)

const handleCurrentChange = (val) => {
  pageNum.value = val
  init()
}
const dataList = ref([])
const indexNum = ref(0)
async function init() {
  let loading
  if(indexNum.value != 0) {
    loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    })
  }
  const res = await getCourseListAPI(
      type.value,
      subjectIndex.value >= 0 ? subjectList.value[subjectIndex.value].title : '',
      majorIndex.value >= 0 ? majorList.value[majorIndex.value].title : '',
      deptIndex.value >= 0 ? deptList.value[deptIndex.value].title : '',
      pageNum.value,
      pageSize.value
  )
  if(loading) {
    setTimeout(() => {
      loading.close()
    }, 100)
  }

  if (res.code == 200) {
    total.value = res.data.totalCount
    dataList.value = [...res.data.list]
    indexNum.value = 1
  }
}

await initMajor()
await initSubject()
await initDept()
await init()
function toDetail(id) {
  let url = useRouter().resolve({
    path: '/courseDetail',
    query: {
      id,
    },
  })
  window.open(url.href)
}
</script>

<style scoped lang="scss">
.main-box {
  padding-bottom: 0;
}
.banner-box {
  width: 100%;
  height: 500px;
  position: relative;
  background-color: #F5F5F5;
  background-image: url("../assets/img/banner.png");
  background-size: 100% 400px;
  background-position: center top;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  .banner-filter {
    width: 1260px;
    height: auto;
    padding: 30px 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 12px 3px rgba(0,0,0,0.07);
    margin-bottom: 30px;
    .banner-row {
      display: flex;
      flex-direction: row;
      margin-bottom: 20px;
      .banner-row__title {
        width: 100px;
        line-height: 41px;
        flex-shrink: 0;
      }
      .banner-row-xxk {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .banner-xxk-item {
          width: auto;
          min-width: 80px;
          padding: 5px 15px;
          border: 1px solid #f2f2f2;
          margin-right: 15px;
          text-align: center;
          border-radius: 5px;
          line-height: 30px;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .banner-xxk-act {
          color: #fff;
          background-color: $test-color;
          border-color: $test-color;
        }
      }
    }
    .banner-row:last-child {
      margin-bottom: 0;
    }
  }
}
.component {
  background-color: #F5F5F5;
}
</style>