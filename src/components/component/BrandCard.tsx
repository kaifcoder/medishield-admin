import React from "react";

interface BrandCardProps {
  name: string;
  thumbnail: string;
}

const BrandCard = ({ name, thumbnail }: BrandCardProps) => {
  return (
    <div className="flex items-center gap-4 border p-4 rounded-xl shadow-md">
      <img
        alt="Brand thumbnail"
        className="aspect-square object-cover border border-gray-200 rounded-lg overflow-hidden w-20 dark:border-gray-800"
        height={120}
        src={thumbnail}
        width={120}
      />
      <h2 className="text-xl font-semibold tracking-tight">{name}</h2>
    </div>
  );
};

export default BrandCard;
