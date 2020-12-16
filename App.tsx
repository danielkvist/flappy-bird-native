import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, View } from 'react-native';

import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

const App = () => {
	// Screen sizes
	const width: number = Dimensions.get('screen').width;
	const height: number = Dimensions.get('screen').height;

	// Bird position
	const [birdLeft] = useState<number>(width / 2);
	const [birdBottom, setBirdBottom] = useState<number>(height / 2);
	const birdWidth: number = 70;
	const birdHeight: number = 50;
	const gravity: number = 3;

	// Obstacles position
	const [obstaclesLeft, setObstaclesLeft] = useState<number>(width);
	const obstacleWidth: number = 60;
	const obstacleHeight: number = 300;
	const gap: number = 175;

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

	// Start obstacles
	useEffect(() => {
		let interval: NodeJS.Timeout | undefined;
		if (obstaclesLeft >= -obstacleWidth) {
			interval = setInterval(() => {
				setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
			}, 30);

			return () => {
				if (interval) clearInterval(interval);
			};
		} else {
			setObstaclesLeft(width);
		}
	}, [obstaclesLeft]);

	return (
		<View style={styles.root}>
			<StatusBar style="auto" />
			<Bird
				bottom={birdBottom}
				left={birdLeft}
				width={birdWidth}
				height={birdHeight}
			/>
			<Obstacles
				left={obstaclesLeft}
				width={obstacleWidth}
				height={obstacleHeight}
				gap={gap}
			/>
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
