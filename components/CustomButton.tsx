import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import icons from "../constants/icons";
interface ButtonProps {
  onPress: () => void;
  styles?: string;
  title: string;
  icon?: any;
  otherStyles?: string;
}
const Button = ({ onPress, title, icon, otherStyles }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`p-3 rounded-xl w-full  bg-accent text white flex items-center justify-center flex-row ${otherStyles}`}
    >
      <Text className=" font-medium text-lg text-white mx-5 ">{title}</Text>
      {icon && <ImageIcon icon={icon} />}
    </Pressable>
  );
};

export default Button;

const ImageIcon = ({ icon, tintColor }: { icon: any; tintColor?: string }) => {
  return <Image source={icon} tintColor={(tintColor = "white")} />;
};
