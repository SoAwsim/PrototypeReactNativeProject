import { useContext } from "react";
import { Modal, ScrollView } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { LocaleContext, ThemeContext } from "../../../context/AppContext";
import i18n from "../../../localization/i18n";
import CustomRadioItem from "../CustomRadioItem";

export default function ThemeDialog({
  visible,
  hideDialog,
}: {
  visible: boolean;
  hideDialog: () => void;
}) {
  const { currentTheme, changeTheme } = useContext(ThemeContext);
  const { displayLang } = useContext(LocaleContext);

  function selectButton(selectedTheme: string) {
    changeTheme(selectedTheme);
    hideDialog();
  }

  return (
    <Modal transparent={true} visible={visible} statusBarTranslucent={true}>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          {i18n.t("settingsScreen.sectionApp.theme", { locale: displayLang })}
        </Dialog.Title>
        <Dialog.Content>
          <ScrollView>
            <CustomRadioItem
              onPress={() => selectButton("system")}
              radioValue="system"
              radioStatusCondition={currentTheme === "system"}
              label={i18n.t("settingsScreen.themeText.system", {
                locale: displayLang,
              })}
            />
            <CustomRadioItem
              onPress={() => selectButton("light")}
              radioValue="light"
              radioStatusCondition={currentTheme === "light"}
              label={i18n.t("settingsScreen.themeText.light", {
                locale: displayLang,
              })}
            />
            <CustomRadioItem
              onPress={() => selectButton("dark")}
              radioValue="dark"
              radioStatusCondition={currentTheme === "dark"}
              label={i18n.t("settingsScreen.themeText.dark", {
                locale: displayLang,
              })}
            />
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>
            {i18n.t("settingsScreen.cancel", { locale: displayLang })}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Modal>
  );
}
