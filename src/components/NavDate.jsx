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

    return <div>{date || "Loading..."}</div>;
};

export default NavDate;