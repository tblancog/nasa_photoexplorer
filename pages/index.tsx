import { useEffect, useReducer } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import ImageItem from "../components/ImageItem";
import { Photo, Filter } from "../types";
import SearchFilters from "../components/SearchFilters";
import { initialState, fetchRoverPhotos, searchReducer } from "../utils";

interface ImageProps {
  photos: Photo[];
}

let currentState = initialState;

const Home: NextPage<ImageProps> = ({ photos }) => {
  initialState.results = photos;

  const [state, dispatch] = useReducer(searchReducer, currentState);

  const onFilterUpate = async (newFilter: Filter) => {
    const temp = { ...state.filter, ...newFilter };
    const results = (await fetchRoverPhotos(temp)) ?? [];
    const payload = {
      filter: temp,
      results,
      page: initialState.page,
    };
    dispatch({
      type: "FILTER_UPDATE",
      payload,
    });
    localStorage.setItem("localFilter", JSON.stringify(payload));
  };

  const getNextPage = async () => {
    dispatch({ type: "TOGGLE_LOADING" });
    const newPageResults =
      (await fetchRoverPhotos(state.filter, state.page + 1)) ?? [];
    dispatch({ type: "NEXT_PAGE", payload: newPageResults });
    dispatch({ type: "TOGGLE_LOADING" });
  };

  useEffect(() => {
    // Initial state may come locally
    currentState =
      (localStorage &&
        localStorage.getItem("localFilter") &&
        JSON.parse(localStorage.getItem("localFilter") ?? "")) ??
      {};

    if (Object.keys(currentState).length > 0) {
      dispatch({
        type: "FILTER_UPDATE",
        payload: currentState,
      });
      return;
    }
    // Optionally store the state in localstorage
    localStorage.setItem("localFilter", JSON.stringify(initialState));
    // eslint-disable-next-line
  }, []);

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

      <Flex flexWrap="wrap" justifyContent={"space-between"}>
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
