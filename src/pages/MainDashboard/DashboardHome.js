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
import ProductItems from '../../components/ProductItems';

const DashboardHome = ({navigation, route}) => {
  const {token, getToken, saveToken} = useSession();
  const {setItem, getItem, removeItem} = useAsyncStorage();
  const [userData, setUserData] = useState('');

  const [dataDummy, setDataDummy] = useState([]);
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all products');
  const [modalExit, setModalExit] = useState(false);

  const categoryProduct = [
    'all products',
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  const focus = useIsFocused();

  useEffect(() => {
    getData();
    console.log('ini get item dataUsers:');
  }, []);

  const getData = async () => {
    const apiService = ApiService();
    const url = baseUrl + '/products';
    const pakeToken = false;
    try {
      // Menggunakan fetchMultipartPost dari ApiService
      const response = await apiService.fetchGet(url, pakeToken, token);
      const data = await response.json();
      if (response.status == 200) {
        console.log('data:', data);
        setProduct(data);
        setDataDummy(data);
      } else {
        console.log('something wrong');
      }
    } catch (error) {
      // Tangani kesalahan di sini
      console.log('error dari backend', error);
    }
  };

  const filterCategory = catItem => {
    setSelectedCategory(catItem);
    if (catItem === 'all products') {
      setDataDummy(product);
    } else {
      const updatedData = product.filter(item => {
        return item.category === catItem;
      });
      setDataDummy(updatedData);
    }
  };

  // BackHandler
  const handleBackButton = () => {
    setModalExit(true);
    // Mencegah pengguna untuk kembali ke halaman sebelumnya
    return true;
  };

  useEffect(() => {
    if (focus == true) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackButton,
      );
      return () => {
        backHandler.remove();
      };
    }
  }, [focus]);

  const exitButton = async () => {
    BackHandler.exitApp();
  };

  const toggleModal = () => {
    setModalExit(!modalExit);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <Modal animationType="slide" transparent={true} visible={modalExit}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.centeredView}>
            <Text style={styles.modalTitle}>Keluar Aplikasi</Text>
            <View style={{width: '100%', marginBottom: 10}}>
              <Text style={styles.modalText}>
                Apakah Anda yakin untuk keluar dari aplikasi?
              </Text>
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <TouchableOpacity onPress={exitButton} style={styles.modalButton}>
                <Text style={styles.textStylePutih}>Keluar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={[styles.textStyle]}>Batalkan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={{width: '55%', marginTop: 25, alignSelf: 'flex-start'}}>
          <Text color={'white'} fontWeight={'bold'} size={24}>
            Let's find a new thing for you!
          </Text>
        </View>
        <View style={styles.inputSearch}>
          <Icon color={'steelblue'} name={'search'} size={20} />
          <TextInput
            style={styles.textInput}
            value={search}
            onChangeText={e => setSearch(e)}
            placeholder="Find Product"
            placeholderTextColor={'lightgray'}
          />
        </View>
      </View>
      {/* Filter Category */}
      <View style={styles.filter}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categoryProduct.map((cat, index) => (
            <TouchableOpacity
              onPress={() => filterCategory(cat)}
              key={index}
              style={{marginRight: 15, alignItems: 'center'}}>
              <Text
                size={16}
                style={{textTransform: 'capitalize'}}
                fontWeight={cat === selectedCategory ? 'bold' : '500'}
                color={cat === selectedCategory ? 'steelblue' : 'gray'}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Scrollview */}
      <ScrollView
        contentContainerStyle={{paddingBottom: 5}}
        showsVerticalScrollIndicator={false}>
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
              <ProductItems
                data={data}
                key={i}
                onPress={() =>
                  navigation.navigate('DetailProduct', {
                    dataId: data.id,
                  })
                }
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'ghostwhite',
    flex: 1,
    paddingBottom: 5,
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
    color: 'gray',
  },
  filter: {
    marginVertical: 10,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 24,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    gap: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'steelblue',
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
    paddingVertical: 5,
    justifyContent: 'space-between',
    backgroundColor: 'ghostwhite',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    flexWrap: 'wrap',
    gap: 10,
  },
  centeredView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 23,
    paddingTop: 29,
    paddingHorizontal: 25,
    width: '80%',
    height: '40%',
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignSelf: 'center',
    elevation: 3,
    shadowColor: 'black', // Warna bayangan
    shadowOffset: {
      width: 0,
      height: 3, // Besarnya pergeseran bayangan
    },
    shadowOpacity: 0.3, // Opasitas bayangan
    shadowRadius: 3,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    color: 'steelblue',
  },
  modalButton: {
    width: '89%',
    height: 53,
    borderRadius: 16,
    backgroundColor: 'steelblue',
    borderColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  button: {
    borderRadius: 5,
    padding: 15,
    elevation: 2,
    width: 290,
  },
  buttonOpen: {
    backgroundColor: '#FA8585',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonExit: {
    width: '15%',
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    color: 'white',
    fontWeight: '600',
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 22.4,
  },
  textStylePutih: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 22.4,
    opacity: 0.8,
    color: 'white',
  },
});
