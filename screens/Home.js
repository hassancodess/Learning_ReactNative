import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import ImagePicker from '../components/ImagePicker';
import {Button} from 'react-native-paper';
// import Exif from 'react-native-exif';
import MediaMeta from 'react-native-media-meta';

// import ImageModifier from 'react-native-image-modifier';

const Home = () => {
  const [imageData, setImageData] = useState();
  const [imageMetadata, setImageMetadata] = useState();
  useEffect(() => {
    console.log('USEREFFECT', imageMetadata);
  }, [imageMetadata]);
  const handleViewMetadata = () => {
    console.log('View Metadata');
    const path = imageData.uri;
    MediaMeta.get(path)
      .then(metadata => console.log(metadata))
      .catch(err => console.error(err));
    // Exif.getExif(imageData.uri)
    //   .then(msg => {
    //     let data = JSON.stringify(msg);
    //     data = JSON.parse(data);
    // const dataArray = [];
    // // console.log(data);
    // for (let x in data.exif) {
    //   const key = x;
    //   const value = data[x];
    //   console.log('Key:', key);
    //   console.log('Value:', value);
    //   const obj = {
    //     key,
    //     value,
    //   };
    //   dataArray.push(obj);
    // }
    // setImageMetadata(dataArray);
    // setImageMetadata(data);
    // })
    // .catch(msg => console.warn('ERROR: ' + msg));
  };
  return (
    <View style={styles.container}>
      <ImagePicker imageData={imageData} setImageData={setImageData} />
      <View style={styles.buttonsContainer}>
        <Button mode="contained" onPress={handleViewMetadata}>
          View MetaData
        </Button>
        <Button mode="contained">Insert Random MetaData</Button>
      </View>
      {/* MetaData List */}
      {/* <FlatList
          style={styles.metadataContainer}
          data={imageMetadata}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => (
            <View style={styles.metaItem}>
              <Text>
                {item.key}: {item.value}
              </Text>
            </View>
          )}
        /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  metadataContainer: {
    // backgroundColor: 'green',
    marginTop: 20,
  },
  metadataHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  metaItem: {
    marginBottom: 3,
    // backgroundColor: 'red',
  },
});
