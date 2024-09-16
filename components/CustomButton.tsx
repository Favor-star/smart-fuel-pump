import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

interface ButtonProps {
  onPress: () => void;
  styles?: string;
  title: string;
  icon?: React.ReactNode;
}
const Button = ({ onPress, title, icon }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className=" p-3 rounded-xl w-full max-w-[310px] bg-accent text white flex items-center justify-center"
    >
      <Text className=" font-medium text-lg text-white ">{title}</Text>
    </Pressable>
  );
};

export default Button;
