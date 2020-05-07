import React from 'react';
import useSocialTemplate from '../hooks/useSocialTemplate';
import useTransforms from '../hooks/useTransforms';
import { useSearch } from 'use-cloudinary';

import TemplateImage from '../components/TemplateImage';
import { Flex, Button } from '@chakra-ui/core';

export default function Templates() {
  const [template, setTemplate] = React.useState("");
  const { search, data, status, error } = useSearch({ endpoint: "/api/search" });
  const { customizeTemplate } = useSocialTemplate({ cloudName: "testing-hooks-upload" })
  const { addTextLayer } = useTransforms();

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
          <Flex alignItems="center" direction="column">
            <TemplateImage publicId={i.public_id} transforms={{ height: 0.2, crop: 'scale' }} />
            <h3>{i.public_id}</h3>
            Width: {i.width} --
            Height: {i.height}
            <Button onClick={() => setTemplate(i.public_id)}>Customize Template</Button>
            {
              template === i.public_id && <img src={customizeTemplate(template, addTextLayer({
                text: "Just a little something",
                fontSize: 64,
                border: "3px_solid_black"
              }))} />
            }
          </Flex>
        )
      })}
    </Flex>
  )
}