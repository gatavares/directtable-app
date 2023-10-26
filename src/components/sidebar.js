import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
    {
        title: 'Início',
        path: '/',
        icon: <AiIcons.AiOutlineHome/>,
        className: 'nav-text inicio',
        userType: 0, //Aluno
    },
    {
        title: 'Horário',
        path: '/horario',
        icon: <BsIcons.BsCalendar2Week/>,
        className: 'nav-text horario',
        userType: 0,
    },
    {
        title: 'Escola',
        path: '/escola',
        icon: <FaIcons.FaSchool/>,
        className: 'nav-text escola',
        userType: 2, //Admin
    },
    {
        title: 'Gestão',
        path: '/gestao',
        icon: <BsIcons.BsCalendar2Range/>,
        className: 'nav-text gestao',
        userType: 1, //Conta de monitor da escola
    },
    {
        title: 'FAQ',
        path: '/faq',
        icon: <Io5Icons.IoBookOutline/>,
        className: 'nav-text faq',
        userType: 0,
    },
    {
        title: 'Suporte',
        path: '/suporte',
        icon: <IoIcons.IoMdHelpCircleOutline/>,
        className: 'nav-text suporte',
        userType: 0,
    },
]