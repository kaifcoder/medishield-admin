import { DeleteIcon, MoreVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

interface BrandCardProps {
  name: string;
  thumbnail: string;
}

const BrandCard = ({ name, thumbnail }: BrandCardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/dashboard/products?search=${name}`);
      }}
      className="flex  cursor-pointer  items-center gap-4 border p-4 rounded-xl shadow-md relative group"
    >
      <div className="absolute opacity-0 group-hover:opacity-100  top-0 right-0  bg-gray-200 p-2 text-center rounded-lg">
        <DeleteIcon className="w-6 h-6 text-red-500" />
      </div>
      <img
        alt="Brand thumbnail"
        className="aspect-square object-contain border border-gray-200 rounded-lg overflow-hidden w-20 dark:border-gray-800"
        height={120}
        src={thumbnail}
        width={120}
      />
      <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
    </div>
  );
};

export default BrandCard;
