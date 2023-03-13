import React, {useRef, useState} from "react";
import {View} from "native-base";
import {Animated, Image} from "react-native";
import {BasePadding} from "kitcheningredients";
import {TravelingExampleUISpeedControl} from "./TravelingExampleUISpeedControl";
import {TravelingLayer} from "./TravelingLayer";
import ScaledImage from "./ScaledImage";

const image_bg = require("../../../assets/traveling/plain/backgrounds/bg.png");
const image_clouds = require("../../../assets/traveling/plain/backgrounds/bg_clouds.png");
const image_bg_far = require("../../../assets/traveling/plain/backgrounds/bg_parallaxFar.png");
const image_bg_near = require("../../../assets/traveling/plain/backgrounds/bg_parallaxNear.png");
const image_bg_mountains = require("../../../assets/traveling/plain/backgrounds/bg_mountains.png");

const image_ground_tileset = require("../../../assets/traveling/plain/ground/Tileset.png");
const image_ground_03 = require("../../../assets/traveling/plain/ground/ground-03.png");

export const TravelingExample = (props) => {

	const dimensions = props?.dimension;
	const width = dimensions?.width;
	const height = dimensions?.height;

	const [camera_speed, setCameraSpeed] = useState(100);

	const layer1 = useRef(new Animated.Value(0)).current;
	const layer2 = useRef(new Animated.Value(0)).current;
	const layer3 = useRef(new Animated.Value(0)).current;
	const layer4 = useRef(new Animated.Value(0)).current;
	const layer5 = useRef(new Animated.Value(0)).current;
	const layer6 = useRef(new Animated.Value(0)).current;

	const ground_height = 64;

	const bg_height = height-ground_height;

	function renderLayer(children, animatedValue, layerHeight, distance){
		return <TravelingLayer width={width} height={layerHeight} repeatChildren={true} distance={distance} camera_speed={camera_speed} >
			{children}
		</TravelingLayer>
	}

	function renderImageLayer(imageSrc, animatedValue, distance, height){
		const child = <ScaledImage source={imageSrc} height={height} key={height+""} />
		return renderLayer(child, animatedValue, height, distance);
	}

	function renderGround(){
		const child = renderGroundTiles();
		return renderLayer(child, layer5, ground_height, 10);
	}

	function renderGroundTiles(){
		return (
			<View style={{ width: width, height: ground_height, flexDirection: "row" }}>
				{renderGroundTile()}
			</View>
		)
	}

	function renderGroundTile(){
		const tile_size = ground_height;
		const tile_width = tile_size;
		const tile_height = tile_size;
		let ground_tile_width = 8*tile_size;
		let ground_tile_height = 13*tile_size;

		return (
			<View style={{ width: tile_width, height: tile_height, overflow: 'hidden'}}>
				<Image
					source={image_ground_tileset}
					style={{
						position: "absolute",
						left: -3.5*tile_size,
						top: -tile_size*9,
						width: ground_tile_width, height: ground_tile_height
					}} //position of image you want display.
				/>
			</View>
		)
	}

	function renderLayers(){
		return (
			<View style={{width: width, height: height, overflow: 'hidden', position: "absolute"}}>
				<View style={{width: width, height: height, overflow: 'hidden', justifyContent: "flex-end", position: "absolute", bottom: ground_height}}>
					{renderImageLayer(image_bg, layer1, 500000, bg_height)}
					{renderImageLayer(image_clouds, layer2, 500, bg_height)}
					{renderImageLayer(image_bg_mountains, layer6, 10000, bg_height)}
					{renderImageLayer(image_bg_far, layer3, 500, bg_height)}
					{renderImageLayer(image_bg_near, layer4, 50, bg_height)}
				</View>
				<View style={{width: width, height: height, backgroundColor: "transparent", overflow: 'hidden', justifyContent: "flex-end", position: "absolute", bottom: 0}}>
					{renderGround()}
				</View>
			</View>
		)
	}

	function renderUI(){
		return(
			<BasePadding>
				<TravelingExampleUISpeedControl camera_speed={camera_speed} setCameraSpeed={setCameraSpeed}/>
			</BasePadding>
		)
	}

	return(
		<View style={{width: width, height: height, position: "absolute"}}>
			{renderLayers()}
			{renderUI()}
		</View>
	)
}
