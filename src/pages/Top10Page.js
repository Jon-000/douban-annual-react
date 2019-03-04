
import React from 'react';
import styled from 'styled-components';
import { red } from 'ansi-colors';

// interface props {
//   pageData
// }

class Top10Page extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {pageData} = this.props;
    return (
      <Container cc="green" bgUrl={pageData.payload.mobile_background_img}>

      </Container>
    )
  }


}

export default Top10Page;

const Container = styled.div`
width: 100%;
height: 100%;
display: relative;
background: ${props => props.cc || "red"};
background-image: url(${props => props.bgUrl})
`