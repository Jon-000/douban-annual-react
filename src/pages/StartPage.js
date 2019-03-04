
import React from 'react';
import styled from 'styled-components';

// interface props {
//   PageData
// }

class StartPage extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container>
        <TitleImage src={this.props.PageData.payload.mobile_title_img}></TitleImage>
        <BgImage style={{backgroundImage: `url(${this.props.PageData.payload.mobile_background_img})`}}></BgImage>
        <BottomInfo>
          <Description>{this.props.PageData.payload.description}</Description>
        </BottomInfo>
      </Container>
    )
  }
}

export default StartPage

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const TitleImage = styled.img`
display: block;
max-width: 100%;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
z-index: 2;
width: 45vh;
`
const BgImage = styled.div`
position: absolute;
top:0;
bottom:0;
left:0;
right:0;
background-size: cover;
background-position: 50%;
background-repeat: no-repeat;
z-index: 1;
`

const BottomInfo = styled.div`
width: 100%;
color: hsla(0,0%, 100%, .6);
text-align: center;
position: absolute;
bottom: 0;
z-index: 3;
`

const Description = styled.div`
  padding: 3.2rem;
`
