import { FunctionComponent } from 'react';

export interface MenuProps {
    title?: string,
    path?: string,
    icon?: any,
    component?: FunctionComponent,
    routes?: Array<MenuProps> | [],
    exact?: boolean | undefined,
    desc?: string
}