import React from 'react';
import useDebounce from '../../hooks/useDebounce';

import {
  Flex,
  Input
} from '@chakra-ui/core';

export default function ImageConfig({ store, updateCloudName, updatePublicId }) {
  const [inputs, setInputs] = React.useState({
    cloudName: store.cloudName,
    publicId: store.publicId
  });

  const debouncedInputs = useDebounce(inputs, 1000);

  React.useEffect(() => {
    updateCloudName(inputs.cloudName)
  }, [debouncedInputs.cloudName])

  React.useEffect(() => {
    updatePublicId(inputs.publicId)
  }, [debouncedInputs.publicId])

  return (
    <Flex mb={8}>
      <Input
        onChange={e => {
          e.persist();
          setInputs(prev => ({ ...prev, cloudName: e.target.value }))
        }}
        type="text"
        defaultValue={inputs.cloudName}
      />
      <Input
        onChange={e => {
          e.persist();
          setInputs(prev => ({ ...prev, publicId: e.target.value }))
        }}
        type="text"
        defaultValue={inputs.publicId}
      />
    </Flex>
  )
}