import { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Layout from "./components/Layout";
import CarList from "./components/CarList";
import CarDetails from "./components/CarDetails";
const App = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  return (
    <ThemeProvider>
      <WishlistProvider>
        <Layout>
          {selectedCar ? (
            <CarDetails car={selectedCar} onBack={() => setSelectedCar(null)} />
          ) : (
            <CarList onSelectCar={setSelectedCar} />
          )}
        </Layout>
      </WishlistProvider>
    </ThemeProvider>
  );
};

export default App;
