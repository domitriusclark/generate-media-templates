import React from 'react';

import useDebounce from '../../hooks/useDebounce';

import {
  Select,
} from '@chakra-ui/core';

export default function TransformOptionSelect({ id = undefined, updater, transform, type, defaultOption }) {
  const [select, setSelect] = React.useState(defaultOption);

  const debounced = useDebounce(select, 1000);

  const isFirstRun = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (id) {
      updater({ transform, value: select, id })
    } else {
      updater({ transform, value: select })
    }
  }, [debounced])

  return (
    <label>
      {type.label}
      <Select
        onChange={e => setSelect(e.target.value)}
        value={select}
      >
        {type.options.map((opt) => (
          <option key={opt.value} value={opt.value} >
            {opt.value}
          </option>
        ))}
      </Select>
    </label>
  )
};
