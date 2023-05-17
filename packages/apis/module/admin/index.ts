import request from '../request'
import { AdminApi } from './typing'

export const getGithubIssueItem = (
  params: AdminApi.IGetGithubIssueItemType
) => {
  return request.get<AdminApi.GithubIssueItem[]>(
    'https://mock.mengxuegu.com/mock/645e26e87ba95d67784d6d41/abc/getlist',
    params,
    {}
  ) // 控制当前请求不显示 loading
}
