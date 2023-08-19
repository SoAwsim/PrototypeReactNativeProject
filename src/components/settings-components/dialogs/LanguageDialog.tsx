import { Modal, ScrollView } from "react-native";
import { Button, Dialog, Text } from "react-native-paper";
import {
  AppLang,
  LocaleValueType,
  SystemLang,
  useLocaleContext,
} from "../../../providers/LocaleProvider";
import i18n from "../../../localization/i18n";
import CustomRadioItem from "../CustomRadioItem";

export default function LanguageDialog({
  visible,
  hideDialog,
}: {
  visible: boolean;
  hideDialog: () => void;
}) {
  const langContext: LocaleValueType = useLocaleContext();

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
                onPress={() => selectLang("system")}
                radioValue="system"
                radioStatusCondition={langContext.appLang === "system"}
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
              onPress={() => selectLang("en")}
              radioValue="en"
              radioStatusCondition={
                langContext.appLang === "en" ||
                (langContext.appLang === "system" && !showUseSystem)
              }
              label="English"
            />
            <CustomRadioItem
              onPress={() => selectLang("tr")}
              radioValue="tr"
              radioStatusCondition={langContext.appLang === "tr"}
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
