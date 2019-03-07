
import React from 'react';
import styled from 'styled-components';
import Top1Card from './Top1Card';
import Top29Card from './Top29Card';

// interface props {
//   pageData
// }

function Top10Page(props) {
  const {pageData} = props
  const {subjects} = pageData
  return (
    <Container cc="green" bgUrl={pageData.payload.mobile_background_img}>

      <Top>
        <Top1Card payloadTitle={pageData.payload.title} {...props.pageData.subject}></Top1Card>
      </Top>
      <Bottom>
          {
            subjects.map((s, index) => {
              if (index === 0 ) return
              return (
                <StyledTop29Card topN={index + 1} coverUrl={s.cover} width="8rem" key={s.id} />
              )
            })
          }
      </Bottom>
    </Container>
  )
}


export default Top10Page;

const Container = styled.div`
width: 100%;
height: 100%;
padding: 40px 0 50px;
box-sizing: border-box;
display: relative;
background: ${props => props.cc || "red"};
background-image: url(${props => props.bgUrl});
background-size: cover;
background-position: 50%;
// z-index: 0;
display: flex;
flex-direction: column;
`


const Top = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
`

const Bottom = styled.div`
width: 100%;
overflow: auto;
background: red;
display: flex;
`
const StyledTop29Card = styled(Top29Card)`
margin-left: 1.5rem;
 &:last-child {
   padding-right: 1.5rem;
}
`
