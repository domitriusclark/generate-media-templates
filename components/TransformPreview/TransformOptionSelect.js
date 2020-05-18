import React from 'react';

import {
  Select,
} from '@chakra-ui/core';

export default function TransformOptionSelect({ updateTransform, transform, type, value, defaultOption }) {
  return (
    <label>
      {type.label}
      <Select
        onChange={() => updateTransform({ type: transform, value: e.target.value })}
        defaultValue={type.options[defaultOption]}
        value={value}
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
