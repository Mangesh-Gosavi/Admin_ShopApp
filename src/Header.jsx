import "./CSS/Header.css"
import { useNavigate } from "react-router-dom";

function Header(){
    const navigate = useNavigate();

    const handleclick = async ()=>{
        const token = localStorage.getItem('token');
        console.log("Token retrieved:", token);
        const logout = await fetch("http://localhost:3001/logout", {
            method: "GET",
            headers: 
            {                        
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`
            }
        });
        localStorage.removeItem('token'); 
        navigate("/");
    }

    return (
    <div className="headerbg">
        <div className="nav">
            <h1>Pooja Collection</h1>
            <div className="dropdown">
                <button type="button" className="dropbtn" onClick={handleclick}>Logout</button>
            </div>
        </div>
    </div>    
    
     )
}

export default Header