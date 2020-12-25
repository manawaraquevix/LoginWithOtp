import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Platform, KeyboardAvoidingView, Image, ImageBackground } from 'react-native';
import { scale, fonts, color_settings} from '../helpers/common_helpers';
import OTPTextView from 'react-native-otp-textinput';
import LoginInputWithLabel from './LoginInputWithLabel';
const { height, width } = Dimensions.get('window');

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    phone:'',       
    otp:'',
    phoneErrMsg:'',
    phoneErr:'',
    otpErrMsg:'',
    otpErr:'',
    validPhone:'',
    otpMode:false,
    
    };
  }

  componentDidMount() {
   
  }
 

  handleTextChange(fieldName, value) {
    if(fieldName=='phone'){    
     this.setState({phone:value.length <=10? value: value.substring(0,10), validPhone:value.length >= 10})
     
    }
    if(fieldName=='otp'){
      this.setState({ otp:value.length <=4? value: value.substring(0,4), otpErrMsg: value.length == 4 ? '' : 'Please enter otp'});
    }
  }

  async sendform(){    
    if (this.state.validPhone !== true) {Alert.alert(null, 'Please enter valid Phone number'); return false;}   
    setTimeout(()=>this.setState({otpMode:true}), 1000)

  }


  render() {
    return (
      <ImageBackground  style={{ flex: 1,backgroundColor:"#fff"}}>
          {this.state.otpMode? <Text style={{height:scale(40), textAlignVertical:'center', color:color_settings.white, backgroundColor:color_settings.themeBg, paddingLeft:scale(10)}}>Verify Phone Number.</Text>: null}
          <KeyboardAvoidingView style={[styles.ContainerView]} behavior={(Platform.OS === 'ios')? "padding" : null} >
              


                  <View style={{width:width-scale(10), marginHorizontal:scale(10)}}>
                      {/* Enter Phone View Start */}
                      {this.state.otpMode?<Text style={styles.bigFontStyle}>Enter OTP code</Text>:null}
                      
                      {this.state.otpMode?<Text style={{color:'black'}}>{`Please verify your number with 4 digit OTP code sent to ********${this.state.phone.substring(8)}`}</Text>:null}
                      {!this.state.otpMode? <View style={{marginTop:scale(30)}}>
                          <LoginInputWithLabel
                              theme="light"
                              returnKeyType = {"done"}
                              onRef={(r) => this.myField1 = r}
                              style={[styles.inputStyle, this.state.phoneErr ? styles.error : null]}
                              label={ "Phone number"}
                              labelPadLeft={1}
                              keyboardType='phone-pad'
                              placeholder={ "Enter Phone number"}
                              placeholderTextColor={color_settings.login_placeholder_text_color}
                              multiline={false}
                              error={this.state.phoneErr}
                              autoCapitalize = {'none'}
                              autoCorrect={false}
                              value={ this.state.phone}
                              onChangeText={(phone) => {  this.handleTextChange('phone', phone); }}
                              onEndEditing={(phone) => {
                                  this.setState({phoneErr: this.state.phoneErrMsg? true : ''});
                              }}
                              onSubmitEditing={(evt) => this.sendform()}
                               />

                          {(this.state.validPhone && !this.state.otpMode)?
                            <TouchableOpacity style={{width: scale(30),alignSelf:'flex-end'}} onPress={() => this.sendform()}>
                              <View style={styles.checkEmailMark}>
                                <Image source={require('../assets/check-mark.png')} />
                              </View>
                              <View style={{paddingTop:scale(30),}}>
                              </View>
                            </TouchableOpacity>
                          :null}
                      </View>: <View >
                        <OTPTextView
                          handleTextChange={(otp) => {this.handleTextChange('otp', otp);}}
                          containerStyle={styles.textInputContainer}
                          textInputStyle={styles.roundedTextInput}
                          defaultValue={ this.state.otp}
                        />
                        {/* <LoginInputWithLabel
                            theme="light"
                            onRef={(r) => this.myField2 = r}
                            style={[styles.inputStyle, this.state.otpErr ? styles.error : null]}
                            label={'OTP'}
                            placeholder={"Enter OTP"}
                            placeholderTextColor={color_settings.login_placeholder_text_color}
                            labelPadLeft={1}
                            editable={this.state.otpMode}
                            keyboardType='phone-pad'
                            multiline={false}
                            error={this.state.otpErr}
                            autoCapitalize = {'none'}
                            value={ this.state.otp}
                            onChangeText={(otp) => {  this.handleTextChange('otp', otp); }}
                            onEndEditing={(otp) => {
                                this.setState({otpErr: this.state.otpErrMsg? true : ''});
                            }} /> */}
                      </View> }
                      {this.state.otpMode?
                      <View style={{flexDirection:'row'}}>
                        <Text style={{color:'black'}}>{'Didn\'t receive code?'}</Text>
                        <Text style={{color:color_settings.themeBg}}>{'Resend'}</Text>
                      </View>:null}

                      {this.state.otpMode?<TouchableOpacity
                        disabled={this.state.otp.length!==4} onPress={() => this.sendform()}
                        style={styles.verifyBtnStyle} >
                        <Text style={{color:color_settings.white}}>{ 'Verify OTP' }</Text>
                    </TouchableOpacity>: null}

                  </View>
             
          </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
ContainerView: { flex: 1,backgroundColor: 'transparent', justifyContent:'center', alignItems:'center',},
backButtonStyle:{marginTop:Platform.OS == 'ios'? scale(35): scale(20), position:'absolute', marginLeft:scale(15),},

bigFontStyle:{ color: '#002B5D', fontFamily: 'Avenir', fontSize: 24, fontWeight: 'bold', marginTop:scale(30),},

checkEmailMark:{flex: .1, flexDirection: 'row', justifyContent: 'flex-end', position:'relative', marginTop:scale(-40), marginRight:scale(10),},

verifyBtnStyle: { flex:0, backgroundColor: '#2296F3', padding: scale(13), marginTop:scale(40), justifyContent: 'center', alignItems: 'center',
    borderRadius:2, fontSize:16, color:'#FFFFFF',},
inputStyle:     { marginHorizontal:scale(17), marginTop:0, marginBottom:scale(10) , fontSize:fonts.sizes.lg, color: '#fff', borderWidth:0, borderColor:'red', padding:0, paddingLeft:scale(47)},
Container: { flex: 1, backgroundColor: "transparent",justifyContent: 'space-between'},
err:{marginTop:scale(-10), marginBottom:scale(5)},
textInputContainer: { marginTop: scale(20),marginBottom: scale(20)},
roundedTextInput: { borderRadius: 10, borderWidth: 4,},
  
});
