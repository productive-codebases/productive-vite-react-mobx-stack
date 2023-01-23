import { ServiceName } from '@/common/configuration/types'
import { MockId } from 'bouchon-reloaded'
import { MaybeUndef } from 'bouchon-reloaded/dist/types/libs/types'

export interface IMockIdRelation {
  mockId: MockId
  parentMockId: MaybeUndef<MockId>
}

export type IMockedAllData = Partial<
  Record<
    ServiceName,
    {
      filePath: string
      data: any
    }
  >
>
