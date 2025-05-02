import { IoIosStar } from 'react-icons/io';
import ItemBoxProps from '../model/type';

export default function ItemBox({
  name,
  price,
  rating,
  company,
}: ItemBoxProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-56 w-full rounded-md bg-gray-200" />
      <div className="flex flex-col gap-1">
        <span className="font-semibold">{name}</span>
        <span>{price}</span>
        <p className="flex items-center gap-1">
          <IoIosStar />
          <span className="text-xs">{rating}</span>
        </p>
        <span className="text-xs">{company}</span>
      </div>
    </div>
  );
}
