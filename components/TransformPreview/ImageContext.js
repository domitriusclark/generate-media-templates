import React from 'react';
import useTransforms from '../../hooks/useTransforms';

export const ImageContext = React.createContext();

export default function ImageProvider({ children }) {
  const { addTextLayer } = useTransforms();

  const initialImageOps = {
    cloudName: 'testing-hooks-upload',
    publicId: 'test toasts',
    transforms: {
      width: 1200,
      height: 640,
      crop: 'scale',
      transformation: [
        ...addTextLayer({
          text: "Welcome to my tool",
          fontFamily: "Source Sans Pro",
          fontSize: 70,
          gravity: "center",
          x: -70
        })
      ]
    }
  }

  const [imageOps, setImageOps] = React.useState(initialImageOps);
  return (
    <ImageContext.Provider value={[imageOps, setImageOps]}>
      {children}
    </ImageContext.Provider>
  )
}

