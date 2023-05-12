import request from '../request'
import { AdminApi } from './typing'

export const getGithubIssueItem = (
  params: AdminApi.IGetGithubIssueItemType
) => {
  return request.get<AdminApi.GithubIssueItem[]>(
    'https://proapi.azurewebsites.net/github/issues',
    params,
    {}
  ) // 控制当前请求不显示 loading
}
