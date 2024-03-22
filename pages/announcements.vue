<template>
  <div class="component">
    <div class="banner-box">

    </div>
    <div class="main-box">
      <div class="main-row" v-for="item in dataList" :key="item.id" @click="nextPageTo('/acDetail',{id:item.id}, true)">
        <div class="main-row__name">{{ item.title }}</div>
        <div class="main-row__time">发布时间：{{ item.createTime }}</div>
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
// 分页
import { getArticleListAPI } from '~/api'

const pageNum = ref(1)
const pageSize = ref(20)
const total = ref(0)

const handleCurrentChange = (val) => {
  pageNum.value = val
  init()
}
const dataList = ref([])
async function init() {
  const res = await getArticleListAPI(pageNum.value,20)
  if (res.code == 200) {
    total.value = res.data.totalCount
    dataList.value = [...res.data.list]
  }
}
await init()

</script>

<style scoped lang="scss">
.main-box {
  padding-bottom: 0;
  padding-top: 40px;
  .main-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 20px;
    cursor: pointer;
    box-shadow: 0 0 12px 3px rgba(0,0,0,0.07);
    .main-row__name {
      color: $test-color-title;
      flex: 1;
      margin-right: 15px;
    }
    .main-row__time {
      color: #999;
      flex-shrink: 0;
    }
  }
}
.banner-box {
  width: 100%;
  height: 400px;
  position: relative;
  background-image: url("../assets/img/banner.png");
  background-size: 100% 400px;
  background-position: center top;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
</style>