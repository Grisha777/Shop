import { useState } from 'react';
import cross from '../../images/cross.svg'

// const login =/
// const email_valid =/^([A-Za-z0-9]{1,}[\\.-]{0,1}[A-Za-z0-9]{1,})+@([A-Za-z0-9]{1,}[\\.-]{0,1}[A-Za-z0-9]{1,})+[\\.]{1}[a-z]{2,4}$/;
// const pwd_valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,14}$/;

export const Register = ({ onRegister, onClose, goToLogin }) => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Регистрациия
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!name || !login || !email || !password) {
            setError('Заполните все поля');
            return;
        }
        if (password.length < 6) {
            setError('Пароль должен быть не короче 6 символов');
            return;
        }

        // Проверка логина
        fetch(`http://localhost:5000/users?login=${encodeURIComponent(login)}`)
            .then(res => res.json())
            .then(users => {
                if (users.length > 0) {
                setError('Пользователь с таким логином уже существует');
                return;
            }

        const newUser = { name, login, email, password };

        return fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(newUser)
        });
        }).then(res => {
            if (res && res.ok) {
                alert('Регистрация успешна!');
                onRegister();
                onClose();
                } else if (res) {
                setError('Ошибка при регистрации');
                }
        }).catch(err => {
            console.error(err);
            setError('Не удалось подключиться к серверу');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="login-header">
                <h2>Регистрация</h2>
                <button onClick={onClose} className='cross'>
                    <img src={cross} alt='закрыть'/>
                </button>
            </div>
            <div className="input">
                <input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value.trim())}
                    required/>
                <input
                    type="text"
                    placeholder="Логин"
                    value={login}
                    onChange={(e) => setLogin(e.target.value.trim())}
                    required/>
                <input
                    type="email"
                    placeholder="Почта"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    required/>
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    required/>
                </div>
                {error && <div className="error">{error}</div>}
                <div className="buttons">
                <button type="submit" className="in">Зарегистрироваться</button>
                <button type="button" onClick={goToLogin} className="register">
                    Уже есть аккаунт? Войти
                </button>
            </div>
        </form>
    );
};