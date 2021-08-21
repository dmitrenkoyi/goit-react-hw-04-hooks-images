import { useState} from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

import './styles.css';

const App = () => {
  const [query, setQuery] = useState('');

  const handleFormSubmit = data => {
    setQuery(data);
  };
   
    return (
      <div className="App">
        <Searchbar formSubmit={handleFormSubmit} />
        <ImageGallery query={query} />
      </div>
    );
}



export default App;
