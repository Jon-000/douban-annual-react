import React, { Component } from 'react';
import './reset.css';
import './App.css';

import { api_movie2018 } from './services/doubanApi';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPageIndex: 0,
      pages: [],
    }
  }

  componentDidMount() {
    api_movie2018
      .get(`${this.state.currentPageIndex}`)
      .then((res) => {
        this.setState((prevState, props) => {
          prevState.pages.push(res.data.res)
          return {
            pages: prevState.pages
          }
        })
      })
  }

  render() {
    if (this.state.pages.length === 0) {
      return (
        <div>Loading...</div>
      )
    } else {
      const currentPageData = this.state.pages[this.state.currentPageIndex]
      console.log(this.state)
      return (
        <div className="App">
          <div className="Start-page">
            <div className="Container">
              <img src={currentPageData.payload.mobile_title_img} alt=""/>
              <div className="M-b-img" style={{backgroundImage: `url(${currentPageData.payload.mobile_background_img})`}}></div>
              <section className="Bottom">
                <div>共人访问</div>
                <div className="Description">{currentPageData.payload.description}</div>
              </section>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
