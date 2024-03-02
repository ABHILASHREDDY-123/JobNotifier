import { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { sliderImages } from "./images";
function App() {
   
  return (
    <div className="app">
      <SimpleImageSlider
        width={"100%"}
        height={"88%"}
        images={sliderImages}
        showBullets={true}
        showNavs={true}
        autoPlay={true}
      />
    </div>
  );
}

export default App;
