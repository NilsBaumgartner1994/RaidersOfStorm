import React, {useRef, useState} from "react";
import {Component} from "react";
import {Image} from "react-native";

class ScaledImage extends Component {

	constructor(props){
		super(props);
		console.log("ScaledImage constructor: ")
		console.log(JSON.stringify(props, null, 2))
	}

	async getImageDimensions(image: any | string){
		console.log("Getting image dimensions: ")
		return new Promise((resolve, reject) => {
			Image.getSize(image, (width, height) => {
				console.log("Image dimensions: ", width, height)
				resolve({width, height});
			}, (error) => {
				reject(error);
			});
		});
	}

	async load(){
		const source = this.props?.source;
		let {width, height} = await this.getImageDimensions(source);
		console.log("Setting image size: ", width, height)
		this.setImageSize(width, height);
	}

	componentWillMount(){
		this.load();
	}

	setImageSize(width, height){
		console.log("Setting image size: ", width, height)
		console.log("Props: ", this.props)
		if (this.props.width && !this.props.height) {
			console.log("git width but no height");
			this.setState({
				width: this.props.width,
				height: height * (this.props.width / width)
			});
		} else if (!this.props.width && this.props.height) {
			console.log("git height but no width");
			const nextWidth = width * (this.props.height / height);
			console.log("nextWidth: ", nextWidth)
			this.setState({
				width: nextWidth,
				height: this.props.height
			});
		} else {
			console.log("git width and height");
			this.setState({
				width: width,
				height: height
			});
		}
	}

	getStyles(){
		let styles = [{
			height: this.state.height,
			width: this.state.width
		}];

		if (this.props.style) {
			styles.push(this.props.style);
		}

		return styles;
	}

	render() {
		if (this.state?.width && this.state?.height && (this.props?.height || this.props?.width)) {
			console.log("Rendering image: ")
			console.log(JSON.stringify(this.getStyles(), null, 2))
			return (
				<Image
					source={this.props.source}
					style={this.getStyles()}
				/>
			)
		} else {
			return null
		}
	}

}

export default ScaledImage;
