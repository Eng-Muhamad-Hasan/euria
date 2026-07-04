import { Colors, Fonts } from '@/constants/theme';
import { categories } from '@/data/categories';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CategoryList = () => {
  const renderCategory = ({ item }: { item: (typeof categories)[0] }) => (
    <TouchableOpacity activeOpacity={.8} style={styles.categoryCard}>
      <View style={[styles.categoryImageContainer, { backgroundColor: item.backgroundColor }]}>
        <Image source={item.image} style={styles.categoryImage} />
      </View>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryPlaces}>{item.placesCount} places</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.categoriesSection}>
      <View style={styles.categoriesHeader}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <TouchableOpacity activeOpacity={.8} style={styles.seeAllButton}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesSection: {
    marginBottom: 24,
  },
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  categoriesTitle: {
    fontSize: 18,
    marginVertical: 6,
    fontFamily: Fonts.brandSemiBold,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.pureWhite,
    fontFamily: Fonts.brandMedium,
  },
  seeAllButton: {
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: Colors.dark,
  },
  categoriesList: {
    gap: 12,
    paddingHorizontal: 16,
  },
  categoryCard: {
    width: 130,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginVertical: 8,
    elevation: 2,
  },
  categoryImageContainer: {
    padding: 12,
  },
  categoryImage: {
    width: 106,
    height: 106,
    borderRadius: 8,
  },
  categoryInfo: {
    backgroundColor: "#fff",
    padding: 12,
    paddingTop: 4,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: Fonts.brandSemiBold,
    marginBottom: 2,
  },
  categoryPlaces: {
    fontSize: 12,
    color: Colors.muted,
    fontFamily: Fonts.brandMedium,
  },
});
