import React from 'react'
import "./Header.css"
import { BoxArrowRight, List } from "react-bootstrap-icons"
import Swal from 'sweetalert2'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setToggleMenu } from '../../redux/actions/toggleMenuAction';
import { Container, Navbar, Button, Image } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Close from '../../img/close.png';
import MenuPic from '../../img/menu.png'
function Header() {

    const dispatch = useDispatch();
    const { is_toggleMenu } = useSelector((state: RootStateOrAny) => state.menuToggle);

    const togglemenubtn = () => {
        if (is_toggleMenu) {
            dispatch(setToggleMenu(false));
        }
        else {
            dispatch(setToggleMenu(true));
        }
    }

    const closeopenClass = is_toggleMenu ? 'openmenu' : 'closemenu';

    const history = useHistory();

    return (
        <div className={closeopenClass}>
            <Container fluid className="p-0">
                <Navbar collapseOnSelect expand="lg" className="header-bg position-fixed">

                    <Navbar.Brand className="text-white logo-text">
                        <Button className="border-0 bg-transparent mr-3 closeimg" onClick={togglemenubtn}>
                            <img src={Close} alt="close"/>
                        </Button>
                        <Button className="border-0 bg-transparent mr-3 menuimg" onClick={togglemenubtn}>
                            <img src={MenuPic} alt="open"/>
                        </Button>
                        <span className="compastrips_name"> Compastrips</span> <span className="administrator"> Administrator </span>
                    </Navbar.Brand>



                    <Nav className="ml-auto logout-btn-header">
                        <Nav.Link className="text-center text-white" onClick={() => {
                            Swal.fire({
                                title: "๋ก๊ทธ์์",
                                text: "๋ก๊ทธ์์ ํ์๊ฒ?์ต๋๊น?",
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: "ํ์ธ",
                                cancelButtonText: "์ทจ์",
                                reverseButtons: true,
                                showCloseButton: true

                            })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    localStorage.removeItem('token');
                                    history.push("/");
                                }
                            })
                        }}>
                            <BoxArrowRight size={22} />
                            <p className="text-white mb-0">Logout</p>
                        </Nav.Link>
                    </Nav>

                </Navbar>
            </Container>
        </div>

    )
}

export default Header
