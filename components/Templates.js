import React from 'react';
import useSocialTemplate from '../hooks/useSocialTemplate';
import useTransforms from '../hooks/useTransforms';
import { useSearch } from 'use-cloudinary';

import TemplateImage from '../components/TemplateImage';
import { Flex, Button } from '@chakra-ui/core';

export default function Templates({ updatePublicId, updateTransform }) {
  const { search, data, status, error } = useSearch({ endpoint: "/api/search" });

  React.useEffect(() => {
    search({
      expression: "resource_type:image AND tags=template"
    })
  }, [])

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>{error.message}</p>;
  return (
    <Flex justifyContent="space-around">
      {data && data.resources.map(i => {
        return (
          <Flex alignItems="flex-start" direction="column">
            <Flex w="100%" justifyContent="space-between">
              <Flex direction="column" mb={8}>
                <TemplateImage publicId={i.public_id} transforms={{ height: 0.2, crop: 'scale' }} />
                <h3>{i.public_id}</h3>
                Width: {i.width} -- Height: {i.height}
                <Button onClick={() => {
                  updatePublicId(i.public_id)
                  updateTransform({ transform: "height", value: i.height })
                  updateTransform({ transform: "width", value: i.width })
                }}>Customize Template</Button>
              </Flex>
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}