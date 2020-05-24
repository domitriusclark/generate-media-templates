import { useMutation } from 'react-query';
import { useCloudinary } from 'use-cloudinary';


export default function useSocialTemplate({ endpoint = '', cloudName = '' } = {}) {
  const { cld } = useCloudinary({ cloud_name: cloudName });

  const [uploadTemplate] = useMutation(async ({ uploadOptions, templateOps }) => {
    const canvas = document.createElement('canvas');
    canvas.width = templateOps.width;
    canvas.height = templateOps.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#FFF";
    ctx.fillRect(0, 0, templateOps.width, templateOps.height);
    const res = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({
        eager: uploadOptions.eager || {},
        tags: uploadOptions.tags,
        public_id: uploadOptions.public_id,
        file: canvas.toDataURL("img/png")
      })
    })

    return res.json()
  })

  async function createTemplate(social) {
    switch (social) {
      case 'opengraph':
        await uploadTemplate({
          uploadOptions: {
            public_id: `${social}`,
            tags: [`${social}-template`, "template"],
          },
          templateOps: {
            width: 1200,
            height: 630
          }
        })
        break;

      case 'twitter-banner':
        await uploadTemplate({
          uploadOptions: {
            public_id: `${social}`,
            tags: [`${social}-template`, "template"],
          },
          templateOps: {
            width: 1500,
            height: 500
          }
        })
        break;
      case 'twitch-banner':
        await uploadTemplate({
          uploadOptions: {
            public_id: `${social}`,
            tags: [`${social}-template`, "template"],
          },
          templateOps: {
            width: 1200,
            height: 480
          }
        })
        break;
      case 'instagram-square':
        await uploadTemplate({
          uploadOptions: {
            public_id: `${social}`,
            tags: [`${social}-template`, "template"],
          },
          templateOps: {
            width: 1080,
            height: 1080
          }
        })
        break;
      case 'instagram-story':
        await uploadTemplate({
          uploadOptions: {
            public_id: `${social}`,
            tags: [`${social}-template`, "template"],
          },
          templateOps: {
            width: 1080,
            height: 1920
          }
        })
        break;
    }
  }

  function customizeTemplate(type, transform_options) {
    const transformation = [{ ...transform_options }]
    const newTransformLayer = transform_options.layers ? transform_options.layers.reduce((acc, element) => acc.concat(element), transformation) : transformation;
    return cld.url(`${type}`, {
      transformation: newTransformLayer
    })
  }

  return {
    createTemplate,
    customizeTemplate,
  }

}

