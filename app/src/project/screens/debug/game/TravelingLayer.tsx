import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {View, Text} from "native-base";
import {Animated, Easing} from "react-native";

export interface AppState{
    camera_speed: number;
    repeatChildren: boolean;
    distance: number;
}
export const TravelingLayer: FunctionComponent<AppState>  = (props) => {

    const width = props?.width;
    const height = props?.height;
    const children = props?.children;
    const repeatChildren = props?.repeatChildren;

    const camera_speed = props?.camera_speed;
    const distance = props?.distance;

    const marginLeft = -1; // -1 to hide the border

    // measure the width of the children
    const [childDimension, setChildDimension] = useState({width: undefined, height: undefined})
    const childWidth = childDimension?.width
    const childHeight = childDimension?.height

    const childrenCount = getAmountChildrenToRender();
    const childrenToFillScreen = getAmountChildrenToFillScreen();
    const multipleChildrenToFillScreenWidth = (childWidth+marginLeft) * childrenToFillScreen;

    const durationScale = multipleChildrenToFillScreenWidth / width; // since the animation is based on the width of the children size, we need to scale the duration based on the width of the screen
    // otherwise larger children would move faster than smaller children

    const scaledParalaxSpeed = durationScale * parallax_speed(distance, camera_speed)
    const duration = parseInt(scaledParalaxSpeed+"")

    const animatedValue = useRef(new Animated.Value(0)).current;

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
        if(!!width && !!height && !!multipleChildrenToFillScreenWidth){
            moveLayer(animatedValue, -multipleChildrenToFillScreenWidth, duration);
        }
    }, [animatedValue, width, height, camera_speed, multipleChildrenToFillScreenWidth]);

    function parallax_speed(distance_to_layer_from_window, observer_velocity){
        const distance_to_layer_from_user = distance_to_layer_from_window + 250;
        const durationFloat = 250*(distance_to_layer_from_window / distance_to_layer_from_user) * (250*(250/observer_velocity))
        return parseInt(durationFloat+"");
    }

    function getAmountChildrenToFillScreen(){
        if(!width || !childWidth){
            return undefined;
        }
        const childrenWidth = childWidth;
        const childrenCount = Math.ceil(width/childrenWidth);
        return childrenCount;
    }

    function getAmountChildrenToRender(){
        if(!width || !childWidth){
            return 0;
        }
        if(!repeatChildren){
            return 1;
        } else {
            return getAmountChildrenToFillScreen()
        }
    }

    function measureChildWidth(event){
        const {width, height} = event.nativeEvent.layout;
        setChildDimension({width, height})
    }

    function renderChildrenWithMeasure(){
        return <View onLayout={measureChildWidth} style={{opacity: 1}}>
            {children}
        </View>
    }

    function renderChildren(){
        const childrenArray = [];
        for(let i=0; i<childrenCount; i++){
            childrenArray.push(<View style={{width: childWidth, marginLeft: marginLeft}}>{children}</View>);
        }
        return childrenArray
    }

    function renderAnimatedChildren(){
        const animatedContent = [renderChildren()]
        if(repeatChildren){
            animatedContent.push(renderChildren())
            animatedContent.push(renderChildren())
        }

        const renderedLayer = (
            <Animated.View
                style={{ transform: [{ translateX: animatedValue }], height: height, width: multipleChildrenToFillScreenWidth, marginLeft: marginLeft}}
            >
                <View style={{flexDirection: "row"}}>
                    {animatedContent}
                </View>
            </Animated.View>
        )



        return <View style={{width: multipleChildrenToFillScreenWidth, height: height}}>
            <View style={{ flexDirection: 'row' }}>
                {renderedLayer}
            </View>
        </View>
    }

    const content = childWidth ? renderAnimatedChildren() : renderChildrenWithMeasure();

    return <View style={{height: height, width: width, position: "absolute", }}>
        <View style={{flexDirection: "row"}}>
            {content}
        </View>
    </View>

}
