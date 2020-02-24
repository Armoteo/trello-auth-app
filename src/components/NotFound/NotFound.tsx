import React from "react";
import { RouteChildrenProps } from "react-router";
import style from './NotFound.module.scss';

export const NotFound = (props: RouteChildrenProps) => {
    return (
        <div className={style.NotFound}>
            <h2>Not found!</h2>
        </div>
    )
}