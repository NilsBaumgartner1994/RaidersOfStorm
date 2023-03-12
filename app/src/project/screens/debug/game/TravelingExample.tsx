import React, {useEffect, useState} from "react";
import {Input, ScrollView, Spacer, Text, View} from "native-base";
import {Image, ImageBackground} from "react-native";

const image_bg = require("../../../assets/traveling/plain/backgrounds/bg.png");
const image_clouds = require("../../../assets/traveling/plain/backgrounds/bg_clouds.png");
const image_bg_far = require("../../../assets/traveling/plain/backgrounds/bg_parallaxFar.png");
const image_bg_near = require("../../../assets/traveling/plain/backgrounds/bg_parallaxNear.png");

const image_ground_tileset = require("../../../assets/traveling/plain/ground/Tileset.png");

export const TravelingExample = (props) => {

	const dimensions = props?.dimension;
	const width = dimensions?.width;
	const height = dimensions?.height;

	const bg_height = height-100;

	function renderBackground(){
		return <View style={{position: "absolute", width: width, height: bg_height, }}>
			<Image source={image_bg} style={{width: "auto", height: bg_height}}/>
		</View>
	}

	function renderClouds(){
		return <View style={{position: "absolute", width: width, height: bg_height, }}>
			<Image source={image_clouds} style={{width: "auto", height: bg_height}}/>
		</View>
	}

	function renderFar(){
		return <View style={{position: "absolute", width: width, height: bg_height, }}>
			<Image source={image_bg_far} style={{width: "auto", height: bg_height}}/>
		</View>
	}

	function renderNear(){
		return <View style={{position: "absolute", width: width, height: bg_height, }}>
			<Image source={image_bg_near} style={{width: "auto", height: bg_height}}/>
		</View>
	}

	function renderGround(){
		return <View style={{position: "absolute", width: 16*2, height: 16, }}>
			{renderGroundTileset(image_ground_tileset, 16*4, 16*9, 16*2, 16)}
		</View>
	}

	function renderGroundTileset(tileset, xStart, yStart, width, height){
		return (
			<View style={{ width: width, height: height, overflow: 'hidden' }}>
				<Image
					source={tileset}
					style={{
						top: 0,
						left: 0,
						width: width, height: height
					}} //position of image you want display.
				/>
			</View>
		)
	}

	return(
		<View style={{width: width, height: height, backgroundColor: "orange"}}>
			{renderBackground()}
			{renderClouds()}
			{renderFar()}
			{renderNear()}
			{renderGround()}
		</View>
	)
}
