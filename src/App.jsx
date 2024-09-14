import Nav from "./components/navigation/Nav";
import RouteController from "./routes"

import { useLocation } from 'react-router-dom';

function App() {
  const { pathname } = useLocation();

  return (
    <>
      {
        pathname === '/' || pathname === '/cart' || pathname === '/favorite' ? <Nav /> : null
      }
      <RouteController />
    </>
  )
}

export default App
