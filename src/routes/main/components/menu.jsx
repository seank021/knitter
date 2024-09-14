import React, { useState, useEffect } from "react";
import '../../../css/menu.css';
import arrowleft from '../../../assets/icons/arrowleft.svg';
import write from '../../../assets/icons/write.svg';
import LoadingSpinner from "../../../components/loading";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

export const Menu = ({ setDesign, isOpen, setIsOpen }) => {
    const [menu, setMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = JSON.parse(sessionStorage.getItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]")).uid;
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, userId),
            (snapshot) => {
                const menuData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMenu(menuData);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching documents: ", error);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, [userId]);

    const onClickArrowLeft = () => {
        setIsOpen(!isOpen);
    }

    const onClickWrite = () => {
        setDesign(null);
    }

    return (
        <div className={`menu ${isOpen ? 'open' : 'closed'}`}>
            <div className="flex flex-row justify-between items-center mb-10">
                <img onClick={onClickArrowLeft} src={arrowleft} alt="arrowleft" className="w-6 h-6 cursor-pointer" />
                <img onClick={onClickWrite} src={write} alt="write" className="w-6 h-6 cursor-pointer" />
            </div>

            {loading && 
                <LoadingSpinner />
            }
            <div className="flex flex-col gap-3">
                {menu && menu.map((item, index) => (
                    <div key={index} onClick={() => setDesign(item)} className="cursor-pointer">
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
