import type { Meta, StoryObj } from '@storybook/react';
import { PlatFormContext, PlatformProvider } from './PlatformProvider';

const meta: Meta<typeof PlatformProvider> = {
  title: 'features/core/providers/PlatformProvider',
  component: PlatformProvider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <PlatformProvider>
        <Story />
      </PlatformProvider>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof PlatformProvider>;

export const Default: Story = {
  render: () => (
   <PlatFormContext.Consumer>
    {(context)=>{
      if(!context) return <div>Context non disponible</div>;

      return (
        <div>
          <div>isMobile: {JSON.stringify(context.isMobile)}</div>
          <div>isDesktop: {JSON.stringify(context.isDesktop)}</div>
          <div>isWeb: {JSON.stringify(context.isWeb)}</div>
        </div>
      );
    }}
   </PlatFormContext.Consumer>
  )
};
