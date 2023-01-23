import { HTTPHeaders } from '@/common/openapi/dashboard/userResource'

export enum HeaderKey {
  xCookie = 'x-cookie'
}

export interface IAuthenticationHeaders extends HTTPHeaders {
  [HeaderKey.xCookie]: string
}

export enum FeatureFlag {
  enableThoughtSpot = 'enableThoughtSpot'
}
