import React, { FC } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import Sidebar from './sidebar/Sidebar';
import "./Layout.css"
import { RootStateOrAny, useSelector } from 'react-redux';
import Login from '../pages/Login/Login';
import state from 'sweetalert/typings/modules/state';

interface Props {
    // any props that come into the component
}

// const Layouts FC<Props> = ({children, ...props }) => 
//      (
//         <div>
//             <Header />
//             <div {...props}>{children}></div>
//             <Footer/>
//         </div>
//     )


const Layouts: FC<Props> = ({ children, ...props }) => {
   
    const { is_toggleMenu } = useSelector((state: any) => state.menuToggle);
    const mainCss = is_toggleMenu ? 'main-big' : 'main' 
   
    return(
        <div>
            <Header />
            <Sidebar />
            <div className={mainCss} {...props}>{children}</div>
            <Footer/>
    </div>
    )
}

    


export default Layouts;