import React, {useRef, useState} from "react";
import {View, Text, StatusBar} from "native-base";
import {Animated, Image, Platform} from "react-native";
import {BasePadding} from "kitcheningredients";

import { GameEngine as GameEngineNative } from "react-native-game-engine"
import { GameEngine as GameEngineWeb } from "react-game-engine";
const GameEngine = Platform.OS === "web" ? GameEngineWeb : GameEngineNative;
import { Box } from "./renderersWeb";
import { Finger } from "./renderersNative";
const MyRenderer = Platform.OS === "web" ? Box : Finger;
import { MoveBox } from "./systemsWeb"
import { MoveFinger} from "./systemsNative";
const MoveSystem = Platform.OS === "web" ? MoveBox : MoveFinger;

const image_bg = require("../../../../assets/traveling/plain/backgrounds/bg.png");
const image_clouds = require("../../../../assets/traveling/plain/backgrounds/bg_clouds.png");
const image_bg_far = require("../../../../assets/traveling/plain/backgrounds/bg_parallaxFar.png");
const image_bg_near = require("../../../../assets/traveling/plain/backgrounds/bg_parallaxNear.png");
const image_bg_mountains = require("../../../../assets/traveling/plain/backgrounds/bg_mountains.png");

export const ReactNativeGameEngineExample = (props) => {

	const dimensions = props?.dimension;
	const width = dimensions?.width;
	const height = dimensions?.height;

	return(
		<View style={{width: width, height: height, position: "absolute"}}>
			<Text>{"My RNGE example"}</Text>
			<GameEngine
				style={{ width: 800, height: 600, backgroundColor: "blue" }}
				systems={[MoveSystem]}
				entities={{
				1: { position: [40,  200], renderer: <MyRenderer />}, //-- Notice that each entity has a unique id (required)
				2: { position: [100, 200], renderer: <MyRenderer />}, //-- and a renderer property (optional). If no renderer
				3: { position: [160, 200], renderer: <MyRenderer />}, //-- is supplied with the entity - it won't get displayed.
				4: { position: [220, 200], renderer: <MyRenderer />},
				5: { position: [280, 200], renderer: <MyRenderer />}
			}}>

			</GameEngine>
		</View>
	)
}
