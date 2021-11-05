import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TextInput,
  FlatList,
  Modal,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
// You can import from local files
import Prikaz from './components/Prikaz';
import slika from './assets/calculator.png';

// or any pure javascript modules available in npm

export default function App() {
  //unos
  const [opis, postaviOpis] = useState();
  const [iznos, postaviIznos] = useState();
  const [racun, postaviRacun] = useState([]);
  //modal
  const [modalVisible, setModalVisible] = useState(false);

  //unos opis
  const opisUnos = (tekst) => {
    postaviOpis(tekst);
  };

  //unos iznos
  const iznosUnos = (tekst) => {
    postaviIznos(tekst.replace(/[^0-9]/g, ''));
  };

  //unos skupa
  const noviRacun = () => {
    if(!isNaN(opis) && !isNaN(iznos)){
      console.log(opis.length) 
      window.alert("Nisu popunjena polja!");
      return;
    }
    const objekt = {
    value: opis,
    key: iznos,
    };
    postaviRacun((racun) => [...racun, objekt]);
    postaviOpis(''); 
    postaviIznos('');
  };

  //ukupno i prosjek
  let racunUkupno = 0;
  let racunProsjek = 0;
  let br = 0;
  racun.map(({ key }) => {
    racunUkupno += parseInt(key);
    br += 1;
    //console.log(br)
  });

  //console.log(racunUkupno)
  if (racunUkupno == 0) {
    racunProsjek = 0;
  } else {
    racunProsjek = (racunUkupno / br).toFixed(2);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.modalView}>
              <View>
                <View style={styles.labele}>
                  <Text>Opis:</Text>
                  <TextInput
                    placeholder="dodaj opis"
                    value={opis}
                    onChangeText={opisUnos}
                    style={styles.unos}
                  />
                </View>
                <View style={styles.labele}>
                  <Text>Iznos:</Text>
                  <TextInput
                    placeholder="dodaj iznos"
                    value={iznos}
                    onChangeText={iznosUnos}
                    style={styles.unos}
                  />
                </View>
              </View>
              <View style={styles.tipke}>
                <Button title="Dodaj" color="#79b830" onPress={noviRacun} />
                <Button
                  title="Odustani"
                  color="#ea3535"
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </Modal>
          <Button
            title="Novi račun"
            color="#ff5722"
            onPress={() => setModalVisible(true)}
          />
        </View>
        <FlatList
          style={styles.flatlista}
          data={racun}
          renderItem={(el) => (
            <View style={styles.lista}>
              <Text>
                {el.item.value} ({el.item.key} kn)
              </Text>
            </View>
          )}
        />
        <View style={styles.ukupno}>
          <View style={styles.labele}>
            <Text>Ukupno: </Text>
            <Text> {racunUkupno} </Text>
          </View>
          <View style={styles.labele}>
            <Text>Prosjek: </Text>
            <Text> {racunProsjek} </Text>
          </View>
        </View>
        <Image source={slika} style={styles.slika} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7aa2b',
    padding: 50,
  },
  flatlista: {
    width: 270,
    margin: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: '#4db6ac',
  },
  lista: {
    padding: 5,
    marginVertical: 7,
    borderRadius: 7,
    backgroundColor: 'white',
    width: 230,
    height: 38,
    textAlignVertical: 'center',
  },
  modalView: {
    borderColor: '#e6ad4f',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  unos: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  tipke: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  labele: {
    flexDirection: 'row',
    width: '100%',
    padding: 5,
  },
  ukupno: {
    width: 150,
    height: 60,
    textAlign: 'center',
    backgroundColor: 'beige',
    borderWidth: 0.5,
    borderColor: '#ff5722',
  },
  slika: {
    width: 50,
    height: 50,
    bottom: 30,
    left: 60,
  },
});
