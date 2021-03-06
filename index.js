import React, {Component} from 'react';
import {Text, AppRegistry, View} from 'react-native';
import LoginForm from './src/components/LoginForm';
import firebase from 'react-native-firebase';
import {Header, Button, Spinner, Card} from './src/components/common';


class App extends Component
{
	state = {status: null};
	componentWillMount()
	{
		firebase.auth().onAuthStateChanged((user)=>
		{
			if(user)
			{
				this.setState({status:true});
			}
			else
			{
				this.setState({status:false});
			}
		});
	}
	helpMe()
	{
		switch(this.state.status)
		{
			case true:
				return(
					<Card>
						<Button onPress={()=>firebase.auth().signOut()}>
							Log Out
						</Button>
					</Card>
				);
			case false:
				return(<LoginForm/>);
			default:
				return(<Spinner size='large'/>);
		}
	}
	render()
	{
		return(
			<View>
				<Header>
					<Text>Firebase</Text>
				</Header>
				{this.helpMe()}
			</View>
		);
	}
}
AppRegistry.registerComponent('redux', () => App);
