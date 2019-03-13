import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

import { api_movie2018 } from './services/doubanApi';
import Pages from './pages/Pages';
import Page from './pages/Page'
import Header from './header/Header';

class App extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      innerTranslateY: 0,
      pages: {},
      summary: {},
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    }
    // 这些状态的改变不应触发生命周期的update阶段,减少不必要的render调用等
    this._isScrolling = false
    this._scrollDuration = 1000;
    this.pagesInnerRef = React.createRef();
    this.pagesOuterRef = React.createRef();
    this._numOfPages = 68;
    this._touchstartPoint = null;
  }


  componentDidMount() {
    // document.body.addEventListener("wheel",this.handleScroll)
    // this.pagesOuterRef.current.addEventListener("wheel",this.handleWheel)
    window.addEventListener("hashchange", this.handleHashChange)
    window.addEventListener('resize', this.updateWindowDimensions);

    // this.pagesOuterRef.current.addEventListener("touchstart", this.handleTouchstart, false);
    // passive:true则移动端chrome向下滑动会触发拖拽更新页面,所以必须是false
    // 而如果用react的onTouchMove绑定,则默认为pasive:true,所以要自己绑定到dom上,并在上下滚动时调用preventDefault
    // 这里弃用此方法,采用react的onTouchMove结合https://stackoverflow.com/questions/29008194/disabling-androids-chrome-pull-down-to-refresh-feature
    // this.pagesOuterRef.current.addEventListener("touchmove", this.handleTouchmove, {passive: false}); 
    // this.pagesOuterRef.current.addEventListener("touchend", this.handleTouchend, false);
    // this.pagesOuterRef.current.addEventListener("touchcancel", this.handleTouchcancel, false);

    this.updateWindowDimensions();

    // 根据浏览器地址决定currentPageIndex的值,然后获取数据
    if (window.location.hash === "" ) {
      this.getPagesAndSaveToState(this.state.currentPageIndex)
    } else {
      const re = /#[0-9]\d*\b/g;
      if ( window.location.hash.match(re) !== null ) {
        const numStr = window.location.hash.match(re)[0].substring(1);
        const num = Number(numStr);
        let y = this.calcInnerTranslateY(num)
        // 获取数据
        this.getPagesAndSaveToState(num)
        // 滚动
        this.setState({
          currentPageIndex: num,
          innerTranslateY: y,
        })
      }
    }
    //获取目录数据
    this.getSummary();
  }

    handleTouchstart = (evt) => {
      // evt.preventDefault()

      this._touchstartPoint = { clientY: evt.changedTouches[0].clientY,
        clientX: evt.changedTouches[0].clientX
      }
      // console.log("handle touchstart",
      //   this._touchstartPoint
      // )
    }

    // MDN: since calling preventDefault() on a touchstart or the first touchmove event of a series prevents the corresponding mouse events from firing, it's common to call preventDefault() on touchmove rather than touchstart. That way, mouse events can still fire and things like links will continue to work. Alternatively, some frameworks have taken to refiring touch events as mouse events for this same purpose. 
    handleTouchmove = (evt) => {
      // 啊哈,这句对29滚动很重要啊! 对性能也很有效果
      if ( 
        Math.abs((evt.touches[0].clientY - this._touchstartPoint.clientY) / 
        (evt.touches[0].clientX - this._touchstartPoint.clientX)) < 1
        ) {
          return; // 水平方向上不作为
        }
      // 垂直方向上
      // evt.preventDefault();
      // console.log("handle touchmove",
      //   evt.touches[0].clientY
      // )
      let moveY = evt.touches[0].clientY - this._touchstartPoint.clientY
      let y = this.state.currentPageIndex * -this.state.innerHeight 
      let innerTranslateY = y + moveY
      // console.log("touchmove",
      //   y + moveY)
      // 绑定touchmove到transform的state,实现可以位移的效果.但在touchend中归位.
      this.setState({
        innerTranslateY: `${innerTranslateY}px`
      }, () => {
        // console.log("touch innerTranslateY:",
        //   this.state.innerTranslateY
        // )
      })
    }

    handleTouchend = (evt) => {
      // console.log("handle touchend",
      //   evt.touches[0]
      // )
      let moveY = evt.changedTouches[0].clientY - this._touchstartPoint.clientY
      if (moveY < -50) {
        // y方向位移小于一定负值,则向下翻页
        this.goToPage(this.state.currentPageIndex + 1)
      } else if (moveY > 50) {
        // y方向位移大于一定正值,则向上翻页
        this.goToPage(this.state.currentPageIndex - 1)
      } else {
        // 其他情况,则在手指离开屏幕时,让touchmove的位移归位
        let y = this.state.currentPageIndex * -this.state.innerHeight 
        this.setState({
          innerTranslateY: `${y}px`
        }, () => {
          // console.log("touchend innerTranslateY:",
          //   this.state.innerTranslateY
          // )
        })
      }
    }

    handleTouchcancel = (evt) => {
      // console.log("handle touchcancel",
      //   evt
      // )
    }
    
    componentDidUpdate(){
      // console.log('App componentDidUpate')
    }
    

  componentWillUnmount() {
    // this.pagesOuterRef.current.removeEventListener("wheel",this.handleWheel)
    window.removeEventListener("hashchange", this.handleHashChange)
    window.removeEventListener("resize", this.updateWindowDimensions);
    // this.pagesOuterRef.current.removeEventListener("touchstart", this.handleTouchstart, false);
    // this.pagesOuterRef.current.removeEventListener("touchend", this.handleTouchend, false);
    // this.pagesOuterRef.current.removeEventListener("touchmove", this.handleTouchmove, false);
    // this.pagesOuterRef.current.removeEventListener("touchcancel", this.handleTouchcancel, false);
  }

  updateWindowDimensions = () => {
    this.setState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight },);
  }

  handleWheel = (evt) => {
    evt.preventDefault();
    if (evt.deltaY > 0) {
      this.goToPage(this.state.currentPageIndex + 1)
    } else {
      this.goToPage(this.state.currentPageIndex - 1)
    }
  }

  handleHashChange = (evt) => {
    // console.log("handleHashChange",
    //   evt)
    
    // 根据浏览器地址决定currentPageIndex的值,然后获取数据
    if (window.location.hash === "" ) {
      this.getPagesAndSaveToState(this.state.currentPageIndex)
    } else {
      const re = /#[0-9]\d*\b/g;
      if ( window.location.hash.match(re) !== null ) {
        const numStr = window.location.hash.match(re)[0].substring(1);
        const num = Number(numStr);
        // 得到nextPageIndex = num
        // console.log(num)
        this.getPagesAndSaveToState(num)
        let y = this.calcInnerTranslateY(num)
        // 与此同时,触发滚动到下一页
        this.setState({
          currentPageIndex: num,
          innerTranslateY: y
        })
      }
    }
  }


  waitScroll(time) {
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, time);
      },
    
    )
  }

  shouldRenderPageIndex = (index) => {
    const pages_length = this._numOfPages;
    const currentPageIndex = index
    const shouldGetIndexArray = [
      currentPageIndex,
      currentPageIndex + 1,
      currentPageIndex - 1,
      currentPageIndex + 2
    ]

    const removeInvalidIndex = 
      shouldGetIndexArray.filter((i) => i >= 0 && i <= pages_length )
    return removeInvalidIndex;
  }

  shouldGetPageIndex = (index) => {
    const tmp = this.shouldRenderPageIndex(index)
      .filter(i => !Object.keys(this.state.pages).includes(String(i)))
    return tmp;
  }

  getPagesAndSaveToState = (index, cb) => {
    this.shouldGetPageIndex(index)
      .forEach(i => this.getOnePage(i, cb))
  }

  getSummary() {
    api_movie2018
      .get('summary.json')
      .then(res => {
        this.setState({summary: {...this.state.summary, ...res.data.res} })
      })
  }

  getOnePage = (n, cb) => {
    // console.log(`get onepage ${n}'s json`)
    api_movie2018
      .get(`/widget/${n}.json`)
      .then(res => {
        this.setState({pages: {...this.state.pages, [n]:res.data.res}})
      })
      .then(cb)
  }


  render() {
    // console.log('render...')
    return (
        <Container>
          <Header
            innerWidth={this.state.innerWidth}
            height="40px"
            menu_infos={this.state.summary.widget_infos}
            // background_musics={this.state.summary.payload.background_musics}
            active_index={this.state.currentPageIndex}
            ></Header>

          <Pages
            transitionTime={`${this._scrollDuration / 1000}s`}
            innerTranslateY={this.state.innerTranslateY}
            onTouchStart={this.handleTouchstart}
            onTouchMove={this.handleTouchmove}
            onTouchEnd={this.handleTouchend}
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
          </Pages>

          <ButtonNext onClick={this.buttonNextHandler}>
            <IconNext width="1.6rem" height="1.6rem"></IconNext>
          </ButtonNext>
        </Container>
    );
  }

  calcInnerTranslateY = (nextPageIndex) => {
     return `${(nextPageIndex * -this.state.innerHeight)}px`
  }

  goToPage = (pageIndex) => {
    if (this._isScrolling) return;
    this._isScrolling = true;
    if (pageIndex < 0 || pageIndex >= this._numOfPages) return;
    let y = this.calcInnerTranslateY(pageIndex)
    
    this.getPagesAndSaveToState(pageIndex);
    this.setState({
      currentPageIndex: pageIndex,
      innerTranslateY: y,
    },
      () => {
        // 滚动动画完成后,再更新浏览器地址
        setTimeout(() => {
          window.location.href = `#${pageIndex}`
          this._isScrolling = false;
        }, this._scrollDuration)
      }
    )

    // 方法二: 其实上边全不需要,只这一句也可以,唯一可能按照需要加个isGoing的状态限制下翻页速度
    // window.location.href = `#${pageIndex}`

  }

  
  buttonNextHandler = () => {
    this.goToPage(this.state.currentPageIndex + 1);
  }

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