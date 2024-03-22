import { useDefaultRequest } from '~/composables/useDefaultRequest'

/**
 * 登录
 * @param {string} username
 * @param {string} password
 * @returns {Promise<unknown>}
 */
export const getLoginAPI = (username:string,password:string) => {
  return useDefaultRequest.post('system/auth/login', {username,password})
}

/**
 * 获取父字典
 * @param code
 */
export const getDictionaryAPI = (code = '') => {
  return useDefaultRequest.get('system/sysDict/queryAll?parentCode=' + code )
}



/**
 * 获取课程列表
 * @param type
 * @param major
 * @param subject
 * @param department
 * @param pageNum
 * @param pageSize
 */
export const getCourseListAPI = (
  type = 0,
  subject = '',
  major = '',
  department = '',
  pageNum = 1,
  pageSize = 10
) => {
  return useDefaultRequest.get('business/businessCourse/list', {
    type,
    subject,
    major,
    department,
    pageNum,
    pageSize
  })
}

/**
 * 获取文章列表
 * @param {number} pageNum
 * @param {number} pageSize
 * @returns {Promise<unknown>}
 */
export const getArticleListAPI = ( pageNum: number = 1,
                                   pageSize: number = 10): Promise<unknown> => {
  return useDefaultRequest.get('cms/article/list', {
    state:1,
    pageNum,
    pageSize
  })
}

/**
 * 获取课程详情
 * @returns {Promise<unknown>}
 * @param id
 */
export const getCourseDetailAPI = (id:string) => {
  return useDefaultRequest.get('business/businessCourse/getOne', { id })
}

/**
 * 获取文章详情
 * @returns {Promise<unknown>}
 * @param id
 */
export const getArticleDetailAPI = (id:string) => {
  return useDefaultRequest.post('cms/article/getOne', { id })
}

/**
 * 获取文章详情
 * @returns {Promise<unknown>}
 */
export const getBannerListAPI = () => {
  return useDefaultRequest.get('cms/cmsBanner/list', {state:1})
}


/**
 * 获取单个字典
 * @param code
 */
export const getDictionaryOneAPI = (code = '') => {
  return useDefaultRequest.get('system/sysDict/getOneByCode' , { code:code })
}

/**
 * 获取用户信息
 * @param id
 */
export const getUserMsgAPI = () => {
  return useDefaultRequest.get('system/admin/userMsg')
}