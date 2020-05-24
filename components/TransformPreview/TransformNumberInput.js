import React from 'react';

import useDebounce from '../../hooks/useDebounce';

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core';

export default function TransformNumberInput({ id = undefined, defaultValue, updater, transform }) {
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
    <label>
      {transform}
      <NumberInput size="md" defaultValue={input}>
        <NumberInputField onChange={e => setInput(e.target.value)} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </label>
  )
}