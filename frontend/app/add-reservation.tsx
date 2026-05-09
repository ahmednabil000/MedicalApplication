import { StyleSheet, View } from 'react-native';
import React from 'react';
import SinglePagesHeader from '@/components/SinglePagesHeader';
import { useLocalSearchParams } from 'expo-router';
import AddReservationForm from '@/components/add-reservation/AddReservationForm';
import { useTheme } from '@/contexts/ThemeContext';

const AddReservationScreen = () => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const params = useLocalSearchParams();
  
  return (
    <View style={styles.outerContainer}>
      <SinglePagesHeader title={params.serviceName?.toString() || "حجز جديد"} />
      <View style={styles.container}>
        <AddReservationForm />
      </View>
    </View>
  );
};

export default AddReservationScreen;

const getStyles = (colors: any) => StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.gray10,
    padding: 20,
  },
});
