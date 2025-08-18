import { ChevronRight, Mic } from 'lucide-react';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';

export default function Home() {
  return (
    <main className="p-6">
      <div className="mx-auto max-w-sm rounded-2xl border-2 border-dashed border-purple-400 p-6">
        <div className="mb-4 text-sm font-semibold text-purple-600">Button</div>
        <div className="flex flex-col items-start gap-4">
          {/* Outline variant with inline chevron between texts */}
          <Button variant="outline" className="cursor-pointer">
            <span className="flex items-center gap-3">
              <span>EN</span>
              <ChevronRight className="h-4 w-4" />
              <span>JP</span>
            </span>
          </Button>

          {/* Primary filled button */}
          <Button variant="primary">Xem tất cả</Button>

          {/* Disabled/gray outline button */}
          <Button variant="disabled">Xem tất cả</Button>

          <Button leftIcon={<ChevronRight />}></Button>
        </div>
      </div>

      {/* Input showcase, matching the provided variants */}
      <div className="mx-auto mt-8 max-w-sm rounded-2xl border-2 border-dashed border-purple-400 p-6">
        <div className="mb-4 text-sm font-semibold text-purple-600">Input</div>
        <div className="flex flex-col gap-4">
          {/* Placeholder only */}
          <TextInput placeholder="Type a message..." />

          {/* With value */}
          <TextInput defaultValue="Hello" aria-label="hello" />

          {/* With left icon and placeholder, truncation on */}
          <TextInput
            leftIcon={<Mic className="h-5 w-5" />}
            placeholder="Record your voice here...."
            truncate
            aria-label="record-voice"
          />
        </div>
      </div>
    </main>
  );
}
