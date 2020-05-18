import React from 'react';

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core';

export default function TransformNumberInput({ updateTransform, value, transform }) {
  return (
    <label>
      {transform}
      <NumberInput size="md" value={value}>
        <NumberInputField onChange={e => updateTransform({ type: transform, value: e.target.value })} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </label>
  )
}