import React from "react";
import classNames from "classnames";

const Button = ({onClick, className, outline, filled, children}) => {
    return (
        <button 
            onClick={onClick}
            className={
                classNames(
                    'button', 
                    className, 
                    {
                        'button--outline' : outline,
                    },
                    {
                        'button--filled' : filled,
                    }
                )
            }
        >
            {children}
        </button>
    );
}

export default Button;