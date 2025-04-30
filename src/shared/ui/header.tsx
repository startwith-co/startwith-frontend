import { FiBell, FiMail } from 'react-icons/fi';
import Input from './input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './dropdown-menu';

export default function Header() {
  return (
    <header className="flex items-center justify-between pt-[35px]">
      <div className="flex items-center gap-8">
        <h1>SOLU</h1>
        <Input
          type="search"
          placeholder="키워드를 검색해주세요."
          className="h-[45px] w-[420px] rounded-3xl"
        />
      </div>
      <div className="flex items-center gap-2.5 text-[12px]">
        <button>밴더 전용 Home</button>
        <button>Language</button>
        <FiBell size={26} />
        <FiMail size={26} />
        <DropdownMenu>
          <DropdownMenuTrigger>name</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>name</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
