
import React from 'react';
import styled from 'styled-components';

import {api_movie2018} from '../services/doubanApi';
import axios from 'axios';
import StartPage from './StartPage';
import Page from './Page';

class Pages extends React.Component {

  constructor(props) {
    super(props)
  }

  getOnePage(n) {
    this.props.getOnePage(n)
  }


  render() {
    const currentPageData = this.props.pages[this.props.currentPageIndex]
    const nextPageData = this.props.pages[this.props.currentPageIndex + 1]
    const lastPageData = this.props.pages[this.props.currentPageIndex - 1]
    if (currentPageData) {
      return (
        <Outer>
          <Inner>
            <Page
              PageIndex={this.props.currentPageIndex}
              getOnePage={() => this.getOnePage}
              PageData={currentPageData}
              ></Page>

              {/* <StartPage PageData={lastPageData}></StartPage> */}
              {/* <StartPage PageData={currentPageData}></StartPage> */}
              {/* <StartPage PageData={nextPageData}></StartPage> */}
              {/* <StartPage PageData={currentPageData}></StartPage> */}
          </Inner>
        </Outer>
      )
    } else {
      return (
        <div>loading---</div>
      )
    }
  }

}

export default Pages;

const Outer = styled.div`
width: 100%;
height: 100%;
// overflow: hidden;
`
const Inner = styled.div`
width: 100%;
height: 100%;
// transform: translate(0,-100%)
`