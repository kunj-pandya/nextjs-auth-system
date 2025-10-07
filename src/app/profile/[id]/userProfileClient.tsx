"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    username: string;
    email: string;
}

interface Props {
    userId: string;
}

export default function UserProfileClient({ userId }: Props) {
    const [data, setData] = useState<User | null>(null);

    useEffect(() => {
        axios.get(`/api/users/${userId}`).then(res => setData(res.data));
    }, [userId]);

    return (
        <div>
            <h1>{data?.username || "Loading..."}</h1>
            <p>{data?.email || "Loading..."}</p>
        </div>
    );
}
