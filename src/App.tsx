import "./styles.css";
import { Minimal } from "./Autocomplete";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Minimal onChange={console.log.bind(null, "Formik")} />
    </div>
  );
}
