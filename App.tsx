import RootStack from "./screens/RootStack";

import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <RootStack />
    </PaperProvider>
  );
}
