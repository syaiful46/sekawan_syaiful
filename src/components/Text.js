import React, {useContext} from 'react';
import {Text as ReactText, StyleSheet} from 'react-native';

const Text = ({style, children, ...props}) => {
  const size = props.size;
  const fontStyle = props.fontStyle;
  const fontWeight = props.fontWeight;
  const fontFamily =
    props.type === 'bold'
      ? 'Nunito-ExtraBold'
      : props.type === 'light'
      ? 'Nunito-Light'
      : 'Nunito-Medium';
  const color = props.color;
  const textAlign = props.textAlign;
  const textDecorationLine = props.textDecorationLine;
  const opacity = props.opacity;
  const letterSpacing = props.letterSpacing;

  const maxLength = props.maxLength;
  const numberOfLines = props.numberOfLines;

  const textStyles = StyleSheet.create({
    baseText: {
      fontSize: size || 14,
      fontStyle: fontStyle || 'normal',
      fontFamily: fontFamily,
      fontWeight: fontWeight || '600',
      color: color || 'black',
      textAlign: textAlign || 'left',
      textDecorationLine: textDecorationLine || 'none',
      opacity: opacity || 1,
      letterSpacing: letterSpacing || 0,
    },
  });

  // Memotong teks jika maxLength terdefinisi
  const truncatedText = maxLength
    ? children.slice(0, maxLength) + '...'
    : children;

  return (
    <ReactText
      style={style ? [textStyles.baseText, style] : textStyles.baseText}
      allowFontScaling={false}
      numberOfLines={numberOfLines}>
      {truncatedText}
    </ReactText>
  );
};

export default Text;
