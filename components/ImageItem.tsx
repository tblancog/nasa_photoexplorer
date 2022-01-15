import { Box, Text, Stack } from "@chakra-ui/layout";
import Image from "next/image";
import React from "react";
import { Photo } from "../types";
import hDate from "human-date";

interface PhotoProps {
  image: Photo;
}

const ImageItem = ({ image }: PhotoProps) => {
  return (
    <Stack py={"4"}>
      <Box maxW={"250px"}>
        <Image
          src={image.img_src}
          width={400}
          height={260}
          title="ss"
          alt="ss"
          // title={`${image.rover.name} at ${hDate.prettyPrint(
          //   image.earth_date
          // )} (earth date)`}
          // alt={`${image.rover.name} rover at ${hDate.prettyPrint(
          //   image.earth_date
          // )} (earth date)`}
        />
      </Box>
      <Text>{image.id}</Text>
    </Stack>
  );
};

export default ImageItem;
