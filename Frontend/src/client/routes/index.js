import React from 'react';

// Layouts
import Auth from './../layouts/auth';
import Main from './../layouts/main';

import Register from './../pages/auth/register';
import LogIn from './../pages/auth/login';
import Reset from './../pages/auth/reset';
import Dashboard from './../pages/dashboard';
import Account from './../pages/auth/account';
import LogOut from './../pages/auth/logOut';
import NotFound from './../pages/notFound';
import Users from './../pages/users';

export default [
    {
        path: '/',
        exact: true,
        ...Auth,
        routes: [
            {
                ...LogIn
            }
        ]
    },
    {
        path: '/users',
        ...Main,
        routes: [
            {
                path: '/users/:pageNumber',
                ...Users,
                restricted: true
            },
            {
                ...Users,
                restricted: true
            }
        ]
    },
    {
        path: '/login',
        ...Auth,
        routes: [
            {
                ...LogIn
            }
        ]
    },
    {
        path: '/reset',
        ...Auth,
        routes: [
            {
                ...Reset
            }
        ]
    },
    {
        path: '/register',
        ...Auth,
        routes: [
            {
                ...Register
            }
        ]
    },
    {
        path: '/dashboard',
        ...Main,
        routes: [
            {
                ...Dashboard,
                restricted: true
            }
        ]
    },
    {
        path: '/account',
        ...Main,
        routes: [
            {
                ...Account,
                restricted: true
            }
        ]
    },
    {
        path: '/logout',
        ...Auth,
        routes: [
            {
                ...LogOut
            }
        ]
    },
    {
        path: '/',
        ...Auth,
        routes: [
            {
                ...NotFound
            }
        ]
    }
];

