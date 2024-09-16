import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import FlashCardConstructor from "../../constructor/FlashCardConstructor";
import Animated from "react-native-reanimated";
<<<<<<< Updated upstream
import { Easing, runOnJS, useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
=======
import {
  Easing,
  runOnJS,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { State, TapGestureHandler } from "react-native-gesture-handler";
>>>>>>> Stashed changes

export default function HomeScreen() {
  const [flip, isFlipped] = useState(false);
  const [x, setX] = useState(0);
<<<<<<< Updated upstream
=======
  const [cardSet, setCardSet] = useState([
    { front: "What do you call it when you improve your looks?", back: "Looksmaxxing" },
    { front: "What do you call it when you look better than someone?", back: "Mogging" },
    { front: "When you get taxed on your food", back: "Fanum tax" },
    { front: "What state in America has the most strange activities?", back: "Ohio" },
    { front: "Synonym of charisma", back: "Rizz" },
  ]);
  const [autoPlay, setAutoPlay] = useState(false);
>>>>>>> Stashed changes
  const rotation = useSharedValue(0);
  const flashCard1 = new FlashCardConstructor("Question1", "Answer1");
  const flashCard2 = new FlashCardConstructor("Question2", "Answer2");
  const flashCard3 = new FlashCardConstructor("Question3", "Answer3");
  const flashCard4 = new FlashCardConstructor("Question4", "Answer4");
  const flashCard5 = new FlashCardConstructor("Question5", "Answer5");

  const cardSet = [flashCard1, flashCard2, flashCard3, flashCard4, flashCard5];

  const flipCard = () => {

    rotation.value = withTiming(
      flip ? 0 : 180,{
        duration: 500,
        easing: Easing.ease,
      },
      ()=>{
        runOnJS(isFlipped)(!flip);
      }
    )

    //flip == true ? isFlipped(false) : isFlipped(true);
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
<<<<<<< Updated upstream
    <View
      style={styles.container}
    >
      

      <Animated.View style={[rotationAnim]}>
      <Text
        style={styles.card}
        onPress={flipCard}
      >
        {flip ? (
          <Text>{cardSet[x].back}</Text>
        ) : (
          <Text>{cardSet[x].front}</Text>
        )}
      </Text>
      </Animated.View>
      
=======
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

      

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  card: {
    backgroundColor: 'white', 
    padding: 100, 
    margin: 10, 
=======
  topButtons: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cardContainer:{
     position: 'relative',
  },
  card: {
    backgroundColor: "white",
>>>>>>> Stashed changes
    borderRadius: 30,
    elevation:20, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 500,
    height: 300,
<<<<<<< Updated upstream
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardBack: {
    transform: [{ rotateY: '180deg' }],
  },
  cardText: {
    fontSize: 20,
    textAlign: 'center',
=======
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
>>>>>>> Stashed changes
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
<<<<<<< Updated upstream
    borderColor: '#b3b3b3',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
=======
    borderColor: "#b3b3b3",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
>>>>>>> Stashed changes
    margin: 10,
  },
  buttonText: {
    color: '#b3b3b3',
    fontSize: 24,
    fontFamily: "Montserrat",
  },
  buttonContainer: {
<<<<<<< Updated upstream
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
=======
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
>>>>>>> Stashed changes
  },
});