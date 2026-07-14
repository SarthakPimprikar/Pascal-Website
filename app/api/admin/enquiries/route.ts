import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ContactEnquiry from '@/models/contactEnquiry';
import { verifyAdminToken } from '@/lib/auth';

// Authenticated GET: fetch all contact enquiries
export async function GET(request: Request) {
  try {
    const auth = verifyAdminToken(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    await connectToDatabase();
    const enquiries = await ContactEnquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(enquiries);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Public POST: submit contact enquiries
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.phone || !data.message) {
      return NextResponse.json({ error: 'Name, email, phone, and message are required' }, { status: 400 });
    }

    await connectToDatabase();
    const enquiry = new ContactEnquiry(data);
    await enquiry.save();

    return NextResponse.json({ success: true, message: 'Your message has been submitted successfully!' });
  } catch (error: any) {
    console.error('Submit contact failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
