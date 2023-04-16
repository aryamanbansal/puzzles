import React, { useState } from 'react'
import './Avatar.css'

type Props = {
     name?: string,
     src?: string,
     alt?: string,
     size?: "sm" | "md" | "lg" | "xl"
}

function Avatar({ name = "", src = "", alt, size = "md", ...props }: Props) {
     const [imageURL, setImageURL] = useState(src);
     const nameInitials = name.split(" ").splice(0, 2).map(word => word[0]);

     return (
          <div className={`avatar ${size || ""}`} {...props}>
               {
                    imageURL ?
                         <img src={imageURL} alt={alt} onError={() => setImageURL("")} />
                         :
                         <p style={{ textTransform: "uppercase" }}>{nameInitials}</p>
               }
          </div >
     )
}

export default Avatar