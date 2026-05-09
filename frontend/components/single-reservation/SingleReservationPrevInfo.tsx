import {
  Alert,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/theme";
import { ICONS } from "@/constants/icons";

export default function SingleReservationPrevInfo() {
  const makePhoneCall = () => {
    const phoneNumber = "01061174403";
    const url = `tel:${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert("Error", "Phone calls are not supported on this device");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoTitleLabel}>
          <Text style={styles.infoTitleLabelText}>تعليمات قبل الخدمة</Text>
        </View>
        <Pressable style={styles.contactButton} onPress={makePhoneCall}>
          <Text style={styles.contactButtonText}>اتصال</Text>
          <ICONS.phoneWhite />
        </Pressable>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsInfoContainer}>
          <ICONS.tellDoctor />
          <Text style={styles.detailsInfoContainerText}>
            قم بإخبار الطبيب عن الحمل، الحساسية (خاصة لليود أو الصبغة)، السكري،
            ومشاكل الكلى أو أي مشاكل أخرى.
          </Text>
        </View>

        <View style={styles.detailsInfoContainer}>
          <ICONS.cloth />
          <Text style={styles.detailsInfoContainerText}>
            قم بارتداء ملابس مريحة وفضفاضة.
          </Text>
        </View>

        <View style={styles.detailsInfoContainer}>
          <ICONS.noMetal />
          <Text style={styles.detailsInfoContainerText}>
            قم بنزع أي مجوهرات أو معادن من المنطقة المراد تصويرها.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 10,
    shadowColor: Colors.gray200,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  infoTitleLabel: {
    backgroundColor: Colors.main,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  infoTitleLabelText: {
    color: Colors.white,
    fontFamily: "AlmaraiBold",
    fontSize: 14,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.accept,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: Colors.gray200,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  contactButtonText: {
    color: Colors.white,
    fontFamily: "AlmaraiBold",
    fontSize: 12,
  },
  detailsContainer: {
    padding: 10,
    gap: 10,
  },
  detailsInfoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 5,
  },
  detailsInfoContainerText: {
    color: Colors.gray700,
    fontFamily: "AlmaraiRegular",
    fontSize: 12,
    lineHeight: 20,
  },
});
