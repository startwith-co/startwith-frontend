import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

function CircleCheckbox({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox.Root
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(!!val)}
        className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#6E86FF] bg-transparent transition-colors duration-200"
      >
        <Checkbox.Indicator>
          <Check className="h-4 w-4 text-[#6E86FF]" strokeWidth={3} />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <span className="text-xs text-gray-600">
        계약서 및 환불정책을 확인하였으며, 동의하여 결제합니다.
      </span>
    </div>
  );
}
export default CircleCheckbox;
