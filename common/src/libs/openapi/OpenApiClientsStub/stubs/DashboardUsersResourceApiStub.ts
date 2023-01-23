import { DefaultApi as UserResourceResourceApi } from '@/common/openapi/dashboard/userResource'
import { ExtractApiRequest, ExtractApiResponse } from '@/common/types/openapi'
import { OpenApiResponsesMocker } from '../OpenApiResponsesMocker'

/**
 * Stubs for the dashboard demo service.
 */
export class DashboardUsersResourceApiStub extends UserResourceResourceApi {
  constructor(public mocker: OpenApiResponsesMocker) {
    super()
  }

  async usersGet(
    requestParameters: ExtractApiRequest<UserResourceResourceApi['usersGet']>
  ): Promise<ExtractApiResponse<UserResourceResourceApi['usersGet']>> {
    return this.mocker.getMockedResponse<
      ExtractApiRequest<UserResourceResourceApi['usersGet']>,
      ExtractApiResponse<UserResourceResourceApi['usersGet']>
    >('usersGet', requestParameters)
  }

  async rolesGet(
    requestParameters: ExtractApiRequest<UserResourceResourceApi['rolesGet']>
  ): Promise<ExtractApiResponse<UserResourceResourceApi['rolesGet']>> {
    return this.mocker.getMockedResponse<
      ExtractApiRequest<UserResourceResourceApi['rolesGet']>,
      ExtractApiResponse<UserResourceResourceApi['rolesGet']>
    >('rolesGet', requestParameters)
  }

  async usersUserIdRolesGet(
    requestParameters: ExtractApiRequest<
      UserResourceResourceApi['usersUserIdRolesGet']
    >
  ): Promise<
    ExtractApiResponse<UserResourceResourceApi['usersUserIdRolesGet']>
  > {
    return this.mocker.getMockedResponse<
      ExtractApiRequest<UserResourceResourceApi['usersUserIdRolesGet']>,
      ExtractApiResponse<UserResourceResourceApi['usersUserIdRolesGet']>
    >('usersUserIdRolesGet', requestParameters)
  }
}
