import { useCallback, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { BottomRight } from "../components/bottom-right"
import { Background } from "../components/background"
import { TutorialHeader } from "../components/tutorial-header"
import { BottomCenter } from "../components/bottom-center"
import { NextButton } from "../components/buttons/next-button"
import { Magnify } from "../components/magnify"
import { AnimatedStack } from "../components/stack/animated-stack"
import { Stack } from "../components/stack/stack"
import { MagnifyViewer } from "../components/magnify-viewer"
import { MagnifyClip } from "../components/magnify-clip"
import { TopLeft } from "../components/top-left"
import { Label } from "../components/label"
import { labelSize, labelFontSize, stackLayers } from "../config"
import { BottomLeft } from "../components/bottom-left"
import { TutorialSlider } from "../components/tutorial-slider"
import { TutorialText } from "../components/tutorial-text"
import { ClickSound } from "../components/audio/sound"
import { ObstacleMass } from "../components/audio/sound"
import { StackedGalaxies } from "../components/audio/sound"
import { TutorialAmbience } from  "../components/audio/sound"
import { useAmbientFn } from "../components/audio/ambient-context"

import { BeginSound } from "../components/audio/sound"


import amplitude from 'amplitude-js'
import { StackRestartButton } from "../components/buttons/stackrestartbutton"
import UseRefPlayer from "../components/videostacking/video-player3"


import DarkMatterCircleImage from "../../assets/img/DarkMatterCircle.png"

const initialMassValue = 0.05
const massValueMultiplier = 0.05

export const StackedGalaxiesPage3 = () => {

  function YourComponent(){
    return  <img src={DarkMatterCircleImage} style={{zIndex: 110,  width:"510px", position: "fixed", left:"35%", top: "55%" }} alt="Dark matter circle"/>;
  }

  const history = useHistory()

  const [lensMass, setLensMass] = useState(initialMassValue)

  const [isPlaying, setIsPlaying] = useState(false)

/*    if(isPlaying === false)
  {
    BeginSound.play()
    setIsPlaying(true)
  }  */

  const handleNext = useCallback(() => {
    amplitude.getInstance().logEvent('Click on Next Button',{'CurrentPage':'Stacked Galaxies3'})
    history.push('/tutorial/ending')
    ClickSound.play()
  }, [history])

  const handleRestack = useCallback(() => {
    amplitude.getInstance().logEvent('Click on Next Button',{'CurrentPage':'Stacked Galaxies3'})
    history.push('/tutorial/stackedgalaxiesloader')
    ClickSound.play()
    // BeginSound.play()

  }, [history])

  const [firstChange, setFirstChange] = useState(false)
  const handleMassAdjust = useCallback((val: number) => {
    setLensMass((val + 0.5) * massValueMultiplier)
    setFirstChange(true)
  }, [setLensMass])

  const setAmbient = useAmbientFn()

  useEffect(() => {
    setAmbient(TutorialAmbience, 3000)
  }, [setAmbient])



  return (


    <Background imgSrc='/assets/img/Stackingstill4.png'>
      <UseRefPlayer/>
      <TutorialHeader currentChapter={3} />
      <BottomCenter width='70%'>
        {/* <TutStyledText>
          The easiest way to see the weak
            <br />effect is to "stack" the galaxies.
        </TutStyledText> */}
      </BottomCenter>
      <BottomRight>
        <StackRestartButton onClick={handleRestack} /> 
        <NextButton onClick={handleNext} />
        {/* <YourComponent/>
        <p style={{ fontSize:"30px", fontWeight:"bold", color:"white",  position: "fixed", left:"57%", top: "83%" }}>Dark Matter</p>    */}      
      </BottomRight>
      <BottomLeft>
        <TutorialText heading={'The stacked images reveal something new. Some hidden dark matter!'} subheading={'Galaxy images are squashed in the direction of a lens and stretched in the other direction. Without lensing, the stacks would just be circles.'}/>
        {/* <TutStyledText>
          The easiest way to see the weak
            <br />effect is to "stack" the galaxies.
        </TutStyledText> */}
      </BottomLeft>
    </Background>
    
  )
}
