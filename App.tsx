import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	Dimensions,
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
} from 'react-native';

import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

const rnd = (f = 100) => -Math.random() * f;

const gameOver = (intervals: NodeJS.Timeout[]) => {
	intervals.map((interval) => clearInterval(interval));
};

const App = () => {
	// Screen sizes
	const width: number = Dimensions.get('screen').width;
	const height: number = Dimensions.get('screen').height;

	// Game status
	const [isGameOver, setGame] = useState<boolean>(false);
	const [score, setScore] = useState<number>(0);

	// Bird position
	const [birdLeft] = useState<number>(width / 2);
	const [birdBottom, setBirdBottom] = useState<number>(height / 2);
	const birdWidth: number = 70;
	const birdHeight: number = 50;
	const gravity: number = 3;

	// Obstacles position
	const [obstaclesLeft, setObstaclesLeft] = useState<number>(width);
	const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState<number>(
		width + width / 2 + 30
	);
	const [negHeight, setNegHeight] = useState<number>(0);
	const [negHeightTwo, setNegHeightTwo] = useState<number>(rnd());
	const obstacleWidth: number = 60;
	const obstacleHeight: number = 300;
	const gap: number = 175;

	// Intervals
	let birdInterval: NodeJS.Timeout;
	let firstObstacles: NodeJS.Timeout;
	let secondObstacles: NodeJS.Timeout;

	const jump = () => {
		if (!isGameOver && birdBottom < height) {
			setBirdBottom((birdBottom) => birdBottom + 50);
			console.log('jumped');
		}
	};

	// Make bird fall
	useEffect(() => {
		if (birdBottom >= 0) {
			birdInterval = setInterval(() => {
				setBirdBottom((birdBottom) => birdBottom - gravity);
			}, 30);
		}

		return () => {
			if (birdInterval) clearInterval(birdInterval);
		};
	}, [birdBottom]);

	// Start obstacles
	useEffect(() => {
		if (obstaclesLeft >= -obstacleWidth) {
			firstObstacles = setInterval(() => {
				setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
			}, 30);

			return () => {
				if (firstObstacles) clearInterval(firstObstacles);
			};
		} else {
			setObstaclesLeft(width);
			setNegHeight(rnd(200));
			setScore((score) => score + 1);
		}
	}, [obstaclesLeft]);

	useEffect(() => {
		if (obstaclesLeftTwo >= -obstacleWidth) {
			secondObstacles = setInterval(() => {
				setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
			}, 30);

			return () => {
				if (secondObstacles) clearInterval(secondObstacles);
			};
		} else {
			setObstaclesLeftTwo(width);
			setNegHeightTwo(rnd(200));
			setScore((score) => score + 1);
		}
	}, [obstaclesLeftTwo]);

	// Check collisions
	useEffect(() => {
		const halfBird: number = 30;

		if (
			((birdBottom < negHeight + obstacleHeight + halfBird ||
				birdBottom > negHeight + obstacleHeight + gap - halfBird) &&
				obstaclesLeft > width / 2 - halfBird &&
				obstaclesLeft < width / 2 + halfBird) ||
			((birdBottom < negHeightTwo + obstacleHeight + halfBird ||
				birdBottom > negHeightTwo + obstacleHeight + gap - halfBird) &&
				obstaclesLeftTwo > width / 2 - halfBird &&
				obstaclesLeftTwo < width / 2 + halfBird)
		) {
			console.log('game over');
			gameOver([birdInterval, firstObstacles, secondObstacles]);
			setGame(true);
		}
	});

	return (
		<TouchableWithoutFeedback onPress={jump}>
			<View style={styles.root}>
				<Text style={styles.score}>{score}</Text>
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
					bottom={negHeight}
					gap={gap}
				/>
				<Obstacles
					left={obstaclesLeftTwo}
					width={obstacleWidth}
					height={obstacleHeight}
					bottom={negHeightTwo}
					gap={gap}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	score: {
		position: 'absolute',
		fontSize: 19,
		top: 95,
		left: 45,
	},
});

export default App;
