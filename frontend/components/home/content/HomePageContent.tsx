import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/theme'
import { LinearGradient } from 'expo-linear-gradient';
import { ICONS } from '@/constants/icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

export default function HomePageContent() {
  return (
    <View style={styles.container}>
        {/* next reservation card */}
      <LinearGradient
        colors={[Colors.main, Colors.secondary]}
        style={styles.nextReservationCard}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      >
            <View style={styles.titleAndStatusLabelContainer}>
                <Text style={styles.reservationTitle}>الحجز القادم </Text>
                <View style={styles.statusLabelContainer}>
                    <Text style={styles.statusLabelText}>تمت الموافقة</Text>
                    <ICONS.mainDoneStatus/>
                </View>
            </View>
            <View style={styles.reservationDetailsContainer}>
                <View style={styles.detailsLabelContainer}>
                    <ICONS.reservationType/>
                    <Text style={styles.detailsLabelText}>حجز أشعة</Text>
                </View>

                <View style={styles.detailsLabelContainer}>
                    <ICONS.date/>
                    <Text style={styles.detailsLabelText}>السبت , 11 / 1 / 2026</Text>
                </View>

                <View style={styles.detailsLabelContainer}>
                    <ICONS.time/>
                    <Text style={styles.detailsLabelText}>الساعة 7:00 مساءا</Text>
                </View>
            </View>
      </LinearGradient>
      {/* our services section */}

      <View style={styles.ourServicesContainer}>
        <Text style={styles.newSectionTitle}>خدماتنا</Text>
        
        <Link 
          href={{
            pathname: "/add-reservation",
            params: {
              serviceName: "حجز أشعة",
              serviceType: "XRAY"
            }
          }}
          asChild
        >
          <TouchableOpacity activeOpacity={0.8} style={styles.serviceCardContainer}>
              <LinearGradient  colors={[Colors.main, Colors.secondary]}  start={{x: 0, y: 0}}
          end={{x: 1, y: 1}} style={styles.serviceCard}>
              <View  style={styles.serviceCardImageContainer}>

                  <Image
                  style={styles.serviceCardImage}
                  source={require("../../../assets/images/x-rays.png")}
                  />
                  </View>
                  <Text style={styles.serviceCardText}>أشعة منزلية</Text>
                  <ICONS.chevronLeft />
              </LinearGradient>
          </TouchableOpacity>
        </Link>

        <Link 
          href={{
            pathname: "/add-reservation",
            params: {
              serviceName: "حجز تحاليل وسحب عينات",
              serviceType: "LABORATORY"
            }
          }}
          asChild
        >
          <TouchableOpacity activeOpacity={0.8} style={styles.serviceCardContainer}>
              <LinearGradient  colors={[Colors.main, Colors.secondary]}  start={{x: 0, y: 0}}
          end={{x: 1, y: 1}} style={styles.serviceCard}>
              <View  style={styles.serviceCardImageContainer}>

                  <Image
                  style={styles.serviceCardImage}
                  source={require("../../../assets/images/medical-tests.png")}
                  />
                  </View>
                  <Text style={styles.serviceCardText}>تحاليل وسحب عينات </Text>
                  <ICONS.chevronLeft />
              </LinearGradient>
          </TouchableOpacity>
        </Link>

        <Link 
          href={{
            pathname: "/add-reservation",
            params: {
              serviceName: "حجز خدمات تمريضية منزلية",
              serviceType: "HOME_NURSING"
            }
          }}
          asChild
        >
          <TouchableOpacity activeOpacity={0.8} style={styles.serviceCardContainer}>
              <LinearGradient  colors={[Colors.main, Colors.secondary]}  start={{x: 0, y: 0}}
          end={{x: 1, y: 1}} style={styles.serviceCard}>
              <View  style={styles.serviceCardImageContainer}>

                  <Image
                  style={styles.serviceCardImage}
                  source={require("../../../assets/images/home-medical-services.png")}
                  />
                  </View>
                  <Text style={styles.serviceCardText}>الخدمات التمريضية المنزلية </Text>
                  <ICONS.chevronLeft />
              </LinearGradient>
          </TouchableOpacity>
        </Link>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.gray10,
    padding:10,
    gap:20
  },
    nextReservationCard:{
flexDirection: "row",
justifyContent: "space-between",
alignItems: "flex-start",
paddingVertical:10,
borderRadius:10,
    },
    titleAndStatusLabelContainer:{
        alignItems: "flex-start",
        gap:16,
        padding:10
    },
     reservationTitle:{
        fontFamily: "AlmaraiBold",
        fontSize: 20,
        color: Colors.white,
    },
    statusLabelContainer:{
        borderRadius:5,
        backgroundColor:Colors.white,
        padding:5,
        gap:5,
        flexDirection: "row",
        alignItems: "center",
    },
    statusLabelText:{
        fontFamily: "AlmaraiBold",
        fontSize: 14,
        color: Colors.secondary,
    },
    reservationDetailsContainer:{
        alignItems: "flex-start",
        gap:20,
        padding:10
    },
    detailsLabelContainer:{
        gap:10,
        flexDirection: "row",
        alignItems: "center",
    },
    detailsLabelText:{
        fontFamily: "AlmaraiBold",
        fontSize: 14,
        color: Colors.white,
    },
    newSectionTitle:{
        fontFamily: "AlmaraiBold",
        fontSize: 20,
        color: Colors.gray700,
    },
    ourServicesContainer: {
        width: "100%",
        alignItems: "flex-start",
        gap: 15,
        paddingTop: 10,
    },
    serviceCardContainer: {
        width: "100%",
        flexDirection: "row",
        borderRadius: 15,
        marginBottom: 5,
        backgroundColor: "transparent",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    serviceCard: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 15,
        gap: 12,
        paddingLeft: 5,
        overflow: "hidden",
    },
    serviceCardImageContainer: {
        width: 70,
        height: 70,
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
    },
    serviceCardImage: {
        width: 45,
        height: 45,
    },
    serviceCardText: {
        flex: 1,
        fontFamily: "AlmaraiBold",
        fontSize: 16,
        color: Colors.white,
        textAlign: "left",
    },
});