import Pokemones from "./components/Pokemones";
import { Provider } from "react-redux"; // 'Redux-core'
import generateStore from "./redux/store";
function App() {
  const store = generateStore(); // Contains all Reducers
  return (
    // Redux Wraps all application thorugh <Provider> Tag
    <div className="App">
      <Provider store={store}>
        <Pokemones />
      </Provider>
    </div>
  );
}

export default App;
