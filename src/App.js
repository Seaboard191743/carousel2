import React from "react";
import Slide from "./slides/Slide";
import Slider from "./slider/Slider";

import first from "./assets/img/1.jpg";
import second from "./assets/img/2.jpg";
import third from "./assets/img/3.jpg";
import ocean from "./assets/video/ocean.mp4";

const App = () => {
  return (
    <Slider>
      <Slide>
        <div className="slide">
          <div className="slide__content">
            <h3 className="slide__title">Phasellus vel sollicitudin mi.</h3>
          </div>
          <img src={first} alt="image" className="slide__image" />
        </div>
      </Slide>
      <Slide>
        <div className="slide">
          <h3 className="slide__heading">
            Vestibulum facilisis lacus ut volutpat suscipit. Phasellus vel
            sollicitudin mi.
          </h3>
        </div>
      </Slide>
      <Slide>
        <div className="slide">
          <video
            className="slide__video"
            src={ocean}
            autoPlay
            muted
            loop
          ></video>
        </div>
      </Slide>
      <Slide>
        <div className="slide">
          <div className="slide__content">
            <h3 className="slide__title">Vestibulum facilisis lacus.</h3>
          </div>
          <img src={second} alt="image" className="slide__image" />
        </div>
      </Slide>
      <Slide>
        <div className="slide">
          <img src={third} alt="image" className="slide__image" />
        </div>
      </Slide>
    </Slider>
  );
};

export default App;
