import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Client from '@/models/client';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const clients = await Client.find({}).sort({ order: 1, name: 1 });
    return NextResponse.json(clients);
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

    if (!data.name || !data.logo) {
      return NextResponse.json({ error: 'Name and logo are required' }, { status: 400 });
    }

    const client = new Client(data);
    await client.save();

    return NextResponse.json({ success: true, client });
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
      return NextResponse.json({ error: 'Client ID is required for update' }, { status: 400 });
    }

    const client = await Client.findByIdAndUpdate(_id, updateData, { new: true });
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, client });
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
      return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Client deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
