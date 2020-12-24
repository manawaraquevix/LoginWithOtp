import React, { Component, PureComponent } from "react";
import { View, Text, TextInput,Animated, StyleSheet } from 'react-native';
import {color_settings, scale} from '../helpers/common_helpers';
class LoginInputWithLabel extends Component {
    state = {
      isFocused: false,
      inputBoxBorderColor:'#CACFD9',
    };
    handleFocus =()=>{
      this.setState({inputBoxBorderColor:'#304C71'})
    }
    handleBlur = () =>{
      this.setState({inputBoxBorderColor:'#CACFD9'})
    }
    render() {

      let { label, labelPadLeft, padtop, fontsize, style, theme,  ...props } = this.props;

      return (
        <View style={{ paddingTop: scale(10) }} >
        <Text style={styles.loginLabel}>
          {label}
        </Text>
        <TextInput
          ref={(r) => this.props.onRef(r)} { ...this.props }
          style={[styles.inputBox,{borderColor:this.state.inputBoxBorderColor}]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  loginLabel:{
    color: '#91A1BB',
    fontFamily: 'Avenir',
    fontSize: 12,
    lineHeight: scale(15),
  },
  inputBox:{
    height: scale(43),
    borderWidth:1,
    color:"#304C71",
    borderRadius: 2,
    marginTop:4,
    paddingLeft:16,
    marginRight:1,
    marginBottom:scale(8),
  }

  });



  export default LoginInputWithLabel;
