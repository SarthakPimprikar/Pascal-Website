import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import JobOpening from '@/models/jobOpening';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await JobOpening.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(jobs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const auth = verifyAdminToken(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    await connectToDatabase();
    const data = await request.json();

    if (!data.title || !data.type || !data.experience || !data.skills || !data.description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const job = new JobOpening(data);
    await job.save();

    return NextResponse.json({ success: true, job });
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
    const { _id, ...updateData } = await request.json();

    if (!_id) {
      return NextResponse.json({ error: 'Job opening ID is required for update' }, { status: 400 });
    }

    const job = await JobOpening.findByIdAndUpdate(_id, updateData, { new: true });
    if (!job) {
      return NextResponse.json({ error: 'Job opening not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, job });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const auth = verifyAdminToken(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: auth.error }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Job opening ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const job = await JobOpening.findByIdAndDelete(id);
    if (!job) {
      return NextResponse.json({ error: 'Job opening not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Job opening deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
