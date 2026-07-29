import { Colors, Fonts } from "@/constants/theme";
import useUserStore from "@/hooks/use-userstore";
import { ButtonUI } from "@/shared/ui/button/ButtonUI";
import { CircularLoader } from "@/shared/ui/circular-loader/CircularLoader";
import { OrbitDotLoader } from "@/shared/ui/orbiting-dots/OrbitDotLoader";
import Ionicons from "@react-native-vector-icons/ionicons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const { setIsGuest } = useUserStore();

  const onLogout = () => {
    setIsGuest(false);
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Account Section */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Text style={styles.menuItemTitle}>Order history</Text>
            <Text style={styles.menuItemSubtitle}>No orders</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemTitle}>Gift cards and credits</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemTitle}>Buy gift card</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Your Favorites Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your favorites</Text>
        <View style={styles.favoritesCard}>
          <Text style={styles.favoritesText}>
            Add a restaurant to your favorites by tapping the heart icon in the
            menu view. Your favorites are displayed here!
          </Text>
          <View style={styles.favoritesIllustration}>
            <View style={styles.storeIcon}>
              <View style={styles.awning} />
              <View style={styles.storeFront} />
              <View style={styles.storeBase} />
            </View>
            <View style={styles.heartIcon}>
              <Ionicons name="heart" size={24} color="#FF3B30" />
            </View>
          </View>
        </View>
      </View>

      {/* Quick Links Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick links</Text>

        <TouchableOpacity style={styles.linkItem}>
          <Text style={styles.linkText}>Invite friends</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.linkItem}>
          <Text style={styles.linkText}>Redeem code</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity style={styles.linkItem}>
          <Text style={styles.linkText}>Contact Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutButtonText}>Sign out</Text>
      </TouchableOpacity> */}
      <View style={styles.logoutButton}>
        <ButtonUI
          loadingText="Loading.."
          isLoading={false}
          onPress={onLogout}
          loadingTextColor="#cacaca"
          loadingTextBackgroundColor={Colors.dark}
          showLoadingIndicator
          backgroundColor={Colors.dark}
          loadingTextStyle={{
            fontFamily: Fonts.brandBlack,
          }}
          renderLoadingIndicator={() => (
            <View style={{ marginRight: 8 }}>
              <OrbitDotLoader numDots={3} size={18} />
              {/* <CircularLoader
                size={18}
                strokeWidth={2.5}
                activeColor={"#cacaca"}
                inactiveColor="#cacaca"
                enableBlur
                gradientLength={50}
                duration={500}
              /> */}
            </View>
          )}
        >
          <View style={styles.btn}>
            <Ionicons name="log-out-outline" size={24} color="#cacaca" />
            <Text
              style={[
                styles.btnText,
                {
                  fontFamily: Fonts.brand,
                },
              ]}
            >
              Logout
            </Text>
          </View>
        </ButtonUI>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
  },
  btnText: {
    fontSize: 17,
    fontFamily:Fonts.brandSemiBold,
    color:Colors.pureWhite
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  menuItemLeft: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  favoritesCard: {
    flexDirection: "row",
    paddingVertical: 20,
    gap: 16,
  },
  favoritesText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  favoritesIllustration: {
    width: 80,
    height: 80,
  },
  storeIcon: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  awning: {
    width: 60,
    height: 20,
    backgroundColor: "#4ECDE6",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    position: "absolute",
    top: 10,
  },
  storeFront: {
    width: 60,
    height: 40,
    backgroundColor: "#F0F0F0",
    position: "absolute",
    top: 30,
  },
  storeBase: {
    width: 60,
    height: 8,
    backgroundColor: "#E0E0E0",
    position: "absolute",
    bottom: 12,
  },
  heartIcon: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#fff",
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.1)",
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  logoutButton: {
    flex:1,
    flexDirection:'row',
    paddingVertical: 16,
   
    alignItems: "center",
    justifyContent: "center",
    
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ff4646",
  },
});

export default ProfileScreen;
