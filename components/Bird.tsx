import React from 'react';
import { StyleSheet, View } from 'react-native';

const Bird = () => {
	return <View style={styles.root}></View>;
};

const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		backgroundColor: 'blue',
		width: 70,
		height: 50,
	},
});

export default Bird;
