import ChatBox from '@/components/chat/chat-box';
import { IDynamicRoute } from '@/types';

const ChatPage = async ({ params }: IDynamicRoute) => {
  const chatId = (await params?.id) as string;

  return <ChatBox id={chatId} />;
};

export default ChatPage;
