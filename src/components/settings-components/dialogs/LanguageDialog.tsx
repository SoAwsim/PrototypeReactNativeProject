import { useContext } from "react";
import { Modal, ScrollView } from "react-native";
import { Button, Dialog, Text } from "react-native-paper";
import { LocaleContext } from "../../../context/AppContext";
import {
  AppLang,
  LocaleValueType,
  SystemLang,
} from "../../../context/providers/LocaleProvider";
import i18n from "../../../localization/i18n";
import CustomRadioItem from "../CustomRadioItem";

export default function LanguageDialog({
  visible,
  hideDialog,
}: {
  visible: boolean;
  hideDialog: () => void;
}) {
  const langContext: LocaleValueType = useContext(LocaleContext);

  const showUseSystem = langContext.systemLang !== SystemLang.und;

  function selectLang(selectedLang: AppLang) {
    langContext.changeLang(selectedLang);
    hideDialog();
  }

  return (
    <Modal transparent={true} visible={visible} statusBarTranslucent={true}>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>
          {i18n.t("settingsScreen.sectionApp.lang", {
            locale: langContext.displayLang,
          })}
        </Dialog.Title>
        <Dialog.Content>
          <ScrollView>
            {showUseSystem ? (
              <CustomRadioItem
                onPress={() => selectLang(AppLang.sys)}
                radioValue="system"
                radioStatusCondition={langContext.appLang === AppLang.sys}
                label={i18n.t("settingsScreen.langDialog.sysLang", {
                  locale: langContext.displayLang,
                })}
              />
            ) : (
              <Text>
                {i18n.t("settingsScreen.langDialog.langWarn", {
                  locale: langContext.displayLang,
                })}
              </Text>
            )}
            <CustomRadioItem
              onPress={() => selectLang(AppLang.en)}
              radioValue="en"
              radioStatusCondition={
                langContext.appLang === AppLang.en ||
                (langContext.appLang === AppLang.sys && !showUseSystem)
              }
              label="English"
            />
            <CustomRadioItem
              onPress={() => selectLang(AppLang.tr)}
              radioValue="tr"
              radioStatusCondition={langContext.appLang === AppLang.tr}
              label="Türkçe"
            />
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>
            {i18n.t("settingsScreen.cancel", {
              locale: langContext.displayLang,
            })}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Modal>
  );
}
