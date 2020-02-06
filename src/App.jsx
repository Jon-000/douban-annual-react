import React, { Component, useState, useEffect, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import './App.css';

import { api_movie2018 } from './services/doubanApi';
import Pages, { Slide } from './pages/Pages';
import Page from './pages/Page'
import Header from './header/Header';
import Slides from './pages/Pages';

const App = (props) => {
  console.log("App run")
  const _isGoing = useRef(false);
  console.log(_isGoing.current)

  const slidesRef = useRef();
  const _transitionTime = useRef(1000);

  const [menuItems, setMenuItems] = useState([])
  const [bgAudioList, setBgAudioList] = useState();

  useEffect(() => {
    //获取目录数据
    getSummary();
  }, [])

  function getSummary() {
    api_movie2018
      .get('summary.json')
      .then(res => {
        setMenuItems(res.data.res.widget_infos)
        setBgAudioList(
          JSON.parse(res.data.res.payload.background_musics)
          )
      })
  }

  const getCurrentPageIndexFromWindowLocationHash = () => {
    // 根据浏览器地址决定currentPageIndex的值
    const re = /#[0-9]\d*\b/g;
    if (window.location.hash.match(re) !== null) {
      const numStr = window.location.hash.match(re)[0].substring(1);
      const num = Number(numStr);
      return num
    }
  }
  const [currentPageIndex, setCurrentPageIndex] = useState(() => {
    const source1 = getCurrentPageIndexFromWindowLocationHash();
    const sourceDefault = 0;
    return source1 || sourceDefault;
  });
  const [tempSlideIndex, setTempSlideIndex] = useState();

  useEffect(() => {
    function hashchangeHandler(evt) {
      console.log("hashchageHandler: ")
      console.log(getCurrentPageIndexFromWindowLocationHash())
      setCurrentPageIndex(getCurrentPageIndexFromWindowLocationHash())
    }
    window.addEventListener("hashchange", hashchangeHandler, false);
    return () => {
      window.removeEventListener("hashchange", hashchangeHandler, false);
    }
  }, [])

  // componentWillUnmount() {
  //   // this.pagesOuterRef.current.removeEventListener("wheel",this.handleWheel)
  //   window.removeEventListener("hashchange", this.handleHashChange)
  //   window.removeEventListener("resize", this.updateWindowDimensions);
  //   // this.pagesOuterRef.current.removeEventListener("touchstart", this.handleTouchstart, false);
  //   // this.pagesOuterRef.current.removeEventListener("touchend", this.handleTouchend, false);
  //   // this.pagesOuterRef.current.removeEventListener("touchmove", this.handleTouchmove, false);
  //   // this.pagesOuterRef.current.removeEventListener("touchcancel", this.handleTouchcancel, false);
  // }

  // updateWindowDimensions = () => {
  //   this.setState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
  // }

  const _numOfPages = 68;
  const [pages, setPages] = useState({});
  const shouldRenderPageIndex = (index) => {
    const pages_length = _numOfPages;
    const currentPageIndex = index
    const shouldGetIndexArray = [
      currentPageIndex,
      currentPageIndex + 1,
      currentPageIndex - 1,
      currentPageIndex + 2
    ]

    const removeInvalidIndex =
      shouldGetIndexArray.filter((i) => i >= 0 && i <= pages_length)
    return removeInvalidIndex;
  }

  const shouldGetPageIndex = (index) => {
    return shouldRenderPageIndex(index)
      .filter(i => !Object.keys(pages).includes(String(i)))
  }

  const getPagesAndSaveToState = (index) => {
    shouldGetPageIndex(index)
      .forEach(i => getOnePage(i))
  }

  useEffect(() => {
    getPagesAndSaveToState(currentPageIndex);
  }, [currentPageIndex])

  useEffect(() => {
    console.log(pages);
  }, [pages])


  const getOnePage = (pageIndex) => {
    // console.log(`get onepage ${n}'s json`)
    api_movie2018
      .get(`/widget/${pageIndex}.json`)
      .then(res => {
        // setState({ pages: { ...this.state.pages, [n]: res.data.res } })
        setPages((prevState) => {
          return ({
            ...prevState,
            [pageIndex]: res.data.res
          })
        })
      })
  }




  const goToPage = (pageIndex) => {
    console.log(`_isGoing while attempt goToPage ${pageIndex}: `, _isGoing.current)
    if (_isGoing.current) return;

    if (pageIndex < 0 || pageIndex > _numOfPages) {
      _isGoing.current = false;
      // 返回零代表到达边界
      return 0;
    }

    _isGoing.current = true;

    setCurrentPageIndex(pageIndex);

  }

  useEffect(() => {
    if (_isGoing.current) {
      setTimeout(() => {
        window.location.hash = `#${currentPageIndex}`

        _isGoing.current = false;
      }, _transitionTime.current);

    }
  }, [_isGoing.current])



  const buttonNextHandler = () => {
    goToPage(currentPageIndex + 1);
  }



  const handleWheel = (evt) => {
    console.log("_isGoing while handleWheel: ", _isGoing.current)
    if (_isGoing.current) return;
    if (evt.deltaY > 0) {
      goToPage(currentPageIndex + 1)
    } else {
      goToPage(currentPageIndex - 1)
    }
  }


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
    setTempSlideIndex(currentPageIndex - y)
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
      goToPage(currentPageIndex + 1)
    } else if (y > 0.1) {
      // y方向位移大于一定正值,则向上翻页
      // setCurrentPageIndex(p => p - 1)
      goToPage(currentPageIndex - 1)
    } else {
      // 其他情况,则在手指离开屏幕时,让touchmove的位移归位
      // setCurrentPageIndex(p)
    }
    setTempSlideIndex(undefined)
  }

  // console.log('render...')
  return (
    <Container>
      <Header
        // innerWidth={this.state.innerWidth}
        height="40px"
        menu_infos={menuItems}
        bgAudioList={bgAudioList}
      // background_musics={this.state.summary.payload.background_musics}
      // active_index={slidesRef.current.currentSlideIndex}
      // onMenuItemClick={MenuItemClickHandler}
      ></Header>
      <InfoPanel
        _isGoing={_isGoing}
        _numOfPages={_numOfPages}
        currentPageIndex={currentPageIndex}
      />
      {/*<Pages
        transitionTime={`${this._scrollDuration / 1000}s`}
        innerTranslateY={this.state.innerTranslateY}

        onTouchCancel={this.handleTouchcancel}
        onWheel={this.handleWheel}
        setInnerRef={this.pagesInnerRef}
        setOuterRef={this.pagesOuterRef}>
        {
          this.shouldRenderPageIndex(this.state.currentPageIndex).map(i => (
            <Page
              key={i}
              pageIndex={i}
              pageData={this.state.pages[i]}
              innerWidth={this.state.innerWidth}
            ></Page>
          ))
        }
      </Pages> */}
      <Slides ref={slidesRef} num={68}
        currentSlideIndex={currentPageIndex}
        tempSlideIndex={tempSlideIndex}
        onWheel={handleWheel} 
        transitionTime={_transitionTime.current}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {
          shouldRenderPageIndex(currentPageIndex).map(i => (
            <Slide key={i} index={i}>
              <Page
                pageData={pages[i]}
              // innerWidth={this.state.innerWidth}
              ></Page>
            </Slide>
          ))
        }
      </Slides>

      <ButtonNext
        onClick={buttonNextHandler}
      >
        <IconNext width="1.6rem" height="1.6rem"></IconNext>
      </ButtonNext>
    </Container>
  );




}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position:relative;
  background-color: #000;
