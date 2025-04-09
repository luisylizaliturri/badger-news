import { NavigationContainer } from "@react-navigation/native";

import BadgerTabs from "./navigation/BadgerTabs";

import { PreferencesProvider } from "./context/PreferencesContext";

export default function BadgerNews(props) {
  return (
    <>
      <PreferencesProvider>
        <NavigationContainer>
          <BadgerTabs />
        </NavigationContainer>
      </PreferencesProvider>
    </>
  );
}
