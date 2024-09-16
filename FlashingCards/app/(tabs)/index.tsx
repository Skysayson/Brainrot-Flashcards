import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import Animated from "react-native-reanimated";
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { State, TapGestureHandler } from "react-native-gesture-handler";

export default function HomeScreen() {
  const [flip, isFlipped] = useState(false);
  const [x, setX] = useState(0);
  const [cardSet, setCardSet] = useState([

    { front: "What do you call it when you improve your looks?", back: "Looksmaxxing" },
    { front: "What do you call it when you look better than someone?", back: "Mogging" },
    { front: "When you get taxed on your food", back: "Fanum tax" },
    { front: "What state in America has the most strange activities?", back: "Ohio" },
    { front: "Synonym of charisma", back: "Rizz" },
  ]);
  
  const [autoPlay, setAutoPlay] = useState(false);
  const rotation = useSharedValue(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (autoPlay) {
      intervalId = setInterval(() => {
        setX((prevX) => (prevX < cardSet.length - 1 ? prevX + 1 : 0));
      }, 2000); // Change card every 2 seconds
    }
    return () => clearInterval(intervalId);
  }, [autoPlay]);

  const flipCard = () => {
    rotation.value = withTiming(
      flip ? 0 : 180,
      {
        duration: 500,
        easing: Easing.ease,
      },
      () => {
        runOnJS(isFlipped)(!flip);
      }
    );
  };

  const rotateFront = useAnimatedStyle (()=>{
    return { 
      transform: [{perspective: 1000}, {rotateX: `${rotation.value}deg`}]
    }
  })

  const rotateBack = useAnimatedStyle (()=>{
    return { 
      transform: [{perspective: 1000}, {rotateX: `${rotation.value+180}deg`}]
    }
  })

  const shuffleAlgorithm = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const shuffleSet = () => {
    setCardSet((prevCardSet) => shuffleAlgorithm([...prevCardSet]));
    setX(0);
  };

  const nextCard = () => {
    if (x < cardSet.length - 1) {
      setX(x + 1);
    } else {
      setX(0);
    }
    isFlipped(false);
    rotation.value = 0;
  };

  const prevCard = () => {
    if (x > 0) {
      setX(x - 1);
    }
    isFlipped(false);
    rotation.value = 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TapGestureHandler onHandlerStateChange={({nativeEvent}) =>{
          if(nativeEvent.state == State.END){
            flipCard();
            }
          }}>
          <Animated.View style={[styles.card, rotateFront]}>
            <Text style={styles.cardText}>{cardSet[x].front}</Text>
          </Animated.View>
        </TapGestureHandler>

        <TapGestureHandler onHandlerStateChange={({nativeEvent}) =>{
          if(nativeEvent.state == State.END){
            flipCard();
            }
          }}>
          <Animated.View style={[styles.card, rotateBack, styles.back]}>
            <Text style={styles.cardText}>{cardSet[x].back}</Text>
          </Animated.View>
        </TapGestureHandler>
        
      </View>

     
      <View style={styles.buttonContainer}>

         <TouchableOpacity style={styles.button} onPress={shuffleSet}>
              <Text style={styles.buttonText}>{"↻"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={prevCard}>
            <Text style={styles.buttonText}>{"←"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={nextCard}>
            <Text style={styles.buttonText}>{"→"}</Text>
          </TouchableOpacity>

          
            <TouchableOpacity style={styles.button} onPress={() => setAutoPlay(!autoPlay)}>
              <Text style={styles.buttonText}> {autoPlay ? "❚❚" : "▶"}</Text>
            </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer:{
     position: 'relative',
  },
  card: {
    backgroundColor: "white",
    padding: 100,
    margin: 10,
    borderRadius: 30,
    elevation: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 500,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    backfaceVisibility: 'hidden',
    padding: 20,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "light",
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "Arial",
  },
  back:{
    position: 'absolute',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#b3b3b3",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
  },
  buttonText: {
    color: "#b3b3b3",
    fontSize: 24,
    fontFamily: "Montserrat",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});
