
import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import styled from '@emotion/styled';

function Slides({
  syncWindowLocationHash = true,
  transitionTime = 1000,
  currentSlideIndex = 0,
  tempSlideIndex, // 当用户通过touch事件滑动时,临时的拖动程度
  onWheel,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  children,
}, ref) {
  console.log("Slides run")

  // const syncWindowLocationHash = props.syncWindowLocationHash || true;
  // const transitionTime = Number(props.transitionTime) || 1000
  // const currentSlideIndex = props.currentSlideIndex || 0;
  // const tempSlideIndex = props.tempSlideIndex
  // const onWheel = props.onWheel;
  // const {
    //   onTouchStart,
    //   onTouchMove,
    //   onTouchEnd
    // } = props;

    // const _numOfSlides = props.num || React.Ch.count(props.children);




  // useEffect(() => {
  //   // goToSlide(props.currentSlideIndex)
  //   setCurrentSlideIndex(props.currentSlideIndex)
  // },[props.currentSlideIndex])








  const goToSlide = (slideIndex) => {
    // console.log("gotoslide", slideIndex)
    // console.log("iscrolling: ", _isScrolling.current)
    // if (_isScrolling.current) return false;
    // // _isScrolling.current = true;
    // if (slideIndex < 0 || slideIndex > _numOfSlides) {
    //   _isScrolling.current = false;
    //   // 返回零代表到达边界
    //   return 0;
    // }

    // setCurrentSlideIndex(slideIndex);
  }

  useImperativeHandle(ref, () => ({
    // _isScrolling,
    currentSlideIndex,
    goToSlide,
    getAlert() {
      console.log("alert from child")
    }
  }))

  return (
    <Outer
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
    >
      <Inner transitionTime={`${transitionTime / 1000}s`} translate3dY={`-${100 * (tempSlideIndex || currentSlideIndex)}%`}
        // onTransitionEnd={() => ontransitionend()}
      >
        {
          // 遍历所有child,不是Slide则在外层套一层Slide.
          React.Children.map(children, (child, index) => {
            // https://stackoverflow.com/questions/55729582/check-type-of-react-component
            if (child.type === Slide) {
              return child
            } else {
              return (
                <Slide index={child.props.index || index}>
                  {child}
                </Slide>
              )
            }
          })
        }
      </Inner>
    </Outer>
  )
}

export default React.forwardRef(Slides)

const Outer = styled.div`
width: 100%;
height: 100%;
overflow: hidden;
display: flex;
flex-direction: column;
`

const Inner = styled.div`
background-color: #000;
width: 100%;
height: 100%;
position: relative;
transition: transform ${props => props.transitionTime || "1s"};
transform: translate3d(0, ${props => props.translate3dY || 0}, 0);
`

export const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: ${props => props.index * 100}%;
  // transform: translate3d(0, -${props => props.index * 100}% ,0);
`

