import React from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';

const CertificateDetail = ({route}) => {
  const {certificateFile} = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
      }}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <Pdf
        trustAllCerts={false}
        source={{
          uri: certificateFile,
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    backgroundColor: 'ghostwhite',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default CertificateDetail;
