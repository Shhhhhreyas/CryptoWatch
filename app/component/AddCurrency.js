import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import FloatingInput from './FloatingInput';
import colors from '../config/colors';
import constants from '../config/constants';

function AddCurrency({onAddPress = () => {}, setVisible, visible}) {
  const styles = createStyles('dark');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(constants.slice(0, 10));
  const [buyPrice, setBuyPrice] = useState('');
  const [quantity, setQuanity] = useState('');
  const [isAddDisabled, setIsAddDisabled] = useState(true);

  console.log(
    'Length: ',
    constants.filter(
      coin => coin.type_is_crypto == 0 || coin.volume_1day_usd == 0,
    ).length,
  );

  React.useEffect(() => {
    if (
      buyPrice != null &&
      buyPrice != '' &&
      quantity != null &&
      quantity != '' &&
      value != null &&
      value != ''
    )
      setIsAddDisabled(false);
  }, [value, buyPrice, quantity]);
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        setBuyPrice('');
        setQuanity('');
        setValue('');
        setOpen(false);
        setIsAddDisabled(true);
        setVisible(false);
      }}
      useNativeDriverForBackdrop={true}>
      <View style={styles.container}>
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setValue={setValue}
            setItems={setItems}
            setOpen={setOpen}
            placeholder="Select a crypto"
            schema={{
              label: 'name',
              value: 'asset_id',
            }}
            //renderListItem={renderItem}
          />
        </View>
        <View style={styles.inputCont}>
          <FloatingInput
            label="Buy price"
            value={buyPrice}
            onChangeText={bp => setBuyPrice(bp.replace(/[^0-9.]/g, ''))}
            keyboardType="numeric"
          />
          <FloatingInput
            label="Quantity"
            value={quantity}
            onChangeText={quan => setQuanity(quan.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.buttonsCont}>
          <TouchableOpacity
            style={styles.addButton}
            disabled={isAddDisabled}
            onPress={() => {
              onAddPress(value, buyPrice, quantity);
              setBuyPrice('');
              setQuanity('');
              setValue('');
              setOpen(false);
              setIsAddDisabled(true);
              setVisible(false);
            }}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setBuyPrice('');
              setQuanity('');
              setValue('');
              setOpen(false);
              setIsAddDisabled(true);
              setVisible(false);
            }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    inputCont: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'stretch',
    },
    addButton: {
      padding: 16,
      backgroundColor: colors[theme].green,
      borderWidth: 2,
      borderColor: colors[theme].green,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      marginRight: 8,
    },
    addText: {
      color: colors[theme].white,
      fontSize: 20,
      fontWeight: 'bold',
    },
    cancelText: {
      color: colors[theme].red,
      fontSize: 20,
      fontWeight: 'bold',
    },
    cancelButton: {
      flex: 1,
      padding: 16,
      backgroundColor: colors[theme].secondary,
      borderWidth: 2,
      borderColor: colors[theme].red,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    container: {
      flex: 0.5,
      flexGrow: 1,
      backgroundColor: colors[theme].secondary,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    buttonsCont: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemCont: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
      backgroundColor: colors[theme].primary,
      alignItems: 'center',
    },
    itemText: {
      color: colors[theme].white,
      fontSize: 14,
    },
  });

export default AddCurrency;