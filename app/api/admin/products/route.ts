import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/product';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(products);
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

    if (!data.title || !data.slug || !data.shortDescription || !data.fullDescription || !data.image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await Product.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 400 });
    }

    const product = new Product(data);
    await product.save();

    return NextResponse.json({ success: true, product });
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
      return NextResponse.json({ error: 'Product ID is required for update' }, { status: 400 });
    }

    // Check slug uniqueness on update (excluding current product)
    if (updateData.slug) {
      const existing = await Product.findOne({ slug: updateData.slug, _id: { $ne: _id } });
      if (existing) {
        return NextResponse.json({ error: 'A product with this slug already exists' }, { status: 400 });
      }
    }

    const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
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
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await connectToDatabase();
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
