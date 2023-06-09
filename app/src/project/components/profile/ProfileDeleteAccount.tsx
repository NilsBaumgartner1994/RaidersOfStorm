// @ts-nocheck
import React, {FunctionComponent, useState} from "react";
import {Text, useToast} from "native-base";
import {ConfigHolder, MyActionsheet, ServerAPI} from "kitcheningredients";
import {SettingsRow} from "../../components/settings/SettingsRow";
import {AppTranslation, useAppTranslation} from "../../components/translations/AppTranslation";
import {DeleteIcon} from "../../components/icons/DeleteIcon";

interface AppState {

}
export const ProfileDeleteAccount: FunctionComponent<AppState> = (props) => {

    const actionsheet = MyActionsheet.useActionsheet();
    const toast = useToast();

    const user_instance = ConfigHolder.instance.getUser()
    const [displayUser, setDisplayUser] = useState(user_instance);

    const translationDeleteAccount = useAppTranslation("deleteAccount");

    if(!!displayUser?.id){
        return(
            <SettingsRow accessibilityLabel={translationDeleteAccount} leftContent={translationDeleteAccount} leftIcon={<DeleteIcon />} onPress={() => {
                actionsheet.show({
                    title: <Text>{translationDeleteAccount+"?"}</Text>,
                    acceptLabel: <AppTranslation id={"accept"} />,
                    cancelLabel: <AppTranslation id={"cancel"} />,
                    onAccept: async () => {
                        try{
                            await ServerAPI.getClient().users.deleteOne(displayUser?.id);
                            ServerAPI.handleLogout();
                        } catch (err){
                            toast.show({
                                description: <AppTranslation id={"error"} postfix={": "} />
                            });
                            toast.show({
                                description: err.toString()
                            });
                        }
                    }
                })
            }} />
        )
    }
    return null;
}