`



const IconNext = styled.div`
&::before {
  display: block;
  content: '';
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "100%"};
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADmwAAA5sBPN8HMQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEOSURBVGiB7dfNToNAFIZhuEZsNLGJS/C2NY2LdmFc0tbXDRNPyAwFhflpvjfphjAz5wllQVUppZRSSim1JOAJ+ALegCb1POOAB+AAfAK70E01cOS3C/AcedZgwH6YyXUC6tDNFpINxoMA+Jha8OhZkBQTQFxu/vWBBuhHC7+BLtLsdpbX4WxbP/v9zQHzb4TZKBlmNYTZMDpmdYTZOBoG6DZBmAM2x2yOMAdthomGMAeujomOMAevhkmGMAOEMO2CPdIizCB/xmSDMAMtxmSHMIPNxmSLcM3BZI9wBTBX4AVoi0C48H87nD3XsvhgmyzwZMp4EuMmMOUgXB5MeQjXgHkffmUilFJKKaXU/fQD/JJjbhigL+0AAAAASUVORK5CYII=);
  background-size: contain;
}
// @media only screen and (max-width: 414px) {
//   width: ${props => props.width};
//   height: ${props => props.height};
//   }
`

const ButtonNext = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 2rem;
  z-index: 2;
  background: transparent;
  border-radius: 50%;
  width: ${props => props.width};
  height: ${props => props.height};
  border: 1px solid #fff;
  padding: 1.5rem;
  background-color: rgba(0,0,0,.2);

  &:focus {
    outline: none;
  }

  @media only screen and (max-width: 425px) {
    left: 50%;
    transform: translateX(-50%);
    border: none;
  }
`

const InfoPanel = ({ _numOfPages, currentPageIndex, _isGoing, children }) => (
  <div style={{ position: "fixed", width: "100px", height: 50, border: "1px solid red", color: "red", top: "0%", zIndex: 1 }}>
    <div>
      React.children.count: {React.Children.count(children)}
    </div>
    <div>
      _numOfPages: {_numOfPages}
    </div>
    <div>
      currentPageIndex: {currentPageIndex}
    </div>
    <div>
      _isGoing: {JSON.stringify(_isGoing)}
    </div>
  </div>
)