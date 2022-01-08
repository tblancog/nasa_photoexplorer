import {
  Flex,
  Box,
  Select,
  FormControl,
  FormLabel,
  Text,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Filter } from "../types";
import { rovers, cameras } from "../utils/filterData";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toUnixDate } from "../utils";

interface SearchProps {
  handle: Function;
}

const SearchFilters = ({ handle }: SearchProps) => {
  const [filters, setFilters] = useState<Filter>({
    rover: "curiosity",
    camera: "",
    earth_date: toUnixDate(new Date()),
    sol: 0,
  });
  const [date, setDate] = useState<any>(new Date());
  const onSelectedFilter = (filterSelected: any) => {
    const newFilters = { ...filters, ...filterSelected };
    setFilters(newFilters);
    handle(newFilters);
  };

  useEffect(() => {
    onSelectedFilter({ earth_date: toUnixDate(date) });
    // eslint-disable-next-line
  }, [date]);

  return (
    <Flex p="4">
      <FormControl p={3}>
        <FormLabel id="roverLabel" htmlFor="rover">
          Rover
        </FormLabel>
        <Select
          id="rover"
          w="100%"
          onChange={(e) =>
            onSelectedFilter({
              [rovers.name]: e.target.value,
            })
          }
        >
          {rovers.items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </Select>
      </FormControl>
      {/* Cameras filter */}
      <FormControl p={3}>
        <FormLabel id="cameraLabel" htmlFor="camera">
          Cameras
        </FormLabel>
        <Select
          id="camera"
          placeholder={"All"}
          onChange={(e) =>
            onSelectedFilter({
              [cameras.name]: e.target.value,
            })
          }
        >
          {cameras.items
            .filter((item) => item.rovers.includes(filters.rover))
            .map((item) => (
              <option key={item.value} value={item.value}>
                {item.title}
              </option>
            ))}
        </Select>
      </FormControl>
      <FormControl p={3} id="cameraLabel">
        <FormLabel id="cameraLabel" htmlFor="camera">
          Earth Date
        </FormLabel>

        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          customInput={<Input />}
        />
      </FormControl>

      <FormControl p={3}>
        <FormLabel id="solLabel" htmlFor="solLabel">
          Sol (day on Mars)
        </FormLabel>
        <NumberInput
          id="solLabel"
          value={filters.sol}
          onChange={(value) => onSelectedFilter({ sol: value })}
          min={0}
          max={1000}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>{" "}
      </FormControl>
    </Flex>
  );
};

export default SearchFilters;
