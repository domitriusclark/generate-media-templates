import React from 'react';

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

  function handleInput(e, transform) {
    setInputs((prev) => ({ ...prev, [transform]: e.target.value }))

    setTimeout(() => updateTextOverlay({ type: transform, value: inputs[transform] }), 500);
  }

  return (
    <Flex mt={8} direction="column" border="2px solid black" borderRadius="8px">
      <Text mt={6} ml={6} as="h2">Text Overlay</Text>
      <Flex m={4} justifyContent="space-evenly">
        <Input defaultValue={textOverlay.text} onChange={e => handleInput(e, "text")} />
        <TransformNumberInput updateTextOverlay value={textOverlay.x} transform="x" />
        <TransformNumberInput updateTextOverlay value={textOverlay.y} transform="y" />
        <TransformOptionSelect updateTextOverlay type={TRANSFORM_CROP} defaultOption={textOverlay.crop} transform="crop" />
        <TransformOptionSelect updateTextOverlay type={TRANSFORM_GRAVITY} defaultOption={textOverlay.gravity} transform="gravity" />
        <input type="color" />

        { /* FONT STYLE */}
        <Input defaultValue={text.font} onChange={e => handleInput(e, "font")} />
        <TransformNumberInput updateTextOverlay value={textOverlay.fontSize} transform="fontSize" />
        <TransformNumberInput updateTextOverlay value={textOverlay.lineSpacing} transform="lineSpacing" />`
        <Input defaultValue={textOverlay.weight} transform="weight" onChange={e => handleInput(e, "weight")} />
      </Flex>
    </Flex>
  )
}