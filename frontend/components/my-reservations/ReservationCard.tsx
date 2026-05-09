import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { ICONS } from "@/constants/icons";
import { Link } from "expo-router";

interface props {
  id: string | number;
  reservationTitle?: string;
  reservationSubTitle?: string;
  status?: "PENDING" | "ACCEPTED" | "REJECTED";
  patientName?: string;

  reservationDate?: string;
  reservationTime?: string;
  reservationType?: string;
  gender?: string;
  age?: string;
  phone?: string;
  address?: string;
  isForSingleReservation?: boolean;
}

export default function ReservationCard({
  reservationTitle,
  reservationSubTitle,
  status,
  patientName,
  reservationDate,
  reservationTime,
  reservationType,
  id,
  isForSingleReservation,
  gender,
  age,
  phone,
  address,
}: props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const [isActionMenuVisible, setIsActionMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const iconRef = useRef<View>(null);

  const toggleActionMenu = () => {
    if (!isActionMenuVisible) {
      5;
      iconRef.current?.measure((fx, fy, width, height, px, py) => {
        setMenuPosition({ x: px, y: py + height }); // Adjusted x to align menu better
        setIsActionMenuVisible(true);
      });
    } else {
      setIsActionMenuVisible(false);
    }
  };

  const handleUndo = () => {
    setIsActionMenuVisible(false);
    Alert.alert(
      "تنبيه",
      "هل أنت متأكد من رغبتك في التراجع عن هذا الإجراء؟",
      [
        {
          text: "إلغاء",
          style: "cancel",
        },
        {
          text: "تأكيد",
          onPress: () => {
            // Action to be performed after confirmation
            console.log("Undo confirmed for reservation:", id);
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleStyleAccordingToStatus = () => {
    switch (status) {
      case "ACCEPTED":
        return {
          color: colors.accept,
          icon: <ICONS.ACCEPT />,
          label: "تمت الموافقة",
        };

      case "PENDING":
        return {
          color: colors.pending,
          icon: <ICONS.PENDING />,
          label: "قيد الانتظار",
        };

      case "REJECTED":
        return {
          color: colors.reject,
          icon: <ICONS.REJECTED />,
          label: "مرفوض",
        };
    }
  };

  return (
    <LinearGradient
      colors={[colors.main, colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.reservationsCard}
    >
      <View style={styles.reservationsCardHeaderContainer}>
        <Text style={styles.reservationsCardHeaderTitle}>
          {reservationTitle}
        </Text>
        <View style={styles.statusAndActionsMenuContainer}>
          <View
            style={[
              styles.statusLabelContainer,
              { borderColor: handleStyleAccordingToStatus()?.color },
            ]}
          >
            <Text
              style={[
                styles.statusLabelText,
                { color: handleStyleAccordingToStatus()?.color },
              ]}
            >
              {handleStyleAccordingToStatus()?.label}
            </Text>
            {handleStyleAccordingToStatus()?.icon}
          </View>
          <View style={styles.actionMenuContainer}>
            <View ref={iconRef}>
              <TouchableOpacity
                style={styles.actionMenuIconContainer}
                activeOpacity={1}
                onPress={toggleActionMenu}
              >
                <ICONS.actionMenu />
              </TouchableOpacity>
            </View>

            <Modal
              visible={isActionMenuVisible}
              transparent={true}
              animationType="none"
              onRequestClose={() => setIsActionMenuVisible(false)}
            >
              <TouchableWithoutFeedback
                onPress={() => setIsActionMenuVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View
                    style={[
                      styles.actionMenu,
                      { top: menuPosition.y, left: menuPosition.x },
                    ]}
                  >
                    {status === "PENDING" && (
                      <TouchableOpacity
                        onPress={() => setIsActionMenuVisible(false)}
                      >
                        <Text style={styles.actionMenuText}>قبول</Text>
                      </TouchableOpacity>
                    )}
                    {status === "PENDING" && (
                      <TouchableOpacity
                        onPress={() => setIsActionMenuVisible(false)}
                      >
                        <Text style={styles.actionMenuText}>رفض</Text>
                      </TouchableOpacity>
                    )}
                    {(status === "ACCEPTED" || status === "REJECTED") && (
                      <TouchableOpacity onPress={() => handleUndo()}>
                        <Text style={styles.actionMenuText}>تراجع</Text>
                      </TouchableOpacity>
                    )}
                    {status === "PENDING" && (
                      <TouchableOpacity
                        onPress={() => setIsActionMenuVisible(false)}
                      >
                        <Text style={styles.actionMenuText}>حذف</Text>
                      </TouchableOpacity>
                    )}
                    {status === "ACCEPTED" && (
                      <TouchableOpacity
                        onPress={() => setIsActionMenuVisible(false)}
                      >
                        <Text style={styles.actionMenuText}>تكليف</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.infoContainer}>
          <ICONS.whiteName />
          <Text style={styles.infoLabelText}>{patientName}</Text>
        </View>

        <View style={styles.infoContainer}>
          <ICONS.serviceTypeWhite />
          <Text style={styles.infoLabelText}>{reservationType}</Text>
        </View>

        {isForSingleReservation && (
          <>
            <View style={styles.infoContainer}>
              <ICONS.genderWhite />
              <Text style={styles.infoLabelText}>{gender}</Text>
            </View>
            <View style={styles.infoContainer}>
              <ICONS.ageWhite />
              <Text style={styles.infoLabelText}>{age}</Text>
            </View>

            <View style={styles.infoContainer}>
              <ICONS.phoneWhite />
              <Text style={styles.infoLabelText}>{phone}</Text>
            </View>
          </>
        )}

        <View style={styles.dateAndTimesContainer}>
          <View style={styles.infoContainer}>
            <ICONS.whiteDate />
            <Text style={styles.infoLabelText}>{reservationDate}</Text>
          </View>
          <View style={styles.infoContainer}>
            <ICONS.whiteTime />
            <Text style={styles.infoLabelText}>{reservationTime}</Text>
          </View>
        </View>

        {isForSingleReservation && (
          <View style={styles.infoContainer}>
            <ICONS.locationWhite />
            <Text style={styles.infoLabelText}>{address}</Text>
          </View>
        )}

        {!isForSingleReservation && (
          <Link
            href={{
              pathname: "/SingleReservation",
              params: {
                id: id,
              },
            }}
            style={styles.detailsButton}
          >
            <Text style={styles.detailsButtonText}>تفاصيل الحجز</Text>
          </Link>
        )}
        {/* note */}
        {isForSingleReservation && (
          <View style={styles.noteContainer}>
            <Text style={styles.noteTitleText}>ملاحظات المريض :</Text>
            <Text style={styles.noteLabelText}>
              احتاج لعمل اشعة على ساقي اليمين بالاضافة الى عمل اشعة ايضا على
              ساقي اليسار
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  reservationsCard: {
    paddingVertical: 10,

    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  reservationsCardHeaderContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
    borderStyle: "dashed",
  },
  reservationsCardHeaderTitle: {
    fontFamily: "AlmaraiBold",
    fontSize: 18,
    color: colors.white,
  },
  statusAndActionsMenuContainer: {
    flexDirection: "row",
    gap: 10,

    alignItems: "center",
  },
  statusLabelContainer: {
    flexDirection: "row",
    gap: 5,

    alignItems: "center",
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,

    borderStyle: "solid",
    backgroundColor: colors.white,
  },
  statusLabelText: {
    fontFamily: "AlmaraiBold",
    fontSize: 12,
  },
  detailsContainer: {
    gap: 20,
    padding: 10,
  },
  infoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  infoLabelText: {
    fontFamily: "AlmaraiBold",
    fontSize: 14,
    color: colors.white,
  },
  dateAndTimesContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsButton: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  detailsButtonText: {
    fontFamily: "AlmaraiBold",
    fontSize: 14,
    color: colors.gray700,
    textAlign: "center",
  },
  actionMenuContainer: {
    position: "relative",
  },
  actionMenuIconContainer: {
    width: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  actionMenu: {
    position: "absolute",
    backgroundColor: colors.white,
    top: 40,
    left: 0,
    padding: 10,
    borderRadius: 10,
    gap: 10,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    width: 120,
    zIndex: 20,
  },
  actionMenuText: {
    fontFamily: "AlmaraiBold",
    fontSize: 12,
    color: colors.gray700,
    // textAlign:"center",
  },
  noteContainer: {
    borderTopWidth: 1,
    borderColor: colors.white,
    borderStyle: "dashed",
    paddingVertical: 10,
    gap: 20,
  },
  noteTitleText: {
    fontFamily: "AlmaraiBold",
    fontSize: 16,
    color: colors.white,
  },
  noteLabelText: {
    fontFamily: "AlmaraiRegular",
    fontSize: 14,
    color: colors.white,
    lineHeight: 20,
  },
});
