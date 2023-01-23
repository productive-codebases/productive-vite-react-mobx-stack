import { User } from '@/common/openapi/dashboard/userResource'
import {
  Role,
  RoleNameEnum
} from '@/common/openapi/dashboard/userResource/models/Role'
import { MockEntityName } from '@/mocks/types'
import { Action, MockId } from 'bouchon-reloaded'

export interface IDashboardUserMocked extends User {
  userId: string
  firstName: string
  lastName: string
  _mockId: MockId
}

export interface IDashboardRoleMocked extends Role {
  roleId: string
  name: RoleNameEnum
  _userId: string
  _mockId: MockId
}

export type StoreDashboards = {
  [MockEntityName.users]: Map<string, IDashboardUserMocked>
  [MockEntityName.roles]: Map<string, IDashboardRoleMocked>
}

export enum DashboardActionEnum {
  GetUsers = 'GetUsers',
  GetRoles = 'GetRoles',
  GetRolesByUser = 'GetRolesByUser'
}

export interface IGetUsers extends Action {
  name: DashboardActionEnum.GetUsers
}

export interface IGetRoles extends Action {
  name: DashboardActionEnum.GetRoles
}

export interface IGetRolesByUser extends Action {
  name: DashboardActionEnum.GetRolesByUser
  parameters: {
    userId: string
  }
}

export type DashboardActionUnion = IGetUsers | IGetRoles | IGetRolesByUser

export interface IDashboardActionsRecord
  extends Record<DashboardActionEnum, DashboardActionUnion> {
  [DashboardActionEnum.GetUsers]: IGetUsers
  [DashboardActionEnum.GetRoles]: IGetRoles
  [DashboardActionEnum.GetRolesByUser]: IGetRolesByUser
}
