'use server';

import { revalidateTag } from 'next/cache';

async function revalidateVendorProfile() {
  revalidateTag('vendor/my/profile');
}

export default revalidateVendorProfile;
