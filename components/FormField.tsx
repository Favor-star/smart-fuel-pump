import { View, Text, TextInput, TextInputProps } from "react-native";
import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import icons from "@/constants/icons";
import { ImageIcon } from "./CustomButton";

interface FormFieldProps {
  label: string;
  value: string;
  placeholder: string;
  handleChange: (text: string) => void;
  otherStyles?: string;
  inputStyles?: string;
  keyBoardType?: TextInputProps["keyboardType"];
  isNumeric?: boolean;
}
const FormField = ({
  label,
  value,
  placeholder,
  handleChange,
  otherStyles,
  inputStyles,
  keyBoardType = "default",
  isNumeric = false,
}: FormFieldProps) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View
      className={`w-full space-2 items-start justify-center ${otherStyles}`}
    >
      <Text className="font-pSemiBold text-sm">{label}</Text>
      <View
        className={`flex-row items-center justify-between w-full rounded-xl box-border   ${inputStyles}`}
      >
        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          className={`p-3 flex-1 rounded-xl box-border self-start font-pRegular`}
          secureTextEntry={
            (label === "Password" || label === "Confirm Password") && isHidden
          }
          keyboardType={isNumeric ? "numeric" : keyBoardType}
        />
        {(label === "Password" || label === "Confirm Password") && (
          <TouchableOpacity
            onPress={() => setIsHidden(!isHidden)}
            className="p-3"
          >
            {!isHidden && <ImageIcon icon={icons.EyeOff} tintColor={"black"} />}
            {isHidden && <ImageIcon icon={icons.Eye} tintColor={"black"} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
