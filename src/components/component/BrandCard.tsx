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
        router.push(`/dashboard/products?brand=${name}`);
      }}
      className="flex  cursor-pointer  items-center gap-4 border p-4 rounded-xl shadow-md relative group"
    >
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
