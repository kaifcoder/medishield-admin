"use client";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  console.log(images);
  return (
    <Carousel className="ml-5 max-w-xs">
      <CarouselContent>
        {Array.from({ length: images.length }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square  items-center justify-center p-6">
                  <img
                    alt="Image"
                    loading="lazy"
                    width={400}
                    height={400}
                    src={
                      images[index].startsWith("http")
                        ? images[index]
                        : "https://images1.dentalkart.com/media/catalog/product" +
                          images[index]
                    }
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
