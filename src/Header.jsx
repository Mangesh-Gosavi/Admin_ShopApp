import "./CSS/Header.css"
import Navigation from "./Navigation"

function Header(){

    return (
    <div className="headerbg">
        <div className="nav">
            <Navigation />
            <h1>Pooja Collection</h1>
        </div>
    </div>    
    
     )
}

export default Header