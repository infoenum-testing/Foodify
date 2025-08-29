import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userSlice";
import Input from "../components/Input"; 
import Button from "../components/Button"; 

export default function EditProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);

  // ✅ selecionar imagem da galeria
  const pickImage = async () => {
    // pedir permissão
    // const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (!permission.granted) {
    //   alert("Permissão para acessar a galeria é necessária!");
    //   return;
    // }

    // // abrir galeria
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 0.7,
    // });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  // salvar alterações
  const handleSave = () => {
    dispatch(updateUser({ name, avatar }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Foto de Perfil */}
      <TouchableOpacity onPress={pickImage} style={styles.avatarWrapper}>
        <Image
          source={
            avatar
              ? { uri: avatar }
              : { uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png" }
          }
          style={styles.avatar}
        />

        <Text style={styles.changePhoto}>Change Photo</Text>
      </TouchableOpacity>

      {/* Campo Nome (usando Input customizado) */}
      <Input
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      {/* Botão Salvar (usando Button customizado) */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  avatarWrapper: { alignItems: "center", marginBottom: 20 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eee",
  },
  changePhoto: {
    textAlign: "center",
    color: "#007bff",
    marginTop: 8,
    fontSize: 14,
  },
});
