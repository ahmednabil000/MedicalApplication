import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { ICONS } from "@/constants/icons";
import ReservationCard from "./ReservationCard";

export default function MyReservationsContent() {
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
            colors={[Colors.main, Colors.secondary]}
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
            colors={[Colors.main, Colors.secondary]}
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
            colors={[Colors.main, Colors.secondary]}
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
            colors={[Colors.main, Colors.secondary]}
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

const styles = StyleSheet.create({
  mainScroll: {
    flex: 1,
    backgroundColor: Colors.gray10,
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
    borderBottomColor: Colors.gray300,
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
    color: Colors.white,
  },
  insightsCardValue: {
    fontFamily: "AlmaraiBold",
    fontSize: 16,
    color: Colors.white,
  },
  reservationsCardsContainer: {
    gap: 20,
  },
});
