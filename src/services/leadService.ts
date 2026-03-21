export interface LeadPayload {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email_id: string;
  mobile_no: string;
  company_name: string;
  custom_location: string;
  custom_monthly_salary: string;
  custom_net_take_home: string;
  custom_bank_details: string;
  custom_product_type?: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const apiUrl = import.meta.env.VITE_LEAD_API_URL as string;
  const key = import.meta.env.VITE_HRMS_KEY as string;
  const secret = import.meta.env.VITE_HRMS_SECRET as string;

  const response = await fetch("https://cors-anywhere.herokuapp.com/" + apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${key}:${secret}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Lead submission failed (${response.status}): ${text}`);
  }
}
