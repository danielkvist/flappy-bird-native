import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
	bottom: number;
	left: number;
	width: number;
	height: number;
};

const Bird = ({ bottom, left, width, height }: Props) => {
	return (
		<View
			style={[styles.root, { height, width, bottom, left: left - width / 2 }]}
		></View>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: 'blue',
		position: 'absolute',
	},
});

export default Bird;
