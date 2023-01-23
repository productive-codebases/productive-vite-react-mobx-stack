import { ConfigClient } from '@/common/libs/config/types'
import { IOpenApiClients } from '@/common/libs/openapi/types'
import { Maybe } from '@/common/types'
import { IFetchClient } from '../FetchClient/types'

export class Environment<
  TFetchClient extends IFetchClient = IFetchClient,
  TOpenApiClients extends IOpenApiClients = IOpenApiClients
> {
  constructor(
    readonly config: ConfigClient,
    readonly fetchClient: TFetchClient,
    readonly openApiClients: TOpenApiClients,
    readonly localStorage: Maybe<Storage>
  ) {}
}
