import { NextResponse } from 'next/server';
import User from '../../../../model/User';
import connectToDatabase from '../../../../db';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await connectToDatabase();
  const { token, newPassword } = await req.json();

  const user = await User.findOne({ resetToken: token, resetExpires: { $gt: new Date() } });
  if (!user) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetToken = undefined;
  user.resetExpires = undefined;
  await user.save();

  return NextResponse.json({ message: 'Password reset successfully' });
}
