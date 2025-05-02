import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Star } from 'lucide-react';

export default function ReviewModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [text, setText] = useState('');

  const maxChars = 500;

  const handleSubmit = () => {
    toast.success(`제출 완료\n별점: ${rating}점\n내용: ${text}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-[700px] w-[500px] rounded-2xl px-7 py-8">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-extrabold">
            고객님의 소중한 리뷰를 남겨주세요
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                (hover ?? rating) >= star ? 'text-[#4f7df9]' : 'text-gray-300'
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setRating(star)}
              fill={(hover ?? rating) >= star ? '#4f7df9' : 'transparent'}
            />
          ))}
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={
              (e) => setText(e.target.value.slice(0, maxChars)) // 500자 제한
            }
            placeholder="리뷰를 입력해주세요..."
            className="min-h-[420px] w-full resize-none rounded-xl bg-[#f5f5f5] p-4 text-sm text-black focus:outline-none"
          />
          <div className="absolute right-4 bottom-7 text-xs text-[#000000]">
            {text.length}/{maxChars}자
          </div>
        </div>

        <DialogFooter className="mt-1">
          <Button
            asChild={false}
            className="h-[50px] w-full bg-[#4f7df9] font-bold text-white hover:bg-[#3c62d6]"
            onClick={handleSubmit}
            disabled={text.length === 0 || rating === 0}
          >
            리뷰 남기기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
