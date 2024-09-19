import { Text, Pressable } from "react-native";
import React from "react";


import { StyleProp, ViewStyle } from "react-native";

interface ButtonProps {
  onPress: () => void;
  styles?: string;
  title: string;
  icon?: any;
  otherStyles?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Button = ({
  onPress,
  title,
  icon,
  otherStyles,
  children,
  disabled = false,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`p-3 rounded-xl w-full  bg-green-normal text white flex items-center justify-center flex-row ${otherStyles}`}
      disabled={disabled}
    >
      {children}
      <Text className=" font-medium text-lg text-white mx-5 font-pMedium ">
        {!disabled && title}
      </Text>
      {icon && !disabled && <ImageIcon icon={icon} />}
    </Pressable>
  );
};

export default Button;

// const ImageIcon = ({ icon, tintColor }: { icon: any; tintColor?: string }) => {
//   return <Image source={icon} tintColor={(tintColor = "white")} />;
// };

export const ImageIcon = ({
  icon: Icon,
  tintColor = "white",
  style,
}: {
  icon: React.ComponentType<any>;
  tintColor?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return <Icon style={[{ color: tintColor }, style]} />;
};

const Image2Icon = ({
  icon: Icon,
  tintColor = "white",
  style,
}: {
  icon: React.ComponentType<any>;
  tintColor?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return <Icon style={[{ color: tintColor }, style]} />;
};

// export default Image2Icon;
