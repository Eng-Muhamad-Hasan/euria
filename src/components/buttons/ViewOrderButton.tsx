import { Colors, Fonts } from '@/constants/theme';
import { Restaurant } from '@/data/restaurants';
import { useCartStore } from '@/hooks/use-cartstore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ViewOrderButtonProps {
  restaurant: Restaurant;
}

const ViewOrderButton = ({ restaurant }: ViewOrderButtonProps) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { totalItems, total, setSelectedRestaurant } = useCartStore();

  if (totalItems === 0) {
    return null;
  }

  const openOrder = () => {
    setSelectedRestaurant(restaurant);
    router.push('/order');
  };
  return (
    <>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.7)']}
        style={[styles.gradientContainer, { paddingBottom: insets.bottom || 16 }]}
        pointerEvents="none"
        dither={false}
      />
      <View style={[styles.viewOrderContainer, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity onPress={openOrder} style={styles.viewOrderButton}>
          <View style={styles.viewOrderLeft}>
            <View style={styles.itemCountBadge}>
              <Text style={styles.itemCountText}>{totalItems}</Text>
            </View>
            <Text style={styles.viewOrderText}>View Order</Text>
          </View>
          <Text style={styles.viewOrderPrice}>{total.toFixed(2)}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default ViewOrderButton;
const styles = StyleSheet.create({
  gradientContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    paddingTop: 40,
  },
  viewOrderContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  viewOrderButton: {
    overflow:'visible',
    backgroundColor: Colors.accentBlue,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 4px 12px rgba(0, 157, 224, 0.3)",
  },
  viewOrderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemCountBadge: {
    backgroundColor: Colors.pureWhite,
    width: 28,
    height: 28,
    borderRadius: '50%',
    alignItems: "center",
    justifyContent: "center",
  },
  itemCountText: {
    fontSize: 14,
    fontFamily: Fonts.brandBlack,
    color: Colors.accentBlue,
  },
  viewOrderText: {
    fontSize: 16,
    fontFamily: Fonts.brandBlack,
    color: Colors.pureWhite,
  },
  viewOrderPrice: {
    fontSize: 16,
    fontFamily: Fonts.brandBold,
    color: Colors.pureWhite,
  },
});
