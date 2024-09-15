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

export default function HomeScreen() {
  const [flip, isFlipped] = useState(false);
  const [x, setX] = useState(0);
  const [cardSet, setCardSet] = useState([
    { front: "Question 1", back: "Answer 1" },
    { front: "Question 2", back: "Answer 2" },
    { front: "Question 3", back: "Answer 3" },
    { front: "Question 4", back: "Answer 4" },
    { front: "Question 5", back: "Answer 5" },
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

  const rotationAnim = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: `${rotation.value}deg` }],
    };
  });

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
  };

  const prevCard = () => {
    if (x > 0) {
      setX(x - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <Text style={{ borderWidth: 1, padding: 10 }} onPress={shuffleSet}>
          Shuffle-Cards
        </Text>
        <Text
          style={{ borderWidth: 1, padding: 10 }}
          onPress={() => setAutoPlay(!autoPlay)}
        >
          {autoPlay ? "Stop Auto-Play" : "Start Auto-Play"}
        </Text>
      </View>

      <Animated.View style={[rotationAnim]}>
        <Text style={styles.card} onPress={flipCard}>
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

  topButtons: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
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
  },
  cardBack: {
    transform: [{ rotateY: "180deg" }],
  },
  cardText: {
    fontSize: 20,
    textAlign: "center",
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
    margin: 10,
  },
  buttonText: {
    color: "#b3b3b3",
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});
