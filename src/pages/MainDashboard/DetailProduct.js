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
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductItems from '../../components/ProductItems';

const DetailProduct = ({navigation, route}) => {
  const {token, getToken, saveToken} = useSession();
  const {setItem, getItem, removeItem} = useAsyncStorage();
  const [userData, setUserData] = useState('');

  const [dataDetail, setDataDetail] = useState('');
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all products');

  const {dataId} = route.params;

  const focus = useIsFocused();

  useEffect(() => {
    if (focus == true) {
      getDataDetail();
      console.log('ini get item dataUsers:');
    }
  }, [focus]);

  const getDataDetail = async () => {
    const apiService = ApiService();
    const url = baseUrl + '/products/' + dataId;
    const pakeToken = false;
    try {
      // Menggunakan fetchMultipartPost dari ApiService
      const response = await apiService.fetchGet(url, pakeToken, token);
      const data = await response.json();
      if (response.status == 200) {
        console.log('data detail:', data);
        setDataDetail(data);
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
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{width: '15%'}}>
          <Icon name="arrow-circle-left" size={24} color="white" />
        </TouchableOpacity>
        <Text color={'white'} fontWeight={'bold'} size={20}>
          Product Detail
        </Text>
        <View style={{width: '15%'}} />
      </View>
      {/* back image*/}
      <View style={styles.backImage}>
        <Image
          resizeMode="contain"
          height={'90%'}
          width={'100%'}
          source={{
            uri: dataDetail.image,
          }}
        />
      </View>
      {/* Body */}

      <View style={styles.body}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View
            style={{gap: 7, flexDirection: 'row', alignItems: 'flex-start'}}>
            <Icon name="star" size={20} color={'orange'} />
            <Text fontWeight={'bold'} size={16}>
              {dataDetail.rating?.rate}
            </Text>
            <Text color={'gray'} size={16}>
              ({dataDetail.rating?.count} reviews)
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 7}}>
            <Icon name={'tags'} size={20} color={'steelblue'} />
            <Text style={{textTransform: 'uppercase'}} fontWeight={'bold'}>
              {dataDetail.category}
            </Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{gap: 10, width: '100%'}}>
            <Text fontWeight={'bold'} size={20}>
              {dataDetail.title}
            </Text>
            <Text
              color={'black'}
              fontWeight={'500'}
              size={16}
              style={{textTransform: 'capitalize', textAlign: 'justify'}}>
              {dataDetail.description}
            </Text>
          </View>
        </ScrollView>
      </View>

      <View
        style={{
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
        }}>
        <Text fontWeight={'bold'} size={24}>
          ${dataDetail.price}
        </Text>
        <Icon.Button
          style={{paddingHorizontal: 24, paddingVertical: 10}}
          name={'cart-arrow-down'}
          size={20}
          backgroundColor={'steelblue'}>
          Add to cart
        </Icon.Button>
      </View>
    </View>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'ghostwhite',
    flex: 1,
  },
  image: {
    width: 46,
    height: 46,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 200,
  },
  inputSearch: {
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
  },
  textInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '95%',
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
    gap: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingTop: 15,
    backgroundColor: 'steelblue',
    height: 90,
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
    paddingTop: 15,
    paddingBottom: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'ghostwhite',
    width: '100%',
    flex: 1,
    gap: 20,
  },
});
