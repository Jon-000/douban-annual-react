import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

import { api_movie2018 } from './services/doubanApi';
import Pages from './pages/Pages';
import Page from './pages/Page'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      pages: {},
    }
  }

  componentDidMount() {
    this.updatePages()
  }

  shouldRenderPageIndex = () => {
    const pages_length = 20
    const { currentPageIndex }= this.state
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

  shouldGetPageIndex = () => {
    const tmp = this.shouldRenderPageIndex()
      .filter(i => !Object.keys(this.state.pages).includes(String(i)))
    return tmp;
  }

  updatePages() {
    this.shouldGetPageIndex()
      .forEach(i => this.getOnePage(i))
  }

  getOnePage(n) {
    console.log(`get onepage ${n}`)
    api_movie2018
      .get(`/${n}`)
      .then(res => {
        let newPages = {...this.state.pages}
        newPages[n] = res.data.res
        this.setState({pages: newPages},
          () => {
            console.log(
              // Object.keys(this.state.pages).includes(String(n))
              `add page ${n} to state successfully. The state now is:`
            )
            console.log(this.state)
          }
          )
      })
  }

  render() {
    console.log('render...')
    console.log(this.shouldRenderPageIndex())
    return (
      <div className="App">
        <Container>
          <Header></Header>

          <Pages currentPageIndex={this.state.currentPageIndex}>
            {
              this.shouldRenderPageIndex().map(i => (
                <Page
                  key={i}
                  pageIndex={i}
                  pageData={this.state.pages[i]}
                  ></Page>
                ))
            }
          </Pages>

          <ButtonNext onClick={this.buttonNextHandler}>
            <IconNext></IconNext>
          </ButtonNext>
        </Container>
      </div>
    );
  }

  buttonNextHandler = () => {
    this.setState({ currentPageIndex: this.state.currentPageIndex + 1},
      () => {
        console.log(
          `currentpageindex is ${this.state.currentPageIndex} now`
        )
        this.updatePages();
        // window.location.href = `#${this.state.currentPageIndex + 1}`
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

const Header = styled.header`
width: 100%;
height: 3rem;
position: fixed;
background: blue;
opacity: 0.2;
z-index:2;
`

const IconNext = styled.div`
&::before {
  display: block;
  content: '';
  width: 1.5rem;
  height: 1.5rem;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADmwAAA5sBPN8HMQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEOSURBVGiB7dfNToNAFIZhuEZsNLGJS/C2NY2LdmFc0tbXDRNPyAwFhflpvjfphjAz5wllQVUppZRSSim1JOAJ+ALegCb1POOAB+AAfAK70E01cOS3C/AcedZgwH6YyXUC6tDNFpINxoMA+Jha8OhZkBQTQFxu/vWBBuhHC7+BLtLsdpbX4WxbP/v9zQHzb4TZKBlmNYTZMDpmdYTZOBoG6DZBmAM2x2yOMAdthomGMAeujomOMAevhkmGMAOEMO2CPdIizCB/xmSDMAMtxmSHMIPNxmSLcM3BZI9wBTBX4AVoi0C48H87nD3XsvhgmyzwZMp4EuMmMOUgXB5MeQjXgHkffmUilFJKKaXU/fQD/JJjbhigL+0AAAAASUVORK5CYII=);
  background-size: contain;
}
@media only screen and (max-width: 414px) {
  width: 1.5rem;
  height: 1.5rem;
  }
`

const ButtonNext = styled.button`
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  background: transparent;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  padding: 0;

  &:focus {
    outline: none;
  }
`