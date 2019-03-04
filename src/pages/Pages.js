
import React from 'react';
import styled from 'styled-components';

function Pages(props) {
  return (
    <Outer>
      <Inner tY={props.currentPageIndex}>
        {props.children}
      </Inner>
    </Outer>
  )
}

export default Pages;

const Outer = styled.div`
width: 100%;
height: 100%;
overflow: hidden;
`
const Inner = styled.div`
width: 100%;
height: 100%;
position: relative;
transition: all 2s;
transform: translate(0, 
  ${props => (props.tY * -100) || 0}%
  );

`