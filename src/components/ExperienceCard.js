import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '.';

const ExperienceCard = () => {
  return (
    <View style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
      <Text
        style={{
          textTransform: 'uppercase',
          fontWeight: '300',
          fontSize: 18,
          color: 'gray',
        }}>
        Experience
      </Text>

      <View
        style={{
          flexDirection: 'row',
          paddingTop: 10,
          alignItems: 'flex-start',
          gap: 10,
        }}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={{...styles.dot, borderColor: 'steelblue'}}>
            <View style={styles.innerDot} />
          </View>
          <View style={styles.verticalLine} />
        </View>

        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Mobile Developer
          </Text>
          <Text style={{fontSize: 13, color: 'steelblue'}}>
            Millionaire Group Indonesia
          </Text>
          <Text style={{fontSize: 13, color: 'gray'}}>
            June - December 2023
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 10}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={{...styles.dot, borderColor: 'steelblue'}} />
        </View>

        <View>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Android Developer
          </Text>
          <Text style={{fontSize: 13, color: 'steelblue'}}>Canisnfelis</Text>
          <Text style={{fontSize: 13, color: 'gray'}}>
            October 2022 - April 2023
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ExperienceCard;
