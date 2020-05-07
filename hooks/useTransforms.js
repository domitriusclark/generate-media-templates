import { useCloudinary } from 'use-cloudinary';

export default function useTransforms() {
  const { cloudinaryCore } = useCloudinary();

  const addTextLayer = ({ border, fontFamily, fontSize, text, gravity, x, y }) => {
    return [
      {
        border: border || null
      },
      {

        overlay: new cloudinaryCore.TextLayer().fontFamily(fontFamily || "Times").fontSize(fontSize || 32).text(text || ''),
        gravity: gravity || 'center',
        x: x || null,
        x: y || null
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
        x: text.x || null,
        y: text.y || null
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