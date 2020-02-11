

import React from 'react';

import styled from '@emotion/styled'

const Loading = () => {
  return (
    <Container>
      <div>Loading...</div>
    </Container>
  )
}

const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
color: #fff;
`

export default Loading;