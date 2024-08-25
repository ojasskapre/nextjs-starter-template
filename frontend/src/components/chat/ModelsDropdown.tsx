'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ILLMModel } from '@/types/chat.interface';

export default function ModelDropdown({
  model,
  setModel,
}: {
  model: ILLMModel;
  setModel: React.Dispatch<React.SetStateAction<ILLMModel>>;
}) {
  const llmModels: ILLMModel[] = [
    {
      id: 'gpt-3.5-turbo-0125',
      name: 'GPT-3.5 Turbo',
    },
    {
      id: 'gpt-4o-mini',
      name: 'GPT-4o Mini',
    },
  ];

  const handleModelChange = (model: ILLMModel) => {
    setModel(model);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full border border-blue-500 bg-blue-600/20"
        >
          {model.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {llmModels.map((model) => (
          <DropdownMenuItem
            key={model.id}
            className="p-2"
            onClick={() => handleModelChange(model)}
          >
            {model.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
