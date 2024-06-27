import React, { useReducer } from 'react';
import style from './Main.module.css';

const initialState = {
    items: [],
    inputValue: '',
    editIndex: null,
};

function reducer(state, action) {
    switch (action.type) {
    case 'SET_INPUT':
        return {
        ...state,
        inputValue: action.payload
        };
    case 'ADD_ITEM':
        if (state.editIndex !== null) {
        const updatedItems = state.items.map((item, index) =>
        index === state.editIndex ? state.inputValue : item
        );
        return {
            ...state,
            items: updatedItems,
            inputValue: '',
            editIndex: null
        };
    }
    return {
        ...state,
        items: [...state.items, state.inputValue],
        inputValue: ''
    };
    case 'EDIT_ITEM':
    return {
        ...state,
        inputValue: state.items[action.payload],
        editIndex: action.payload
    };
    case 'DELETE_ITEM':
        return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload)
    };
    default:
        return state;
}
}

function Main() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInputChange = (e) => {
    dispatch({ type: 'SET_INPUT', payload: e.target.value });
};

    const handleAddItem = () => {
    dispatch({ type: 'ADD_ITEM' });
};

    const handleEditItem = (index) => {
    dispatch({ type: 'EDIT_ITEM', payload: index });
    };

    const handleDeleteItem = (index) => {
    dispatch({ type: 'DELETE_ITEM', payload: index });
};

    return (
    <div className={style.main}>
        <div className={style.head}>
            <h1>JUST DO IT...</h1>
            <img src="https://banner2.cleanpng.com/20180712/geo/kisspng-check-mark-red-clip-art-hydro-5b47560c8c23b5.076821561531401740574.jpg" alt="" />
        </div>

    <input value={state.inputValue} onChange={handleInputChange} />
    <button onClick={handleAddItem}>{state.editIndex !== null ? 'Update' : 'Add'}</button>
    <ul>
        {state.items.map((item, index) => (
            <li key={index}>
            {item}
            <div className={style.btns}>
            <button onClick={() => handleEditItem(index)}>Edit</button>
            <button onClick={() => handleDeleteItem(index)}>Delete</button>
            </div>
            </li>
        ))}
    </ul>
    </div>
);
}

export default Main;
