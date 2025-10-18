import { useState } from 'react';
import { LoginForm } from '../Login/login';
import { Register } from '../register'
import './modal.css';

export const Modal = ({isOpen, onClose}) => {
    const [modal, setModal] = useState('login');
    const goToLogin = () => setModal('login');
    const goToRegister = () => setModal('register');

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {modal === 'login' ? (
                <LoginForm
                    isOpen={isOpen}
                    onClose={onClose}
                    goToRegister={goToRegister}/>
                ) : (
                <Register
                    onClose={onClose}
                    goToLogin={goToLogin}/>
                )}         
            </div>
        </div>
    )
}