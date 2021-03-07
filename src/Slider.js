import React, { useState, useEffect, useRef } from "react";
import first from "./assets/img/1.jpg";
import second from "./assets/img/2.jpg";
import third from "./assets/img/3.jpg";
import "./slider.css";

export default function Slider() {
  const sliderRef = useRef();
  const slideRef = useRef();
  const [state, setState] = useState({
    width: 0,
    length: 0,
    active: false,
    startPos: 0,
    currIndex: 0,
    currTranslate: 0,
    prevTranslate: 0,
  });
  const pointers = Array.from({ length: state.length }).map((pointer, i) => {
    return (
      <div
        className="pointer"
        key={i}
        style={{ background: state.currIndex === i ? "#FBC02D" : "#E0E0E0" }}
        onClick={() => {
          setState((prev) => ({ ...prev, currIndex: i }));
          setTranslateStyleByIndex(i);
        }}
      ></div>
    );
  });
  function handleStart(e) {
    const coords = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    setState((prev) => ({
      ...prev,
      active: !prev.active,
      startPos: coords,
      width: slideRef.current.offsetWidth,
    }));
  }
  function handleMove(e) {
    if (state.active) {
      const currentPos = e.type.includes("mouse")
        ? e.pageX
        : e.touches[0].clientX;
      setState((prev) => ({
        ...prev,
        currTranslate: state.prevTranslate + currentPos - prev.startPos,
      }));
    }
    setTranslateStyle();
  }
  function handleEnd(e) {
    setState((prev) => ({ ...prev, active: false }));
    nextSlide();
    prevSlide();
  }

  function setTranslateStyleByIndex(currIndex) {
    sliderRef.current.style.left = "0";
    sliderRef.current.style.transform = `translateX(${
      currIndex * -state.width
    }px)`;
  }

  function setTranslateStyle() {
    sliderRef.current.style.left = `${state.currTranslate}px`;
  }

  function nextSlide() {
    if (state.currTranslate < -100 && state.currIndex < state.length - 1) {
      setState((prev) => ({ ...prev, currIndex: prev.currIndex + 1 }));
    } else if (
      state.currTranslate < -100 &&
      state.currIndex === state.length - 1
    ) {
      setState((prev) => ({ ...prev, currIndex: 0 }));
    }
  }
  function prevSlide() {
    if (state.currTranslate > 100 && state.currIndex > 0) {
      setState((prev) => ({ ...prev, currIndex: prev.currIndex - 1 }));
    } else if (state.currTranslate > 100 && state.currIndex === 0) {
      setState((prev) => ({ ...prev, currIndex: prev.length - 1 }));
    }
  }

  useEffect(() => {
    if (!state.active) {
      setState((prev) => ({ ...prev, currTranslate: 0 }));
    }
    setTranslateStyleByIndex(state.currIndex);
  }, [state.active]);

  useEffect(() => {
    window.oncontextmenu = function(e) {
      e.preventDefault();
      e.stopPropagation()
      return false
    }
    setState((prev) => ({
      ...prev,
      length: Array.from(sliderRef.current.children).length,
      width: slideRef.current.offsetWidth,
    }));
  }, []);

  return (
    <div className="container">
      <div
        className="slider"
        ref={sliderRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div className="slide" ref={slideRef}>
          <div className="slide__content">
            <h3 className="slide__title">Phasellus vel sollicitudin mi.</h3>
          </div>
          <img src={first} alt="image" className="slide__image" />
        </div>
        <div className="slide slide__text">
          <h3 className="slide__heading">
            Vestibulum facilisis lacus ut volutpat suscipit. Phasellus vel
            sollicitudin mi.
          </h3>
        </div>
        <div className="slide">
          <div className="slide__content">
            <h3 className="slide__title">Vestibulum facilisis lacus.</h3>
          </div>
          <img src={second} alt="image" className="slide__image" />
        </div>
        <div className="slide slide__text slide--red">
          <h3 className="slide__heading">
            Vestibulum facilisis lacus ut volutpat suscipit. Phasellus vel
            sollicitudin mi.
          </h3>
        </div>
        <div className="slide">
          <img src={third} alt="image" className="slide__image" />
        </div>
      </div>
      <div className="pointers">{pointers}</div>
    </div>
  );
}
