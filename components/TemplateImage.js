import React from 'react';
import { useImage } from 'use-cloudinary';

export default function TemplateImage({ publicId, transforms }) {
  const { getImage, data, status, error } = useImage({ cloud_name: "testing-hooks-upload" });

  React.useEffect(() => {
    getImage({
      public_id: publicId,
      transform_options: transforms
    })
  }, [])

  if (status === "loading") return <p>Loading...</p>
  if (status === "error") return <p>{error.message}</p>

  return (
    <>
      {data && <img style={{ border: "2px solid black" }} src={data} />}
    </>
  )

}