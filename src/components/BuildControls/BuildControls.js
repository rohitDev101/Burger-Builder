import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label:'Salad', type:'salad'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'},
    {label:'Bacon', type:'bacon'}
]


const buildControls = (props)=> (
    <div className = {classes.BuildControls}>
        <p>Current Price : <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(cntrl => (
            <BuildControl 
            key = {cntrl.label}
            label = {cntrl.label}
            adder = {() => props.ingredientAdder(cntrl.type)}
            remover = {() => props.ingredientRemover(cntrl.type)}
            disabled = {props.disabled[cntrl.type]}/>
        ))}
        <button 
        className = {classes.OrderButton}
        disabled = {!props.purchasable}
        onClick = {props.ordered}>{props.isAuth?'ORDER NOW':'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;