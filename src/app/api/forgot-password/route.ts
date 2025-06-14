import { NextResponse } from 'next/server';
import User from '../../../../model/User';
import connectToDatabase from '../../../../db';
import crypto from 'crypto';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'No user with this email' }, { status: 404 });
  }

  // Generate a reset token and expiry (1 hour)
  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpires = new Date(Date.now() + 3600000);

  user.resetToken = resetToken;
  user.resetExpires = resetExpires;
  await user.save();

  // TODO: Send email with the reset link including token, e.g.:
  // https://yourdomain.com/reset-password?token=resetToken

  return NextResponse.json({ message: 'Password reset email sent' });
}
