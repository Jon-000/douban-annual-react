
import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import styled from '@emotion/styled';

function Slides({
  syncWindowLocationHash = false,
  transitionTime = 1000,
  initSlideIndex = 0,
  // tempSlideIndex, // 当用户通过touch事件滑动时,临时的拖动程度
  // onWheel,
  // onTouchStart,
  // onTouchMove,
  // onTouchEnd,
  onIsGoingWillEnd,
  children,
  numOfSlides = React.Children.count(children) // if not provided, caculate using React.Children.count()
}, ref) {
  console.log("Slides run")

  const shouldRenderslideIndex = (currentSlideIndex, numOfSlides) => {
    const shouldGetIndexArray = [
      currentSlideIndex,
      currentSlideIndex + 1,
      currentSlideIndex - 1,
      currentSlideIndex + 2
    ]

    const removeInvalidIndex =
      shouldGetIndexArray.filter((i) => i >= 0 && i <= numOfSlides)
    return removeInvalidIndex;
  }

    /**
   * 如果同步currentSlideIndex和window.location.hash
   * 则
   */
   const getCurrentSlideIndexFromWindowLocationHash = () => {
    // 根据浏览器地址决定currentSlideIndex的值
    const re = /#[0-9]\d*\b/g;
    if (window.location.hash.match(re) !== null) {
      const numStr = window.location.hash.match(re)[0].substring(1);
      const num = Number(numStr);
      return num
    }
  }
  // const [currentPageIndex, setCurrentPageIndex] = useState(() => {
  //   const source1 = getCurrentSlideIndexFromWindowLocationHash();
  //   const sourceDefault = 0;
  //   return source1 || sourceDefault;
  // });

  useEffect(() => {
    if (syncWindowLocationHash) {
      function hashchangeHandler(evt) {
        console.log("hashchageHandler: ")
        console.log(getCurrentSlideIndexFromWindowLocationHash())
        setCurrentSlideIndex(getCurrentSlideIndexFromWindowLocationHash())
      }
      window.addEventListener("hashchange", hashchangeHandler, false);
      return () => {
        window.removeEventListener("hashchange", hashchangeHandler, false);
      }
    }
  }, [])

  const innerRef = useRef(null);
  const _isGoing = useRef(false);
  // const [prevSlideIndex, setPrevSlideIndex] = useState(undefined)
  // if (currentSlideIndex !== prevSlideIndex) {
  //   setPrevSlideIndex(currentSlideIndex);
  // }
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => {
    const source1 = initSlideIndex;
    const source2 = getCurrentSlideIndexFromWindowLocationHash()
    const sourceDefault = 0;
    if (syncWindowLocationHash) {
      return source2 || source1 || sourceDefault
    }
    return source1 || sourceDefault;
  })

  const _transitonTime = useRef(undefined);
  // This is the core function of this component,
  // Never change `currentSlideIndex` directly by `setCurrentSlideIndex`, using this method instead.
  const goToSlide = (slideIndex, t = transitionTime) => {
    console.log(`_isGoing while attempt goToSlide ${slideIndex}: `, _isGoing.current)
    if (_isGoing.current) return;

    if (slideIndex < 0 || slideIndex > numOfSlides) {
      _isGoing.current = false;
      // 返回零代表到达边界
      return 0;
    }

    _isGoing.current = true;

    _transitonTime.current = t
    setCurrentSlideIndex(slideIndex);
    setTimeout(() => {
      if (onIsGoingWillEnd) {
        onIsGoingWillEnd()
      }
      if (syncWindowLocationHash) {
        window.location.hash = `#${slideIndex}`
      }

      _transitonTime.current = undefined;
      _isGoing.current = false;
    }, _transitonTime.current);
  }

  // ontranstionEnd will not get called if transtionTime=0
  // const transtionEndHandler = (evt) => {
  //   console.log("transtionEndHandler run")
  //   _transitonTime.current = undefined;
  //   _isGoing.current = false;
  // }


  // cb = (currenSlideIndex) => nextSlideIndex
  const goToSlideHoF = (cb, ...rest) => {
    return goToSlide(
      cb(currentSlideIndex),
      ...rest
    )
  }



  const handleWheel = (evt) => {
    console.log("_isGoing while handleWheel: ", _isGoing.current)
    if (_isGoing.current) return;
    if (evt.deltaY > 0) {
      goToSlide(currentSlideIndex + 1)
    } else {
      goToSlide(currentSlideIndex - 1)
    }
  }




  const [tempSlideIndex, setTempSlideIndex] = useState();
  const _touchStartPoint = useRef(null);
  const handleTouchStart = (evt) => {
    // evt.preventDefault()
    _touchStartPoint.current = {
      clientY: evt.changedTouches[0].clientY,
      clientX: evt.changedTouches[0].clientX
    }
  }

  // MDN: since calling preventDefault() on a touchstart or the first touchmove event of a series prevents the corresponding mouse events from firing, it's common to call preventDefault() on touchmove rather than touchstart. That way, mouse events can still fire and things like links will continue to work. Alternatively, some frameworks have taken to refiring touch events as mouse events for this same purpose. 
  const handleTouchMove = (evt) => {
    // 啊哈,这句对29滚动很重要啊! 对性能也很有效果
    if (
      Math.abs((evt.touches[0].clientY - _touchStartPoint.current.clientY) /
        (evt.touches[0].clientX - _touchStartPoint.current.clientX)) < 1
    ) {
      return; // 水平方向上不作为
    }
    // 垂直方向上
    // evt.preventDefault();
    // console.log("handle touchmove",
    //   evt.touches[0].clientY
    // )
    let moveY = evt.touches[0].clientY - _touchStartPoint.current.clientY
    let y = moveY / window.innerHeight
    setTempSlideIndex(currentSlideIndex - y)
  }

  const handleTouchEnd = (evt) => {
    // console.log("handle touchend",
    //   evt.touches[0]
    // )
    let moveY = evt.changedTouches[0].clientY - _touchStartPoint.current.clientY
    let y = moveY / window.innerHeight
    if (y < -0.1) {
      // y方向位移小于一定负值,则向下翻页
      // setCurrentPageIndex(p => p + 1)
      goToSlide(currentSlideIndex + 1)
    } else if (y > 0.1) {
      // y方向位移大于一定正值,则向上翻页transitionTime
      // setCurrentPageIndex(p => p - 1)
      goToSlide(currentSlideIndex - 1)
    } else {
      // 其他情况,则在手指离开屏幕时,让touchmove的位移归位
      // setCurrentPageIndex(p)
    }
    setTempSlideIndex(undefined)
  }






  useImperativeHandle(ref, () => ({
    // _isScrolling,
    currentSlideIndex,
    goToSlide,
    goToSlideHoF,
    getAlert() {
      console.log("alert from child")
    }
  }))

  return (
    <Outer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <Inner
        ref={innerRef}
        transitionTime={`${_transitonTime.current / 1000}s`}
        translate3dY={`-${100 * (tempSlideIndex || currentSlideIndex)}%`}
      // onTransitionEnd={transtionEndHandler}
      >
        {
          // 遍历所有child,不是Slide则在外层套一层Slide.
          React.Children.map(children, (child, index) => {
            // https://stackoverflow.com/questions/55729582/check-type-of-react-component
            // console.log("child",child)
            // return child
            if (child.type === Slide) {
              return child;
            } else {

              return (
                <Slide index={child.props.index || index}>
                  {
                    shouldRenderslideIndex(currentSlideIndex, numOfSlides).includes(index) ? child : null
                  }
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
  color: #fff;

`

