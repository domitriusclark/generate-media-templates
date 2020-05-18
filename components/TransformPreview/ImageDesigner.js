import React from 'react';

import useSocialTemplate from '../../hooks/useSocialTemplate';
import useTransforms from '../../hooks/useTransforms';

import {
  Flex,
  Button,
  ButtonGroup,
  Box,
  Input
} from '@chakra-ui/core';

import OverlayTextForm from './OverlayTextForm';
import ImageForm from './ImageForm';

function ImageConfig({ store, updateCloudName, updatePublicId }) {
  const [inputs, setInputs] = React.useState({
    cloudName: store.cloudName,
    publicId: store.publicId
  });

  React.useEffect(() => {
    setTimeout(() => updateCloudName(inputs.cloudName), 500)
  }, [inputs.cloudName])

  React.useEffect(() => {
    setTimeout(() => updatePublicId(inputs.publicId), 500)
  }, [inputs.publicId])

  return (
    <Flex mb={8}>
      <Input
        onChange={e => {
          e.persist()
          setInputs(prev => ({ ...prev, cloudName: e.target.value }))
        }}
        type="text"
        value={inputs.cloudName}
      />
      <Input
        onChange={e => {
          e.persist()
          setInputs(prev => ({ ...prev, publicId: e.target.value }))
        }}
        type="text"
        value={inputs.publicId}
      />
    </Flex>
  )
}

const UPDATE_CLOUD_NAME = "UPDATE_CLOUD_NAME";
const UPDATE_PUBLIC_ID = "UPDATE_PUBLIC_ID"
const UPDATE_IMAGE_OPTIONS = "UPDATE_IMAGE_OPTIONS";
const UPDATE_TRANSFORM_OPTIONS = "UPDATE_TRANSFORM_OPTIONS";
const ADD_TEXT_OVERLAY = "ADD_TEXT_OVERLAY";

export default function ImageDesigner() {
  const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_CLOUD_NAME:
        return {
          ...state,
          cloudName: action.cloudName
        }
      case UPDATE_PUBLIC_ID:
        return {
          ...state,
          publicId: action.publicId
        }
      case UPDATE_IMAGE_OPTIONS:
        return {
          ...action.newImage
        }
      case UPDATE_TRANSFORM_OPTIONS:
        return {
          ...state,
          transforms: {
            ...state.transforms,
            [action.transform.type]: action.transform.value
          }
        }
      case ADD_TEXT_OVERLAY:
        return {
          ...state,
          transforms: {
            ...state.transforms,
            transformations: [
              ...state.transforms.transformations,
              ...action.options
            ]
          }
        }
      case UPDATE_TEXT_OVERLAY:
        return {
          ...state,
          transforms: {
            ...state.transforms,
            transformations: [...state.transforms.transformations.filter(overlay => overlay.id === action.options.id), ...action.options]
          }
        }
      default:
        return {
          ...state
        }
    }
  };

  const initialState = {
    cloudName: 'testing-hooks-upload',
    publicId: 'test toasts',
    transforms: {
      width: 1200,
      height: 640,
      crop: 'scale',
    }
  };

  const [store, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    setUrl(customizeTemplate(store.publicId, store.transforms))
  }, [store])

  const { addTextLayer } = useTransforms();

  const updateCloudName = (cloudName) => dispatch({ type: UPDATE_CLOUD_NAME, cloudName });
  const updatePublicId = (publicId) => dispatch({ type: UPDATE_PUBLIC_ID, publicId });
  const updateTransform = (transform) => dispatch({ type: UPDATE_TRANSFORM_OPTIONS, transform });
  const updateImageOptions = (newImage) => dispatch({ type: UPDATE_IMAGE_OPTIONS, newImage })
  const addTextOverlay = (options = {
    text: "Your text here",
    font: "Times",
    fontSize: 32,
    lineSpacing: -10,
    fontWeight: "semibold",
    width: 400,
    gravity: "center",
    x: 0,
    y: 0,
    crop: "scale",
    color: "black"
  }) => {
    const textLayer = addTextLayer(options)
    dispatch({ type: ADD_TEXT_OVERLAY, textLayer })
  };
  const updateTextOverlay = (updatedOverlay) => {
    dispatch({ type: UPDATE_TEXT_OVERLAY, updatedOverlay })
  }


  const [url, setUrl] = React.useState();

  const { customizeTemplate } = useSocialTemplate({ cloudName: store.cloudName })


  return (
    <Flex mt={8} direction="column" >
      <ImageConfig store={store} updateCloudName={updateCloudName} updatePublicId={updatePublicId} />
      <Box alignSelf="center">
        <img src={url} alt="Template to edit" />
      </Box>
      <ImageForm store={store} updateTransform={updateTransform} />
      {store.transforms.transformations && store.transforms.transformations.map((textOverlay) => (
        <OverlayTextForm textOverlay={textOverlay} updateTextOverlay={updateTextOverlay} />
      ))}
      <ButtonGroup alignSelf="center" mt={12}>
        <Button width="200px" onClick={() => addTextOverlay()} >
          Add Text
        </Button>
        <Button width="200px">
          Add Image
        </Button>
        <Button width="200px"
          onClick={() => updateImageOptions(store)} >
          Apply
        </Button>
      </ButtonGroup>
    </Flex >
  )
}