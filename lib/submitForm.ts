const WEBHOOK_URL = 'https://tergomedia.app.n8n.cloud/webhook/contact-form';

export interface FormPayload {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  rating?: number;
  reviewText?: string;
  _source: string;
  [key: string]: unknown;
}

export async function submitForm(payload: FormPayload): Promise<{ ok: boolean; error?: string }> {
  if (!payload.email || !payload.email.includes('@')) {
    return { ok: false, error: 'A valid email address is required.' };
  }
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      return { ok: false, error: 'Something went wrong. Please try again or email us directly.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: 'Network error. Please check your connection and try again.' };
  }
}
