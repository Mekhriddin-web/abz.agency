import Employees from './layout/Employees';
import FormLayout from './layout/FormLayout';
import Header from './layout/Header';
import Intro from './layout/Intro';
import './styles/index.scss';

function App() {
  return (
    <>
      <Header />
      <Intro />
      <Employees />
      <FormLayout />
    </>
  );
}

export default App;
