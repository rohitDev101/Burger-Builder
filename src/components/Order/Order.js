import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients.map(ig => (
                <span
                    style={{
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        margin: '0 8px',
                        padding: '5px',
                        border: '1px solid #ccc'
                    }}
                    key={ig.name}>{ig.name}({ig.amount})</span>
            ))}</p>
            <p>Price:<strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;