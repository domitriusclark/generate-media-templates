import React from 'react';
import { Select, Flex, Button } from '@chakra-ui/core';
import useSocialTemplate from '../hooks/useSocialTemplate';

export default function TemplateSelect() {
  const { createTemplate } = useSocialTemplate({ endpoint: '/api/upload' })
  const [item, setItem] = React.useState();
  return (
    <Flex mb={10} w="50%" alignSelf="center">
      <Select value={item} onChange={(e) => setItem(e.target.value)} placeholder="Select template to generate">
        <option value="opengraph">Open Graph</option>
        <option value="twitter-banner">Twitter Banner</option>
        <option value="twitch-banner">Twitch Banner</option>
        <option value="instagram-square">Instagram Square Photo</option>
        <option value="instagram-story">Instagram Story</option>
      </Select>
      <Button onClick={() => createTemplate(item)}>Generate</Button>
    </Flex >

  )
}