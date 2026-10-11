/* eslint-disable react-hooks/set-state-in-effect */

'use client'

import { useEffect, useState } from 'react';

const NavDate = () => {

    const [date, setDate] = useState("");

    useEffect(() => {
        const currentDate = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
            timeZone: "Asia/Dhaka",
        });

        setDate(currentDate);
    }, []);

    return <div className='text-xs text-gray-500'>{date || "Loading..."}</div>;
};

export default NavDate;