'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ChatInput = () => {
  const [input, setInput] = useState('');
  const router = useRouter(); // Now using router directly in ChatInput

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newChatId = Date.now().toString(); // Generate a unique chat ID
      router.push(`/chat/${newChatId}`); // Navigate to new chat with the generated ID
      setInput(''); // Clear input field
    }
  };

  return (
    <div className='flex flex-col items-center justify-end md:justify-center h-full w-full max-w-3xl gap-4'>
      {/* Centered title */}
      <div className='flex flex-col h-full md:h-fit justify-center text-2xl font-bold'>
        What can I help with?
      </div>

      {/* Form container */}
      <form
        onSubmit={handleSubmit}
        className='flex items-center w-full space-x-2 md:justify-center'
      >
        <Input
          type='text'
          placeholder='Ask your questions...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='flex-grow'
        />
        <Button type='submit' size='icon'>
          <Send className='h-4 w-4' />
          <span className='sr-only'>Send</span>
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
