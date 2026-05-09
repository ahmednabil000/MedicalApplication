import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { ICONS } from "@/constants/icons";
import ReservationCard from "./ReservationCard";

export default function MyReservationsContent() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <ScrollView
      style={styles.mainScroll}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* insights */}
      <View style={styles.insightsContainer}>
        <View style={styles.insightsInnerContainer}>
          <LinearGradient
            colors={[colors.main, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.insightsCardContainer}
          >
            <View style={styles.insightsCardTextContainer}>
              <Text style={styles.insightsCardLabel}> الحجوزات</Text>
              <Text style={styles.insightsCardValue}>25</Text>
            </View>
            <ICONS.totalReservationsCard />
          </LinearGradient>
          <LinearGradient
            colors={[colors.main, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.insightsCardContainer}
          >
            <View style={styles.insightsCardTextContainer}>
              <Text style={styles.insightsCardLabel}> في الانتظار</Text>
              <Text style={styles.insightsCardValue}>20</Text>
            </View>
            <ICONS.pendingReservationsCard />
          </LinearGradient>
        </View>
        <View style={styles.insightsInnerContainer}>
          <LinearGradient
            colors={[colors.main, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.insightsCardContainer}
          >
            <View style={styles.insightsCardTextContainer}>
              <Text style={styles.insightsCardLabel}> تمت الموافقة</Text>
              <Text style={styles.insightsCardValue}>3</Text>
            </View>
            <ICONS.acceptReservationsCard />
          </LinearGradient>
          <LinearGradient
            colors={[colors.main, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.insightsCardContainer}
          >
            <View style={styles.insightsCardTextContainer}>
              <Text style={styles.insightsCardLabel}> مرفوض</Text>
              <Text style={styles.insightsCardValue}>2</Text>
            </View>
            <ICONS.cancelledReservationsCard />
          </LinearGradient>
        </View>
      </View>

      {/* reservations cards  */}

      <View style={styles.reservationsCardsContainer}>
        <ReservationCard
          id={1}
          status="ACCEPTED"
          reservationDate="السبت , 11 / 1 / 2026"
          reservationTime="الساعة 7:00 مساءا"
          patientName="محمد احمد"
          reservationTitle="حجز أشعة"
          reservationType="أشعة على الصدر"
        />
        <ReservationCard
          id={2}
          status="PENDING"
          reservationDate="السبت , 11 / 1 / 2026"
          reservationTime="الساعة 7:00 مساءا"
          patientName="محمد احمد"
          reservationTitle="حجز تحاليل وسحب عينات"
          reservationType="تحليل دم"
        />
        <ReservationCard
          id={3}
          status="REJECTED"
          reservationDate="السبت , 11 / 1 / 2026"
          reservationTime="الساعة 7:00 مساءا"
          patientName="محمد احمد"
          reservationTitle="حجز خدمات تمريضية منزلية"
          reservationType="حقن وريد"
        />
        <ReservationCard
          id={4}
          status="REJECTED"
          reservationDate="السبت , 11 / 1 / 2026"
          reservationTime="الساعة 7:00 مساءا"
          patientName="محمد احمد"
          reservationTitle="حجز خدمات تمريضية منزلية"
          reservationType="رعاية كبار السن"
        />
      </View>
    </ScrollView>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  mainScroll: {
    flex: 1,
    backgroundColor: colors.gray10,
    // marginBottom: 80
  },
  container: {
    padding: 10,
    paddingTop: 10,
    gap: 20,
  },
  insightsContainer: {
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
    borderStyle: "dashed",
    paddingBottom: 10,
  },
  insightsInnerContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  insightsCardContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",

    padding: 10,
    borderRadius: 10,
  },
  insightsCardTextContainer: {
    flex: 1,

    gap: 5,
  },
  insightsCardLabel: {
    fontFamily: "AlmaraiBold",
    fontSize: 18,
    color: colors.white,
  },
  insightsCardValue: {
    fontFamily: "AlmaraiBold",
    fontSize: 16,
    color: colors.white,
  },
  reservationsCardsContainer: {
    gap: 20,
  },
});
