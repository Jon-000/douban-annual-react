
import React from 'react';
import styled from 'styled-components';
import StartPage from './StartPage';
import Top10Page from './Top10Page';

class Page extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getOnePage(this.props.PageIndex)
  }

  getOnePage(n) {
    this.props.getOnePage(n)
  }
  render() {
    if (this.props.PageData.kind === 0) {
      return(
        <StartPage PageData={this.props.PageData}></StartPage>
      )
    } else if (this.props.PageData.kind ===1) {
      return (
        <Top10Page pageData={this.props.PageData}></Top10Page>
      )
    } else {
      return (
        <Container>Nothing</Container>
      )
    }
  }
  

}

export default Page;

const Container = styled.div`

`