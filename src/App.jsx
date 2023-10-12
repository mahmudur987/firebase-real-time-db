import { uid } from "uid";
import { db } from "./firebase.config";
import FormComponent from "./FromComponent";
import ShowData from "./ShowData";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="container mx-auto">
      <div className="flex gap-5 flex-wrap">
        <FormComponent />
        <ShowData />
      </div>
      <Toaster />
    </div>
  );
};

export default App;
