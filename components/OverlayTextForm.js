import React from 'react';

import useDebounce from '../hooks/useDebounce';

import {
  TRANSFORM_GRAVITY,
  TRANSFORM_CROP
} from '../utils';

import {
  Flex,
  Input,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from "@chakra-ui/core"

import TransformNumberInput from './TransformNumberInput'
import TransformOptionSelect from './TransformOptionSelect';

function SliderInput({ id, defaultValue, updater, transform }) {
  const [input, setInput] = React.useState(defaultValue)

  const debounced = useDebounce(input, 1000);

  const isFirstRun = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (id) {
      updater({ transform, value: input, id })
    } else {
      updater({ transform, value: input })
    }
  }, [debounced])

  return (
    <Flex>
      <Slider flex="1" value={defaultValue} onChange={e => setInput(e.target.value)}>
        <SliderTrack />
        <SliderFilledTrack />
        <SliderThumb
          fontSize="sm"
          width="32px"
          height="20px"
          children={defaultValue}
        />
      </Slider>

    </Flex>
  );
}

export default function OverlayTextForm({ textOverlay, updateTextOverlay }) {

  const [inputs, setInputs] = React.useState();

  const debouncedInputs = useDebounce(inputs, 1000);

  React.useEffect(() => {
    updateTextOverlay({ ...inputs, id: textOverlay.id })
  }, [debouncedInputs])

  return (
    <Flex mt={8} direction="column" border="2px solid black" borderRadius="8px">
      <Text mt={6} ml={6} as="h2">Text Overlay</Text>
      <Flex m={4} justifyContent="space-evenly">
        <label>
          text
        <Input defaultValue={textOverlay.overlay.options.text} onChange={e => setInputs({ value: e.target.value, transform: "text", id: textOverlay.id })} />
        </label>
        <TransformNumberInput id={textOverlay.id} defaultValue={textOverlay.x} updater={updateTextOverlay} transform="x" />
        <TransformNumberInput id={textOverlay.id} defaultValue={textOverlay.y} updater={updateTextOverlay} transform="y" />
        <TransformOptionSelect id={textOverlay.id} updater={updateTextOverlay} type={TRANSFORM_CROP} defaultOption={textOverlay.crop} transform="crop" />
        <TransformOptionSelect id={textOverlay.id} updater={updateTextOverlay} type={TRANSFORM_GRAVITY} defaultOption={textOverlay.gravity} transform="gravity" />
      </Flex>

      <Flex m={4} justifyContent="space-evenly">
        <label>
          color
        <input type="color" defaultValue={textOverlay.color} onChange={e => setInputs({ value: e.target.value, transform: "color", id: textOverlay.id })} />
        </label>
        <label>
          font
        <Input w={32} defaultValue={textOverlay.overlay.options.fontFamily} onChange={e => setInputs({ value: e.target.value, transform: "fontFamily", id: textOverlay.id })} />
        </label>
        <TransformNumberInput id={textOverlay.id} defaultValue={textOverlay.overlay.options.fontSize} updater={updateTextOverlay} value={textOverlay.fontSize} transform="fontSize" />
        <TransformNumberInput id={textOverlay.id} defaultValue={textOverlay.overlay.options.lineSpacing} updater={updateTextOverlay} value={textOverlay.lineSpacing} transform="lineSpacing" />`
        <label>
          weight
        <Input w={32} defaultValue={textOverlay.overlay.options.fontWeight} transform="fontWeight" onChange={e => setInputs({ value: e.target.value, transform: "fontWeight", id: textOverlay.id })} />
        </label>
      </Flex>

    </Flex>
  )
}