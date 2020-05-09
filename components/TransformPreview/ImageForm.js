import React from 'react';

import { ImageContext } from './ImageContext';
import useSocialTemplate from '../../hooks/useSocialTemplate';

import {
  TRANSFORM_CROP,
  TRANSFORM_QUALITY,
  TRANSFORM_FORMAT
} from '../../utils';

import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Text,
  Button,
  Input
} from '@chakra-ui/core';

function TransformOptionSelect({ transform, options, setOptions, type, defaultOption, value, }) {
  return (
    <label>
      {type.label}
      <Select
        onChange={e => setOptions({
          transforms: {
            ...options.transforms,
            [transform]: e.target.value
          }
        })}
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

function NumberSelect({ options, setOptions, defaultValue, value, transform }) {
  return (
    <label>
      {transform}
      <NumberInput size="md" defaultValue={defaultValue} value={value}>
        <NumberInputField onChange={e => setOptions({
          transforms: {
            ...options.transforms,
            [transform]: e.target.value
          }
        })} />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </label>
  )
}

export default function ImageForm() {
  const [imageOps, setImageOps] = React.useContext(ImageContext);
  console.log(imageOps);

  const [newOps, setNewOps] = React.useState({
    ...imageOps
  });
  console.log(newOps)

  const [url, setUrl] = React.useState();

  const { customizeTemplate } = useSocialTemplate({ cloudName: imageOps.cloudName })

  React.useEffect(() => {
    setUrl(customizeTemplate(imageOps.publicId, imageOps.transforms))
  }, [imageOps])

  return (
    <Flex mt={8} direction="column">
      <Flex mb={8}>
        <Input onChange={e => setImageOps(prevState => ({
          ...prevState,
          cloudName: e.target.value
        }))} type="text" value={imageOps.cloudName} />
        <Input onChange={e => setImageOps(prevState => ({
          ...prevState,
          cloudName: e.target.value
        }))} type="text" value={imageOps.publicId} type="text" />
      </Flex>
      <img src={url} alt="Template to edit" />
      <Text mt={8} as="h2">Image Options</Text>
      <Flex justifyContent="space-evenly">
        <NumberSelect options={newOps} setOptions={setNewOps} defaultValue={imageOps.transforms.width} value={newOps.width} transform="width" />
        <NumberSelect options={newOps} setOptions={setNewOps} defaultValue={imageOps.transforms.width} value={newOps.width} transform="height" />
        <TransformOptionSelect options={newOps} setOptions={setNewOps} type={TRANSFORM_QUALITY} defaultOption="auto" transform="quality" />
        <TransformOptionSelect options={newOps} setOptions={setNewOps} type={TRANSFORM_CROP} defaultOption="scale" transform="crop" />
        <TransformOptionSelect options={newOps} setOptions={setNewOps} type={TRANSFORM_FORMAT} defaultOption="auto" transform="format" />
      </Flex>
      <Button alignSelf="center" mt={12} width="300px"
        onClick={() => setImageOps(prevState => {
          return {
            ...prevState,
            ...newOps
          }
        }
        )}>
        Apply
      </Button>
    </Flex >
  )

}