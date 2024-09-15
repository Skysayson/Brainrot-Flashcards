import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import FlashCardConstructor from "../../constructor/FlashCardConstructor";
import Animated from "react-native-reanimated";
import { Easing, runOnJS, useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";

export default function HomeScreen() {
  const [flip, isFlipped] = useState(false);
  const [x, setX] = useState(0);
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

  const rotationAnim = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
    };
  });

  const nextCard = () => {
    if (x < cardSet.length - 1) {
      setX(x + 1);
    } else {
      setX(0);
    }
  };

  const prevCard = () => {
    if (x > 0) {
      setX(x - 1);
    }
  };

  return (
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
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={prevCard}>
          <Text style={styles.buttonText}>{"<"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={nextCard}>
          <Text style={styles.buttonText}>{">"}</Text>
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
  card: {
    backgroundColor: 'white', 
    padding: 100, 
    margin: 10, 
    borderRadius: 30,
    elevation:20, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3,
    shadowRadius: 4,
    width: 500,
    height: 300,
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
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#b3b3b3',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#b3b3b3',
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});