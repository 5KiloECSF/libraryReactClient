import React, {useState} from "react";
import {FirebaseImage, NetworkImage} from "../../../../Constants/constants";

function SideImage({path}) {
  return <img

      // onClick={()=>setImg()}
      src={path}
      alt="."
      data-image={`${path}`} />;
}

function SideImages({path, setImage,  id}) {
  const setImg=()=>{
    setImage()
  }
  return <li onClick={setImg} className="active">
    <img onClick={()=>setImage()}
        src={path}
        alt="."
        data-image="images/single_2.jpg"
    />
  </li>;
}

function ProductImages ({item}) {

  const [display, setDisplay]= useState(`${item.poster}`);
  console.log("item---",item)
  console.log("display---",display)
  console.log("img==",item.image)
  console.log("img--Poster==",item.poster)

  const images = item.image.images!== undefined?
    item.image.images.map( img=>
        <SideImages  id={img.id}  setImage={()=>setDisplay(FirebaseImage(item.image, img))}   path={FirebaseImage(item.image, img)}/>
    ):""

    return (
      <div className="col-lg-7">
        <div className="single_product_pics">
          <div className="row">
            <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
              <div className="single_product_thumbnails">
                <ul>
                  {/*  ----------- primary image  --------*/}
                  <li onClick={()=>setDisplay(item.poster)}>
                    <SideImage path={item.poster}/>
                  </li>
                  {images}

                </ul>
              </div>
            </div>
            {/* ---------------   Main IMage  ---------------*/}
            <div className="col-lg-9 image_col order-lg-2 order-1">
              <div className="single_product_image">
                <div
                    className="single_product_image_background"
                    style={{
                      backgroundImage: `url(${display})`
                    }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default ProductImages;
