import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SiteConfig from '@/models/siteConfig';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    let config = await SiteConfig.findOne({ key: 'main_config' });
    if (!config) {
      config = new SiteConfig();
      await config.save();
    }
    return NextResponse.json(config);
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

    const config = await SiteConfig.findOneAndUpdate(
      { key: 'main_config' },
      { ...data, updatedAt: new Date() },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, config });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
