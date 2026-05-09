import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Example user data
  const user = {
    name: "محمد نبيل",
    phone: "01012345678",
  };

  const SettingItem = ({
    icon,
    title,
    onPress,
    value,
    isSwitch,
    onValueChange,
    color = Colors.main,
    textColor = Colors.gray700,
    isExpanded,
  }: {
    icon: any;
    title: string;
    onPress?: () => void;
    value?: boolean;
    isSwitch?: boolean;
    onValueChange?: (val: boolean) => void;
    color?: string;
    textColor?: string;
    isExpanded?: boolean;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={isSwitch}
      activeOpacity={0.7}
    >
      <View style={styles.settingItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: color + "15" }]}>
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <Text style={[styles.settingItemTitle, { color: textColor }]}>
          {title}
        </Text>
      </View>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: Colors.gray200, true: Colors.main + "80" }}
          thumbColor={value ? Colors.main : Colors.gray400}
        />
      ) : (
        <Ionicons
          name={isExpanded ? "chevron-down" : "chevron-back"}
          size={18}
          color={Colors.gray400}
        />
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header / Profile Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>الإعدادات</Text>
          <View style={styles.profileCard}>
            <View style={styles.profileImageContainer}>
              <Image
                style={styles.profileAvatar}
                source={require("../../assets/images/small-logo.png")}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profilePhone}>{user.phone}</Text>
            </View>
            <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
              <Ionicons name="create-outline" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* General Settings */}
        <View style={styles.section}>
          <SectionHeader title="إعدادات عامة" />
          <View style={styles.card}>
            <SettingItem
              icon="notifications-outline"
              title="الإشعارات"
              isSwitch
              value={isNotificationsEnabled}
              onValueChange={setIsNotificationsEnabled}
            />
            {/* <View style={styles.separator} /> */}
            {/* <SettingItem
              icon="language-outline"
              title="لغة التطبيق"
              onPress={() => {}}
            /> */}
            <View style={styles.separator} />
            <SettingItem
              icon="moon-outline"
              title="الوضع الليلي"
              isSwitch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
            />
          </View>
        </View>

        {/* Support & FAQ */}
        <View style={styles.section}>
          <SectionHeader title="الدعم والمساعدة" />
          <View style={styles.card}>
            <SettingItem
              icon="help-circle-outline"
              title="الأسئلة الشائعة"
              onPress={() => toggleSection("faq")}
              isExpanded={expandedSection === "faq"}
            />
            {expandedSection === "faq" && (
              <View style={styles.expandedContent}>
                <Text style={styles.expandedQuestion}>
                  س: كيف يمكنني طلب زيارة طبية منزلية؟
                </Text>
                <Text style={styles.expandedAnswer}>
                  ج: يمكنك طلب الخدمة من خلال الصفحة الرئيسية باختيار نوع الخدمة
                  وتحديد الموعد المناسب وسيتم التواصل معك لتأكيد الحجز.
                </Text>
                <Text style={styles.expandedQuestion}>
                  س: هل الخدمات متوفرة على مدار الساعة؟
                </Text>
                <Text style={styles.expandedAnswer}>
                  ج: نعم، فريقنا الطبي متاح لخدمتكم على مدار 24 ساعة طوال أيام
                  الأسبوع لضمان راحتكم وسلامتكم.
                </Text>
              </View>
            )}
            <View style={styles.separator} />
            <SettingItem
              icon="chatbubble-ellipses-outline"
              title="تواصل معنا"
              onPress={() => toggleSection("contact")}
              isExpanded={expandedSection === "contact"}
            />
            {expandedSection === "contact" && (
              <View style={styles.expandedContent}>
                <View style={styles.contactItem}>
                  <Ionicons name="call" size={16} color={Colors.main} />
                  <Text style={styles.expandedText}>01012345678</Text>
                </View>
                <View style={styles.contactItem}>
                  <Ionicons name="mail" size={16} color={Colors.main} />
                  <Text style={styles.expandedText}>support@salamat.com</Text>
                </View>
                <View style={styles.contactItem}>
                  <Ionicons name="location" size={16} color={Colors.main} />
                  <Text style={styles.expandedText}>
                    القاهرة، جمهورية مصر العربية
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* About & Legal */}
        <View style={styles.section}>
          <SectionHeader title="عن التطبيق" />
          <View style={styles.card}>
            <SettingItem
              icon="information-circle-outline"
              title="حول التطبيق"
              onPress={() => toggleSection("about")}
              isExpanded={expandedSection === "about"}
            />
            {expandedSection === "about" && (
              <View style={styles.expandedContent}>
                <Text style={styles.expandedText}>
                  تطبيق "سلامات" هو منصتك الأولى للرعاية الصحية المنزلية، نهدف
                  إلى توفير خدمات طبية موثوقة وعالية الجودة في راحة منزلك من
                  خلال نخبة من الأطباء والتمريض المتخصصين.
                </Text>
              </View>
            )}
            <View style={styles.separator} />
            <SettingItem
              icon="shield-checkmark-outline"
              title="سياسة الخصوصية"
              onPress={() => toggleSection("privacy")}
              isExpanded={expandedSection === "privacy"}
            />
            {expandedSection === "privacy" && (
              <View style={styles.expandedContent}>
                <Text style={styles.expandedText}>
                  نحن نولي أهمية قصوى لخصوصية بياناتك ومعلوماتك الطبية. لا يتم
                  مشاركة أي معلومات مع أطراف ثالثة دون موافقتك الصريحة، وتُستخدم
                  فقط لضمان تقديم أفضل رعاية صحية لك في كل زيارة.
                </Text>
              </View>
            )}
            <View style={styles.separator} />
            <SettingItem
              icon="document-text-outline"
              title="شروط الاستخدام"
              onPress={() => toggleSection("terms")}
              isExpanded={expandedSection === "terms"}
            />
            {expandedSection === "terms" && (
              <View style={styles.expandedContent}>
                <Text style={styles.expandedText}>
                  باستخدامك لتطبيق سلامات، فإنك توافق على الالتزام بشروط
                  الاستخدام الخاصة بنا. يُرجى تزويدنا بمعلومات دقيقة لتسهيل
                  عملية الحجز وتلقي الخدمات الطبية. يحق للتطبيق تعديل الشروط عند
                  الحاجة.
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <View style={styles.card}>
            <SettingItem
              icon="log-out-outline"
              title="تسجيل الخروج"
              onPress={() => {}}
              color={Colors.reject}
              textColor={Colors.reject}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>الإصدار 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.gray10,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: Colors.main,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "AlmaraiBold",
    color: Colors.white,

    marginBottom: 20,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 15,
    borderRadius: 20,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    maxWidth: 60,
    maxHeight: 60,
    borderRadius: 1000,
    borderWidth: 3,
    borderColor: Colors.secondary,
    backgroundColor: Colors.main,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  profileAvatar: {
    width: 40,
    height: 40,
  },
  profileInfo: {
    flex: 1,
    // alignItems: "flex-end",
  },
  profileName: {
    fontSize: 18,
    fontFamily: "AlmaraiBold",
    color: Colors.white,
  },
  profilePhone: {
    fontSize: 14,
    fontFamily: "AlmaraiRegular",
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: "AlmaraiBold",
    color: Colors.gray700,
    marginBottom: 10,

    paddingRight: 5,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  settingItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  settingItemTitle: {
    fontSize: 14,
    fontFamily: "AlmaraiRegular",
    color: Colors.gray700,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray10,
    marginHorizontal: 15,
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  versionText: {
    fontSize: 12,
    fontFamily: "AlmaraiRegular",
    color: Colors.gray400,
  },
  expandedContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.gray10,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  expandedQuestion: {
    fontFamily: "AlmaraiBold",
    fontSize: 14,
    color: Colors.main,
    marginBottom: 5,
  },
  expandedAnswer: {
    fontFamily: "AlmaraiRegular",
    fontSize: 13,
    color: Colors.gray700,
    marginBottom: 15,
    lineHeight: 20,
  },
  expandedText: {
    fontFamily: "AlmaraiRegular",
    fontSize: 13,
    color: Colors.gray700,
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
});
