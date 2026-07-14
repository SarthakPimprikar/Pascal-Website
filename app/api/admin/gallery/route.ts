import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import GalleryItem from '@/models/galleryItem';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const items = await GalleryItem.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(items);
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

    if (!data.title || !data.imageUrl) {
      return NextResponse.json({ error: 'Title and image URL are required' }, { status: 400 });
    }

    const item = new GalleryItem(data);
    await item.save();

    return NextResponse.json({ success: true, item });
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
      return NextResponse.json({ error: 'Gallery item ID is required for update' }, { status: 400 });
    }

    const item = await GalleryItem.findByIdAndUpdate(_id, updateData, { new: true });
    if (!item) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, item });
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
      return NextResponse.json({ error: 'Gallery item ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const item = await GalleryItem.findByIdAndDelete(id);
    if (!item) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
