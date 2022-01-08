import { Flex, Box, Text } from "@chakra-ui/layout";
import { NextComponentType } from "next";
import Image from "next/image";
import React from "react";
import { Photo } from "../types";
import hDate from "human-date";

interface PhotoProps {
  image: Photo;
}

const ImageItem = ({ image }: PhotoProps) => {
  return (
    <Flex flexWrap="wrap" w="240px" pt="5" justifyContent="flex-start">
      <Box w="full">
        <Image
          src={image.img_src}
          width={400}
          height={260}
          title={`${image.rover.name} at ${hDate.prettyPrint(
            image.earth_date
          )} (earth date)`}
          alt={`${image.rover.name} rover at ${hDate.prettyPrint(
            image.earth_date
          )} (earth date)`}
        />
      </Box>
      <Text>{image.id}</Text>
    </Flex>
  );
};

export default ImageItem;
