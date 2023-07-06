import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'; 


const Nav = ({ onSearch, setAccess }) => {  
   const handleLogOut = () => {
      setAccess(false);
   }
                                          
    return (
        <nav>
            
            <div>
                <Link to={'/about'}>
                    <div>ABOUT</div>
                </Link>
                <Link to={'/home'}>
                    <div>HOME</div>
                </Link>
                <Link to={'/favorites'}>
                    <div>Favorites</div>
                </Link>
            </div>
                
               <button onClick={handleLogOut}>LOG OUT</button> 
                <SearchBar onSearch={onSearch}/>   
        </nav>
    );
}

export default Nav;