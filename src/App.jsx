import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        image: ''
    });
    const [modalType, setModalType] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем, что все поля заполнены
        if (!formData.title || !formData.description || !formData.price || !formData.image) {
            setModalType('error');
            setModalMessage('Пожалуйста, заполните все поля');
            setShowModal(true);
            return;
        }

        try {
            const response = await axios.post('https://658aa7e7ba789a96223780e2.mockapi.io/clocks', formData);
            setModalType('success');
            setModalMessage('Товар успешно добавлен');
            setShowModal(true);

            // Очищаем все поля после успешного добавления товара
            setFormData({
                title: '',
                description: '',
                price: '',
                image: ''
            });
        } catch (error) {
            setModalType('error');
            setModalMessage('Произошла ошибка при добавлении товара');
            setShowModal(true);
            console.error('Произошла ошибка:', error.message);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container">
            <h2>Добавить новый товар</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Название:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                <br />
                <label htmlFor="description">Описание:</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                <br />
                <label htmlFor="price">Цена:</label>
                <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                <br />
                <label htmlFor="image">Ссылка на изображение:</label>
                <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                <br />
                <button type="submit">Отправить</button>
            </form>
            {showModal && (
                <div className={`modal ${modalType}`} onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <p>{modalMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
//fixed