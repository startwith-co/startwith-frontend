import { IoIosStar } from 'react-icons/io';
import Link from 'next/link';
import Image from 'next/image';
import defaultImage from 'public/images/404.png';
import formatLocalPrice from '@/shared/lib/formatLocalPrice';
import ItemBoxProps from '../model/type';

export default function ItemBox({
  name,
  price,
  rating,
  company,
  vendorSeq,
  category,
  image,
}: ItemBoxProps) {
  return (
    <Link
      href={`/products/${vendorSeq}?category=${category}`}
      className="flex flex-col gap-5"
    >
      <Image
        src={image || defaultImage}
        alt={name}
        width={200}
        height={170}
        className="h-56 w-full rounded-md bg-gray-200 object-cover object-center"
      />
      <div className="flex flex-col gap-1">
        <span className="text-[15px] font-bold">{name}</span>
        <span className="text-[15px]">
          {formatLocalPrice(price)}원/월(VAT 별도)~
        </span>
        <p className="flex items-center gap-1">
          <IoIosStar />
          <span className="text-xs">{rating}</span>
        </p>
        <span className="text-xs">{company}</span>
      </div>
    </Link>
  );
}
