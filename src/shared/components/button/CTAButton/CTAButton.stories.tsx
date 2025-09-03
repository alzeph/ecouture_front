import type { Meta, StoryObj } from '@storybook/react';
import { CTAButton } from './CTAButton';

const meta: Meta<typeof CTAButton> = {
  title: 'shared/components/button/CTAButton',
  component: CTAButton,
};

export default meta;
type Story = StoryObj<typeof CTAButton>;

export const Default: Story = {
  render: (args) => <div style={{ padding: '1em' }}><CTAButton {...args} /></div>,
  args: {
    onClick: () => { },
    title: 'Click me',
    mode: 'filled',
  },
};
