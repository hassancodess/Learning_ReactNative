import {StyleSheet, Text, View, Modal} from 'react-native';
import React, {useState} from 'react';
import {Button, FAB, TextInput, IconButton} from 'react-native-paper';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [className, setClassName] = useState('');

  const ModalView = () => {
    const saveClass = async () => {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: className,
        }),
      };
      const response = await fetch(
        'http://192.168.100.80/Attendence%20System%20API/api/class/addclass',
        options,
      );
      if (response.status === 200) {
        alert('Class Added');
      }
    };
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <IconButton
              mode="contained"
              icon="close"
              size={30}
              style={styles.modalClosebutton}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <TextInput
              label="Enter Class Name"
              value={className}
              style={styles.input}
              onChangeText={text => setClassName(text)}
            />
            <Button mode="contained" style={styles.button} onPress={saveClass}>
              Save
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('Class')}>
          Class
        </Button>
        <Button mode="contained" style={styles.button}>
          Attendence
        </Button>
        <Button mode="contained" style={styles.button}>
          Students
        </Button>
        <Button mode="contained" style={styles.button}>
          Reports
        </Button>
      </View>
      {modalVisible && <ModalView />}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  button: {
    marginVertical: 10,
    width: '100%',
  },
  modalClosebutton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  modalView: {
    marginVertical: '50%',
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 100,
    paddingHorizontal: 30,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
  },
});
