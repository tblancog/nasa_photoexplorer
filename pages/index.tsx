import { useReducer } from "react";
import Icon from "@chakra-ui/icon";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import ImageItem from "../components/ImageItem";
import { Photo, Filter, SearchState } from "../types";
import SearchFilters from "../components/SearchFilters";
import { fetchRoverPhotos, searchReducer, toUnixDate } from "../utils";

interface ImageProps {
  photos: Photo[];
}

const initialState: SearchState = {
  filter: {
    rover: "curiosity",
    camera: "",
    earth_date: toUnixDate(new Date()),
    sol: 1000,
  },
  results: [],
  loading: false,
  page: 1,
};
const Home: NextPage<ImageProps> = ({ photos }) => {
  initialState.results = photos;
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const onFilterUpate = async (newFilter: Filter) => {
    const temp = { ...state.filter, ...newFilter };
    const results = (await fetchRoverPhotos(temp)) ?? [];
    dispatch({
      type: "FILTER_UPDATE",
      payload: {
        filter: temp,
        results,
        page: initialState.page,
      },
    });
  };

  const getNextPage = async () => {
    dispatch({ type: "TOGGLE_LOADING" });
    const newPageResults =
      (await fetchRoverPhotos(state.filter, state.page + 1)) ?? [];
    dispatch({ type: "NEXT_PAGE", payload: newPageResults });
    dispatch({ type: "TOGGLE_LOADING" });
  };

  return (
    <Box maxWidth="1280px" my={0} mx="auto">
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
      <SearchFilters filter={state.filter} handle={onFilterUpate} />

      <Flex flexWrap="wrap" justifyContent={"flex-start"}>
        {state.results && state.results.length === 0 ? (
          <Text my={0} mx="auto">
            No rover images matching the criteria
          </Text>
        ) : (
          state.results?.map((image: Photo) => (
            <ImageItem key={image.id} image={image} />
          ))
        )}
      </Flex>
      {state.results && state.results.length !== 0 && (
        <Flex my="5" flexWrap={"wrap"} justifyContent={"center"}>
          <Button
            size={"md"}
            isLoading={state.loading}
            loadingText="Loading"
            colorScheme="gray"
            variant="outline"
            onClick={getNextPage}
          >
            Load more results
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export async function getStaticProps() {
  const photos = await fetchRoverPhotos(initialState.filter);
  return {
    props: {
      photos,
    },
  };
}

export default Home;
