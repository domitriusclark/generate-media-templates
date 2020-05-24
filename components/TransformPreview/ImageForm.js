import React from 'react';

import {
  TRANSFORM_CROP,
  TRANSFORM_QUALITY,
  TRANSFORM_FORMAT
} from '../../utils';

import {
  Flex,
  Text
} from '@chakra-ui/core';

import TransformNumberInput from './TransformNumberInput'
import TransformOptionSelect from './TransformOptionSelect';


export default function ImageForm({ store, updateTransform }) {
  return (
    <Flex mt={8} direction="column" border="2px solid black" borderRadius="8px">
      <Text mt={6} ml={6} as="h2">Image Options</Text>

      <Flex m={4} justifyContent="space-evenly">
        <TransformNumberInput defaultValue={store.transforms.width} updater={updateTransform} transform="width" />
        <TransformNumberInput defaultValue={store.transforms.height} updater={updateTransform} transform="height" />
        <TransformOptionSelect updater={updateTransform} type={TRANSFORM_QUALITY} defaultOption="auto" transform="quality" />
        <TransformOptionSelect updater={updateTransform} type={TRANSFORM_CROP} defaultOption="scale" transform="crop" />
        <TransformOptionSelect updater={updateTransform} type={TRANSFORM_FORMAT} defaultOption="auto" transform="format" />
      </Flex>
    </Flex>
  )
}