import type { Meta, StoryObj } from '@storybook/react';
import ChatRoomCard, { ChatRoomCardProps } from '@/shared/ui/chatroomcard';

const meta: Meta<ChatRoomCardProps> = {
  title: 'Components/ChatRoomCard',
  component: ChatRoomCard,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    preview: { control: 'text' },
    img: { control: 'text' },
    date: { control: 'text' },
    avatarSize: {
      control: 'text',
      description: 'Tailwind size class (e.g. size-10, size-12, size-15)',
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<ChatRoomCardProps>;

export const Default: Story = {
  args: {
    name: '홍길동',
    preview: '안녕하세요, 잘 지내셨나요?',
    img: '/image/image.png',
    date: new Date().toISOString(),
    className: '',
    avatarSize: 'size-15',
  },
};
