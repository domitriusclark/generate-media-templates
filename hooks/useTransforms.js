import { useCloudinary } from 'use-cloudinary';
import { v4 as uuidv4 } from 'uuid';

export default function useTransforms() {
  const { cloudinaryCore } = useCloudinary();

  const addTextLayer = ({
    text,
    font,
    fontSize,
    lineSpacing,
    fontWeight,
    width,
    gravity,
    x,
    y,
    crop,
    color
  }) => {
    return [
      {
        id: uuidv4(),
        overlay: new cloudinaryCore.TextLayer()
          .fontFamily(font)
          .fontSize(fontSize)
          .text(text)
          .fontWeight(fontWeight)
          .lineSpacing(lineSpacing),
        gravity,
        width,
        x,
        y,
        crop,
        color
      }
    ]
  }

  const addTextTagsLogo = ({ text, tags, logo, logoGravity }) => {
    return [
      { border: '4px_solid_black' },
      // generate the title
      {
        overlay: new cloudinaryCore.TextLayer().fontFamily(text.fontFamily || "Times").fontSize(text.fontSize || 32).text(text.text || ''),
        gravity: text.gravity || 'center',
        x: text.x || 0,
        y: text.y || 0
      },
      // generate subtext
      {
        overlay: new cloudinaryCore.TextLayer().fontFamily(tags.fontFamily || "Times").fontSize(tags.fontSize || 16).text(tags.text || ''),
        gravity: tags.gravity || 'center',
        y: 50
      },
      // grab and place the logo from cloudinary 
      {
        overlay: logo === true ? new cloudinaryCore.Layer().publicId('logo') : '',
        gravity: logoGravity || "center",
        y: 100
      },
    ]
  }

  return {
    addTextLayer,
    addTextTagsLogo
  }
}