import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Dimensions,
  Modal,
  BackHandler,
  TextInput,
  Button,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useIsFocused} from '@react-navigation/native';
import {Text, HeaderNav, FormInput, DropdownInput} from '../../components';
import {useSession} from '../../global/utils/Session';
import {useAsyncStorage} from '../../global/utils/storage';
import {ApiService, baseUrl} from '../../services/ApiService';
import Icon from 'react-native-vector-icons/FontAwesome5';

const DashboardHome = ({navigation, route}) => {
  const {token, getToken, saveToken} = useSession();
  const {setItem, getItem, removeItem} = useAsyncStorage();
  const [userData, setUserData] = useState('');

  const [dataDummy, setDataDummy] = useState([]);
  const [search, setSearch] = useState('');

  const focus = useIsFocused();

  useEffect(() => {
    if (focus == true) {
      getData();
      console.log('ini get item dataUsers:');
    }
  }, [token, focus]);

  const validateForm = () => {};

  const getData = async () => {
    const apiService = ApiService();
    const url = baseUrl + '/products?limit=';
    const pakeToken = false;
    try {
      // Menggunakan fetchMultipartPost dari ApiService
      const response = await apiService.fetchGet(url, pakeToken, token);
      const data = await response.json();
      if (response.status == 200) {
        console.log('data:', data);
        setDataDummy(data);
      } else {
        console.log('something wrong');
      }
    } catch (error) {
      // Tangani kesalahan di sini
      console.log('error dari backend', error);
    }
  };

  const containerStyle = styles.container;

  return (
    <View style={{backgroundColor: 'ghostwhite', flex: 1}}>
      {/* Header */}
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <View style={styles.header}>
        <View style={{width: '55%', marginTop: 25, alignSelf: 'flex-start'}}>
          <Text fontWeight={'bold'} size={24}>
            Let's find a new thing for you!
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            backgroundColor: 'ghostwhite',
            paddingVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: 'lightgray',
          }}>
          <Icon name={'search'} size={20} />
          <TextInput
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              width: '95%',
            }}
            value={search}
            onChangeText={e => setSearch(e)}
            placeholder="Find Product"
          />
        </View>
      </View>
      <View style={{marginVertical: 7}} />
      {/* Scrollview */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Body */}
        <View style={styles.body}>
          {dataDummy
            .filter(data => {
              if (search == '') {
                return data;
              } else if (
                data.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return data;
              }
            })
            .map((data, i) => (
              <View
                key={i}
                style={{
                  width: '48%',
                  borderRadius: 20,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 1)',
                  borderColor: 'lightgray',
                  padding: 10,
                  gap: 10,
                  borderWidth: 1,
                }}>
                <View style={{width: '100%'}}>
                  <Image
                    resizeMode="contain"
                    source={{uri: data.image}}
                    style={{
                      height: 80,
                      width: '100%',
                      borderTopLeftRadius: 15,
                      borderTopRightRadius: 15,
                    }}
                  />
                </View>
                <View
                  style={{
                    height: 60,
                    width: '95%',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                  }}>
                  <Text numberOfLines={2} style={{bottom: 0}}>
                    {data.title}...
                  </Text>
                </View>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingBottom: 5,
                  }}>
                  <Text>${data.price}</Text>
                  <Icon.Button
                    backgroundColor={'steelblue'}
                    name="info-circle"
                    size={16}
                    color={'white'}>
                    Detail
                  </Icon.Button>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 10,
    backgroundColor: 'ghostwhite',
  },
  opacityHeadline: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '100%',
    height: '50%',
    position: 'absolute',
    bottom: 0,
    opacity: 0.7,
    borderBottomLeftRadius: 15,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
    alignSelf: 'stretch',
  },
  image: {
    width: 46,
    height: 46,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 200,
  },
  header: {
    gap: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    elevation: 3,
    width: '100%',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: 'ghostwhite',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
    gap: 10,
  },
  containerDropdown: {
    backgroundColor: 'transparent',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 3,
    height: 40,
    zIndex: 1,
  },
  placeholderDropdown: {
    color: 'rgba(95, 100, 94, 0.5)',
    fontWeight: '500',
    fontSize: 14,
  },
  itemDropdown: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
    fontFamily: 'Nunito-Medium',
  },
  selectedTextDropdown: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  iconDropdown: {
    right: 5,
    width: 28,
    height: 28,
    tintColor: 'rgba(95, 100, 94, 0.8)',
  },
});
