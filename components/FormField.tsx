import { View, Text, TextInput, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

interface FormFieldProps {
  label: string;
  value: string;
  placeholder: string;
  handleChange: (text: string) => void;
  otherStyles?: string;
  inputStyles?: string;
}
const FormField = ({
  label,
  value,
  placeholder,
  handleChange,
  otherStyles,
  inputStyles,
}: FormFieldProps) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View
      className={`w-full space-2 items-start justify-center ${otherStyles}`}
    >
      <Text className="font-semibold">{label}</Text>
      <TextInput
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        className={`p-4 w-full rounded-xl box-border self-start ${inputStyles}`}
      />
    </View>
  );
};

export default FormField;
