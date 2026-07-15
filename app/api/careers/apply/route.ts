import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import JobApplication from '@/models/jobApplication';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const formData = await request.formData();

    const candidateName = formData.get('candidateName') as string;
    const candidateEmail = formData.get('candidateEmail') as string;
    const candidatePhone = formData.get('candidatePhone') as string;
    const message = formData.get('message') as string;
    const jobId = formData.get('jobId') as string;
    const jobTitle = formData.get('jobTitle') as string;
    const file = formData.get('resume') as File;

    if (!candidateName || !candidateEmail || !candidatePhone || !jobTitle || !file) {
      return NextResponse.json({ error: 'Missing required application fields or resume file.' }, { status: 400 });
    }

    // Convert file to buffer and upload to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: 'pascal_resumes',
          resource_type: 'auto', // Allows PDF, Docx, etc.
          public_id: `cv_${Date.now()}_${candidateName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary CV upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    }) as any;

    const application = new JobApplication({
      jobId: jobId || undefined,
      jobTitle,
      candidateName,
      candidateEmail,
      candidatePhone,
      message,
      resumeUrl: uploadResult.secure_url,
    });

    await application.save();

    return NextResponse.json({ success: true, application });
  } catch (error: any) {
    console.error('Application submission failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
