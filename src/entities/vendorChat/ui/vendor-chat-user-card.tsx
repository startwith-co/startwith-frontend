function VendorChatUserCard({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-[#3D3D3D] p-2.5 text-sm">
      <p className="text-[#AAAAAA]">{title}</p>
      <p className="text-[#FFFFFF]">{content}</p>
    </div>
  );
}

export default VendorChatUserCard;
