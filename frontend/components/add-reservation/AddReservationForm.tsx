import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BasicInput from '../BasicInput'
import { Colors } from '@/constants/theme'
import BasicButton from '../BasicButton'
import { ICONS } from '@/constants/icons'

import BasicSelectInput from '../BasicSelectInput'

import { useForm, Controller } from 'react-hook-form'

import LocationPickerModal from '../LocationPickerModal';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
interface FormData {
  serviceType: string;
  fullName: string;
  age: string;
  gender: string;
  date: string;
  time: string;
  location: string;
  notes: string;
}

// Check if maps are available
let mapsAvailable = false;
try {
  require.resolve("react-native-maps");
  mapsAvailable = true;
} catch (e) {
  mapsAvailable = false;
}

export default function AddReservationForm() {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [showMap, setShowMap] = React.useState(false);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      serviceType: "",
      fullName: "",
      age: "",
      gender: "",
      date: "",
      time: "",
      location: "",
      notes: "",
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);
  };

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setValue('date', formattedDate);
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const formattedTime = selectedTime.toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setValue('time', formattedTime);
    }
  };

  return (
     <View style={styles.inputsAndButtonContainer}>
      <ScrollView 
      showsVerticalScrollIndicator={false} 
      style={styles.inputsContainer}
      contentContainerStyle={styles.inputsContentContainer}
      >
        <Controller
          control={control}
          name="serviceType"
          rules={{ required: "هذا الحقل مطلوب" }}
          render={({ field: { onChange, value } }) => (
            <BasicSelectInput
              label="نوع الخدمة"
              placeholder="اختر نوع الخدمة"
              icon={<ICONS.service />}
              options={[
                { label: "أشعة منزلية", value: "XRAY" },
                { label: "تحاليل وسحب عينات", value: "LABORATORY" },
                { label: "خدمات تمريضية منزلية", value: "HOME_NURSING" },
              ]}
              value={value}
              onSelect={onChange}
              error={errors.serviceType?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="fullName"
          rules={{ required: "هذا الحقل مطلوب" }}
          render={({ field: { onChange, value } }) => (
            <BasicInput
              label="الاسم"
              placeholder="محمد نبيل شاكر"
              icon={<ICONS.userName />}
              value={value}
              onChangeText={onChange}
              error={errors.fullName?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="age"
          rules={{ required: "هذا الحقل مطلوب" }}
          render={({ field: { onChange, value } }) => (
            <BasicInput
              label="العمر"
              placeholder="25"
              icon={<ICONS.age />}
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
              error={errors.age?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="gender"
          rules={{ required: "هذا الحقل مطلوب" }}
          render={({ field: { onChange, value } }) => (
            <BasicSelectInput
              label="الجنس"
              placeholder="اختر الجنس"
              icon={<ICONS.gender />}
              options={[
                { label: "ذكر", value: "MALE" },
                { label: "أنثى", value: "FEMALE" },
              ]}
              value={value}
              onSelect={onChange}
              error={errors.gender?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="date"
          rules={{ required: "هذا الحقل مطلوب" }}
          render={({ field: { value } }) => (
            <BasicInput
              label="تاريخ الحجز"
              placeholder="اختر التاريخ"
              icon={<ICONS.inputDate />}
              value={value}
              onPress={() => setShowDatePicker(true)}
              error={errors.date?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="time"
          rules={{ required: "هذا الحقل مطلوب" }}
          render={({ field: { value } }) => (
            <BasicInput
              label="وقت الحجز"
              placeholder="اختر الوقت"
              icon={<ICONS.inputTime />}
              value={value}
              onPress={() => setShowTimePicker(true)}
              error={errors.time?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="location"
          rules={{ required: "هذا الحقل مطلوب" }}
          render={({ field: { onChange, value } }) => (
            <BasicInput
              label="الموقع"
              placeholder={mapsAvailable ? "حدد الموقع من الخريطة" : "أدخل رابط الموقع أو العنوان"}
              icon={<ICONS.location />}
              value={value}
              onChangeText={onChange}
              onPress={mapsAvailable ? () => setShowMap(true) : undefined}
              error={errors.location?.message}
            />
          )}
        />

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <LocationPickerModal
          visible={showMap}
          onClose={() => setShowMap(false)}
          onSelect={(loc) => {
            setValue('location', `${loc.latitude.toFixed(4)}, ${loc.longitude.toFixed(4)}`);
          }}
        />

        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, value } }) => (
            <BasicInput
              label="الملاحظات (اختياري)"
              placeholder="اي ملاحظات تريد اضافتها"
              isTextArea
              icon={<ICONS.note />}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        
      </ScrollView>
      <View style={styles.buttonAndForgetPasswordContainer}>
        <BasicButton label="تأكيد الحجز" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    inputsContainer: {
    flex: 1,
  },
  inputsContentContainer: {
    gap: 10,
    paddingBottom: 20,
  },
  inputsAndButtonContainer: {
    gap: 40,
    flex: 1,
  },
  buttonAndForgetPasswordContainer: {
    gap: 10,
  },
  forgetPasswordAndRememberMeContainer: {
    gap: 10,
    alignItems: "center",
    flex: 1,
  },
  forgetButtonText: {
    fontFamily: "AlmaraiRegular",
    fontSize: 12,
    lineHeight: 20,
    color: Colors.main,
  },
})