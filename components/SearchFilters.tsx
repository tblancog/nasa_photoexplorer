import {
  Flex,
  Select,
  FormControl,
  FormLabel,
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
  filter: Filter;
  handle: Function;
}

const SearchFilters = ({ filter, handle }: SearchProps) => {
  const [date, setDate] = useState<Date | null>(new Date());

  useEffect(() => {
    handle({ earth_date: toUnixDate(date) });
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
          value={filter.rover}
          onChange={(e) =>
            handle({ [rovers.name]: e.target.value, camera: "" })
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
          value={filter.camera}
          onChange={(e) => handle({ [cameras.name]: e.target.value })}
        >
          {cameras.items
            .filter((item) => {
              if (item.rovers.includes(filter.rover ?? "curiosity")) {
                return true;
              }
              return false;
            })
            .map((item) => (
              <option key={item.value} value={item.value}>
                {`(${item.value.toUpperCase()}) ${item.title}`}
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
          value={filter.sol}
          onChange={(value) => handle({ sol: +value })}
          min={0}
          max={1000}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </Flex>
  );
};

export default SearchFilters;
