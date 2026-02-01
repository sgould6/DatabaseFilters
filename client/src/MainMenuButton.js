import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function MainMenuButton() {
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate('/MenuPage');
    }
    

    return (
        <>
            <Button variant="outline-primary" onClick={handleClick}>MAIN MENU</Button>
        </>
    )
}

export default MainMenuButton;