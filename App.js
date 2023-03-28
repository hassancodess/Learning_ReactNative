// import react, {useEffect, useState} from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import {Button, RadioButton, TextInput} from 'react-native-paper';
// const App = () => {
//   const [gender, setGender] = useState('Male');
//   const [salary, setSalary] = useState(0);
//   const [salaryBefore, setSalaryBefore] = useState(0);
//   const [totalSalary, setTotalSalary] = useState(0);
//   const [tax, setTax] = useState(0);

//   const CalculateTax = () => {
//     setTax(0);
//     if (salary > 100000) {
//       if (gender === 'Male') {
//         setTax((salary * 10) / 100);
//       } else {
//         setTax((salary * 20) / 100);
//       }
//     }
//     setSalaryBefore(salary);
//   };

//   useEffect(() => {
//     setTotalSalary(salary - tax);
//   }, [tax]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.HeadingText}>TAX CALCULATION</Text>
//       <TextInput
//         style={styles.InputFields}
//         keyboardType={'phone-pad'}
//         mode="outlined"
//         label="Salary"
//         value={salary}
//         onChangeText={text => setSalary(text)}
//       />

//       <View style={styles.BodyView}>
//         <Text style={styles.Choosetext}>Choose Gender:</Text>
//         <RadioButton.Group
//           onValueChange={newValue => setGender(newValue)}
//           value={gender}>
//           <View>
//             <RadioButton.Item label="Male" value="Male" color="#0b54d7" />
//           </View>
//           <View>
//             <RadioButton.Item label="Female" value="Female" color="#0b54d7" />
//           </View>
//         </RadioButton.Group>
//       </View>
//       <Button
//         style={{marginHorizontal: 50}}
//         mode="contained"
//         onPress={() => {
//           CalculateTax();
//         }}>
//         Calculate Tax
//       </Button>
//       <View style={styles.Card}>
//         <Text style={styles.Cardtext}>Tax:{tax} </Text>
//         <Text style={styles.Cardtext}>Amount Before:{salaryBefore} </Text>
//         <Text style={styles.Cardtext}>Amount After:{totalSalary} </Text>
//       </View>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     padding: 40,
//   },
//   HeadingView: {
//     backgroundColor: '#0b54d7',
//     alignItems: 'center',
//     padding: 20,
//   },
//   BodyView: {
//     paddingVertical: 40,
//   },
//   text: {
//     color: 'black',
//   },
//   HeadingText: {
//     top: -20,
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   Choosetext: {
//     backgroundColor: '#ff8621',
//     height: 40,
//     paddingTop: 9,
//     paddingLeft: 15,
//     color: '#ffffff',
//     borderRadius: 20,
//   },
//   Card: {
//     backgroundColor: '#ff8621',
//     height: 150,
//     padding: 10,
//     borderRadius: 30,
//     marginVertical: 20,
//   },
//   Cardtext: {
//     color: '#ffffff',
//     fontSize: 20,
//     padding: 5,
//   },
// });

import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
export default function App() {
  const [arrayList, setArrayList] = useState();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setsearchTerm] = useState('');

  const filterListFun = () => {
    try {
      let filteredList = arrayList.filter(
        item =>
          item.name?.first.includes(searchTerm) ||
          item.name?.last.includes(searchTerm),
      );
      setArrayList(filteredList);
    } catch (error) {}
  };

  useEffect(() => {
    filterListFun();
  }, [searchTerm]);

  const getListFromApi = async () => {
    try {
      setLoading(true);
      let resp = await fetch('https://randomuser.me/api/?results=5000');
      let res = await resp.json();
      if (res.results) {
        setArrayList(res.results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListFromApi();
  }, []);

  const renderListItem = ({item, index}) => {
    return (
      <View key={index} style={{marginVertical: 5}}>
        <Text>
          {item.name?.title + ' ' + item.name?.first + ' ' + item.name?.last}
        </Text>
      </View>
    );
  };
  const ListOfUserComp = useCallback(() => {
    return <FlatList data={arrayList} renderItem={renderListItem} />;
  }, [arrayList]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>List of User</Text>
      {loading ? (
        <>
          <TextInput
            placeholder="Search user"
            onChangeText={text => setsearchTerm(text)}
            style={{
              width: WINDOW_WIDTH * 0.8,
              alignSelf: 'center',
              marginVertical: 5,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 5,
            }}
          />
          <ListOfUserComp />
        </>
      ) : (
        <ActivityIndicator size={'small'} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
