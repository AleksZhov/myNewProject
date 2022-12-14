import {
  Text,
  Button,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useState } from "react";

import {
  MaterialIcons,
  Feather,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const [locatPos, setLocatPos] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [postDescr, setPhotoDescr] = useState("");
  const isReadyToPubl = postDescr && photo;
  const [isShowCamera, setIsShowCamera] = useState(true);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync();
    let place = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    let pos = `${place[0].region}, ${place[0].country}`;
    setLocatPos(pos);
  };
  console.log(locatPos);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={st.cont}>
        {isShowCamera ? (
          <View style={st.camera}>
            {photo && (
              <Image style={st.photoImg} source={{ uri: photo }}></Image>
            )}
            <TouchableOpacity
              onPress={() => setIsShowCamera(false)}
              style={st.btnCont}
            >
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        ) : (
          <Camera style={st.camera} ref={setCamera}>
            <TouchableOpacity
              onPress={() => {
                takePhoto();
                setIsShowCamera(true);
              }}
              style={st.btnCont}
            >
              <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        )}

        <Text style={st.cameraText}>?????????????????? ????????</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            style={st.postDescr}
            value={postDescr}
            onChangeText={setPhotoDescr}
            placeholder="????????????????"
          />
        </KeyboardAvoidingView>
        <View>
          <Ionicons name="location-outline" size={24} color="black" />
          <Text>{locatPos || "??????????????????..."}</Text>
        </View>
        <TouchableOpacity
          style={{
            ...st.publBtn,
            backgroundColor: isReadyToPubl ? "#FF6C00" : "#F6F6F6",
          }}
        >
          <Text
            onPress={() => navigation.navigate("Posts")}
            style={{
              ...st.publBtnText,
              color: isReadyToPubl ? "#fff" : "#BDBDBD",
            }}
          >
            ????????????????????????
          </Text>
        </TouchableOpacity>
        <View style={st.clearBtnCont}>
          <TouchableOpacity
            onPress={() => {
              setPhoto(null), setPhotoDescr(""), setLocatPos(null);
            }}
            style={st.clearBtn}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default CreatePostsScreen;

const st = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  camera: {
    backgroundColor: "#f6f6f6",
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
  },
  photoImg: {
    flex: 1,

    width: "100%",
  },
  btnCont: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraText: {
    marginTop: 8,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  postDescr: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    color: "rgba(33, 33, 33, 1)",
    marginTop: 45,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  publBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    marginTop: 32,
    borderRadius: 100,
  },
  publBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  clearBtn: {
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 70,
    borderRadius: 20,
  },
  clearBtnCont: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 32,
    marginTop: 32,
  },
});
