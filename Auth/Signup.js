import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import { API } from "../constant/API";
import { ActivityIndicator } from "react-native";

const Signup = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handlesignup = async () => {
    setLoading(true);
    // fetch method to post data to server
    const resp = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        address: address,
        phone: phone,
        password: password,
      }),
    });
    const data = await resp.json();
    // console.log(data);

    if (data.status === "success") {
      setLoading(false);
      alert("Signup Successfull");
      navigate.navigate("Login");
    } else {
      setLoading(false);
      alert(data.message);
    }
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/004/256/001/small/sign-up-flat-illustration-call-to-action-vector.jpg",
          }}
          style={{
            width: "100%",
            height: 300,
            resizeMode: "cover",
          }}
        />
      </View>
      <View
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            marginTop: 4,
          }}
        >
          <Text style={tw`text-[18px] mt-4 `}>Name</Text>
          <TextInput
            placeholder="Enter your name"
            style={tw`border-2 border-gray-300 rounded-md p-2 mt-2`}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View
          style={{
            marginTop: 4,
          }}
        >
          <Text style={tw`text-[18px] mt-4 `}>Email</Text>
          <TextInput
            placeholder="Enter your Email"
            style={tw`border-2 border-gray-300 rounded-md p-2 mt-2`}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View
          style={{
            marginTop: 4,
          }}
        >
          <Text style={tw`text-[18px] mt-4 `}>City</Text>
          <TextInput
            placeholder="Enter your City"
            style={tw`border-2 border-gray-300 rounded-md p-2 mt-2`}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <View
          style={{
            marginTop: 4,
          }}
        >
          <Text style={tw`text-[18px] mt-4 `}>Password</Text>
          <TextInput
            placeholder="Enter your City"
            style={tw`border-2 border-gray-300 rounded-md p-2 mt-2`}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View
          style={{
            marginTop: 4,
          }}
        >
          <Text style={tw`text-[18px] mt-4 `}>Phone</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <PhoneInput
              defaultCode="IN"
              layout="first"
              withShadow
              autoFocus
              containerStyle={styles.phoneContainer}
              textContainerStyle={styles.textInput}
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
          }}
        >
          {loading === true ? (
            <TouchableOpacity
              disabled={true}
              style={{
                backgroundColor: "black",
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                size="small"
                color="white"
                style={{
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Sign Up...
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              // onPress={() => navigate.navigate("Login")}
              onPress={() => handlesignup()}
              style={{
                backgroundColor: "black",
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  phoneContainer: {
    width: "100%",
    height: 50,
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    width: "75%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  textInput: {
    paddingVertical: 0,
  },
});
