import {
	BaseNoPaddingTemplate,
	BaseTemplate,
	EmptyTemplate,
	MenuItem,
	Navigation,
	PluginInterface
} from "kitcheningredients";
import {SynchedStateKeys} from "./helper/synchedVariables/SynchedStateKeys";
import {StorageKeys} from "./helper/synchedVariables/StorageKeys";
import React from "react";
import {Settings} from "./screens/settings/Settings";
import {MyHome} from "./screens/home/MyHome";
import {SyncComponent} from "./helper/syncAndSetup/SyncComponent";
import {Wikis} from "./screens/wiki/Wikis";
import {SettingProfile} from "./screens/settings/SettingProfile";
import {Users} from "./screens/user/Users";
import {UserItem} from "@directus/sdk";
import {UsersAvatar} from "./screens/user/UsersAvatar";
import {ImageFullscreen} from "./screens/other/ImageFullscreen";
import {ProfileRawInformation} from "./screens/user/ProfileRawInformation";
import {Profiles} from "./screens/user/Profiles";
import {AppTranslation} from "./components/translations/AppTranslation";
import {UpdateScreen} from "./codepush/UpdateScreen";
import {SetupComponent} from "./helper/syncAndSetup/SetupComponent";
import {VoiceoverExample} from "./screens/debug/accessibility/VoiceoverExample";
import {SynchedVariableText} from "./screens/debug/systemAndStyle/SynchedVariableText";
import {IconListExample} from "./screens/debug/systemAndStyle/IconListExample";
import {CodePush} from "./screens/debug/systemAndStyle/CodePush";
import {StyleExample} from "./screens/debug/systemAndStyle/StyleExample";
import {SystemSettingsLinks} from "./screens/debug/systemAndStyle/SystemSettingsLinks";
import {DeviceInformationDebug} from "./screens/debug/systemAndStyle/DeviceInformationDebug";
import {DebugPlayground} from "./screens/debug/DebugPlayground";
import {DirectusSettings} from "./screens/debug/DirectusSettings";
import {KeyboardAvoidingScrollviewExample} from "./screens/debug/inputs/KeyboardAvoidingScrollviewExample";
import {NotificationExample} from "./screens/debug/notification/NotificationExample";
import {MapLeaflet} from "./screens/debug/map/MapLeaflet";
import {ExampleSettingsRow} from "./screens/debug/systemAndStyle/ExampleSettingsRow";
import {TravelingExample} from "./screens/debug/game/TravelingExample";
import {ReactNativeGameEngineExample} from "./screens/debug/game/rnge/ReactNativeGameEngineExample";

export default class Project extends PluginInterface{
	private setProfile: any;
	static debugMenu;

	constructor() {
		super();
		Project.debugMenu = new MenuItem({
			key: "debug",
			label: "Debug",
			icon: "bug",
			position: -1,
		});
	}

	getSynchedStateKeysClass(){
		return SynchedStateKeys;
	}

	getStorageKeysClass(){
		return StorageKeys;
	}

	myRegisterRoute(component, template, titleTranslation, webTitle, route, params?, override?){
/**
		const myComponent = (props) => {
			let newProps = {...props}; //props are immutable, so we need to copy them
			newProps.title = titleTranslation; //We cant use template.bind here, so we just set the title
			return <View style={{width: "100%", height: "100%"}}>
				{template(newProps)}
			</View>
		}
*/
		Navigation.routeRegister({
			component: component,
			//path: route,
			template: template,
			title: webTitle,
			params: params,
		})
	}

	async registerRoutes(user, role, permissions){
		//console.log("registerRoutes");
		//console.log(user);
		//console.log(role);
		if(!!user){
			this.myRegisterRoute(Profiles, BaseNoPaddingTemplate, <AppTranslation id={"profiles"} />, "Profiles", "profiles", "/:id");
			this.myRegisterRoute(ImageFullscreen, EmptyTemplate, "ImageFullscreen", "ImageFullscreen", "imagefullscreen");
			this.myRegisterRoute(Wikis, EmptyTemplate, "Wiki", "Wiki", "wikis", "/:id", true);
			this.myRegisterRoute(Users, BaseNoPaddingTemplate, "Profile", "Profile", "users", "/:id?", true);
			this.myRegisterRoute(Settings, BaseNoPaddingTemplate, <AppTranslation id={"settings"} />, "Settings", "settings", undefined, true);
			this.myRegisterRoute(SettingProfile, BaseNoPaddingTemplate, <AppTranslation id={"settingsProfile"} />, "Settings Profile", "settingprofile");
			this.myRegisterRoute(ProfileRawInformation, BaseTemplate, <AppTranslation id={"profileRawInformation"} />, "Profile Raw Information", "profileRawInformation");
			Project.registerDebugMenus()
		}
	}

