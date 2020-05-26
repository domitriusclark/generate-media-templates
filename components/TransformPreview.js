import React from 'react';
import ImageDesigner from './ImageDesigner';
import { Flex } from '@chakra-ui/core';

export default function TransformPreview() {
  return (
    <Flex direction="column">
      <ImageDesigner />
    </Flex>
  )
}
