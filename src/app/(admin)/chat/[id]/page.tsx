'use client';

import ChatBox from '@/components/chat/chat-box';
import { useParams } from 'next/navigation';

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;

  return <ChatBox chatId={chatId} />;
}
