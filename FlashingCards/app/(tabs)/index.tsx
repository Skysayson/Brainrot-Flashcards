import { Image, StyleSheet, Platform, View, Text } from "react-native";
import { useState } from "react";
import FlashCardConstructor from "../../constructor/FlashCardConstructor";
import { Button } from "react-native";

export default function HomeScreen() {
  const [flip, isFlipped] = useState(false);
  const [x, setX] = useState(0);
  const flashCard1 = new FlashCardConstructor("Question1", "Answer1");
  const flashCard2 = new FlashCardConstructor("Question2", "Answer2");
  const flashCard3 = new FlashCardConstructor("Question3", "Answer3");
  const flashCard4 = new FlashCardConstructor("Question4", "Answer4");
  const flashCard5 = new FlashCardConstructor("Question5", "Answer5");

  const cardSet = [flashCard1, flashCard2, flashCard3, flashCard4, flashCard5];

  const flipCard = () => {
    flip == true ? isFlipped(false) : isFlipped(true);
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
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Prev" onPress={prevCard} />

      <Text
        style={{ borderWidth: 1, padding: 100, margin: 10 }}
        onPress={flipCard}
      >
        {flip ? (
          <Text>{cardSet[x].back}</Text>
        ) : (
          <Text>{cardSet[x].front}</Text>
        )}
      </Text>

      <Button title="Next" onPress={nextCard} />
    </View>
  );
}
