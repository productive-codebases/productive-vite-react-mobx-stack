/**
 * @jest-environment jsdom
 */

import AppTestContainer from '@/client/libs/tests-helpers/AppTestContainer'
import '@testing-library/jest-dom'
import { render, waitFor, screen } from '@testing-library/react'
import ContainerFlex from '.'

describe('<ContainerFlex />', () => {
  it('should render', async () => {
    const Component = (
      <AppTestContainer>
        <ContainerFlex name="Component" data-testid="component">
          This is the content
        </ContainerFlex>
      </AppTestContainer>
    )
    render(Component)
    await waitFor(() => screen.getByTestId('component'))
  })
})
