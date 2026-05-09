import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '@/constants/theme'
import { LinearGradient } from 'expo-linear-gradient';
import { ICONS } from '@/constants/icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width - 20;

const AD_DATA = [
  {
    id: '1',
    title: 'رعاية طبية منزلية',
    description: 'احصل على أفضل الخدمات الطبية في منزلك مع نخبة من الأطباء المتخصصين',
    image: require('../../../assets/images/ad-home-service.png'),
  },
  {
    id: '2',
    title: 'تحاليل طبية سريعة',
    description: 'نوفر لك خدمة سحب العينات والتحاليل من منزلك بدقة وعناية فائقة',
    image: require('../../../assets/images/ad-lab-test.png'),
  },
  {
    id: '3',
    title: 'صحة عائلتك أولويتنا',
    description: 'فريق طبي متكامل لرعاية جميع أفراد أسرتك على مدار الساعة وبأعلى جودة',
    image: require('../../../assets/images/ad-family-health.png'),
  },
];

export default function HomePageContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % AD_DATA.length;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const renderAdItem = ({ item }: { item: typeof AD_DATA[0] }) => (
    <View style={styles.adSlide}>
      <LinearGradient
        colors={[Colors.main, Colors.secondary]}
        style={styles.adGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.adContent}>
          <View style={styles.adTextContainer}>
            <Text style={styles.adTitle}>{item.title}</Text>
            <Text style={styles.adDescription}>{item.description}</Text>
          </View>
          <Image source={item.image} style={styles.adImage} contentFit="contain" />
        </View>
      </LinearGradient>
    </View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  return (
    <ScrollView 
      style={styles.mainScroll} 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Advertisement Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={AD_DATA}
          renderItem={renderAdItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          keyExtractor={(item) => item.id}
          snapToAlignment="center"
          decelerationRate="fast"
        />
        <View style={styles.paginationDots}>
          {AD_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                activeIndex === index && styles.activeDot
              ]}
            />
          ))}
        </View>
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainScroll: {
    flex: 1,
    backgroundColor: Colors.gray10,
    // marginBottom: 80
    
  },
  container:{
    padding:10,
    paddingTop: 10,
    gap:15
  },
  carouselContainer: {
    width: '100%',
    height: 180,
    marginBottom: 5,
  },
  adSlide: {
    width: CAROUSEL_WIDTH,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
  },
  adGradient: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  adTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 8,
  },
  adTitle: {
    fontFamily: 'AlmaraiBold',
    fontSize: 20,
    color: Colors.white,
    textAlign: 'left',
  },
  adDescription: {
    fontFamily: 'AlmaraiBold',
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'left',
    lineHeight: 20,
  },
  adImage: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  paginationDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  activeDot: {
    width: 20,
    backgroundColor: Colors.white,
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
        // borderRadius: 12,
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