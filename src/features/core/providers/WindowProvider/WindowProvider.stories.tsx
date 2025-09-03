import type { Meta, StoryObj } from '@storybook/react';
import { WindowContext, WindowProvider } from './WindowProvider';
import { MantineProvider } from '@mantine/core';
import { theme } from '@shared/utils';

const meta: Meta<typeof WindowProvider> = {
  title: 'features/core/providers/WindowProvider',
  component: WindowProvider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MantineProvider theme={theme}>
        <WindowProvider>
          <Story />
        </WindowProvider>
      </MantineProvider>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof WindowProvider>;

export const Default: Story = {
  render: () => (
    <WindowContext.Consumer>
      {windowFlags => (
        <>
          <div>stric: {JSON.stringify(windowFlags.strict)}</div>
          <div>lessThan: {JSON.stringify(windowFlags.lessThan)}</div>
          <div>moreThan: {JSON.stringify(windowFlags.moreThan)}</div>
        </>
      )}
    </WindowContext.Consumer>
  )
};
