import React from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import styles from './style';

type CategoriesProps = {
  categories: any;
  selectedCategory: any;
  onCategoryPress: any;
};

const Categories: React.FC<CategoriesProps> = ({
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={item => String(item?.value)}
      style={{marginTop: 2}}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => {
        const selected = selectedCategory === item?.value;
        const displayName = item?.label;

        return (
          <TouchableOpacity
            hitSlop={10}
            onPress={() => onCategoryPress(item?.value)}
            style={[
              styles.itemContainer,
              selected ? styles.selectedItemContainer : {},
              index === 0 ? {marginLeft: 24} : {},
            ]}>
            <Text style={[styles.item, selected ? styles.selectedItem : {}]}>
              {displayName}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default React.memo(Categories);
