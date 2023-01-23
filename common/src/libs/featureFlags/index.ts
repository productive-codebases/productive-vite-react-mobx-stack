export interface IFeatureFlag {
  name: string
  enabled: boolean
}

/**
 * Feature flags exposed by LaunchDarkly.
 */
export enum FeatureFlag {
  'my-feature-flag' = 'my-feature-flag'
}
