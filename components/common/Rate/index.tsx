import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../../../consts/colors";
import { ArrayFrom, randomId } from "../../../utils";

const RateComp = ({
  numStar,
  isDisplayText,
}: {
  numStar: number;
  isDisplayText?: boolean;
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flexDirection: "row" }}>
        {ArrayFrom(5).map((_, index) => (
          <Icon
            key={randomId()}
            name="star"
            size={20}
            color={index <= numStar ? COLORS.orange : COLORS.grey}
          />
        ))}
      </View>
      {isDisplayText && (
        <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}>
          4.0
        </Text>
      )}
    </View>
  );
};

export default RateComp;
