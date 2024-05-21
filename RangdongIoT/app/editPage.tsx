import React from "react";
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";
import axios from "axios";

const EditPage = () => {
  const controlLED = async (id: any, status: any) => {
    try {
      const response = await axios.post(
        "https://digitaldev.io.vn/mqtt/publish",
        {
          message: {
            method: "control_led",
            params: {
              id: id,
              status: status,
            },
          },
          topic: "apptogate",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Lỗi điều khiển LED:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Điều khiển LED</Text>
      <Image
        source={require("@/assets/images/logo_vietnam.png")}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Bật LED"
          onPress={() => controlLED(4, 1)}
          color="#4CAF50"
        />
        <Button
          title="Tắt LED"
          onPress={() => controlLED(4, 0)}
          color="#F44336"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
  },
});

export default EditPage;
