import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../db';
import User from '../../../../model/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', user });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: 'Something went wrong', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Something went wrong', error: 'Unknown error' },
      { status: 500 }
    );
  }
}
