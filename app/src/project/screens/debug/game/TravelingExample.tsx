import React, {useEffect, useRef, useState} from "react";
import {Input, ScrollView, Spacer, Text, View} from "native-base";
import {Animated, Easing, Image, ImageBackground} from "react-native";

const image_bg = require("../../../assets/traveling/plain/backgrounds/bg.png");
const image_clouds = require("../../../assets/traveling/plain/backgrounds/bg_clouds.png");
const image_bg_far = require("../../../assets/traveling/plain/backgrounds/bg_parallaxFar.png");
const image_bg_near = require("../../../assets/traveling/plain/backgrounds/bg_parallaxNear.png");

const image_ground_tileset = require("../../../assets/traveling/plain/ground/Tileset.png");

export const TravelingExample = (props) => {

	const dimensions = props?.dimension;
	const width = dimensions?.width;
	const height = dimensions?.height;

	const layer1 = useRef(new Animated.Value(0)).current;
	const layer2 = useRef(new Animated.Value(0)).current;
	const layer3 = useRef(new Animated.Value(0)).current;
	const layer4 = useRef(new Animated.Value(0)).current;
	const layer5 = useRef(new Animated.Value(0)).current;

	const ground_height = 64;

	const bg_height = height-ground_height;

	function moveLayer(layer, toValue, duration) {
		Animated.timing(layer, {
			toValue,
			duration,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (finished) {
				layer.setValue(0);
				moveLayer(layer, toValue, duration);
			}
		});
	};

	useEffect(() => {
		if(!!width && !!height){
			const widthInInt = parseInt(width);
			// Define the animation loop for camera_speed
			const camera_speed = 100

			const toValue = widthInInt;
			console.log("toValue: ", toValue);
			moveLayer(layer1, -toValue, parallax_speed(10000, camera_speed));
			moveLayer(layer2, -toValue, parallax_speed(3000, camera_speed));
			moveLayer(layer3, -toValue, parallax_speed(500, camera_speed));
			moveLayer(layer4, -toValue, parallax_speed(20, camera_speed));
			moveLayer(layer5, -toValue, parallax_speed(10, camera_speed));
		}
	}, [layer1, layer2, layer3, dimensions]);

	function parallax_speed(distance_to_layer_from_window, observer_velocity){
		const distance_to_layer_from_user = distance_to_layer_from_window + 10;
		return 250*(distance_to_layer_from_window / distance_to_layer_from_user) * (100*(100/observer_velocity));
	}

	function renderLayer(children, animatedValue, layerHeight){
		const marginLeft = -1; // -1 to hide the border
		const renderedLayer = (
			<Animated.View
				style={{ transform: [{ translateX: animatedValue }], height: layerHeight, width: width, marginLeft: marginLeft}}
			>
				{children}
			</Animated.View>
		)

		return <View style={{position: "absolute", width: width, height: layerHeight}}>
			<View style={{ flexDirection: 'row' }}>
				{renderedLayer}
				{renderedLayer}
				{renderedLayer}
			</View>
		</View>
	}

	function renderImageLayer(imageSrc, animatedValue){
		const child = <Image source={imageSrc} style={{width: width, height: bg_height}}/>
		return renderLayer(child, animatedValue, bg_height);
	}

	function renderBackground(){
		return renderImageLayer(image_bg, layer1);
	}

	function renderClouds(){
		return renderImageLayer(image_clouds, layer2);
	}

	function renderFar(){
		return renderImageLayer(image_bg_far, layer3);
	}

	function renderNear(){
		return renderImageLayer(image_bg_near, layer4);
	}

	function renderGround(){
		const child = renderGroundTiles();
		return renderLayer(child, layer5, ground_height);
	}

	function renderGroundTiles(){
		return (
			<View style={{ width: width, height: ground_height, flexDirection: "row" }}>
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
				{renderGroundTile()}
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

	return(
		<View style={{width: width, height: height, overflow: 'hidden'}}>
			<View style={{width: width, height: height, overflow: 'hidden', justifyContent: "flex-end", position: "absolute", bottom: ground_height}}>
				{renderBackground()}
				{renderClouds()}
				{renderFar()}
				{renderNear()}
			</View>
			<View style={{width: width, height: height, backgroundColor: "transparent", overflow: 'hidden', justifyContent: "flex-end", position: "absolute", bottom: 0}}>
				{renderGround()}
			</View>
		</View>
	)
}
