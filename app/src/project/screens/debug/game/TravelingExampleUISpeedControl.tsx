import React from "react";
import {Text} from "native-base";
import {BasePadding} from "kitcheningredients";
import {MyButton} from "../../../components/buttons/MyButton";

export const TravelingExampleUISpeedControl = (props) => {

	const camera_speed = props?.camera_speed
	const setCameraSpeed = props?.setCameraSpeed

	return(
			<MyButton accessibilityLabel={"Button"} onPress={() => {
				const stop_speed = 0;
				const min_speed = 50;
				const default_speed = 100;
				const max_speed = 500;
				if(camera_speed===stop_speed){
					setCameraSpeed(min_speed);
				} else if(camera_speed===min_speed){
					setCameraSpeed(default_speed);
				} else if(camera_speed === max_speed) {
					setCameraSpeed(min_speed);
				} else {
					let next_speed = camera_speed + 100;
					if(next_speed > max_speed){
						next_speed = max_speed;
					}
					setCameraSpeed(next_speed);
				}
			}}>
				<Text>{"Increase Speed: "+camera_speed}</Text>
			</MyButton>
	)
}
