"use client";

import { useEffect, useState } from 'react';
import { fetchIntervenants } from '@/app/lib/data';
import { Intervenant } from '@/app/lib/definition';



export default function Page() {
    const [intervenants, setIntervenants] = useState<Intervenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadIntervenants() {
          try {
            const response = await fetch('/api/intervenants/get', {
                method: "GET",
              });
            if (!response.ok) {
              throw new Error('Failed to fetch intervenants');
            }
            const data = await response.json();
            setIntervenants(data);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }
    
        loadIntervenants();
    }, []);

    // useEffect(() => {
    //   try {
    //     fetchIntervenants().then((data) => {
    //       setIntervenants(data);
    //       setLoading(false);
    //     });
    //   } catch (error: any) {
    //     setError(error);
    //     setLoading(false);
    //   }
    // }, []);

    if (loading) {
        return <div>loo...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
        <h1>Liste des intervenants</h1>
        <ul>
            {intervenants.map((intervenant) => (
            <li key={intervenant.id}>
                {intervenant.firstname} {intervenant.lastname} ({intervenant.email}) - {intervenant.creationdate} - {intervenant.enddate} - {intervenant.availability}
            </li>
            ))}
        </ul>
        </div>
    );
}