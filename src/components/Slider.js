import React, { useState, useEffect, useRef } from "react";
import "./slider.css";

const Slider = ({ children }) => {
  const sliderRef = useRef();
  const [state, setState] = useState({
    width: 0,
    length: 0,
    active: false,
    startPos: 0,
    currIndex: 0,
    currTranslate: 0,
    prevTranslate: 0,
    left: 0,
  });
  const { width, length, active, currIndex, currTranslate } = state;
  const pointers = Array.from({ length }).map((pointer, i) => {
    return (
      <div
        className="pointer"
        key={i}
        style={{ background: currIndex === i ? "#FBC02D" : "#E0E0E0" }}
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
      width: sliderRef.current.offsetWidth,
    }));
  }
  function handleMove(e) {
    if (active) {
      const currentPos = e.type.includes("mouse")
        ? e.pageX
        : e.touches[0].clientX;
      setState((prev) => ({
        ...prev,
        currTranslate: prev.prevTranslate + currentPos - prev.startPos,
      }));
      setTranslateStyle();
    }
  }
  function handleEnd(e) {
    setState((prev) => ({ ...prev, active: false }));
    nextSlide();
    prevSlide();
  }

  function setTranslateStyleByIndex(currIndex) {
    sliderRef.current.style.left = "0";

    sliderRef.current.style.transform = `translateX(${currIndex * -width}px)`;
  }

  function setTranslateStyle() {
    setState((prev) => ({ ...prev, left: prev.currTranslate }));
    sliderRef.current.style.left = `${currTranslate}px`;
  }

  function nextSlide() {
    if (currTranslate < -width / 2.5 && currIndex < length - 1) {
      setState((prev) => ({ ...prev, currIndex: prev.currIndex + 1 }));
    } else if (currTranslate < -width / 2.5 && currIndex === length - 1) {
      setState((prev) => ({ ...prev, currIndex: 0 }));
    }
  }
  function prevSlide() {
    if (state.currTranslate > width / 2.5 && currIndex > 0) {
      setState((prev) => ({ ...prev, currIndex: prev.currIndex - 1 }));
    } else if (state.currTranslate > width / 2.5 && currIndex === 0) {
      setState((prev) => ({ ...prev, currIndex: prev.length - 1 }));
    }
  }

  useEffect(() => {
    if (!active) {
      setState((prev) => ({ ...prev, currTranslate: 0 }));
    }
    setTranslateStyleByIndex(currIndex);
  }, [active]);

  useEffect(() => {
    window.oncontextmenu = function (e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };
    setState((prev) => ({
      ...prev,
      length: Array.from(sliderRef.current.children).length,
      width: sliderRef.current.offsetWidth,
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
        {children}
      </div>
      <div className="pointers">{pointers}</div>
    </div>
  );
};

export default Slider;
