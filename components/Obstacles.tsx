import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
	width: number;
	height: number;
	left: number;
	gap: number;
};

const Obstacles = ({ width, height, left, gap }: Props) => {
	return (
		<>
			<View
				style={[styles.root, { width, height, bottom: 0 + height + gap, left }]}
			></View>
			<View style={[styles.root, { width, height, bottom: 0, left }]}></View>
		</>
	);
};

const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		backgroundColor: 'green',
	},
});

export default Obstacles;
