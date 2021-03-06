import React from 'react';

import useSocialTemplate from '../hooks/useSocialTemplate';
import useTransforms from '../hooks/useTransforms';

import useImageReducer, {
  UPDATE_TRANSFORM_OPTIONS,
  ADD_TEXT_OVERLAY,
  UPDATE_PUBLIC_ID,
  UPDATE_CLOUD_NAME,
  UPDATE_TEXT_OVERLAY
} from '../hooks/useImageReducer';

import {
  Flex,
  Button,
  ButtonGroup,
  Box,
  Text
} from '@chakra-ui/core';

import OverlayTextForm from './OverlayTextForm';
import ImageForm from './ImageForm';
import ImageConfig from './ImageConfig';
import Templates from './Templates';
import TemplateSelect from './TemplateSelect';

export default function ImageDesigner() {
  const [url, setUrl] = React.useState();

  const [store, dispatch] = useImageReducer()
  const { customizeTemplate } = useSocialTemplate({ cloudName: store.cloudName })
  const { addTextLayer } = useTransforms();

  React.useEffect(() => {
    setUrl(customizeTemplate(store.publicId, store.transforms))
  }, [store])

  const updateCloudName = (cloudName) => dispatch({ type: UPDATE_CLOUD_NAME, cloudName });
  const updatePublicId = (publicId) => dispatch({ type: UPDATE_PUBLIC_ID, publicId });
  const updateTransform = (transform) => dispatch({ type: UPDATE_TRANSFORM_OPTIONS, transform });
  const addTextOverlay = (options = {
    text: "Your text here",
    fontFamily: "Times",
    fontSize: 32,
    lineSpacing: -10,
    fontWeight: "semibold",
    gravity: "center",
    x: 0,
    y: 0,
    crop: "scale",
    color: "black"
  }) => {
    const layer = addTextLayer(options)
    dispatch({ type: ADD_TEXT_OVERLAY, layer })
  };
  const updateTextOverlay = (updatedOverlay) => {
    dispatch({ type: UPDATE_TEXT_OVERLAY, updatedOverlay })
  }

  return (
    <Flex mt={8} direction="column" >
      <TemplateSelect />
      <Templates updatePublicId={updatePublicId} updateTransform={updateTransform} />
      <ImageConfig store={store} updateCloudName={updateCloudName} updatePublicId={updatePublicId} />
      <Box alignSelf="center" border="1px solid black">
        <img src={url} alt="Template to edit" />
      </Box>
      <Box w="60%" alignSelf="center">
        <Text textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" mt={8}>{url}</Text>
      </Box>

      <ImageForm store={store} updateTransform={updateTransform} />
      {store.transforms.layers && store.transforms.layers.map((textOverlay) => (
        <OverlayTextForm textOverlay={textOverlay} updateTextOverlay={updateTextOverlay} />
      ))}
      <ButtonGroup alignSelf="center" mt={12}>
        <Button width="200px" onClick={() => addTextOverlay()} >
          Add Text
        </Button>
      </ButtonGroup>
    </Flex >
  )
}