<template>
  <div class="container">
    <div class="header">
      <div class="header-main">
        <div class="header-logo">
          <img class="header-logo__img" src="./assets/img/school.png" alt="学校logo">
        </div>
        <div class="header-nav">
          <div class="header-item">
            <NuxtLink :class="navIndex === 0 ? 'navs-act':''" to="/"  target="_blank">首页</NuxtLink>
          </div>
          <div class="header-item">
            <NuxtLink :class="navIndex === 1 ? 'navs-act':''"  to="/course"  target="_blank">课程中心</NuxtLink>
          </div>
          <div class="header-item">
            <NuxtLink :class="navIndex === 2 ? 'navs-act':''"  to="/announcements"  target="_blank">公告通知</NuxtLink>
          </div>
        </div>
        <div class="header-right">
          <!--这里跳转到 后台管理系统登录了-->
          <div class="header-right-btn" v-if="!userMsg.id"><NuxtLink to="http://localhost/login" target="_blank">登录</NuxtLink></div>
          <div class="header-right-user" v-else>
            <div class="header-up-right__user" @click="toSystem">
              <el-avatar :src="getImageUrl(userMsg.photo)"/>
              <p>{{ userMsg?.nickname || userMsg.username }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container">
      <div class="main">
        <NuxtPage></NuxtPage>
      </div>
      <div class="footer-box">
        <div class="footer">
          <div class="footer-logo">
            <img class="footer-logo__img" src="./assets/img/school.png" alt="学校logo">
          </div>
          <div class="footer-row">
            <div class="footer-item">
              <div class="footer-item__txt" v-html=" pageData.address || '学校地址' "></div>
              <div class="footer-item__txt">学校地址</div>
            </div>
            <div class="footer-item">
              <div class="footer-item__txt" v-html="pageData.phone || '学校电话'"></div>
              <div class="footer-item__txt">学校电话</div>
            </div>
            <div class="footer-item">
              <div class="footer-item__txt" v-html="pageData.email || '学校邮箱'"></div>
              <div class="footer-item__txt">Email</div>
            </div>
            <div class="footer-item">
              <NuxtLink class="footer-item__a" to="/otherDetail?id=protocol"  target="_blank">查看协议内容</NuxtLink>
              <div class="footer-item__txt">用户协议</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup >
import { getDictionaryOneAPI, getUserMsgAPI } from '~/api'
import { useToken } from '~/composables/state'

const navIndex = ref(0)
// 路由切换
const router = useRouter()
router.beforeEach((res) => {
  switch (res.name) {
    case 'index':navIndex.value = 0;break
    case 'course':navIndex.value = 1;break
    case 'courseDetail':navIndex.value = 1;break
    case 'announcements':navIndex.value = 2;break
    case 'acDetail':navIndex.value = 2;break
    case 'otherDetail':navIndex.value = 2;break
  }
})

const userMsg = ref({})
const pageData = ref({
  address:'',
  phone:'',
  email:''
})
// 刷新页面
function init() {
  switch (router.currentRoute.value.name) {
    case 'index':navIndex.value = 0;break
    case 'course':navIndex.value = 1;break
    case 'courseDetail':navIndex.value = 1;break
    case 'announcements':navIndex.value = 2;break
    case 'acDetail':navIndex.value = 2;break
    case 'otherDetail':navIndex.value = 2;break
  }
  const cookie = useCookie('indexToken')
  // console.log(cookie)
  if (cookie.value) {
    useToken().value = cookie.value
    getUserMsgAPI().then((res) => {
      if (res.code == 200) {
        userMsg.value = res.data.userMsg
      }
    })
  }
  getDictionaryOneAPI('address').then(res => {pageData.value.address = res.data.remark})
  getDictionaryOneAPI('phone').then(res => {pageData.value.phone = res.data.remark})
  getDictionaryOneAPI('email').then(res => {pageData.value.email = res.data.remark})
}
await init()

function toSystem() {
  window.open('http://8.142.175.32:80/index', '_self')
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  min-width: 1300px;
  display: flex;
  flex-direction: column;;
  overflow-x: auto;
  overflow-y: hidden;
  .header {
    width: 100%;
    height: 100px;
    flex-shrink: 0;
    background-color: #fff;
    position: relative;
    box-shadow: 0 0 12px 3px rgba(0,0,0,0.07);
    .header-main {
      width: 1300px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      .header-logo {
        width: auto;
        height: 80px;
        margin-right: 100px;
        flex-shrink: 0;
        .header-logo__img {
          width: auto;
          height: 100%;
        }
      }
      .header-nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;
        .header-item {
          margin-right: 100px;
          .navs-act {
            color: $test-color;
          }
        }
        .header-item:hover {
          color: $test-color;
        }
      }
    }
    .header-right {
      margin-left: 100px;
      flex-shrink: 0;
      .header-right-btn {
        width: auto;
        height: auto;
        padding: 4px 15px;
        color: #fff;
        background-color: $test-color;
        border-radius: 5px;
        font-size: $font-size-sm;
      }
      .header-up-right__user {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 5px;
        height: 49px;
        cursor: pointer;
        margin: 0 10px;

        p {
          margin-left: 5px;
        }
      }
    }
  }
  .main-container {
    width: 100%;
    flex: 1;
    overflow: auto;
    .footer-box {
      width: 100%;
      height: auto;
      padding: 60px 0;
      background-color: #F0EFF2;
    }
    .footer {
      width: 1300px;
      height: auto;
      margin: 0 auto;
      .footer-logo {
        display: flex;
        justify-content: center;
        .footer-logo__img {
          width: auto;
          height: 110px;
        }
      }
      .footer-row {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
        .footer-item {
          flex: 1;
          border-right: 2px solid #E1E1E3;
          display: flex;
          align-items: center;
          flex-direction: column;
          font-size: $font-size-sm;
          color: #666;
          .footer-item__txt {
            margin-bottom: 25px;
          }
          .footer-item__txt:last-child {
            margin-bottom: 0;
            color: #999;
          }
          .footer-item__a {
            color: $test-color;
            margin-bottom: 25px;
            cursor: pointer;
          }
        }
        .footer-item:last-child {
          border-right: 0;
        }
      }
    }
  }
}
</style>
