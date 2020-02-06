
import React, { useState, useRef, useEffect } from 'react';
import styled from "@emotion/styled";

import pauseImage from './pause.png';
import playingImage from './playing.gif';
import stopImage from './stop.gif'
import Label from '../../common/Label/Label';

const BgAudio = ({
  audioList
}) => {
  // const { audioList } = props;
  console.log(audioList)
  if (!audioList) return (<span style={{ color: "#fff" }}>loading</span>);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0)

  const audioRef = useRef();

  useEffect(() => {
    isPlaying ?
      audioRef.current.play()
      :
      audioRef.current.pause()

  },[isPlaying])

  const onClickHandler = (evt) => {
    setIsPlaying(p => !p);
  }

  const onEnded = (evt) => {
    setCurrentAudioIndex(p => {
      if (p + 1 >= audioList.length) {
        return 0
      } else {
        return p + 1
      }
    });
  }

  useEffect(() => {
    audioRef.current.load();
    audioRef.current.play();
  }, [currentAudioIndex])

  const InfoOnHover = (isPlaying) => (isPlaying ? "关闭背景音乐" : "播放背景音乐")

  return (
    <Container
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClickHandler}
    >

      <BgIcon src={isPlaying ? (isHover ? stopImage : playingImage) : pauseImage} />
      <Label width="150px">
        {
          isHover ? (
            InfoOnHover(isPlaying)
          ) : (
              isPlaying ? audioList[currentAudioIndex].name : "播放背景音乐"
            )
        }
      </Label>

      <audio
        ref={audioRef}
        autoPlay={true}
        controls
        onEnded={onEnded}
        style={{ display: "none" }}
      >
        <source
          src={audioList[currentAudioIndex].url}
          type="video/mp4"
        />
        Your browser does not support the <code>audio</code> element.
    </audio>
    </Container>
  )
}

export default BgAudio;

const Container = styled.div`
color: #fff;
display: flex;
flex-direction: row;
align-items: center;
margin-right: 36px;
cursor: pointer;
`

const BgIcon = styled.div`
display: flex;
align-items: center;
line-height: 1;
  &:before {
    width: 1em;
    height: 1em;
    margin-right: .5em;
    content: '';
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${props => props.src});
  }  
`