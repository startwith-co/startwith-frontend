import type { Meta, StoryObj } from '@storybook/react';
import Button from '@/components/Button'; // 실제 컴포넌트 경로

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: '버튼',
  },
};
