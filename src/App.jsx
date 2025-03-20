import { Routes, Route } from 'react-router-dom';
import Page from './Page';
import Apply from './Apply';

function App(){
return (
  <>
     <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
  </>
)   
}

export default App;