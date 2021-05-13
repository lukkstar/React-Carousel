import React, { useState } from 'react';
import ImgComp from './ImgComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import './carousel.scss';
import i1 from './pics/1.jpg';
import i2 from './pics/2.jpg';
import i3 from './pics/3.jpg';
import i4 from './pics/4.jpg';
import i5 from './pics/5.jpg';

function Carousel() {
  const [x, setX] = useState(0);
  const goLeft = () => {
    x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100);
  };
  const goRight = () => {
    x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100);
  };
  const goToX = index => {
    setX(-100 * index);
  };

  let startX;
  let currentX;
  const handleTouchStart = e => {
    startX = e.touches[0].clientX;
  };

  const handleEnd = e => {
    if (startX - currentX >= 200) {
      goRight();
    }
    if (currentX - startX >= 200) {
      goLeft();
    }
    currentX = undefined;
    startX = undefined;
  };
  const handleTouchMove = e => {
    currentX = e.touches[0].clientX;
  };

  const handleDragStart = e => {
    var emptyImage = document.createElement('img');
    emptyImage.src =
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    e.dataTransfer.setDragImage(emptyImage, 0, 0);
    startX = e.clientX;
    return false;
  };

  const handleDragMove = e => {
    var emptyImage = document.createElement('img');
    emptyImage.src =
      'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    e.dataTransfer.setDragImage(emptyImage, 0, 0);
    currentX = e.clientX;
  };
  const handleDragOver = e => {
    e.preventDefault();
  };

  let sliderArr = [
    <ImgComp src={i1} />,
    <ImgComp src={i2} />,
    <ImgComp src={i3} />,
    <ImgComp src={i4} />,
    <ImgComp src={i5} />,
  ];
  return (
    <>
      <div
        className="slider"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
        onDragStart={handleDragStart}
        onDrag={handleDragMove}
        onDragEnd={handleEnd}
        onDragOver={handleDragOver}
      >
        {sliderArr.map((item, index) => {
          return (
            <div
              className="slide"
              key={index}
              style={{ transform: `translateX(${x}%)` }}
            >
              {item}
            </div>
          );
        })}
        <div className="dotsBlock">
          {sliderArr.map((_, index) => {
            return (
              <div className="dots" key={index}>
                <FontAwesomeIcon
                  icon={faMinus}
                  color={index === x / -100 ? 'white' : '#263238'}
                  onClick={() => goToX(index)}
                />
              </div>
            );
          })}
        </div>

        <button className="goLeft" onClick={goLeft}>
          <FontAwesomeIcon className="arrows" icon={faChevronLeft} />
        </button>
        <button className="goRight" onClick={goRight}>
          <FontAwesomeIcon className="arrows" icon={faChevronRight} />
        </button>
      </div>
    </>
  );
}

export default Carousel;
