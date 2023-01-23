import { configure } from '@testing-library/dom'
import { DATA_TESTID_ATTRIBUTE } from '../react-helpers/forwardProps/constants'

configure({
  testIdAttribute: DATA_TESTID_ATTRIBUTE
})
