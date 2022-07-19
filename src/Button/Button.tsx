import * as React from 'react';
import {ButtonHTMLAttributes} from "react";
import styles from './Button.module.scss'
import clsx from "clsx";


interface ButtonProps  extends ButtonHTMLAttributes<HTMLButtonElement>{
    color: 'primary' | 'secondary'
    variant: 'outlined' | 'contained' | 'mix'
    icon?: React.ReactNode
}


export const Button = ({variant, color, icon, children, ...props}: ButtonProps) => {
    return (
        <button
            {...props}
            className={clsx(styles.root, styles[variant], styles[color], styles[`${variant}_${color}`])}>
            <span>
                {children}
            </span>
            {
                icon && icon
            }
        </button>
    );
};