import React from 'react';

import ImageProvider from './ImageContext'
import ImageForm from './ImageForm';
import OverlayImageForm from './OverlayImageForm';
import OverlayImageButton from './OverlayImageButton';
import OverlayTextForm from './OverlayTextForm';
import OverlayTextbutton from './OverlayTextbutton';
import OptionsForm from './OptionsForm';

import {
  Flex
} from '@chakra-ui/core';



export default function TransformPreview() {

  return (
    <ImageProvider>
      <Flex direction="column">
        <ImageForm />
      </Flex>
    </ImageProvider>
  )
}



/*

--> TODO <--
1. capture multiple fields ie
  - public id
  - cloud name
  - image --> width | height | crop | quality | format
  - text --> gravity | x & y positions | font | font size | font weight | color
  - image layer --> public id | gravity | x & y positions | width | height | quality | format

2. Once we've captured the above, how do we update a preview without making requests over and over?
  - maybe we can create a diff on the URL and update?

3. Add default example buttons that map common patterns for social media card
  - OG: Image design
  - Basic

Components -->

Container
Image Preview
ImageForm
OverlayTextForm
OverlayImageForm
ButtonGroup === OverlayTextbutton | OverlayImageButton | Upload

NOTES:
- We do not want to update the image with transforms or a new image until we choose, not on every update
- Might need a context to update a "master config" to submit changes to the image

*/