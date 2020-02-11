
import React, { useState, useRef, useEffect } from 'react';
import styled from "@emotion/styled";

import pauseImage from './pause.png';
import playingImage from './playing.gif';
import stopImage from './stop.gif'
import Label from '../common/Label/Label';

let _numOfRun = 1

const BgAudio = ({
  audioList,
  showLabel
}) => {
  console.log("BgAudio run", _numOfRun++)

  const [isPlaying, setIsPlaying] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0)

  const audioRef = useRef();

  // ref1: https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
  // ref2: https://stackoverflow.com/questions/56602005/play-audio-with-react
  const playAudio = () => {
    console.log("playAudio run")
    const promise = audioRef.current.play();

    if (promise !== undefined) {
      promise.then(_ => {
        // Autoplay started!
        console.log("play started")
      }).catch(error => {
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
        console.log("playAudio failed")
        console.log(error)
      });
    }
  }

  const _isFirstRun = useRef(true)
  useEffect(() => {
    console.log("useEffect, isPlaying", isPlaying)
    // why need this?
    // both `useEffect(, [isPlaying])` and `useEffect(,[currentAudioIndex])` will execute at the first run of `bgAudio` component 
    // and both of these two methods call `audioRef.current.play()` and/or `load()` which will raise an `Uncaught (in promise) DOMException`
    // In fact , `bgAudio` will set two initial state variable at its first run: isPlaying=true, currentAudioIndex=0
    // isPlaying dependent useEffect is for handle toggle event about play/pause.
    // currentAudioIndex dependent useEffect is for handle index change event.
    // so, it feels more reasonable to use currentAudioIndex dependent useEffect to trigger audio.play() when the `bgAudio` component first run.

    if (_isFirstRun.current) {
      _isFirstRun.current = false;
      return;
    }

    if (isPlaying) {
      // audioRef.current.play()
      playAudio()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  const onClickHandler = (evt) => {
    console.log("onClickHandler")
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
    console.log("useEffect, currentAudioIndex", currentAudioIndex)
    audioRef.current.load();
    // audioRef.current.play();
    playAudio();
  }, [currentAudioIndex])

  const InfoOnHover = (isPlaying) => (isPlaying ? "关闭背景音乐" : "播放背景音乐")

  return (
    <Container
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClickHandler}
    >

      <BgIcon src={isPlaying ? (isHover ? stopImage : playingImage) : pauseImage} />

      <AudioLabel width="150px">
        {
          isHover ? (
            InfoOnHover(isPlaying)
          ) : (
              isPlaying ? audioList[currentAudioIndex].name : "播放背景音乐"
            )
        }
      </AudioLabel>

      <audio
        ref={audioRef}
        autoPlay={true}
        preload="auto"
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
@media only screen and (max-width: 414px) {
  margin-right: 10px;
}
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

const AudioLabel = styled(Label)`
@media only screen and (max-width: 768px) {
    display: none;
}
`