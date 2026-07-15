import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import LandingPage from '@/models/landingPage';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    let page = await LandingPage.findOne({ key: 'homepage' });
    if (!page) {
      page = new LandingPage();
      await page.save();
    }
    return NextResponse.json(page);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const auth = verifyAdminToken(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();

    const page = await LandingPage.findOneAndUpdate(
      { key: 'homepage' },
      { ...data, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, page });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
