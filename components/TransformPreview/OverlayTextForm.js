import React from 'react';

import useDebounce from '../../hooks/useDebounce';

import {
  TRANSFORM_GRAVITY,
  TRANSFORM_CROP
} from '../../utils';

import {
  Flex,
  Input,
  Text
} from "@chakra-ui/core"

import TransformNumberInput from './TransformNumberInput'
import TransformOptionSelect from './TransformOptionSelect';

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
          Text
        <Input defaultValue={textOverlay.overlay.options.text} onChange={e => {
            e.persist();
            setInputs({ value: e.target.value, transform: "text", id: textOverlay.id })
          }} />
        </label>
        <TransformNumberInput id={textOverlay.id} defaultValue={textOverlay.x} updater={updateTextOverlay} transform="x" />
        <TransformNumberInput id={textOverlay.id} defaultValue={textOverlay.y} updater={updateTextOverlay} transform="y" />
        <TransformOptionSelect id={textOverlay.id} updater={updateTextOverlay} type={TRANSFORM_CROP} defaultOption={textOverlay.crop} transform="crop" />
        <TransformOptionSelect id={textOverlay.id} updater={updateTextOverlay} type={TRANSFORM_GRAVITY} defaultOption={textOverlay.gravity} transform="gravity" />
      </Flex>

      <Flex m={4} justifyContent="space-evenly">
        <label>
          Color
        <input type="color" />
        </label>
        <label>
          Font
        <Input w={32} defaultValue={textOverlay.overlay.options.fontFamily} onChange={e => {
            e.persist();
            setInputs({ value: e.target.value, transform: "fontFamily", id: textOverlay.id })
          }} />
        </label>
        <TransformNumberInput id={textOverlay.id} defaultValue={textOverlay.overlay.options.fontSize} updater={updateTextOverlay} value={textOverlay.fontSize} transform="fontSize" />
        <TransformNumberInput id={textOverlay.id} defaultValue={textOverlay.overlay.options.lineSpacing} updater={updateTextOverlay} value={textOverlay.lineSpacing} transform="lineSpacing" />`
        <label>
          Weight
        <Input w={32} defaultValue={textOverlay.overlay.options.fontWeight} transform="fontWeight" onChange={e => {
            e.persist();
            setInputs({ value: e.target.value, transform: "fontWeight", id: textOverlay.id })
          }} />
        </label>
      </Flex>

    </Flex>
  )
}