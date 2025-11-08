import { Ionicons } from '@expo/vector-icons';
import { SFSymbol, SymbolView } from 'expo-symbols';
import { ComponentProps } from 'react';
import { Platform, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CONTAINER_PADDING = 5;
const CONTAINER_WIDTH = 34;
const ICON_SIZE = 25;

interface IconButtonProperties {
  iosName: SFSymbol;
  androidName: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: number;
  height?: number;
  library?: typeof Ionicons | typeof MaterialCommunityIcons;
}

export default function IconButton({
  iosName,
  androidName,
  containerStyle,
  onPress,
  width,
  height,
  library = Ionicons
}: IconButtonProperties) {
  const IconComponent = library;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        backgroundColor: '#00000050',
        padding: CONTAINER_PADDING,
        borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
        width: CONTAINER_WIDTH,
      }, containerStyle]}
    >
      {Platform.OS === 'ios' ? (
        <SymbolView
          name={iosName}
          size={ICON_SIZE}
          style={width && height ? { width, height } : {}}
          type='hierarchical'
          tintColor={'white'}
        />
      ) : (
        <IconComponent
          size={ICON_SIZE}
          name={androidName as any}
          color={'white'}
        />
      )}
    </TouchableOpacity>
  );
}
