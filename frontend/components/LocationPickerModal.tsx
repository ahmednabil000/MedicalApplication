import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

// Conditional import for MapView to prevent crashes on unsupported platforms
let MapView: any;
let Marker: any;

try {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
} catch (e) {
  console.warn("Maps are not available on this platform");
}

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (location: Location) => void;
  initialLocation?: Location;
}

const { width, height } = Dimensions.get("window");

export default function LocationPickerModal({
  visible,
  onClose,
  onSelect,
  initialLocation,
}: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    initialLocation || null
  );

  const [region, setRegion] = useState({
    latitude: initialLocation?.latitude || 30.0444, // Default to Cairo
    longitude: initialLocation?.longitude || 31.2357,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleMapPress = (event: any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleConfirm = () => {
    if (selectedLocation) {
      onSelect(selectedLocation);
    }
    onClose();
  };

  const MapContent = () => {
    if (!MapView) {
      return (
        <View style={[styles.map, styles.centered]}>
          <Text style={styles.errorText}>الخريطة غير متوفرة على هذا النظام</Text>
          <Text style={styles.hint}>يرجى المحاولة من خلال الهاتف المحمول</Text>
        </View>
      );
    }

    return (
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            draggable
            onDragEnd={(e: any) => setSelectedLocation(e.nativeEvent.coordinate)}
          />
        )}
      </MapView>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>إلغاء</Text>
          </TouchableOpacity>
          <Text style={styles.title}>اختر الموقع</Text>
          <TouchableOpacity onPress={handleConfirm} disabled={!selectedLocation}>
            <Text
              style={[
                styles.confirmText,
                !selectedLocation && { color: colors.gray300 },
              ]}
            >
              تأكيد
            </Text>
          </TouchableOpacity>
        </View>

        <MapContent />

        {selectedLocation && (
          <View style={styles.footer}>
            <Text style={styles.locationInfo}>
              الموقع المختار: {selectedLocation.latitude.toFixed(4)},{" "}
              {selectedLocation.longitude.toFixed(4)}
            </Text>
            <Text style={styles.hint}>يمكنك سحب العلامة لتعديل الموقع بدقة</Text>
          </View>
        )}
      </View>
    </Modal>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  title: {
    fontFamily: "AlmaraiBold",
    fontSize: 16,
    color: colors.gray700,
  },
  cancelText: {
    fontFamily: "AlmaraiRegular",
    fontSize: 14,
    color: "red",
  },
  confirmText: {
    fontFamily: "AlmaraiBold",
    fontSize: 14,
    color: colors.main,
  },
  map: {
    flex: 1,
    width: width,
    height: height,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontFamily: "AlmaraiBold",
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  locationInfo: {
    fontFamily: "AlmaraiBold",
    fontSize: 14,
    color: colors.gray700,
    textAlign: "center",
    marginBottom: 5,
  },
  hint: {
    fontFamily: "AlmaraiRegular",
    fontSize: 12,
    color: colors.gray400,
    textAlign: "center",
  },
});
