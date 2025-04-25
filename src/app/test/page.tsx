'use client';

import { useEffect, useState } from 'react';

export default function Test() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch('http://af/user')
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data.user);
        console.log(data);
      });
  }, []);

  return <div>{JSON.stringify(user, null, 2)}</div>;
}
