import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av'
import NumericInput from 'react-native-numeric-input'
import { create, PREDEF_RES } from 'react-native-pixel-perfect'
import Button from '../../components/Button'
import Clock from '../../components/Clock'

const calcSize = create(PREDEF_RES.iphone7.px)

const soundObject = new Audio.Sound()

const Home: React.FC = () => {
  const seconds = 60
  const [time, setTime] = useState(25 * seconds)
  const [isActive, setIsActive] = useState(false)
  const [alarm, setAlarm] = useState(true)
  const [session, setSession] = useState(25)
  const [rest, setRest] = useState(5)
  const [typeClock, setTypeClock] = useState('session')

  let isLoaded = false

  async function PlayAudio(Url: string) {
    if (!alarm) {
      soundObject
        .loadAsync({
          uri: Url
        })
        .then(resp => (isLoaded = resp.isLoaded))
    

    if (alarm && isLoaded) {
      await soundObject.playAsync()
      setAlarm(false)
      setTime(typeClock == 'session' ? rest * seconds : session * seconds)
    }
  }
  }

  async function toggle() {
    if (time > 0) {
      setIsActive(!isActive)
    } else {
      setIsActive(false)
    }
  }

  function reset() {
    setTime(seconds * 25)
    setSession(25)
    setRest(5)
    setAlarm(true)
    setIsActive(false)
    setTypeClock('session')
  }

  function updateClock(sessaoTime: number, type: string) {
    if (type == 'session') setSession(sessaoTime)

    if (type == 'rest') setRest(sessaoTime)

    if (typeClock == type) setTime(sessaoTime * seconds)
  }

  useEffect(() => {
    let interval = 0
    if (time > 0) {
      setAlarm(true)
      if (isActive) {
        interval = setInterval(() => {
          setTime(time => time - 1)
        }, 1000)
      } else if (!isActive && time !== 0) {
        clearInterval(interval)
      }
    } else {
      setTypeClock(typeClock == 'session' ? 'rest' : 'session')
      PlayAudio('http://gamekill.cz/cstrike/sound/PVPFlagCaptured.mp3')
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isActive, time])

  return (
    <LinearGradient
      colors={['#0949b5', '#00a2ff']}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.instructions}>Tempo de sessão</Text>
          <NumericInput
            initValue={session}
            value={session}
            onChange={(value: number) => {
              updateClock(value, 'session')
            }}
            step={1}
            minValue={1}
            maxValue={50}
            totalWidth={calcSize(300)}
            totalHeight={calcSize(100)}
            textColor="#fff"
            iconStyle={{ color: '#fff' }}
            borderColor="transparent"
            rightButtonBackgroundColor="#0949b5"
            leftButtonBackgroundColor="#0949b5"
          />
        </View>
        <View>
          <Text style={styles.instructions}>Tempo de descanso</Text>
          <NumericInput
            initValue={rest}
            value={rest}
            onChange={(value: number) => {
              updateClock(value, 'rest')
            }}
            step={1}
            minValue={1}
            maxValue={30}
            totalWidth={calcSize(300)}
            totalHeight={calcSize(100)}
            textColor="#fff"
            iconStyle={{ color: '#fff' }}
            borderColor="transparent"
            rightButtonBackgroundColor="#0949b5"
            leftButtonBackgroundColor="#0949b5"
          />
        </View>
      </View>
      <Clock time={time} />
      <View style={styles.buttons}>
        <Button onPress={toggle}>{isActive ? 'Parar' : 'Iniciar'}</Button>
        <Button onPress={reset}>Reiniciar</Button>
      </View>
    </LinearGradient>
  )
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 5,
    justifyContent: 'space-evenly'
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 5,
    marginTop: 5
  }
})

export default Home
