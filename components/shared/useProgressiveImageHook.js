import React, { useState, useEffect } from 'react';

const useProgressiveImageHook = src => {  
  const [sourceLoaded, setSourceLoaded] = useState(null)
  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setSourceLoaded(src)
  }, [src])

  return sourceLoaded 
}
export default useProgressiveImageHook;