import { View, Text, TextInput, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconEye, IconEyeOff } from "@tabler/icons-react-native";

interface FormFieldProps {
  label: string;
  value: string;
  placeholder: string;
  handleChange: () => void;

}
const FormField = ({
  label,
  value,
  placeholder,
  handleChange,
}: FormFieldProps) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <View className="space-y-2">
      <Text>{label}</Text>
      <TextInput></TextInput>
      <View className="w-full p-4 rounded-xl bg-gray-100 flex-row justify-between">
        <TextInput
          value={value}
          placeholder={placeholder}
          secureTextEntry={label === "Password" && isHidden}
          onChange={handleChange}
        />
        {label === "Password" && (
          <TouchableOpacity onPress={() => setIsHidden(!isHidden)}>
            {isHidden ? <IconEye size={20} /> : <IconEyeOff size={20} />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
