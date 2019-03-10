
import React from 'react';
import styled from 'styled-components';
import StartPage from './StartPage';
import Top10Page from './Top10Page/Top10Page';

function Page(props) {
  const {
    innerWidth,
  } = props;
  console.log('page component')
  if (props.pageData === undefined) {
    return (
      <Container id={props.pageIndex} pageIndex={props.pageIndex}>
        <span>Loading...</span>
      </Container>
    )
  } else if (props.pageData.kind === 0) {
      return(
        <Container id={props.pageIndex} pageIndex={props.pageIndex}>
          <StartPage pageData={props.pageData} innerWidth={innerWidth}></StartPage>
        </Container>
      )
    } else if (props.pageData.kind ===1) {
      return (
        <Container id={props.pageIndex} pageIndex={props.pageIndex}>
          <Top10Page pageData={props.pageData} innerWidth={innerWidth} ></Top10Page>
        </Container>
      )
    } else {
      return (
        <Container id={props.pageIndex} pageIndex={props.pageIndex}>
          <div>这个类型的模板没写</div>
        </Container>
      )
    }

}

export default Page;

const Container = styled.div`
background-color: black;
width:100%;
height:100%;
position: absolute;
transform: translate(0, ${
  props => props.pageIndex * 100
}%);

// loading是的界面
background-color: black;
color: #fff;
display: flex;
justify-content: center;
align-items: center;
`