import React from 'react';
import useTransforms from './useTransforms';

export const UPDATE_CLOUD_NAME = "UPDATE_CLOUD_NAME";
export const UPDATE_PUBLIC_ID = "UPDATE_PUBLIC_ID"
export const UPDATE_IMAGE_OPTIONS = "UPDATE_IMAGE_OPTIONS";
export const UPDATE_TRANSFORM_OPTIONS = "UPDATE_TRANSFORM_OPTIONS";
export const ADD_TEXT_OVERLAY = "ADD_TEXT_OVERLAY";
export const UPDATE_TEXT_OVERLAY = "UPDATE_TEXT_OVERLAY"

export default function useImageReducer() {

  const { addTextLayer } = useTransforms();

  function omit(obj, omitKey) {
    return Object.keys(obj).reduce((result, key) => {
      if (key !== omitKey) {
        result[key] = obj[key];
      }
      return result;
    }, {});
  }

  const updateTextLayer = (state, action) => {
    const layer = state.transforms.layers.find(tf => tf.id === action.updatedOverlay.id)

    console.log(layer)

    const options = { ...layer.overlay.options }

    const baseLayerOps = layer.overlay ? omit(layer, "overlay") : {}

    const cleanLayer = {
      ...baseLayerOps,
      ...options,
      [action.updatedOverlay.transform]: action.updatedOverlay.value
    }

    const removedLayerArr = state.transforms.layers.filter(tf => {
      return tf.id !== action.updatedOverlay.id
    })

    console.log(removedLayerArr);

    return {
      ...state,
      transforms: {
        ...state.transforms,
        layers: [
          ...removedLayerArr,
          {
            ...addTextLayer({
              ...omit(cleanLayer, 'id')
            })
          }
        ]
      }
    }
  }

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
            [action.transform.transform]: action.transform.value
          }
        }
      case ADD_TEXT_OVERLAY:
        return {
          ...state,
          transforms: {
            ...state.transforms,
            layers: !state.transforms.layers ? [action.layer] : state.transforms.layers.concat(action.layer)
          }
        }
      case UPDATE_TEXT_OVERLAY:
        return {
          ...updateTextLayer(state, action)
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



  return [store, dispatch]
}

