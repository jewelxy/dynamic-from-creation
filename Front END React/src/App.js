import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Customer from './components/Customer';
import GenerateForm from './components/GenerateForm';
function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/generateform" element={<GenerateForm />} />
        </Routes>
    </Router>
  );
}

export default App;