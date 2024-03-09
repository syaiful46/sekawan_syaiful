import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, StatusBar, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Text, HeaderProfile, ExperienceCard} from '../../components';
import {useSession} from '../../global/utils/Session';
import {useAsyncStorage} from '../../global/utils/storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyProfile = ({navigation, route}) => {
  const {token, getToken, saveToken} = useSession();
  const {setItem, getItem, removeItem} = useAsyncStorage();
  const [userData, setUserData] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      {/* Header */}
      <HeaderProfile
        name={'Syaiful Ramadhan'}
        job={'Mobile Developer'}
        location={'Probolinggo, Jawa Timur'}
        desc={
          'Low profile, tekun, rajin, disiplin, quick learner dan selalu berusaha menyelesaikan apa yang dikerjakan'
        }
      />

      {/* Body */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          {/* Experience */}
          <ExperienceCard />
          <View
            style={{width: '100%', justifyContent: 'space-between', gap: 5}}>
            <Text
              style={{
                textTransform: 'uppercase',
                fontWeight: '300',
                fontSize: 18,
                color: 'gray',
              }}>
              Portfolio
            </Text>
            <Text color={'steelblue'}>
              Berikut adalah beberapa project yang pernah saya kerjakan
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <Icon.Button
                onPress={() =>
                  navigation.navigate('CertificateDetail', {
                    certificateFile:
                      'https://drive.google.com/uc?id=19TjBHgp50uHDBl_ECbS1eczPhMbHLHEU',
                  })
                }
                name={'eye'}
                color={'white'}
                size={20}
                backgroundColor={'steelblue'}>
                Lihat Portfolio
              </Icon.Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'ghostwhite',
    flex: 1,
  },
  footer: {
    bottom: 0,
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: 70,
    borderWidth: 1,
    borderColor: 'lightgray',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 3,
    backgroundColor: 'rgba(255, 255, 255, 4)',
  },
  backImage: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    height: 250,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: 'steelblue',
    height: 150,
    elevation: 3,
    width: '100%',
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 15,
    paddingBottom: 50,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'ghostwhite',
    width: '100%',
    gap: 40,
  },
  dot: {
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    width: 24,
    height: 24,
  },
  innerDot: {
    backgroundColor: 'steelblue',
    height: 16,
    width: 16,
    borderRadius: 15,
  },
  verticalLine: {
    height: 60,
    width: 5,
    marginVertical: 3,
    borderRadius: 5,
    backgroundColor: 'steelblue',
  },
});
