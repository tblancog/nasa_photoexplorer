import { useState } from "react";
import Icon from "@chakra-ui/icon";
import { Box, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import ImageItem from "../components/ImageItem";
import { Photo, Filter } from "../types";
import SearchFilters from "../components/SearchFilters";

interface ImageProps {
  images?: Photo[];
}

const Home: NextPage<ImageProps> = ({ images }) => {
  const [results, setResults] = useState(images);
  const [loading, setLoading] = useState(false);

  const onFilterUpate = async (newFilter: Filter) => {
    setLoading(true);
    const newResults = await fetchRoverPhotos(newFilter);
    setResults(newResults);
    setLoading(false);
  };
  return (
    <Box maxWidth="1280px" m="auto">
      <Flex
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        marginTop="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text>Search By Filters</Text>
      </Flex>
      <SearchFilters handle={onFilterUpate} />

      <Flex flexWrap="wrap" justifyContent="center">
        {loading ? (
          <Text>Loading</Text>
        ) : results && results.length === 0 ? (
          <Text>No rover images matching the criteria</Text>
        ) : (
          results?.map((image: Photo) => (
            <ImageItem key={image.id} image={image} />
          ))
        )}
      </Flex>
    </Box>
  );
};

const fetchRoverPhotos = async (filter: any) => {
  const qsParams = `${
    filter.camera ? "&camera=" + filter.camera : ""
  }&earth_date=${filter.earth_date}&sol=${filter.sol}`;

  console.log(qsParams);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/rovers/${
      filter.rover ? filter.rover : "curiosity"
    }/photos?page=1&api_key=${
      process.env.NEXT_PUBLIC_API_BASE_API_KEY
    }${qsParams}`
  );
  const { photos } = await res.json();
  return photos;
};

export async function getStaticProps() {
  const photos = await fetchRoverPhotos({ rover: "curiosity", camera: "" });
  return {
    props: {
      images: photos,
    },
  };
}

export default Home;
