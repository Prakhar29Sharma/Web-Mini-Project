import React from 'react';
import { useParams } from 'react-router-dom';

export default function CreateContent() {
    const params = useParams();
    const { subject, unit } = params;
    console.log(subject, unit);
    return (
        <div></div>
    );
}
