import React from 'react';
import { useImage } from 'use-cloudinary';

export default function TemplateImage({ publicId, transformations, alt }) {
  const { generateUrl, url, status, error } = useImage({ cloudName: "testing-hooks-upload" });

  React.useEffect(() => {
    generateUrl({
      publicId,
      transformations
    })
  }, [publicId])

  if (status === "loading") return <p>Loading...</p>
  if (status === "error") return <p>{error.message}</p>

  return (
    <>
      {url && <img style={{ border: "2px solid black" }} src={url} alt={alt} />}
    </>
  )

}