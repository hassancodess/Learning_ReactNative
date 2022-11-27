import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Platform, StatusBar, Alert} from 'react-native';
import {TextInput, RadioButton, Checkbox, Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'EmploymentForm.db'});

const App = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [selectedQualification, setSelectedQualification] = useState('BSCS');
  const [selectedJob, setSelectedJob] = useState('Junior Lecturer');
  const [gender, setGender] = useState('male');
  const [checked, setChecked] = useState({
    socialMedia: false,
    friends: false,
    newspaper: false,
  });

  useEffect(() => {
    CREATE_TABLE();
  }, []);

  const updateSocialMediaState = () => {
    setChecked(prev => ({...prev, socialMedia: !prev.socialMedia}));
  };
  const updateFriendsState = value => {
    setChecked(prev => ({...prev, friends: !prev.friends}));
  };
  const updateNewsPaperState = value => {
    setChecked(prev => ({...prev, newspaper: !prev.newspaper}));
  };

  const getCheckedValues = () => {
    let string = '';
    for (let key in checked) {
      if (checked[key]) {
        string += `${key}, `;
      }
    }
    return string.slice(0, -2);
  };

  const CREATE_TABLE = () => {
    let query =
      'CREATE TABLE IF NOT EXISTS Employee (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT , number TEXT, qualification TEXT, jobtype TEXT, gender TEXT, jobinformation TEXT)';
    db.transaction(txn => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          console.log('Employee Table Created');
        },
        error => {
          console.log('ERROR');
        },
      );
    });
  };

  const ADD_EMPLOYEE = () => {
    let query =
      'INSERT INTO Employee(name, number, qualification, jobtype, gender, jobinformation) VALUES(?,?,?,?,?,?)';
    let jobInf = getCheckedValues();
    db.transaction(txn => {
      txn.executeSql(
        query,
        [name, number, selectedQualification, selectedJob, gender, jobInf],
        (tx, res) => {
          console.log('Employee ADDED', res);
        },
        error => {
          console.log('ERROR', error);
        },
      );
    });
  };

  const handleSubmit = () => {
    ADD_EMPLOYEE();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Employment Form</Text>
      </View>
      <View style={styles.formContainer}>
        {/* Name & Number */}
        <TextInput
          label="Enter Name"
          style={styles.nameContainer}
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.emailContainer}
          label="Enter Number"
          value={number}
          onChangeText={text => setNumber(text)}
        />
        {/* Qualification */}
        <View style={styles.qualificationContainer}>
          <Text style={styles.inputText}>Select Qualification </Text>
          <Picker
            style={styles.qualificationPicker}
            selectedValue={selectedQualification}
            onValueChange={itemValue => setSelectedQualification(itemValue)}>
            <Picker.Item label="BSCS" value="BSCS" />
            <Picker.Item label="MCS" value="MCS" />
            <Picker.Item label="PhD" value="PhD" />
          </Picker>
        </View>
        {/* Job Selection */}
        <View style={styles.jobContainer}>
          <Text style={styles.inputText}>Select Job </Text>
          <Picker
            style={styles.jobPicker}
            selectedValue={selectedJob}
            onValueChange={itemValue => setSelectedJob(itemValue)}>
            <Picker.Item label="Junior Lecturer" value="Junior Lecturer" />
            <Picker.Item label="Lecturer" value="Lecturer" />
            <Picker.Item label="Professor" value="Professor" />
          </Picker>
        </View>
        {/* Gender Selection */}
        <View style={styles.genderContainer}>
          <Text style={[styles.inputText, {marginBottom: 10}]}>Gender</Text>
          <View style={styles.radioButtonsContainer}>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                value="male"
                status={gender === 'male' ? 'checked' : 'unchecked'}
                onPress={() => setGender('male')}
              />
              <Text style={styles.radioButtonText}>Male</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton
                value="female"
                status={gender === 'female' ? 'checked' : 'unchecked'}
                onPress={() => setGender('female')}
              />
              <Text style={styles.radioButtonText}>Female</Text>
            </View>
          </View>
        </View>
        {/* Checkboxes Container */}
        <View style={styles.checkboxesContainer}>
          <Text style={[styles.inputText, {marginBottom: 15}]}>
            Where do you get this Job Information{' '}
          </Text>
          {/* Checkbox One */}
          <View style={styles.checkbox}>
            <Checkbox
              status={checked.socialMedia ? 'checked' : 'unchecked'}
              onPress={updateSocialMediaState}
            />
            <Text style={styles.radioButtonText}>Social Media</Text>
          </View>
          {/* Checkbox Two */}
          <View style={styles.checkbox}>
            <Checkbox
              status={checked.friends ? 'checked' : 'unchecked'}
              onPress={updateFriendsState}
            />
            <Text style={styles.radioButtonText}>Friends</Text>
          </View>
          {/* Checkbox Three */}
          <View style={styles.checkbox}>
            <Checkbox
              status={checked.newspaper ? 'checked' : 'unchecked'}
              onPress={updateNewsPaperState}
            />
            <Text style={styles.radioButtonText}>News Paper</Text>
          </View>
        </View>
        <Button mode="contained" onPress={handleSubmit}>
          Apply
        </Button>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 100,
    backgroundColor: '#6B4FAA',
    justifyContent: 'center',
    marginBottom: 50,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  nameContainer: {
    marginBottom: 15,
  },
  emailContainer: {
    marginBottom: 20,
  },
  inputText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qualificationContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qualificationPicker: {
    flex: 1,
  },
  jobContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobPicker: {
    flex: 1,
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    marginLeft: -100,
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonText: {
    fontSize: 16,
  },
  checkboxesContainer: {
    marginBottom: 30,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});
