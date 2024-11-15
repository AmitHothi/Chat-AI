'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatBox = ({ id }: { id: string }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I assist you today?' },
  ]);
  const [input, setInput] = useState('');
  const chatId = id;

  useEffect(() => {
    // Initialize chat history based on the chatId
    setMessages([
      {
        role: 'assistant',
        content: `Welcome to chat ${chatId}! How can I help you?`,
      },
    ]);
  }, [chatId]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      setInput('');
      // You can add API call here to send message to backend and retrieve response
    }
  };
  return (
    <div className='flex-1 flex flex-col h-full'>
      <Card className='flex-1 m-4 overflow-hidden flex flex-col'>
        <CardHeader>
          <CardTitle>Chat {chatId}</CardTitle>
        </CardHeader>
        <CardContent className='flex-1 overflow-auto'>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`flex items-baseline ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar className='size-6'>
                  <AvatarFallback
                    className={cn(
                      'text-white text-sm',
                      message.role === 'user' ? 'bg-blue-700' : 'bg-gray-500'
                    )}
                  >
                    {message.role === 'user' ? 'U' : 'AI'}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`mx-2 p-2.5 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      <div>
        <CardFooter className='p-4'>
          <div className='flex w-full items-center space-x-2'>
            <Input
              type='text'
              placeholder='Ask your question...'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend}>
              <Send className='h-4 w-4' />
              <span className='sr-only'>Send</span>
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  );
};

export default ChatBox;
