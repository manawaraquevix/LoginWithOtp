import React, { Component, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, AsyncStorage, Image, ActivityIndicator, TouchableOpacity, Alert, Dimensions, ScrollView, FlatList } from 'react-native';
import { api_actions } from '../helpers/api_actions';
import { fonts,scale } from '../helpers/common_helpers';
import { Constants } from '../helpers/Constants';
const { width, height } = Dimensions.get("window");

export default RestaurantList = () => {
   const [restraurant_list, setRestaurants] =  useState([]);
   const [error_message, setErrorMessage] =  useState('Loading...');
   const [refreshing, setRefreshing] =  useState(false);
   const [search_txt, setSearchTxt] =  useState('');

    useEffect(() => { 
         callApi();
    },[]);

     callApi = async (query) => {
        let url = Constants.RESTRAURANT_LINK + Constants.KEY;
        console.log('url -------------------- ' + query)
        if (query) {
            url = url + '&keyword=' + query
            setSearchTxt(query);
        } else {
            setSearchTxt('');
        }
        let res = await api_actions.fetchApi({url:url,  data:false, method:'GET'});
        if (res.status === 'OK') {
            setErrorMessage('');
            setRestaurants(res.results);
        } else {
            setErrorMessage(res.error_message);
        }
    }

    return (
    <View style={styles.container}> 
        <View style={{ flexDirection: 'row', borderRadius: scale(20), ralignItems: "center", justifyContent: 'center', marginTop:scale(10), marginEnd: scale(5) }}>
            <TextInput style={[styles.inputBox]} placeholder={'Search Here'} editable={true}
                value={search_txt} onChangeText={(query) => { callApi(query) }} blurOnSubmit />
        </View>        
         {!error_message && restraurant_list.length > 0 ?
                    <View style={styles.container}>
                        <FlatList keyExtractor={(item, index) => index.toString()} data={restraurant_list} onEndReached={()=>{}} onEndReachedThreshold={0}
                            refreshing={refreshing}  showsVerticalScrollIndicator={false} renderItem={({ item, index }) => _ListItem(item, index)}  ItemSeparatorComponent={renderSeparator} />
                    </View> : null}
                {restraurant_list.length == 0 && error_message ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ textAlignVertical: "center", fontSize: fonts.sizes.xl, color:'#2296f3', justifyContent: 'center', alignItems: 'center' }}>{error_message}</Text>
                </View> : null
         } 
    </View>);

}




_ListItem= (item, index)=> {
    return (
    <View style={styles.item_container}>
        <Image style={{ width:scale(50), height:scale(50)}} resizeMode={'contain'} source={{uri: item.icon}} />
        <View style={{ marginTop: scale(10), flexDirection:'column'}}>
            <View style={{ width:width-scale(100),  flexDirection:'row', justifyContent:'space-between'}}>                   
                <Text style={{color:'black', marginLeft:scale(1), fontSize: fonts.sizes.lg,  width:width-scale(150),}}> {item.name }</Text>
                <Text style={{textAlignVertical: "center",textAlign: "center", width:scale(30), height:scale(30), color:'white',backgroundColor:'tomato',  borderRadius:scale(2), fontSize: fonts.sizes.md}}> {item.rating}</Text>
            </View>
            <View style={{  flexDirection:'column', width:width-scale(100)}}>
                <Text style={styles.address_txt_style}> {item.vicinity}</Text>
                <Text style={styles.open_close_txt_style}> {item.opening_hours && item.opening_hours.open_now? 'Open Now': 'Closed Now'}</Text>
                <Text style={styles.sanitize_txt_style}> {'Well sanitized kitchen * Daily temperature checks * Rider hand wash'}</Text>
            </View>
        </View>
    </View>);
}

renderSeparator = () => {
    return (
      <View  style={{ height: 1, width: "99%", backgroundColor: "#CED0CE",marginLeft: "1%"}}/>
    );
  };

styles = StyleSheet.create({
    item_container: {flex: 1,flexDirection:'row', backgroundColor: '#fafafa', marginVertical: scale(10), marginHorizontal: scale(10)},
    container: {flex: 1,},
    open_close_txt_style: {color:'slateblue', marginLeft:scale(1),marginTop:scale(3), fontSize: fonts.sizes.sm},
    address_txt_style: {color:'slategray', marginLeft:scale(1),marginTop:scale(3), fontSize: fonts.sizes.sm},
    sanitize_txt_style: {color:'slategray', marginLeft:scale(1),marginTop:scale(3), fontSize: fonts.sizes.sm},
    inputBox: { borderRadius: scale(20), height: scale(40), width: width - scale(60), backgroundColor:'lightyellow', color: 'black', marginTop: scale(4), paddingLeft: 16, marginRight: 1, marginBottom: scale(2), }
})