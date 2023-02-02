import { PropsWithChildren } from 'react'
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

interface IProps extends PropsWithChildren {
  onPress?: (event: GestureResponderEvent) => void
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}

const Button: React.FC<IProps> = ({
  style,
  onPress,
  children,
  disabled = false,
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={disabled}>
      <Text style={styles.TextContent}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  TextContent: { color: 'white', fontWeight: '700', textAlign: 'center' },
})

export default Button
