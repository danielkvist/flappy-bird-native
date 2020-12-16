import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, View } from 'react-native';

import Bird from './components/Bird';

const App = () => {
	const width = Dimensions.get('screen').width;
	const height = Dimensions.get('screen').height;

	const [birdLeft] = useState<number>(width / 2);
	const [birdBottom, setBirdBottom] = useState<number>(height / 2);
	const gravity = 3;

	// Make bird fall
	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;

		if (birdBottom >= 0) {
			interval = setInterval(() => {
				setBirdBottom((birdBottom) => birdBottom - gravity);
			}, 30);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [birdBottom]);

	return (
		<View style={styles.root}>
			<StatusBar style="auto" />
			<Bird bottom={birdBottom} left={birdLeft} />
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
