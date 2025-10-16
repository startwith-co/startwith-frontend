'use server';

import { revalidateTag } from 'next/cache';

async function revalidateConsumerProfile() {
  revalidateTag('consumer/my/profile');
}

export default revalidateConsumerProfile;
