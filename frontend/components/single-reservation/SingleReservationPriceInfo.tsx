import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/theme";
import { ICONS } from "@/constants/icons";

export default function SingleReservationPriceInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.infoTitleLabel}>
          <Text style={styles.infoTitleLabelText}>تفاصيل التكلفة</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.priceWarningCard}>
          <View style={styles.priceWarningHeader}>
            <Text style={styles.priceWarningTitle}>السعر النهائي غير ثابت</Text>
            <ICONS.note width={20} height={20} fill={Colors.main} />
          </View>

          <Text style={styles.priceWarningDescription}>
            يرجى العلم أن التكلفة النهائية للخدمة يتم تحديدها من قبل الطبيب
            المختص بعد إتمام الكشف أو الإجراء الطبي.
          </Text>

          <View style={styles.factorsList}>
            <Text style={styles.factorsTitle}>
              تعتمد التكلفة على عدة عوامل منها:
            </Text>

            <View style={styles.factorItem}>
              <View style={styles.dot} />
              <Text style={styles.factorText}>
                نوعية الفحوصات والتحاليل المطلوبة.
              </Text>
            </View>

            <View style={styles.factorItem}>
              <View style={styles.dot} />
              <Text style={styles.factorText}>
                الإجراءات الطبية التي يراها الطبيب ضرورية.
              </Text>
            </View>

            <View style={styles.factorItem}>
              <View style={styles.dot} />
              <Text style={styles.factorText}>
                استخدام مستلزمات طبية أو أجهزة إضافية.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footerNote}>
          <Text style={styles.footerNoteText}>
            يمكنك دائماً الاستفسار من الطبيب عن التكلفة التقريبية قبل البدء في
            أي إجراء إضافي.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 15,
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
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
  detailsContainer: {
    paddingHorizontal: 15,
    gap: 15,
  },
  priceWarningCard: {
    backgroundColor: Colors.gray10,
    borderRadius: 12,
    padding: 15,
    borderRightWidth: 4,
    borderRightColor: Colors.main,
  },
  priceWarningHeader: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,
    marginBottom: 10,
  },
  priceWarningTitle: {
    color: Colors.main,
    fontFamily: "AlmaraiBold",
    fontSize: 15,
  },
  priceWarningDescription: {
    color: Colors.gray700,
    fontFamily: "AlmaraiRegular",
    fontSize: 13,
    lineHeight: 22,
  },
  factorsList: {
    marginTop: 15,
    gap: 8,
  },
  factorsTitle: {
    color: Colors.gray800,
    fontFamily: "AlmaraiBold",
    fontSize: 13,
    marginBottom: 5,
  },
  factorItem: {
    flexDirection: "row",
    alignItems: "center",

    gap: 10,
    paddingRight: 5,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.main,
  },
  factorText: {
    color: Colors.gray600,
    fontFamily: "AlmaraiRegular",
    fontSize: 12,
  },
  footerNote: {
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
    marginTop: 5,
  },
  footerNoteText: {
    color: Colors.gray500,
    fontFamily: "AlmaraiRegular",
    fontSize: 11,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 18,
  },
});
