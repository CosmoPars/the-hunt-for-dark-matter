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
import UseRefPlayer from "../components/videostacking/video-player2"
import { StackingButton } from "../components/buttons/stacktherestbutton"

import DarkMatterCircleImage from "../../assets/img/DarkMatterCircle.png"


const initialMassValue = 0.05
const massValueMultiplier = 0.05

export const StackedGalaxiesPage2 = () => {

  function YourComponent(){
    return  <img src={DarkMatterCircleImage} style={{zIndex: 110,  width:"510px", position: "fixed", left:"45%", top: "55%" }} alt="Dark matter circle"/>;
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
    amplitude.getInstance().logEvent('Click on Next Button',{'CurrentPage':'Stacked Galaxies'})
    history.push('/tutorial/stackedgalaxies3')
    ClickSound.play()
    BeginSound.play()

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


    <Background imgSrc='/assets/img/stackingstill3.png'>
    <UseRefPlayer/>
      
    
      <TutorialHeader currentChapter={3} />
      

      <BottomCenter width='70%'>
        {/* <TutStyledText>
          The easiest way to see the weak
            <br />effect is to "stack" the galaxies.
        </TutStyledText> */}
      </BottomCenter>
      <BottomRight>
        <StackingButton onClick={handleNext} />
        
{/*         <YourComponent/>
        <p style={{ fontSize:"30px", fontWeight:"bold", color:"white",  position: "fixed", left:"67%", top: "83%" }}>Dark Matter</p>  */}
      </BottomRight>
      <BottomLeft>
        <TutorialText heading={'The intrinsic galaxy shapes "average out", but the lensing effect doesn\'t.'}/>
        {/* <TutStyledText>
          The easiest way to see the weak
            <br />effect is to "stack" the galaxies.
        </TutStyledText> */}
      </BottomLeft>
    </Background>
    
  )
}
