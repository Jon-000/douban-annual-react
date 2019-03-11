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
      pages: {},
      summary: {},
      innerWidth: 0,
      innerHeight: 0,
    }
    // 这些状态的改变不应触发生命周期的update阶段,减少不必要的render调用等
    this._isScrolling = false
    this.pagesInnerRef = React.createRef();
    this.pagesOuterRef = React.createRef();
  }


  componentDidMount() {
    // document.body.addEventListener("wheel",this.handleScroll)
    this.pagesOuterRef.current.addEventListener("wheel",this.handleWheel)
    window.addEventListener("hashchange", this.handleHashChange)
    window.addEventListener('resize', this.updateWindowDimensions);

    this.updateWindowDimensions();

    console.log("App Component did mount:")
    // 根据浏览器地址决定currentPageIndex的值,然后获取数据
    if (window.location.hash === "" ) {
      this.getPagesAndSaveToState(this.state.currentPageIndex)
    } else {
      const re = /#[0-9]\d*\b/g;
      if ( window.location.hash.match(re) !== null ) {
        const numStr = window.location.hash.match(re)[0].substring(1);
        const num = Number(numStr);
        console.log(num)
        this.setState({currentPageIndex: num}, () => {
          console.log('get index from hash route')
          console.log(
            this.state.currentPageIndex,
            this.state.pages
          )
          this.getPagesAndSaveToState(this.state.currentPageIndex)
          })
      }
    }

    //获取目录数据
    this.getSummary();
  }

  componentWillUnmount() {
    this.pagesOuterRef.current.removeEventListener("wheel",this.handleWheel)
    window.removeEventListener("hashchange", this.handleHashChange)
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ innerWidth: window.innerWidth, innerHeight: window.innerHeight },
      () => {
        console.log(this.state.innerWidth)
        console.log(this.state.innerHeight)
      }
      );
  }

  handleWheel = (evt) => {
    evt.preventDefault();
    if (this._isScrolling) return;
    this._isScrolling = true;
    if (evt.deltaY > 0) {
      this.setState({
        currentPageIndex: 
          // 检查是否到最后一页
          this.state.currentPageIndex + 1 > 68 ? 68 : this.state.currentPageIndex + 1
      }, () => {
        this.getPagesAndSaveToState(this.state.currentPageIndex);

        this.waitScroll(2000)
        .then(() => {
          this._isScrolling = false;
          window.location.hash = `#${this.state.currentPageIndex}`
        })
      })
    } else {
      this.getPagesAndSaveToState(this.state.currentPageIndex);

      this.setState({currentPageIndex: 
        // 检查是否到第一页
        this.state.currentPageIndex - 1 < 0 ? 0 : this.state.currentPageIndex - 1
        },
        () => {
          setTimeout(() => {
            this._isScrolling = false;
            window.location.hash = `#${this.state.currentPageIndex}`
          }, 2000)
        }
        )
    }
  }

  handleHashChange = (evt) => {
    console.log(evt)
    console.log(window.location.hash)
    // 根据浏览器地址决定currentPageIndex的值,然后获取数据
    if (window.location.hash === "" ) {
      this.getPagesAndSaveToState(this.state.currentPageIndex)
    } else {
      const re = /#[0-9]\d*\b/g;
      if ( window.location.hash.match(re) !== null ) {
        const numStr = window.location.hash.match(re)[0].substring(1);
        const num = Number(numStr);
        console.log(num)
        this.setState({currentPageIndex: num}, () => {
          console.log('get index from hash route')
          console.log(
            this.state.currentPageIndex,
            this.state.pages
          )
          this.getPagesAndSaveToState(this.state.currentPageIndex)
          })
      }
    }
  }

  componentDidUpdate(){
    console.log('App componentDidUpate')
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
    console.log(`shouldRenderPageIndex ${index}`)
    const pages_length = 68
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
    console.log("5555555555555")
    console.log(index)
    console.log(`shouldGetPageIndex ${index}`)
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
    console.log(`get onepage ${n}`)
    api_movie2018
      .get(`/widget/${n}.json`)
      .then(res => {
        this.setState({pages: {...this.state.pages, [n]:res.data.res}})
      })
      .then(cb)
  }

  rmOraddScrollEvtListenerByMenu = ({showNav}) => {
    showNav ? 
      document.body.removeEventListener("wheel",this.handleScroll)
    : document.body.addEventListener("wheel",this.handleScroll)
  }

  render() {
    console.log('render...')
    console.log(this.state.pages)
    return (
      <div className="App" ref={ref => this.appRef = ref}>
        <Container>
          <Header
            innerWidth={this.state.innerWidth}
            height="40px"
            menu_infos={this.state.summary.widget_infos}
            // background_musics={this.state.summary.payload.background_musics}
            active_index={this.state.currentPageIndex}
            // onBtnMenuClick={this.rmOraddScrollEvtListenerByMenu}
            ></Header>

          <Pages currentPageIndex={this.state.currentPageIndex} setInnerRef={this.pagesInnerRef} setOuterRef={this.pagesOuterRef}>
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
      </div>
    );
  }

  buttonNextHandler = () => {
    this.setState({ currentPageIndex: this.state.currentPageIndex + 1},
      () => {
        console.log(
          `setState successfully, currentpageindex is ${this.state.currentPageIndex} now`
        )
        this.getPagesAndSaveToState();

        // 滚动动画完成后,再更新浏览器地址
        setTimeout(() => {
          window.location.href = `#${this.state.currentPageIndex}`
        }, 2000)
      }
      )
  }

}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position:relative;
`



const IconNext = styled.div`
&::before {
  display: block;
  content: '';
  width: ${props => props.width};
  height: ${props => props.height};
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
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  background: transparent;
  border-radius: 50%;
  width: ${props => props.width};
  height: ${props => props.height};
  border: none;
  padding: 0;

  &:focus {
    outline: none;
  }
`