import CategorySelector from '@components/CategorySelector';
import FileSelector from '@components/FileSelector';
import AppButton from '@ui/AppButton';
import {categories} from '@utils/categorise';
import colors from '@utils/colors';
import {FC, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
interface Props {}

const Upload: FC<Props> = props => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [audioInfo, setAudioInfo] = useState({
    category: '',
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fileSelectorContainer}>
        <FileSelector
          icon={
            <Material name="image-outline" size={35} color={colors.SECONDARY} />
          }
          btnTitle="Select Cover"
          style={{marginLeft: 20}}
        />
        <FileSelector
          icon={
            <Material
              name="file-music-outline"
              size={35}
              color={colors.SECONDARY}
            />
          }
          btnTitle="Select Audio"
          style={{marginLeft: 20}}
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="Title"
          style={styles.input}
        />
        <Pressable
          onPress={() => {
            setShowCategoryModal(true);
          }}
          style={styles.categorySelector}>
          <Text style={styles.categorySelectorTitle}>Category</Text>
          <Text style={styles.selectedCategory}>{audioInfo.category}</Text>
        </Pressable>

        <TextInput
          placeholderTextColor={colors.INACTIVE_CONTRAST}
          placeholder="About"
          style={styles.input}
          numberOfLines={5}
          multiline
        />

        <CategorySelector
          visible={showCategoryModal}
          onRequestClose={() => {
            setShowCategoryModal(false);
          }}
          title="Category"
          data={categories}
          renderItem={item => {
            return <Text style={styles.category}>{item}</Text>;
          }}
          onSelect={item => {
            setAudioInfo({category: item});
          }}
        />

        <View style={{marginBottom: 20}} />

        <AppButton borderRadius={7} title="Submit" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  fileSelectorContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.SECONDARY,
    borderRadius: 7,
    padding: 10,
    fontSize: 18,
    color: colors.CONTRAST,
    textAlignVertical: 'top',
  },
  category: {
    padding: 10,
    paddingLeft: 20,
    color: colors.PRIMARY,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  categorySelectorTitle: {
    color: colors.CONTRAST,
  },
  selectedCategory: {
    color: colors.SECONDARY,
    marginLeft: 5,
    fontStyle: 'italic',
  },
});

export default Upload;