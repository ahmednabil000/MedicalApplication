import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { ICONS } from "@/constants/icons";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  label: string;
  placeholder: string;
  icon?: React.ReactElement;
  options: Option[];
  value?: string | number;
  onSelect?: (value: string | number) => void;
  error?: string;
}

export default function BasicSelectInput({
  label,
  placeholder,
  icon,
  options,
  value,
  onSelect,
  error,
}: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string | number) => {
    if (onSelect) {
      onSelect(val);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.otterInputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(true)}
        style={[styles.inputContainer, error ? { borderColor: "red" } : {}]}
      >
        <View style={styles.iconAndInputContainer}>
          {icon}
          <Text
            style={[
              styles.selectedText,
              !selectedOption && { color: colors.gray400 },
            ]}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        </View>
        <View style={styles.arrowIcon}>
          <ICONS.selectArrow style={{ width: 18, height: 18 }} />
        </View>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <View style={styles.modalIndicator} />
                  <Text style={styles.modalTitle}>{label}</Text>
                </View>
                <FlatList
                  data={options}
                  keyExtractor={(item) => item.value.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[
                        styles.optionItem,
                        value === item.value && styles.activeOption,
                      ]}
                      onPress={() => handleSelect(item.value)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          value === item.value && styles.activeOptionText,
                        ]}
                      >
                        {item.label}
                      </Text>
                      {value === item.value && (
                        <ICONS.mainDoneStatus />
                      )}
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={styles.optionsList}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  otterInputContainer: {
    gap: 10,
  },
  inputLabel: {
    color: colors.gray700,
    fontFamily: "AlmaraiRegular",
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 50,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 10,
  },
  iconAndInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent:"flex-start",
  },
  selectedText: {
    flex: 1,
    direction: "rtl",
    fontFamily: "AlmaraiRegular",
   
    fontSize: 14,
    color: colors.gray700,
  },
  arrowIcon: {
    paddingRight: 5,
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginTop: -5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 40,
    maxHeight: "70%",
  },
  modalHeader: {
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  modalIndicator: {
    width: 40,
    height: 5,
    backgroundColor: colors.gray200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontFamily: "AlmaraiBold",
    fontSize: 16,
    color: colors.gray700,
  },
  optionsList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray50,
  },
  activeOption: {
    backgroundColor: colors.gray10,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: -10,
  },
  optionText: {
    fontFamily: "AlmaraiRegular",
    fontSize: 14,
    color: colors.gray700,
  },
  activeOptionText: {
    fontFamily: "AlmaraiBold",
    color: colors.main,
  },
});
