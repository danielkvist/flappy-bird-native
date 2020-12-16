import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
	bottom: number;
	gap: number;
	height: number;
	left: number;
	width: number;
};

const Obstacles = ({ width, height, left, bottom, gap }: Props) => {
	return (
		<>
			<View
				style={[
					styles.root,
					{ width, height, bottom: bottom + height + gap, left },
				]}
			></View>
			<View
				style={[styles.root, { width, height, bottom: bottom, left }]}
			></View>
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
