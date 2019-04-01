import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import ImagePicker from "react-native-image-picker";

const UploadURL = 'http://PublicIP:5000/model'

export default class App extends Component {

  constructor() {
    super()
    this.state = { 
      getdata: true,
      class: 'No classification yet',
      flag: false
    }
  }

  getImage = () => {
    ImagePicker.launchCamera({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, response => {
      if (response.didCancel) {
        console.log("User cancelled!");
      } else if (response.error) {
        console.log("Error", response.error);
      } else {
        this.setState({
          getdata: false,
        });
        const data = new FormData();
        data.append('name', 'image');
        data.append('fileData', {
          uri : response.uri,
          type: response.type,
          name: response.fileName,
    
        });
        fetch(UploadURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        })
        .then((response) => response.text())
        .then((responseText) => this.setState({class: responseText, flag: true}))
      }
    });
  }

  returnToHome = () => {
    if(this.state.flag){
      this.setState({
        getdata: true, 
        class:'No classification yet', 
        flag: false});
    }else{}
  }

  render() {
    if (this.state.getdata == true){
      return(
        <TouchableOpacity onPress={this.getImage}
          style={{flex:1,justifyContent: "center",alignItems: "center"}}>
          <Text> Take Picture </Text>
        </TouchableOpacity>
      ); 
    }else{
      return( 
        <TouchableOpacity onPress={this.returnToHome}
        style={{flex:1,justifyContent: "center",alignItems: "center"}}>
        <Text> {this.state.class} </Text>
      </TouchableOpacity>
      );
    }
  }
}