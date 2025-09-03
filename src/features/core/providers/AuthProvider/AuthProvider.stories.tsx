import type { Meta, StoryObj } from '@storybook/react';
import { AuthContext, AuthProvider } from './AuthProvider';

const meta: Meta<typeof AuthProvider> = {
  title: 'features/core/providers/AuthProvider',
  component: AuthProvider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AuthProvider>;

export const Default: Story = {
  render: () => {
    return (
      <AuthContext.Consumer>
        {(context) => {
          if (!context) return <div>Context non disponible</div>;

          return (
            <div>
              <div>isAuthenticated: {JSON.stringify(context.isAuthenticated)}</div>
              <div>workshop: {JSON.stringify(context.workshop)}</div>
              <div>worker: {JSON.stringify(context.worker)}</div>
            </div>
          )
        }}
      </AuthContext.Consumer>
    )
  },
};
