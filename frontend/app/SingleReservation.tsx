import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import SinglePagesHeader from "@/components/SinglePagesHeader";
import ReservationCard from "@/components/my-reservations/ReservationCard";
import SingleReservationPrevInfo from "@/components/single-reservation/SingleReservationPrevInfo";
import SingleReservationPriceInfo from "@/components/single-reservation/SingleReservationPriceInfo";

export default function SingleReservation() {
  const params = useLocalSearchParams();
  return (
    <View style={styles.outerContainer}>
      <SinglePagesHeader title={`تفاصيل الحجز `} />
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={styles.reservationsCardsContainer}>
          <ReservationCard
            id={1}
            status="ACCEPTED"
            reservationDate="السبت , 11 / 1 / 2026"
            reservationTime="الساعة 7:00 مساءا"
            patientName="محمد احمد"
            reservationTitle="حجز أشعة"
            reservationType="أشعة على الصدر"
            gender="ذكر"
            age="25 عام"
            phone="01089936625"
            address="الأقصر , شارع المنشية , بجوار مسجد صلاح الدين"
            isForSingleReservation
          />
        </View>
        <SingleReservationPrevInfo />
        <SingleReservationPriceInfo />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    padding: 10,
    gap: 20,
  },
  reservationsCardsContainer: {
    gap: 20,
  },
});
