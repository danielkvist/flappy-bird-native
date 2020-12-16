import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
	bottom: number;
	left: number;
};

const Bird = ({ bottom, left }: Props) => {
	const width = 70;
	const height = 50;

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
