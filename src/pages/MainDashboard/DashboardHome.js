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
});