	private static registerDebugMenus(){
		let debugMenu = Project.getDebugMenu();

		let debugGameMenu = new MenuItem({
			key: "debugGame",
			label: "DebugGame",
		});
		Project.registerRouteAndGetDefaultMenuItems(debugGameMenu, [TravelingExample, ReactNativeGameEngineExample], EmptyTemplate);
		debugMenu.addChildMenuItems([debugGameMenu]);

		let debugAccessibilityMenu = new MenuItem({
			key: "debugAccessibility",
			label: "Debug Accessibility",
		});
		debugMenu.addChildMenuItems([debugAccessibilityMenu]);
		Project.registerRouteAndGetDefaultMenuItems(debugAccessibilityMenu, [VoiceoverExample]);

		let systemAndStyleMenu = new MenuItem({
			key: "systemAndStyle",
			label: "System & Style",
		});
		debugMenu.addChildMenuItems([systemAndStyleMenu]);
		Project.registerRouteAndGetDefaultMenuItems(systemAndStyleMenu, [ExampleSettingsRow, StyleExample, CodePush, SynchedVariableText, IconListExample, SystemSettingsLinks, DeviceInformationDebug, DebugPlayground]);

		let serverDebugMenu = new MenuItem({
			key: "serverDebug",
			label: "Server Debug",
		});
		Project.registerRouteAndGetDefaultMenuItems(serverDebugMenu, [DirectusSettings]);
		debugMenu.addChildMenuItems([serverDebugMenu]);

		let debugInputMenu = new MenuItem({
			key: "debugInput",
			label: "Debug Input",
		});
		Project.registerRouteAndGetDefaultMenuItems(debugInputMenu, [KeyboardAvoidingScrollviewExample]);
		debugMenu.addChildMenuItems([debugInputMenu]);

		let debugNotificationMenu = new MenuItem({
			key: "debugNotification",
			label: "Debug Notification",
		});
		Project.registerRouteAndGetDefaultMenuItems(debugNotificationMenu, [NotificationExample]);
		debugMenu.addChildMenuItems([debugNotificationMenu]);

		let debugMapMenu = new MenuItem({
			key: "debugMap",
			label: "Debug Map",
		});
		Project.registerRouteAndGetDefaultMenuItems(debugMapMenu, [MapLeaflet]);
		debugMenu.addChildMenuItems([debugMapMenu]);

		/**
		 Project.registerRouteAndGetDefaultMenuItems(debugMenu, [AvatarsExample, ColorSliderExample]);
		 */
	}

	static registerRouteAndGetDefaultMenuItems(menu: MenuItem, listOfFunctionComponents, template = BaseTemplate){
		for(let fc of listOfFunctionComponents){
			let route = Navigation.routeRegister({
				component: fc,
				template: template,
			})
			menu.addChildMenuItems([MenuItem.fromRoute(route)]);
		}
	}

	async initApp() {
		//console.log("Project init")
	}

	async onLogin(user, role){
		//console.log("onLogin");
	}

	setSetProfile(setProfile){
		this.setProfile = setProfile;
	}

	async onLogout(error){
		//console.log("onLogout");
		if(!!this.setProfile){
			this.setProfile({}, true);
		}
		if(!error){
			//normal logout
		} else {
			//logout on error
		}
	}

	getAboutUsComponent() {
		return <Wikis custom_id={"about_us"} hideHeader={true} />
	}

	getPrivacyPolicyComponent() {
		return <Wikis custom_id={"privacy_policy"} hideHeader={true} />
	}

	getTermsAndConditionsComponent() {
		return <Wikis custom_id={"terms_and_conditions"} hideHeader={true} />
	}

	getHomeComponent(): any {
		return <MyHome />
	}

	getLoadingComponent(){
		return <UpdateScreen message={""} ignoreBytes={true} receivedBytes={0} />;
	}

	getSyncComponent(){
		return <SyncComponent getSetProfileFunction={this.setSetProfile.bind(this)} />;
	}

	getRootComponent(){
		return <SetupComponent />;
	}

	renderCustomAuthProviders(serverInfo): []{
		//@ts-ignore
		return null;
	}

	renderCustomUserAvatar(user: UserItem): JSX.Element{
		return <UsersAvatar user={user} own={true} />;
	}

	getSettingsComponent(): any {
		//return null // we have overwritten it
	}

	getCustomProjectLogoComponent(): any {

	}

	/**
	 * Own Helper
	 */

	static getDebugMenu(): MenuItem {
		return Project.debugMenu
	}

}
